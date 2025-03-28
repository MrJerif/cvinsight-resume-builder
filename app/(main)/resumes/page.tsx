import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import ResumeItem from "./ResumeItem";
import CreateResumeButton from "./CreateResumeButton";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { canCreateResume, canReviewResume } from "@/lib/permissions";
import ReviewResumeButton from "./ReviewResumeButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Your Resumes",
};

export default async function Page() {
  const { userId } = await auth();
  if (!userId) return null;

  const [resumes, totalCount, userSubscription, subscriptionLevel] =
    await Promise.all([
      prisma.resume.findMany({
        where: {
          userId,
        },
        orderBy: {
          updatedAt: "desc",
        },
        include: resumeDataInclude,
      }),

      prisma.resume.count({
        where: {
          userId,
        },
      }),

      prisma.userSubscription.findUnique({
        where: {
          userId,
        },
      }),

      getUserSubscriptionLevel(userId),
    ]);

  // access Resume Review Count
  const resumeChecks = userSubscription?.resumeReviewCount || 1;
  console.log('resume checks:- ', resumeChecks)
  console.log('subscriptionlevel:', subscriptionLevel);

  if(resumeChecks === undefined) return;

  // TODO: Check quota for non-premium users

  return (
    <main className="max-w-7xl mx-auto w-full px-3 py-6 space-y-6">
      <div className="flex">
        <CreateResumeButton
          canCreate={canCreateResume(subscriptionLevel, totalCount)}
        />

        <ReviewResumeButton
          canReviewResume={canReviewResume(subscriptionLevel, resumeChecks)}
        />
      </div>
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Your resumes</h1>
        <p>Total: {totalCount}</p>
      </div>
      <div className="flex flex-col sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-3">
        {resumes.map((resume) => (
          <ResumeItem key={resume.id} resume={resume} />
        ))}
      </div>

      <Button asChild className="mx-auto flex w-fit gap-2" variant="secondary">
        <Link href="/">
          Back
        </Link>
      </Button>
    </main>
  );
}
