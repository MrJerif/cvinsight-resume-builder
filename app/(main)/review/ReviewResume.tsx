"use client";

import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ReviewResume() {
  // Take user input
  const [jobRole, setJobRole] = useState("");
  const [jobType, setJobType] = useState("");
  const [resumeFile, setResumeFile] = useState<File | undefined>(undefined);

  // Ai response
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { toast } = useToast();

  // function to send resume for review
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!resumeFile || !jobRole || jobType) {
      toast({
        title: "Oops! Something's Missing!",
        description:
          "Looks like some fields are empty. Please complete all fields to continue.",
      });
      // alert("Please provide a valid resume file");
      return;
    }

    // Create FormData and send all information to api
    const resumeData = new FormData();
    resumeData.append("jobRole", jobRole);
    resumeData.append("jobType", jobType);
    resumeData.append("resumeFile", resumeFile);

    try {
      setIsLoading(true);
      setHasError(false);
      const response = await axios.post("/api/ai-response", resumeData);

      setAiResponse(response.data.resultText);
      setJobRole("");
      setJobType("");
      setResumeFile(undefined);
    } catch (error) {
      console.log("Error sending resume for review.", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3  m-auto justify-center md:max-w-[40vw] max-w-[60vw] md:mt-20 mt-14">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent shadow">
            Get an AI-Powered Resume Review
          </h1>
          <p className="text-muted-foreground">
            Get personalized feedback on your resume, tailored suggestions, and
            an estimated value for your job application.
          </p>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => handleFormSubmit(e)}
        >
          <div>
            <label htmlFor="jobRole" className="block text-lg font-medium">
              Job Role
            </label>
            <Input
              type="text"
              placeholder="Provide a job role that you are applying for"
              id="jobRole"
              className="mt-1"
              onChange={(e) => setJobRole(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="jobType" className="block text-lg font-medium">
              Job Type
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select job type" id="jobType" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="full-time"
                  onClick={() => setJobType("full-time")}
                >
                  Full Time
                </SelectItem>
                <SelectItem
                  value="part-time"
                  onClick={() => setJobType("part-time")}
                >
                  Part Time
                </SelectItem>
                <SelectItem
                  value="internship"
                  onClick={() => setJobType("internship")}
                >
                  Internship
                </SelectItem>
                <SelectItem
                  value="contract"
                  onClick={() => setJobType("contract")}
                >
                  Contract
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="resumeFile" className="block text-lg font-medium">
              Upload Resume
            </label>
            <Input
              type="file"
              id="resumeFile"
              className="mt-1"
              accept=".pdf"
              onChange={(e) => setResumeFile(e.target.files?.[0])}
            />
          </div>

          <Button
            className="m-auto text-lg py-2 rounded-xl"
            variant="premium"
            type="submit"
            disabled={isLoading}
          >
            Get My Resume Review
          </Button>
        </form>

        <Button variant="secondary" asChild className="m-auto text-lg py-2" disabled={isLoading}>
          <Link href="/resumes">Back</Link>
        </Button>
      </div>

      <div>
        {isLoading && (
          <div>
            <Loading />
          </div>
        )}
        {hasError && (
          <div className="m-auto p-2">
            Something went wrong.. Pleas try again
          </div>
        )}

        {aiResponse && <ShowResponse response={aiResponse} />}
      </div>
    </>
  );
}

interface ShowResponseProps {
  response: string;
}

// Component to show Ai response
function ShowResponse({ response }: ShowResponseProps) {
  const sections = response.split("**").map((section, index) => (
    <div key={index} className="mb-4">
      {section.startsWith(" ") ? (
        <p className="">{section.trim()}</p>
      ) : (
        <h2 className="text-xl font-bold text-orange-400 mt-4">{section}</h2>
      )}
    </div>
  ));

  return (
    <div className="p-2 rounded-xl max-w-[90vw] m-auto mt-4">{sections}</div>
  );
}
