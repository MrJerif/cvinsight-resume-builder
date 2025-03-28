import { ResumeValues } from "@/lib/validation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatDate } from "date-fns";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import useDimensions from "@/hooks/use-dimensions";

export interface ClassicTemplateProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function ClassicTemplate({
  resumeData,
  contentRef,
  containerRef,
}: ClassicTemplateProps) {
  const { width } = useDimensions(containerRef);
  return (
    <div
      className={cn("p-8 font-serif", !width && "invisible")}
      style={{
        zoom: (1 / 794) * width,
      }}
      ref={contentRef}
      id="resumePreviewContent"
    >
      <PersonalInfoHeader resumeData={resumeData} />
      <div className="mt-8 grid grid-cols-3 gap-8">
        <div className="col-span-1">
          <ContactSection resumeData={resumeData} />
          <SkillsSection resumeData={resumeData} />
          <EducationSection resumeData={resumeData} />
        </div>
        <div className="col-span-2">
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

// Personal Info Header
function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
  const { photo, firstName, lastName, jobTitle, colorHex, borderStyle } =
    resumeData;

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");

    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div className="flex items-center gap-8 border-b pb-4">
      {photoSrc && (
        <Image
          src={photoSrc}
          width={120}
          height={120}
          alt="Author photo"
          className="aspect-square object-cover"
          style={{
            borderRadius:
              borderStyle === BorderStyles.SQUARE
                ? "0px"
                : borderStyle === BorderStyles.CIRCLE
                  ? "9999px"
                  : "10%",
          }}
        />
      )}

      <div className="space-y-2">
        <p
          className="text-4xl font-bold"
          style={{
            color: colorHex,
          }}
        >
          {firstName} {lastName}
        </p>
        <p
          className="text-xl font-semibold"
          style={{
            color: colorHex,
          }}
        >
          {jobTitle}
        </p>
      </div>
    </div>
  );
}

// Contact Section
function ContactSection({ resumeData }: ResumeSectionProps) {
  const { city, country, phone, email, colorHex } = resumeData;

  return (
    <div className="space-y-3 mb-8">
      <p
        className="text-lg font-semibold border-b pb-2"
        style={{
          color: colorHex,
        }}
      >
        Contact
      </p>
      <div className="text-sm space-y-1">
        {city && (
          <p>
            {city}, {country}
          </p>
        )}
        {phone && <p>{phone}</p>}
        {email && <p>{email}</p>}
      </div>
    </div>
  );
}

// Summary
function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary, colorHex } = resumeData;
  if (!summary) return null;

  return (
    <div className="space-y-3 mb-8">
      <p
        className="text-lg font-semibold border-b pb-2"
        style={{
          color: colorHex,
        }}
      >
        Summary
      </p>
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
    <div className="space-y-3 mb-8">
      <p
        className="text-lg font-semibold border-b pb-2"
        style={{
          color: colorHex,
        }}
      >
        Work Experience
      </p>
      {workExperiencesArray.map((exp, index) => (
        <div key={index} className="space-y-2">
          <div
            className="flex justify-between text-sm font-semibold"
            style={{
              color: colorHex,
            }}
          >
            <span>{exp.position}</span>
            {exp.startDate && (
              <span>
                {formatDate(exp.startDate, "MM/yyyy")} -{" "}
                {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
              </span>
            )}
          </div>
          <p className="text-xs font-semibold">{exp.company}</p>
          <div className="whitespace-pre-line text-xs">{exp.description}</div>
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
    <div className="space-y-3 mb-8">
      <p
        className="text-lg font-semibold border-b pb-2"
        style={{
          color: colorHex,
        }}
      >
        Projects
      </p>
      {projectsArray.map((project, index) => (
        <div key={index} className="space-y-2">
          <div
            className="flex justify-between text-sm font-semibold"
            style={{
              color: colorHex,
            }}
          >
            <span>{project.projectName}</span>
          </div>
          <p className="text-xs font-semibold italic">{project.projectLink}</p>
          <p className="text-xs font-semibold">{project.techStack}</p>
          <div className="whitespace-pre-line text-xs">
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
      <p
        className="text-lg font-semibold border-b pb-2"
        style={{
          color: colorHex,
        }}
      >
        Education
      </p>
      {educationArray.map((edu, index) => (
        <div key={index} className="space-y-2">
          <div
            className="flex justify-between text-sm font-semibold"
            style={{
              color: colorHex,
            }}
          >
            <span>{edu.degree}</span>
            {edu.startDate && (
              <span>
                {formatDate(edu.startDate, "MM/yyyy")} -{" "}
                {edu.endDate ? formatDate(edu.endDate, "MM/yyyy") : ""}
              </span>
            )}
          </div>
          <p className="text-xs font-semibold">{edu.school}</p>
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
      <p
        className="text-lg font-semibold border-b pb-2"
        style={{
          color: colorHex,
        }}
      >
        Skills
      </p>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge
            key={index}
            style={{
              backgroundColor: colorHex,
              color: "white", // Ensure text is readable against the color
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
