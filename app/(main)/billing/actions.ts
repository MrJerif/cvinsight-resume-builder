"use server";

import prisma from "@/lib/prisma";
import razorpay from "@/lib/razorpay";
import { currentUser } from "@clerk/nextjs/server";

export async function cancelSubscription() {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const userId = user.id;
  const subscription = await prisma.userSubscription.findUnique({
    where: { userId },
  });

  if (!subscription) {
    throw new Error("Subscription not found.");
  }

  // Fetch the subscription from Razorpay
  const razorpaySubscription = razorpay.subscriptions.fetch(subscription.id);
  const subscriptionId = (await razorpaySubscription).id;

  const cancelSubscription =
    await razorpay.subscriptions.cancel(subscriptionId);

  return cancelSubscription;
}
