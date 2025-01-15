import React, {useState, useContext, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { useFileContext } from "@/File Provider/FileProvider";
import { Button } from "./ui/button";
import { FileText } from "lucide-react";
import chat from "@/lib/gemini";

export function ViewUploadedFile() {
  const { file, resumeContent } = useFileContext();
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    if (!file) {
      setError("No file uploaded");
      return;
    }

    const formData = new FormData();
    formData.append("document", file);

    setIsLoading(true);
    const reader = new FileReader();
      reader.onloadend = async () => {
        const pdfData = reader.result.split(",")[1];
        try {
          const result = await chat.sendMessageStream([
            {
              inlineData: {
                data: pdfData,
                mimeType: "application/pdf",
              },
            },
            "Evaluate the provided resume based on its Applicant Tracking System (ATS) compatibility.Assign a score from 0 to 100, reflecting the effectiveness of the resume in meeting ATS criteria such as keyword optimization, formatting, and overall structure.Provide only the numerical score, without any additional comments or explanations.",
          ]);
          let accumulatedText = "";
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            console.log("Received chunk:", chunkText);
            accumulatedText += chunkText;

            setSummary(accumulatedText);
          }
          setSummary(accumulatedText);
        } catch (error) {
          console.error("Error summarizing PDF:", error);
          setSummary("Failed to generate summary.");
        } finally {
          setIsLoading(false);
        }
      };
      reader.readAsDataURL(file);

    setIsLoading(false);
  };
  if (!file) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-700">No File Uploaded</h1>
        <p className="text-gray-500 mt-2">Please upload a file on the main page.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">Uploaded File Details</h1>
      <Card className="w-full max-w-lg border border-gray-300 rounded-lg shadow-md">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            {file.type === "application/pdf" && (
              <FileText className="h-10 w-10 text-blue-500" />
            )}
          </div>
          <p className="text-lg font-medium mb-2">File Name: {file.name}</p>
          <p className="text-sm text-gray-500 mb-4">
            File Size: {(file.size / 1024).toFixed(2)} KB
          </p>
          <div className="flex justify-center gap-4">
            <Button
              variant="default"
              onClick={() => window.open(URL.createObjectURL(file), "_blank")}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Open File
            </Button>
            {resumeContent && (
              <Button
                variant="secondary"
                onClick={() => navigator.clipboard.writeText(resumeContent)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Copy Content
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Summarize Uploaded File</h1>
      <button
        onClick={handleSummarize}
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        {isLoading ? "Summarizing..." : "Summarize"}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {summary && (
        <div className="mt-6 p-4 bg-gray-100 border rounded-lg max-w-2xl">
          <h2 className="font-bold mb-2">Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
    </div>
  );
}

export default ViewUploadedFile;
