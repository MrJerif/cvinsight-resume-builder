import ResumePreview from "@/components/ResumePreview";
import { ResumeValues } from "@/lib/validation";
import ColorPicker from "./ColorPicker";
import BorderStyleButton from "./BorderStyleButton";
import { cn } from "@/lib/utils";
import TemplateButton from "./TemplateButton";

interface ResumePreviewSectionProsp {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
  classname?: string;
}

export default function ResumePreviewSection({
  resumeData,
  setResumeData,
  classname,
}: ResumePreviewSectionProsp) {
  return (
    <div className={cn("relative hidden md:w-1/2 md:flex group w-full", classname)}>
      <div className="absolute left-1 top-1 flex flex-col gap-3 flex-none lg:left-2 lg:top-2 opacity-50 xl:opacity-100 group-hover:opacity-100 transition-opacity">
        <ColorPicker
          color={resumeData?.colorHex}
          onChange={(color) =>
            setResumeData({ ...resumeData, colorHex: color.hex })
          }
        />
        <BorderStyleButton
          borderStyle={resumeData?.borderStyle}
          onChange={(borderStyle) =>
            setResumeData({ ...resumeData, borderStyle })
          }
        />
        <TemplateButton 
          templateStyle={resumeData.template}
          onChange={(template) =>
            setResumeData({ ...resumeData, template})
          }
        />
      </div>
      <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
        <ResumePreview resumeData={resumeData} classname="max-w-2xl" />
      </div>
    </div>
  );
}
