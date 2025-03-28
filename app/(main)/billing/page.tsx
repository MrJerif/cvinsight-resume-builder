import prisma from "@/lib/prisma";
import razorpay from "@/lib/razorpay";
import { auth } from "@clerk/nextjs/server";
import GetSubscriptionButton from "./GetSubscriptionButton";
import { formatDate } from "date-fns";
import CancelSubscriptionButton from "./CancelSubscriptionButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Billing",
};

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const subscription = await prisma.userSubscription.findUnique({
    where: { userId },
  });

  const priceInfo = subscription
    ? razorpay.plans.fetch(subscription.priceId)
    : null;

  //   const priceAmout = priceInfo?.item.amout;

  return (
    <main className="max-w-7xl mx-auto w-full space-y-6 px-3 py-6">
      <h1 className="text-3xl font-bold">Billing</h1>
      <p>
        Your current plan:{" "}
        <span className="font-bold">
          {priceInfo ? (await priceInfo).item.amount : "Free"}
        </span>
      </p>

      {subscription ? (
        <>
          {subscription?.cancelAtPeriodEnd && (
            <p className="text-destructive">
              Your subscription will be cancelled on{" "}
              {formatDate(subscription?.currentPeriodEnd, "dd MMM yyyy")}
            </p>
          )}
          <CancelSubscriptionButton />
          <GetSubscriptionButton name={"Change Plan"} />
        </>
      ) : (
        <>
          <GetSubscriptionButton name={"Get Subscription"} />
        </>
      )}

      <div>
        <Button asChild size="lg" variant="secondary">
          <Link href="/resumes">Your Resumes</Link>
        </Button>
      </div>
    </main>
  );
}
