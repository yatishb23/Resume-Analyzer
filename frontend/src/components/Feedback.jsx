"use client";

import { useState, useEffect } from "react";
import { NavBar } from "./nav-bar";
import { useTheme } from "./theme";
import ATS from "./ATS";
import { useFileContext } from "@/File Provider/FileProvider";
import model from "@/lib/Summarize";
import { useLocation } from "react-router-dom";

export default function Feedback() {
  const { theme, toggleTheme } = useTheme();
  const { file } = useFileContext();
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(null);
  const [issues, setIssues] = useState(null);
  const [error, setError] = useState("");
  const location = useLocation();
  const { jobDescription} = location.state || {};

  // Function to analyze resume using the model
  const analyzeResume = async (pdfData) => {
    try {
      const scoreResult = await model.generateContent([
        {
          inlineData: { data: pdfData, mimeType: "application/pdf" },
        },
        "Evaluate the provided resume based on its Applicant Tracking System (ATS) compatibility. Assign a score from 0 to 100, reflecting the effectiveness of the resume in meeting ATS criteria such as keyword optimization, formatting, and overall structure. Provide only the numerical score, without any additional comments or explanations.",
      ]);
      setScore(scoreResult.response.text());

      const issuesResult = await model.generateContent([
        {
          inlineData: { data: pdfData, mimeType: "application/pdf" },
        },
        "Analyze the provided resume and count the total number of issues identified. Issues may include formatting errors, grammatical mistakes, inconsistent information, lack of relevant experience, and any other discrepancies that may affect the quality of the resume. Provide only the total count of issues found, without any additional commentary or explanations.",
      ]);
      setIssues(issuesResult.response.text());
    } catch (err) {
      setError("Error analyzing the resume. Please try again.");
      console.error("Error fetching ATS data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const pdfData = reader.result.split(",")[1];
        analyzeResume(pdfData);
      };
      reader.readAsDataURL(file);
    } 

      const timer = setTimeout(() => {
        setLoading(false);
      }, 5000); 
  
      return () => clearTimeout(timer);
  }, [file]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
        <div role="status" className="flex flex-col items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 animate-spin text-gray-600 dark:text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-label="Loading"
          >
            <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
          </svg>
          <p className="text-gray-700 dark:text-gray-400">Analyzing your resume...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-center">
        <p className="text-lg text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
      <NavBar toggleTheme={toggleTheme} theme={theme} />
      <div className="h-full w-full pt-20 pb-6 px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[400px,1fr] gap-4 max-w-full">
          <ATS score={score} issues={issues} />
        </div>
        <div>
          {jobDescription}
        </div>
      </div>
    </div>
  );
}
