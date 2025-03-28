"use client";

import { Button } from "@/components/ui/button";
import usePremiumModal from "@/hooks/use-PremiumModal";

export default function GetSubscriptionButton({name}: {name: string}) {
  const PremiumModal = usePremiumModal();

  return (
    <Button onClick={() => PremiumModal.setOpen(true)} variant="premium">
      {name}
    </Button>
  );
}
