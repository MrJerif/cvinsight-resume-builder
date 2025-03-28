// Save Premium-Modal state and use it across the site

import { create } from "zustand";

interface PremiumModalState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const usePremiumModal = create<PremiumModalState>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));

export default usePremiumModal;
