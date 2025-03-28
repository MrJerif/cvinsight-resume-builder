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

export default function DefaultTemplate({
  resumeData,
  contentRef,
  containerRef,
}: DefaultTemplateProps) {
  const { width } = useDimensions(containerRef);
  return (
    <div
      className={cn("space-y-6 p-6", !width && "invisible")}
      style={{
        zoom: (1 / 794) * width,
      }}
      ref={contentRef}
      id="resumePreviewContent"
    >
      <PersonalInfoHeader resumeData={resumeData} />
      <SummarySection resumeData={resumeData} />
      <WorkExperienceSection resumeData={resumeData} />
      <ProjectSection resumeData={resumeData} />
      <EducationSection resumeData={resumeData} />
      <SkillsSection resumeData={resumeData} />
    </div>
  );
}

interface ResumeSectionProps {
  resumeData: ResumeValues;
}

// Personal Info
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
    <div className="flex items-center gap-6">
      {photoSrc && (
        <Image
          src={photoSrc}
          width={100}
          height={100}
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

      <div className="space-y-2.5">
        <div className="space-y-1">
          <p
            className="text-3xl font-bold"
            style={{
              color: colorHex,
            }}
          >
            {firstName} {lastName}
          </p>
          <p
            className="font-medium"
            style={{
              color: colorHex,
            }}
          >
            {jobTitle}
          </p>
        </div>
        <p className="text-xs text-gray-500">
          {city}
          {city && country ? "," : ""}
          {country}
          {(city || country) && (phone || email) ? " • " : ""}
          {/* Empty values not visible */}
          {[phone, email].filter(Boolean).join(" • ")}
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
    <>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="space-y-3 break-inside-avoid">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Summary
        </p>
        <div className="whitespace-pre-line text-sm">{summary}</div>
      </div>
    </>
  );
}

// Work Experience
function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperiences, colorHex } = resumeData;
  // Check if work experience is not empty
  const workExperiencesArray = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0
  );
  if (!workExperiencesArray?.length) return null;

  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Work experience
        </p>
        {workExperiencesArray.map((exp, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div
              className="flex items-center justify-between text-sm font-semibold"
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
    </>
  );
}

// Projects
function ProjectSection({ resumeData }: ResumeSectionProps) {
  const { projects, colorHex } = resumeData;
  // Check if project is empty
  const projectsArray = projects?.filter(
    (project) => Object.values(project).filter(Boolean).length > 0
  );
  if (!projectsArray?.length) return null;

  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Projects
        </p>
        {projectsArray.map((project, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div
              className="flex items-center justify-between text-sm font-semibold"
              style={{
                color: colorHex,
              }}
            >
              <span>{project.projectName}</span>
            </div>
            <p className="text-xs font-semibold italic">
              {project.projectLink}
            </p>
            <p className="text-xs font-semibold">{project.techStack}</p>
            <div className="whitespace-pre-line text-xs">
              {project.description}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// Education
function EducationSection({ resumeData }: ResumeSectionProps) {
  const { educations, colorHex } = resumeData;
  // Check if education is empty
  const educationArray = educations?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0
  );
  if (!educationArray?.length) return null;

  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Education
        </p>
        {educationArray.map((edu, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div
              className="flex items-center justify-between text-sm font-semibold"
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
    </>
  );
}

// Skills
function SkillsSection({ resumeData }: ResumeSectionProps) {
  const { skills, colorHex, borderStyle } = resumeData;

  if (!skills?.length) return null;

  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="break-inside-avoid space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Skills
        </p>
        <div className="flex break-inside-avoid flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              //   className="bg-black text-white rounded-md"
              style={{
                backgroundColor: colorHex,
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
    </>
  );
}
