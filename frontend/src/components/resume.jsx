import React, { useState, useEffect } from "react";
import { Lock, Loader2, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { cn } from "../lib/utils";
import { useTheme } from "./theme";
import { useNavigate } from "react-router-dom";
import { NavBar } from "./nav-bar";
import { useFileContext } from "@/File Provider/FileProvider";

export function ResumeChecker() {
  const { theme, toggleTheme } = useTheme();
  const { file, resumeContent, handleFileUpload, resetFile } = useFileContext();
  const [isDragging, setIsDragging] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [isEvaluateButtonDisabled, setIsEvaluateButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileUpload({ target: { files: [droppedFile] } });
    }
  };

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleEvaluateClick = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/feedback", {
        state: { resumeContent, jobDescription, fileType: file.type, fileName: file.name },
      });
    } catch (error) {
      console.error("Error evaluating resume:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsEvaluateButtonDisabled(!(file && jobDescription.trim()));
  }, [file, jobDescription]);

  return (
    <div
      className={cn(
        "w-screen min-h-screen transition-colors",
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-emerald-50/80 to-purple-50/80"
      )}
    >
      <NavBar toggleTheme={toggleTheme} theme={theme} />
      <div className="flex flex-col items-center justify-center min-h-screen p-4 pt-20">
        <div className="w-full max-w-3xl text-center mb-8">
          <div className="space-y-4">
            <div className="text-blue-400 font-medium pt-2">RESUME CHECKER</div>
            <h1
              className={`text-4xl md:text-5xl font-bold ${
                theme === "light" ? "text-gray-900" : "text-white"
              }`}
            >
              Is your resume good enough?
            </h1>
            <div className="inline-flex items-center gap-2 text-sm text-gray-600 mb-2">
              <span>Home</span>
              <span className="text-gray-400">&nbsp;&gt;&nbsp;</span>
              <span className="text-blue-400">Resume Checker</span>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A free and fast AI resume checker doing 16 crucial checks to
              ensure your resume is ready to perform and get you interview
              callbacks.
            </p>
          </div>
        </div>

        <Card
          className={cn(
            "w-full max-w-2xl mx-auto rounded-lg border-2 border-dashed transition-colors",
            isDragging ? "border-emerald-500 bg-emerald-50" : "border-gray-300",
            theme === "dark" ? "bg-gray-800 border-white" : ""
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            {!file ? (
              <>
                <p className="text-lg font-medium mb-2">
                  Drop your resume here or choose a file.
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  PDF & DOCX only. Max 2MB file size.
                </p>
                <Button
                  variant="default"
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                  className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Upload Your Resume
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx"
                  onChange={handleFileUpload}
                />
                <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                  <Lock className="h-4 w-4" />
                  <span>Privacy guaranteed</span>
                </div>
              </>
            ) : (
              <div className="w-full flex flex-col items-center text-center">
                <p className="text-lg font-medium mb-2">File Uploaded:</p>
                <div
                  className={`flex flex-row items-center gap-2 p-4 rounded-lg shadow-sm 
                ${theme === "dark" ? "bg-gray-700" : "bg-neutral-200"}`}
                >
                  <div className="flex items-center gap-2">
                    {file.type === "application/pdf" && (
                      <FileText
                        className={`h-10 w-10 ${
                          theme === "dark" ? "text-blue-400" : "text-gray-700"
                        }`}
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-ellipsis overflow-hidden max-w-[300px] whitespace-nowrap">
                      {file.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant="secondary"
                    onClick={() => setFile(null)}
                    className="bg-gray-300 text-gray-700 hover:text-gray-600 w-32 h-12 px-4 py-2"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      window.open(URL.createObjectURL(file), "_blank")
                    }
                    className="bg-gray-900 text-white hover:bg-gray-800 w-32 h-12 px-4 py-2"
                  >
                    Open
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="w-full max-w-2xl mt-8">
          <textarea
            placeholder="Enter job description here"
            value={jobDescription}
            onChange={handleJobDescriptionChange}
            className={`w-full h-28 p-4 border rounded-lg border-gray-300 ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "text-gray-600 bg-white"
            }`}
          />
        </div>

        <div className="w-full max-w-2xl mt-4">
          <Button
            variant="default"
            onClick={handleEvaluateClick}
            disabled={isEvaluateButtonDisabled || isLoading}
            className="w-full py-2 px-6 rounded-lg bg-gray-900 border border-purple-600 text-white hover:bg-gray-800 transition-colors"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Evaluating...
              </>
            ) : (
              "Evaluate"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
