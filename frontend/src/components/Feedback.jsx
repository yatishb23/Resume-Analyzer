import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { useTheme } from "./theme";
import { cn } from "../lib/utils";
import { useNavigate, useLocation } from 'react-router-dom';
import { NavBar } from './nav-bar';

export function Feedback() {
  const { theme ,toggleTheme} = useTheme();
  const [feedback, setFeedback] = useState('');
  const [showPdfEditor, setShowPdfEditor] = useState(true); 
  const navigate = useNavigate();
  const location = useLocation();
  const { resumeContent, jobDescription, fileType, fileName } = location.state || {};

  useEffect(() => {
    // Simulate API call to get feedback (replace with actual API call)
    const getFeedback = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFeedback("Your resume lacks specific achievements and metrics. Consider adding quantifiable results to showcase your impact. Also, tailor your skills section to match the job description more closely.");
    };

    if (resumeContent && jobDescription) {
      getFeedback();
    } else {
      setFeedback("Error: Resume content or job description is missing.");
    }
  }, [resumeContent, jobDescription]);

  const renderResumeContent = () => {
    if (!showPdfEditor) {
      return (
        <div className="flex items-center justify-center h-[60vh] bg-gray-100 rounded-lg shadow-lg">
          <p className="text-gray-600">PDF editor is hidden.</p>
        </div>
      );
    }
  
    if (fileType === 'application/pdf') {
      return (
        <iframe
          src={resumeContent} 
          title="Resume PDF"
          className="w-full h-[90vh] border-0 rounded-lg shadow-lg" 
        />
      );
    } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      // Use Google Docs Viewer to render DOC file
      const googleDocsUrl = `https://docs.google.com/gview?url=${resumeContent}&embedded=true`;
      return (
        <iframe
          src={googleDocsUrl}
          title="Resume DOC"
          className="w-full h-[90vh] border-0 rounded-lg shadow-lg" // Adjusted height to show full DOC file
        />
      );
    } else {
      return (
        <div className="flex items-center justify-center h-[60vh] bg-gray-100 rounded-lg shadow-lg">
          <p className="text-gray-600">
            Unsupported file type. Please upload a PDF or DOC file.
          </p>
        </div>
      );
    }
  };
  

  return (
    <div className={cn(
      "w-screen min-h-screen transition-colors",
      theme === "dark" ? "bg-gray-900 text-white" : "bg-gradient-to-br from-emerald-50/80 to-purple-50/80"
    )}>
    <NavBar toggleTheme={toggleTheme} theme={theme} />
      <div className="flex flex-col items-center justify-center min-h-screen p-4 pt-20">
        <Card className="w-full max-w-6xl mx-auto">
          <CardContent className="p-6">
            <h1 className={`text-2xl font-bold mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              Resume Feedback
            </h1>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h2 className={`text-xl font-semibold mb-2 ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}>
                  AI Feedback
                </h2>
                <p className={`mb-4 ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
                  {feedback || 'Loading feedback...'}
                </p>
                <h3 className={`text-lg font-semibold mb-2 ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}>
                  Job Description
                </h3>
                <p className={`mb-4 ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
                  {jobDescription || "No job description available."}
                </p>
              </div>
              <div>
                <h2 className={`text-xl font-semibold mb-2 ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}>
                  Your Resume
                </h2>
                <div className={`p-4 rounded-lg ${theme === "light" ? "bg-gray-100" : "bg-gray-800"}`}>
                  {renderResumeContent()}
                </div>
              </div>
            </div>
            <Button
              onClick={() => navigate('/')}
              className="mt-6 bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Back to Resume Checker
            </Button>
            <Button
              onClick={() => setShowPdfEditor(!showPdfEditor)} 
              className="mt-2 bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              {showPdfEditor ? 'Hide PDF Editor' : 'Show PDF Editor'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}