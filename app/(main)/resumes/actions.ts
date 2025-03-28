"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function deleteResume(id: string) {
  const { userId } = await auth();

  // Authentication
  if (!userId) {
    throw new Error("User not authenticated");
  }
  // Fetch resume
  const resume = await prisma.resume.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!resume) {
    throw new Error("Resume not found!");
  }
  // Fetch photo(if any) from resume and delete it
  if (resume.photoUrl) {
    await del(resume.photoUrl);
  }

  // Delete the rest of resume
  await prisma.resume.delete({
    where: {
      id,
    },
  });

  // Refresh page
  revalidatePath("/resumes");
}
