// import useDimensions from "@/hooks/use-dimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import { useRef } from "react";
import DefaultTemplate from "./DefaultTemplate";
import ClassicTemplate from "./ClassicTemplate";
import ModernTemplate from "./ModernTemplate";
import ElegantTemplate from "./ElegantTemplate";
import FormalTemplate from "./FormalTemplate";
import ExecutiveTemplate from "./ExecutiveTheme";
import RefinedTemplate from "./RefinedTemplate";
import ProfessionalTemplate from "./ProfessionalTemplate";
import FancyTemplate from "./FancyTemplate";
import SleekTemplate from "./SleekTemplate";
import SharpTemplate from "./SharpTemplate";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  classname?: string;
}

export default function ResumePreview({
  resumeData,
  contentRef,
  classname,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Render resume template
  const renderTemplate = () => {
    switch (resumeData.template) {
      case "default":
        return (
          <DefaultTemplate
            resumeData={resumeData}
            containerRef={containerRef as React.RefObject<HTMLDivElement>}
            contentRef={contentRef}
          />
        );
      case "classic":
        return (
          <ClassicTemplate
            resumeData={resumeData}
            containerRef={containerRef as React.RefObject<HTMLDivElement>}
            contentRef={contentRef}
          />
        );

      case "modern":
        return (
          <ModernTemplate
            resumeData={resumeData}
            containerRef={containerRef as React.RefObject<HTMLDivElement>}
            contentRef={contentRef}
          />
        );

      case "elegant":
        return (
          <ElegantTemplate
            resumeData={resumeData}
            containerRef={containerRef as React.RefObject<HTMLDivElement>}
            contentRef={contentRef}
          />
        );

      case "formal":
        return (
          <FormalTemplate
            resumeData={resumeData}
            containerRef={containerRef as React.RefObject<HTMLDivElement>}
            contentRef={contentRef}
          />
        );

      case "sleek":
        return (
          <SleekTemplate
            resumeData={resumeData}
            containerRef={containerRef as React.RefObject<HTMLDivElement>}
            contentRef={contentRef}
          />
        );

      case "executive":
        return (
          <ExecutiveTemplate
            resumeData={resumeData}
            containerRef={containerRef as React.RefObject<HTMLDivElement>}
            contentRef={contentRef}
          />
        );

      case "sharp":
        return (
          <SharpTemplate
            resumeData={resumeData}
            containerRef={containerRef as React.RefObject<HTMLDivElement>}
            contentRef={contentRef}
          />
        );

      case "professional":
        return (
          <ProfessionalTemplate
            resumeData={resumeData}
            containerRef={containerRef as React.RefObject<HTMLDivElement>}
            contentRef={contentRef}
          />
        );

      case "refined":
        return (
          <RefinedTemplate
            resumeData={resumeData}
            containerRef={containerRef as React.RefObject<HTMLDivElement>}
            contentRef={contentRef}
          />
        );

      case "fancy":
        return (
          <FancyTemplate
            resumeData={resumeData}
            containerRef={containerRef as React.RefObject<HTMLDivElement>}
            contentRef={contentRef}
          />
        );
      default:
        return (
          <DefaultTemplate
            resumeData={resumeData}
            containerRef={containerRef as React.RefObject<HTMLDivElement>}
            contentRef={contentRef}
          />
        );
    }
  };

  return (
    <div
      className={cn(
        "bg-white text-black h-fit w-full aspect-[210/297]",
        classname
      )}
      ref={containerRef}
    >
      {renderTemplate()}
    </div>
  );
}
