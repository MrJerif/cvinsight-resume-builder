"use client";

import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import Breadcrumbs from "./breadcrumbs";
import Footer from "./Footer";
import { useState } from "react";
import { ResumeValues } from "@/lib/validation";
import ResumePreviewSection from "./ResumePreviewSection";
import { cn, mapToResumeValues } from "@/lib/utils";
import useAutoSaveResume from "./use-autoSaveResume";
import useUnloadWarning from "@/hooks/use-unloadWarning";
import { ResumeServerData } from "@/lib/types";
import useSubscriptionDialog from "@/hooks/use-SubscriptionDialog";

interface ResumeEditorProps {
  resumeToEdit: ResumeServerData | null;
}

export default function ResumeEditor({ resumeToEdit }: ResumeEditorProps) {
  const searchParams = useSearchParams();

  const [resumeData, setResumeData] = useState<ResumeValues>(
    resumeToEdit ? mapToResumeValues(resumeToEdit) : {}
  );

  // Show preview on small screens
  const [showResumePreview, setShowResumePreview] = useState(false);

  // Custom Hooks
  // Auto-save and Show warning if changes are not saved
  const { isSaving, hasUnsavedChanges, isError } = useAutoSaveResume(resumeData);
  useUnloadWarning(hasUnsavedChanges);
  // show Subscription Dialog for paid feautres
  useSubscriptionDialog(isError);

  const currentStep = searchParams.get("step") || steps[0].key;

  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep
  )?.component;

  return (
    <div className="flex grow flex-col">
      <header className="space-y-1.5 border-b px-3 py-5 text-center">
        <h1 className="text-2xl font-bold">Design your resume</h1>
        <p className="text-sm text-muted-foreground">
          Follow the steps below to create your resume. Your progress will be
          saved automatically.
        </p>
      </header>
      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div
            className={cn(
              "w-full md:w-1/2 md:block p-3 overflow-y-auto space-y-6",
              showResumePreview && "hidden"
            )}
          >
            <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>
          <div className="grow md:border-r" />
          <ResumePreviewSection
            resumeData={resumeData}
            setResumeData={setResumeData}
            classname={cn(showResumePreview && "flex")}
          />
        </div>
      </main>
      <Footer
        currentStep={currentStep}
        setCurrentStep={setStep}
        showResumePreview={showResumePreview}
        setShowResumePreview={setShowResumePreview}
        isSaving={isSaving}
      />
    </div>
  );
}
