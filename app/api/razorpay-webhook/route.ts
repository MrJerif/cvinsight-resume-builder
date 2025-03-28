import { NextRequest } from "next/server";
import crypto from "crypto";
import { clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

// const razorpayInte = razorpay;

export async function POST(req: NextRequest) {
  console.log("webhook hit🥳");
  try {
    const payload = await req.text();
    const signature = req.headers.get("x-razorpay-signature");
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!signature || !secret) {
      return new Response("Signature or Secret is missing", { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

    if (signature !== expectedSignature) {
      console.log("Invalid Signature 🔴");
      return new Response("Invalid Signature", { status: 400 });
    }

    const event = JSON.parse(payload);

    const subscription = event.payload.subscription;

    console.log("event", event);
    console.log("subscription", subscription);
    console.log("event data object", event.data.object);

    if (!subscription) {
      return new Response("Invalid event data", { status: 400 });
    }

    switch (event.event) {
      case "subscription.completed":
        console.log("Subscription completed:");
        await handleSessionCompleted(subscription);
        break;

      case "subscription.updated":
      case "subscription.activated":
        await handleSubscriptionCreatedOrUpdated(subscription);
        break;

      case "subscription.cancelled":
      case "subscription.halted":
        console.log("Subscription cancelled:", event.payload);
        await handleSubscriptionDeleted(subscription);
        break;

      default:
        console.warn("Unhandled event type:", event.event);
        break;
    }

    console.log("webhook success: ");
    return new Response("Event received", { status: 200 });
  } catch (error) {
    console.log("error in webhook ", error);
    return new Response("Internal server error", { status: 500 });
  }
}

async function handleSessionCompleted(subscription) {
  const userId = subscription.notes?.userId;

  if (!userId) {
    throw new Error("User Id is missing in notes(metadata)");
  }

  // Store Razorpay customer Id in Clerk
  await (
    await clerkClient()
  ).users.updateUserMetadata(userId, {
    privateMetadata: {
      razorpayCustomerId: subscription.customer_id,
    },
  });
}

async function handleSubscriptionCreatedOrUpdated(subscription) {
  if (
    // subscription.status === "updated" ||
    subscription.status === "active" ||
    subscription.status === "trailing" ||
    subscription.status === "pending"
    // subscription.staus === "paused" ||
    // subscription.staus === "resumed" ||
    // subscription.staus === "halted"
  ) {
    await prisma.userSubscription.upsert({
      where: {
        userId: subscription.notes?.userId,
      },
      create: {
        userId: subscription.notes?.userId,
        customerId: subscription.customer_id as string,
        subscriptioId: subscription.id,
        priceId: subscription.plan_id,
        currentPeriodEnd: new Date(subscription.currentPeriodEnd * 1000),
        cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
      },
      update: {
        priceId: subscription.plan_id,
        currentPeriodEnd: new Date(subscription.currentPeriodEnd * 1000),
        cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
      },
    });
  } else {
    await prisma.userSubscription.deleteMany({
      where: {
        customerId: subscription.customer_id as string,
      },
    });
  }
}

async function handleSubscriptionDeleted(subscription) {
  await prisma.userSubscription.deleteMany({
    where: {
      customerId: subscription.customer_id as string,
    },
  });
}
