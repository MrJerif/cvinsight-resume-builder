// Check limitations based on pricing plan

import { SubscriptionLevel } from "./subscription";

// Resumes allowed for every plan
export function canCreateResume(
  subscriptionLevel: SubscriptionLevel,
  currentResumeCount: number
) {
  const maxResumeMap: Record<SubscriptionLevel, number> = {
    free: 1,
    basic: 3,
    pro: Infinity,
  };

  const maxResume = maxResumeMap[subscriptionLevel];

  // can create resume only if currentResumeCount < maxResume
  return currentResumeCount < maxResume; // returns a boolean
}

// Customizations for Basic and Pro plans only
export function canUseCustomizations(subscriptionLevel: SubscriptionLevel) {
  return subscriptionLevel !== "free"; // returns a boolean
}

// Templates for Basic and Pro plans only
export function canUseTemplates(subscriptionLevel: SubscriptionLevel) {
  return subscriptionLevel !== "free"; // returns a boolean
}

// Resume Check for every plan
export function canReviewResume(
  subscriptionLevel: SubscriptionLevel,
  resumeChecks: number
) {
  const maxResumeCheckMap: Record<SubscriptionLevel, number> = {
    free: 1,
    basic: 3,
    pro: Infinity,
  };

  const maxResumeChecks = maxResumeCheckMap[subscriptionLevel];
  // can check resumes only if resumeChecks < maxResumeChecks
  return resumeChecks < maxResumeChecks; // returns a boolean
}
