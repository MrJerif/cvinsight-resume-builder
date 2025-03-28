import { ResumeValues } from "@/lib/validation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatDate } from "date-fns";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import useDimensions from "@/hooks/use-dimensions";

export interface DefaultTemplateProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function SharpTemplate({
  resumeData,
  contentRef,
  containerRef,
}: DefaultTemplateProps) {
  const { width } = useDimensions(containerRef);
  //   const { colorHex, borderStyle } = resumeData;

  return (
    <div
      className={cn("p-8", !width && "invisible")}
      style={{
        zoom: (1 / 794) * width,
        fontFamily: "Montserrat, sans-serif",
        backgroundColor: "#f4f4f4",
      }}
      ref={contentRef}
      id="resumePreviewContent"
    >
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-4 bg-white shadow-md p-6 space-y-4">
          <PersonalInfoSide resumeData={resumeData} />
          <SkillsSectionSide resumeData={resumeData} />
          <EducationSectionSide resumeData={resumeData} />
        </div>
        <div className="col-span-8 space-y-6">
          <SummarySection resumeData={resumeData} />
          <WorkExperienceSection resumeData={resumeData} />
          <ProjectSection resumeData={resumeData} />
        </div>
      </div>
    </div>
  );
}

interface ResumeSectionProps {
  resumeData: ResumeValues;
}

// Personal Info (Side)
function PersonalInfoSide({ resumeData }: ResumeSectionProps) {
  const {
    photo,
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    phone,
    email,
    colorHex,
    borderStyle,
  } = resumeData;
  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");

    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div className="space-y-4">
      {photoSrc && (
        <Image
          src={photoSrc}
          width={120}
          height={120}
          alt="Author photo"
          className="aspect-square object-cover rounded-full mx-auto"
          style={{
            border: `4px solid ${colorHex}`,
            borderRadius:
              borderStyle === BorderStyles.SQUARE
                ? "0px"
                : borderStyle === BorderStyles.CIRCLE
                  ? "9999px"
                  : "50%",
          }}
        />
      )}
      <div className="text-center">
        <p className="text-2xl font-semibold" style={{ color: colorHex }}>
          {firstName} {lastName}
        </p>
        <p className="text-lg" style={{ color: colorHex }}>
          {jobTitle}
        </p>
      </div>
      <div className="space-y-2 text-sm">
        <p>
          <span className="font-semibold">City:</span> {city}
        </p>
        <p>
          <span className="font-semibold">Country:</span> {country}
        </p>
        <p>
          <span className="font-semibold">Phone:</span> {phone}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {email}
        </p>
      </div>
    </div>
  );
}

// Summary
function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary, colorHex } = resumeData;
  if (!summary) return null;

  return (
    <div className="space-y-3">
      <h2
        className="text-2xl font-semibold border-b pb-2"
        style={{ color: colorHex }}
      >
        Summary
      </h2>
      <div className="whitespace-pre-line text-sm">{summary}</div>
    </div>
  );
}

// Work Experience
function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperiences, colorHex } = resumeData;
  const workExperiencesArray = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0
  );
  if (!workExperiencesArray?.length) return null;

  return (
    <div className="space-y-3">
      <h2
        className="text-2xl font-semibold border-b pb-2"
        style={{ color: colorHex }}
      >
        Work Experience
      </h2>
      {workExperiencesArray.map((exp, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold" style={{ color: colorHex }}>
              {exp.position}
            </h3>
            {exp.startDate && (
              <span>
                {formatDate(exp.startDate, "MM/yyyy")} -{" "}
                {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
              </span>
            )}
          </div>
          <p className="font-semibold">{exp.company}</p>
          <div className="whitespace-pre-line text-sm">{exp.description}</div>
        </div>
      ))}
    </div>
  );
}

// Projects
function ProjectSection({ resumeData }: ResumeSectionProps) {
  const { projects, colorHex } = resumeData;
  const projectsArray = projects?.filter(
    (project) => Object.values(project).filter(Boolean).length > 0
  );
  if (!projectsArray?.length) return null;

  return (
    <div className="space-y-3">
      <h2
        className="text-2xl font-semibold border-b pb-2"
        style={{ color: colorHex }}
      >
        Projects
      </h2>
      {projectsArray.map((project, index) => (
        <div key={index} className="space-y-2">
          <h3 className="text-lg font-semibold" style={{ color: colorHex }}>
            {project.projectName}
          </h3>
          <p className="italic">{project.projectLink}</p>
          <p className="font-semibold">{project.techStack}</p>
          <div className="whitespace-pre-line text-sm">
            {project.description}
          </div>
        </div>
      ))}
    </div>
  );
}

// Education (Side)
function EducationSectionSide({ resumeData }: ResumeSectionProps) {
  const { educations, colorHex } = resumeData;
  const educationArray = educations?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0
  );
  if (!educationArray?.length) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-xl font-semibold" style={{ color: colorHex }}>
        Education
      </h3>
      {educationArray.map((edu, index) => (
        <div key={index} className="space-y-1">
          <p className="font-semibold">{edu.degree}</p>
          <p className="text-sm">{edu.school}</p>
          {edu.startDate && (
            <p className="text-xs">
              {formatDate(edu.startDate, "MM/yyyy")} -{" "}
              {edu.endDate ? formatDate(edu.endDate, "MM/yyyy") : ""}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// Skills (Side)
function SkillsSectionSide({ resumeData }: ResumeSectionProps) {
  const { skills, colorHex, borderStyle } = resumeData;

  if (!skills?.length) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-xl font-semibold" style={{ color: colorHex }}>
        Skills
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge
            key={index}
            style={{
              backgroundColor: colorHex,
              color: "white",
              borderRadius:
                borderStyle === BorderStyles.SQUARE
                  ? "0px"
                  : borderStyle === BorderStyles.CIRCLE
                    ? "9999px"
                    : "8px",
            }}
          >
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
}
