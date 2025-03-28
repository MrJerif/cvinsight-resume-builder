"use client";

import { Button } from "@/components/ui/button";
import usePremiumModal from "@/hooks/use-PremiumModal";
import { SparkleIcon } from "lucide-react";
import Link from "next/link";

interface ReviewResumeButtonProps {
  // subscriptionLevel: "free" | "basic" | "pro";
  canReviewResume: boolean
}

export default function ReviewResumeButton({
  canReviewResume,
}: ReviewResumeButtonProps) {
  const premiumModal = usePremiumModal();

  // User can create more resumes...
  if (canReviewResume) {
    return (
      <Button asChild className="mx-auto flex w-fit gap-2">
        <Link href="/review">
          <SparkleIcon className="size-5" />
          Review Resume
        </Link>
      </Button>
    );
  }

  // User can not create more resumes...
  return (
    <Button
      onClick={() => premiumModal.setOpen(true)}
      className="mx-auto flex w-fit gap-2"
      title="Enhance your resume with AI feedback."
    >
      <SparkleIcon className="size-5" />
      Review Resume
    </Button>
  );
}
