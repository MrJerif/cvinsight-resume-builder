"use client";

import { Button } from "@/components/ui/button";
import { cancelSubscription } from "./actions";

export default function CancelSubscriptionButton() {
    return <Button onClick={() => cancelSubscription()} variant="secondary">
        Cancel Subscription
    </Button>
}