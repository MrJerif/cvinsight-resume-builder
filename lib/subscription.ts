import { cache } from "react";
import prisma from "./prisma";
import { pricingValues } from "@/lib/pricing";

export type SubscriptionLevel = "free" | "basic" | "pro";

export const getUserSubscriptionLevel = cache(
  async (userId: string): Promise<SubscriptionLevel> => {
    const subscription = await prisma.userSubscription.findUnique({
      where: {
        userId,
      },
    });

    // Free plan
    if (!subscription || subscription.currentPeriodEnd < new Date()) {
      return "free";
    }

    // Basic plan
    if (subscription.priceId === pricingValues.basic.toString()) {
      return "basic";
    }

    // Pro plan
    if (subscription.priceId === pricingValues.pro.toString()) {
      return "pro";
    }

    throw new Error("Invalid subcription");
  }
);
