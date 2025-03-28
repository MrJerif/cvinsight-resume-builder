import { canReviewResume } from "@/lib/permissions";
import prisma from "@/lib/prisma";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import pdfParse from "pdf-parse/lib/pdf-parse";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Function clean resume file text
function cleanText(text) {
  // Remove extra line breaks
  text = text.replace(/[\r\n]+/g, "\n");
  // Remove leading/trailing spaces from each line
  text = text
    .split("\n")
    .map((line) => line.trim())
    .join("\n");
  // Remove multiple spaces
  text = text.replace(/\s+/g, " ");
  return text;
}

// Main Function
export async function POST(request: Request) {
  // Get user input and resume from the request...
  const resumeData = await request.formData();
  const jobRole = resumeData.get("jobRole");
  const jobType = resumeData.get("jobType");
  const resumeFile = resumeData.get("resumeFile");

  const { userId } = await auth();

  // Basic input validation
  if (!userId) {
    return NextResponse.json(
      {
        error: "Not authenticated",
      },
      { status: 400 }
    );
  }

  // Check subscription level
  const subscriptionLevel = await getUserSubscriptionLevel(userId);
  const userData = await prisma.userSubscription.findUnique({
    where: { userId },
  });

  const reviewCount = userData?.resumeReviewCount;
  if (!reviewCount) {
    return NextResponse.json(
      { error: "Faild to get review count!" },
      { status: 500 }
    );
  }

  if (!canReviewResume(subscriptionLevel, reviewCount)) {
    return NextResponse.json({ error: "Max Limit Reached!" }, { status: 500 });
  }

  // Declare variable to store resume content
  let resumeText = "";
  // Parse the content from resume file
  // Make sure resumeFile is File object
  if (resumeFile && resumeFile instanceof File) {
    try {
      const arrayBuffer = await resumeFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const pdfData = await pdfParse(buffer);
      resumeText = pdfData.text;
      //   console.log("Pdf Text:- ", resumeText);
    } catch (error) {
      console.log("Error parsing Pdf file,", error);
    }
  }

  // Clean resume file text
  resumeText = cleanText(resumeText);
  // Construct a prompt
  const prompt = `You are an expert career coach, professional resume reviewer, and ATS optimization specialist.
                Your task is to carefully evaluate a candidate's resume based on the job role and job type provided by the user.
                Provide a comprehensive, constructive, and role-specific review that includes:
                
                - Resume score: Rate the overall quality, readiness, and effectiveness of the resume on a scale of $0 to $1000.
                - Key strengths: Highlight the resume's standout skills, achievements, and qualities relevant to the job role.
                - Areas for improvement: Point out gaps, missing details, or sections that need enchancement for better alignment with the role.
                - Tailored suggestions: Offer actionable recommendations to optimize the resume and increase the chances of getting hired.
                - ATS compatibility: Analyze how well the resume is likely to pass through an Applicant Tracking System, and suggest changes (like keyword usage, formatting, and structure) to improve ATS-friendliness.
                - Role alignment: Access how well the resume fits the provided job role and job type (e.g, full-time, part-time, internship, contract based).
                
                Please keep the feedback detailed, clear, and constructive. Ensure the review is focused on making the resume as appealing, competitive, and ATS-friendly as possible for the specified position.`;

  try {
    // User's prompt
    const chatHistory = [];
    chatHistory.push({
      role: "user",
      parts: [
        {
          text: `My job role is ${jobRole}, job type is ${jobType},
            here is my resume: ${resumeText}. 
            `,
        },
      ],
    });

    // Ai's response
    chatHistory.push({
      role: "model",
      parts: [{ text: prompt }],
    });

    // Request completion from GEMINI
    const response = model.startChat({
      history: chatHistory,
    });

    //Get the user prompt from the chat history.
    const userPrompt = chatHistory[0].parts[0].text;
    const result = await response.sendMessage(userPrompt);

    const resultText = result.response.text();

    // increment Resume Review Count;
    try {
      await prisma.userSubscription.update({
        where: { userId },
        data: { resumeReviewCount: { decrement: 1 } },
      });
    } catch (error) {
      console.error("Prisma error:", error);
      return NextResponse.json(
        { error: "Failed to update user subscription." },
        { status: 500 }
      );
    }

    return NextResponse.json({ resultText }, { status: 200 });

    // TODO: send response back to frontend...
  } catch (error) {
    console.log("error in ai-response", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return NextResponse.json(
      { error: "Failed to get response AI" },
      { status: 500 }
    );
  }
}
