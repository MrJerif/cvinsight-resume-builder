// To show the premium subscription modal

"use client";

import usePremiumModal from "@/hooks/use-PremiumModal";
import { useEffect, useState } from "react";

export default function useSubscriptionDialog(shouldOpen: boolean) {
  const premiumModal = usePremiumModal();
  const [hasOpened, setHasOpened] = useState(false);

  // Open the premium modal when the component mounts
  useEffect(() => {
    if (shouldOpen && !hasOpened) {
      premiumModal.setOpen(true);
      setHasOpened(true);
    }
  }, [shouldOpen, premiumModal, hasOpened]);

  // Reset when closing condition happens
  useEffect(() => {
    if (!shouldOpen) {
      setHasOpened(false);
    }
  }, [shouldOpen]);
}
