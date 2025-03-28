"use client";

import { Button } from "@/components/ui/button";
import usePremiumModal from "@/hooks/use-PremiumModal";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

interface CreateResumeButtonProps {
  canCreate: boolean;
}

export default function CreateResumeButton({
  canCreate,
}: CreateResumeButtonProps) {
  const premiumModal = usePremiumModal();

  //   User can create more resumes...
  if (canCreate) {
    return (
      <Button asChild className="mx-auto flex w-fit gap-2">
        <Link href="/editor">
          <PlusIcon className="size-5" />
          New Resume
        </Link>
      </Button>
    );
  }

  // User can not create more resumes...
  return (
    <Button
      onClick={() => premiumModal.setOpen(true)}
      className="mx-auto flex w-fit gap-2"
    >
      <PlusIcon className="size-5" />
      New Resume
    </Button>
  );
}
