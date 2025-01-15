import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { useFileContext } from "@/File Provider/FileProvider";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
const fileManager = new GoogleAIFileManager(import.meta.env.VITE_API_KEY);
const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

const { file, resumeContent } = useFileContext();

const reader = new FileReader();
let result=null;
reader.onloadend = async () => {
  const pdfData = reader.result.split(",")[1];
  try {
    result = await model.generateContent([
      {
        inlineData: {
          data: pdfData,
          mimeType: "application/pdf",
        },
      },
      "Evaluate the provided resume based on its Applicant Tracking System (ATS) compatibility.Assign a score from 0 to 100, reflecting the effectiveness of the resume in meeting ATS criteria such as keyword optimization, formatting, and overall structure.Provide only the numerical score, without any additional comments or explanations.",
    ]);
  } catch (error) {
    console.error("Error summarizing PDF:", error);
  }
};
reader.readAsDataURL(file);

export default result.response.text();