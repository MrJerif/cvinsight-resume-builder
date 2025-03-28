import { ResumeValues } from "@/lib/validation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatDate } from "date-fns";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import useDimensions from "@/hooks/use-dimensions";

export interface ElegantTemplateProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function ElegantTemplate({
  resumeData,
  contentRef,
  containerRef,
}: ElegantTemplateProps) {
  const { width } = useDimensions(containerRef);

  return (
    <div
      className={cn("p-10 font-serif", !width && "invisible")}
      style={{
        zoom: (1 / 794) * width,
      }}
      ref={contentRef}
      id="resumePreviewContent"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-1">
          <PersonalInfoHeader resumeData={resumeData} />
          <ContactSection resumeData={resumeData} />
          <SkillsSection resumeData={resumeData} />
          <EducationSection resumeData={resumeData} />
        </div>
        <div className="md:col-span-2">
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
    <div className="text-center mb-8 border-b pb-6">
      {photoSrc && (
        <div className="mx-auto mb-4">
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
        </div>
      )}
      <p
        className="text-3xl font-semibold mb-1"
        style={{
          color: colorHex,
        }}
      >
        {firstName} {lastName}
      </p>
      <p className="text-lg" style={{ color: colorHex }}>
        {jobTitle}
      </p>
    </div>
  );
}

// Contact Section
function ContactSection({ resumeData }: ResumeSectionProps) {
  const { city, country, phone, email, colorHex } = resumeData;

  return (
    <div className="mb-8">
      <h3
        className="text-lg font-semibold mb-3 border-b pb-2"
        style={{ color: colorHex }}
      >
        Contact
      </h3>
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
    <div className="mb-8">
      <h3
        className="text-lg font-semibold mb-3 border-b pb-2"
        style={{ color: colorHex }}
      >
        Summary
      </h3>
      <div className="text-sm leading-relaxed whitespace-pre-line">
        {summary}
      </div>
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
    <div className="mb-8">
      <h3
        className="text-lg font-semibold mb-3 border-b pb-2"
        style={{ color: colorHex }}
      >
        Work Experience
      </h3>
      {workExperiencesArray.map((exp, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold text-sm" style={{ color: colorHex }}>
              {exp.position}
            </p>
            {exp.startDate && (
              <p className="text-xs">
                {formatDate(exp.startDate, "MM/yyyy")} -{" "}
                {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
              </p>
            )}
          </div>
          <p className="text-xs font-semibold italic">{exp.company}</p>
          <p className="text-sm leading-relaxed whitespace-pre-line">
            {exp.description}
          </p>
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
    <div className="mb-8">
      <h3
        className="text-lg font-semibold mb-3 border-b pb-2"
        style={{ color: colorHex }}
      >
        Projects
      </h3>
      {projectsArray.map((project, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold text-sm" style={{ color: colorHex }}>
              {project.projectName}
            </p>
          </div>
          <p className="text-xs italic">{project.projectLink}</p>
          <p className="text-xs font-semibold">{project.techStack}</p>
          <p className="text-sm leading-relaxed whitespace-pre-line">
            {project.description}
          </p>
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
    <div className="mb-8">
      <h3
        className="text-lg font-semibold mb-3 border-b pb-2"
        style={{ color: colorHex }}
      >
        Education
      </h3>
      {educationArray.map((edu, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold text-sm" style={{ color: colorHex }}>
              {edu.degree}
            </p>
            {edu.startDate && (
              <p className="text-xs">
                {formatDate(edu.startDate, "MM/yyyy")} -{" "}
                {edu.endDate ? formatDate(edu.endDate, "MM/yyyy") : ""}
              </p>
            )}
          </div>
          <p className="text-xs italic">{edu.school}</p>
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
    <div className="mb-8">
      <h3
        className="text-lg font-semibold mb-3 border-b pb-2"
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
              color: "white", // Ensure readability
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
