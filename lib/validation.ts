import { z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));

// Define general info
export const generalInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
});

export type GeneralInfoValues = z.infer<typeof generalInfoSchema>;

// Define personal info
export const personalInfoSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "Must be an Image file"
    )
    .refine(
      (file) => !file || file.size <= 1024 * 1024 * 4,
      "File must be less than 4 mb"
    ),
  firstName: optionalString,
  lastName: optionalString,
  jobTitle: optionalString,
  city: optionalString,
  country: optionalString,
  phone: optionalString,
  email: optionalString,
});

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

// Define WorkExperinece
export const workExperineceSchema = z.object({
  workExperiences: z
    .array(
      z.object({
        position: optionalString,
        company: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        description: optionalString,
      })
    )
    .optional(),
});

export type WorkExperineceValues = z.infer<typeof workExperineceSchema>;

// Define Education
export const educationSchema = z.object({
  educations: z
    .array(
      z.object({
        degree: optionalString,
        school: optionalString,
        startDate: optionalString,
        endDate: optionalString,
      })
    )
    .optional(),
});

export type EducationValues = z.infer<typeof educationSchema>;

// Define Skills
export const skillsSchema = z.object({
  skills: z.array(z.string().trim()).optional(),
});

export type SkillsValues = z.infer<typeof skillsSchema>;

// Define Projects
export const projectSchema = z.object({
  projects: z
    .array(
      z.object({
        projectName: optionalString,
        projectLink: optionalString,
        techStack: optionalString,
        description: optionalString,
      })
    )
    .optional(),
});

export type ProjectValues = z.infer<typeof projectSchema>;

// Define Summary
export const summarySchema = z.object({
  summary: optionalString,
});

export type SummaryValues = z.infer<typeof summarySchema>;

// Define Schema for whole resume
export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperineceSchema.shape,
  ...educationSchema.shape,
  ...skillsSchema.shape,
  ...projectSchema.shape,
  ...summarySchema.shape,

  colorHex: optionalString,
  borderStyle: optionalString,
  template: optionalString,
  // resumeReviewCount: optionalString,
});

export type ResumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: File | string | null;
};
