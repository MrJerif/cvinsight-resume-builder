"use server";
// import { pricingValues } from "@/lib/pricing";
import razorpay from "@/lib/razorpay";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized hai bro");
  }

  try {
    const { planId } = await request.json();

    if (!planId) {
      return NextResponse.json(
        { error: "Plan ID is missing" },
        { status: 400 }
      );
    }

    // Create a subscription for the user
    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      customer_notify: 1,
      quantity: 1,
      total_count: 6,
      notes: {
        userId: user.id,
      },
    });

    return NextResponse.json(
      { subscriptionId: subscription.id },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in RESU 🔴", error);
    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500 }
    );
  }
}
