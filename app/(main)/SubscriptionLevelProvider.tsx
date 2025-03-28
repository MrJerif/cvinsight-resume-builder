"use client";

import { SubscriptionLevel } from "@/lib/subscription";
import { createContext, ReactNode, useContext } from "react";

const SubscriptionLevelContext = createContext<SubscriptionLevel | undefined>(
  undefined
);

interface SubscriptionLevelProviderProps {
  children: ReactNode;
  userSubscriptionLevel: SubscriptionLevel;
}

export default function SubscriptionLevelProvider({
  children,
  userSubscriptionLevel,
}: SubscriptionLevelProviderProps) {
  return (
    <SubscriptionLevelContext.Provider value={userSubscriptionLevel}>
      {children}
    </SubscriptionLevelContext.Provider>
  );
}

// hook to handle undefined value from SubscriptionLevelContext
export function useSubscriptionLevel() {
  const context = useContext(SubscriptionLevelContext);

  // Check if undefined
  if (context === undefined) {
    throw new Error(
      "useSubscriptionLevel must be used within a SubscriptionLevelProvider!"
    );
  }
  return context;
}
