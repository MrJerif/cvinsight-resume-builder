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

export default function SleekTemplate({
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
        fontFamily: "Raleway, sans-serif",
        backgroundColor: "#f0f0f0",
      }}
      ref={contentRef}
      id="resumePreviewContent"
    >
      <div className="bg-white rounded-lg shadow-lg p-8">
        <PersonalInfoHeader resumeData={resumeData} />
        <div className="mt-8 space-y-8">
          <SummarySection resumeData={resumeData} />
          <WorkExperienceSection resumeData={resumeData} />
          <ProjectSection resumeData={resumeData} />
          <div className="grid grid-cols-2 gap-8">
            <EducationSection resumeData={resumeData} />
            <SkillsSection resumeData={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface ResumeSectionProps {
  resumeData: ResumeValues;
}

// Personal Info (Header)
function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
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
    <div className="flex items-center gap-8 border-b pb-8">
      {photoSrc && (
        <div className="relative w-32 h-32 rounded-full overflow-hidden">
          <Image
            src={photoSrc}
            layout="fill"
            objectFit="cover"
            alt="Author photo"
            style={{
              borderRadius:
                borderStyle === BorderStyles.SQUARE
                  ? "0px"
                  : borderStyle === BorderStyles.CIRCLE
                    ? "9999px"
                    : "50%",
              border: `4px solid ${colorHex}`,
            }}
          />
        </div>
      )}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold" style={{ color: colorHex }}>
          {firstName} {lastName}
        </h1>
        <h2 className="text-2xl font-semibold" style={{ color: colorHex }}>
          {jobTitle}
        </h2>
        <p className="text-gray-600">
          {city}
          {city && country ? ", " : ""}
          {country}
          {(city || country) && (phone || email) ? " | " : ""}
          {[phone, email].filter(Boolean).join(" | ")}
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
      <h3
        className="text-2xl font-semibold border-b pb-4"
        style={{ color: colorHex }}
      >
        Summary
      </h3>
      <div className="whitespace-pre-line text-lg">{summary}</div>
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
      <h3
        className="text-2xl font-semibold border-b pb-4"
        style={{ color: colorHex }}
      >
        Work Experience
      </h3>
      {workExperiencesArray.map((exp, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-semibold" style={{ color: colorHex }}>
              {exp.position}
            </h4>
            {exp.startDate && (
              <span className="text-gray-600">
                {formatDate(exp.startDate, "MM/yyyy")} -{" "}
                {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
              </span>
            )}
          </div>
          <p className="font-semibold">{exp.company}</p>
          <div className="whitespace-pre-line text-lg">{exp.description}</div>
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
      <h3
        className="text-2xl font-semibold border-b pb-4"
        style={{ color: colorHex }}
      >
        Projects
      </h3>
      {projectsArray.map((project, index) => (
        <div key={index} className="space-y-2">
          <h4 className="text-xl font-semibold" style={{ color: colorHex }}>
            {project.projectName}
          </h4>
          <p className="italic">{project.projectLink}</p>
          <p className="font-semibold">{project.techStack}</p>
          <div className="whitespace-pre-line text-lg">
            {project.description}
          </div>
        </div>
      ))}
    </div>
  );
}

// Education
function EducationSection({ resumeData }: ResumeSectionProps) {
  const { educations, colorHex } = resumeData;
  const educationArray = educations?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0
  );
  if (!educationArray?.length) return null;

  return (
    <div className="space-y-3">
      <h3
        className="text-2xl font-semibold border-b pb-4"
        style={{ color: colorHex }}
      >
        Education
      </h3>
      {educationArray.map((edu, index) => (
        <div key={index} className="space-y-2">
          <h4 className="text-xl font-semibold" style={{ color: colorHex }}>
            {edu.degree}
          </h4>
          <p className="font-semibold">{edu.school}</p>
          {edu.startDate && (
            <p className="text-gray-600">
              {formatDate(edu.startDate, "MM/yyyy")} -{" "}
              {edu.endDate ? formatDate(edu.endDate, "MM/yyyy") : ""}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// Skills
function SkillsSection({ resumeData }: ResumeSectionProps) {
  const { skills, colorHex, borderStyle } = resumeData;

  if (!skills?.length) return null;

  return (
    <div className="space-y-3">
      <h3
        className="text-2xl font-semibold border-b pb-4"
        style={{ color: colorHex }}
      >
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
