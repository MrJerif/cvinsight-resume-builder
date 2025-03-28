// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useForm } from "react-hook-form";
import { Metadata } from "next";
import ReviewResume from "./ReviewResume";

export const metadata: Metadata = {
  title: "Ai Resume Review",
};

export default function Page() {
  //   const form = useForm();
  return (
    // <div className="flex m-auto w-[50vw] h-[50vh] border items-center justify-center">
    <div className="">
        <ReviewResume />
    </div>
  );
}
