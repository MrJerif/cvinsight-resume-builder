"use client";

import { CheckIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import usePremiumModal from "@/hooks/use-PremiumModal";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

const proPlanId = process.env.NEXT_PUBLIC_RAZORPAY_PRO_PLAN_ID!;
const basicPlanId = process.env.NEXT_PUBLIC_RAZORPAY_BASIC_PLAN_ID!;

// const freeFeatures = [
//   "Create 1 free resume",
//   "1 AI-Powered Resume Review",
//   "No Design customizations",
//   "Default template",
//   "Download as PDF",
// ];

const basicFeatures = [
  "Up to 3 resumes",
  "3 AI-Powered Resume Reviews",
  "Design customizations",
  "Limited templates",
  "Download as PDF",
];
const proFeatures = [
  "Infinite resumes",
  "Infinite AI-Powered Resume Reviews",
  "Design customizations",
  "Unlock All templates",
  "Download as PDF",
];

export default function PremiumModal() {
  const { open, setOpen } = usePremiumModal();
  const { toast } = useToast();
  const {user} = useUser();

  // loading while payment is processing
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  async function handlePayment(planId: string) {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/checkout-session", { planId });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        subscription_id: data.subscriptionId,
        name: "CVInsight",
        description: "Premium Subscription",
        theme: { color: "#F37254" },
        handler: function (response: any) {
          console.log("Payment successful", response);
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment initiation failed", error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again",
      });
    } finally {
      setLoading(false);
      console.log('finally end of payment');
    }
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>CVInsight</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <p>Get a Pro subscription to unlock more features.</p>
          <div className="flex">
            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="text-center text-lg font-bold">Basic</h3>
              <ul className="list-inside space-y-2">
                {basicFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckIcon className="size-4 text-orange-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant="secondary"
                // onClick={() => handlePayment(pricingValues.basic)}
                onClick={() => handlePayment(basicPlanId)}
                disabled={loading}
              >
                Get Basic
              </Button>
            </div>
            <div className="border-l mx-6" />
            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="text-center text-lg font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                Pro
              </h3>
              <ul className="list-inside space-y-2">
                {proFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckIcon className="size-4 text-orange-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant="premium"
                // onClick={() => handlePayment(pricingValues.pro)}
                onClick={() => handlePayment(proPlanId)}
                disabled={loading}
              >
                Get Pro
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
