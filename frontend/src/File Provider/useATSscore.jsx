import { useState, useEffect } from "react";
import model from "@/lib/Summarize";

export function useATSScore(file) {
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!file) return;

    const fetchScore = async () => {
      setLoading(true);
      setError(null);

      const reader = new FileReader();
      reader.onloadend = async () => {
        const pdfData = reader.result.split(",")[1];
        try {
          const result = await model.generateContent([
            {
              inlineData: {
                data: pdfData,
                mimeType: "application/pdf",
              },
            },
            "Evaluate the provided resume based on its Applicant Tracking System (ATS) compatibility. Assign a score from 0 to 100, reflecting the effectiveness of the resume in meeting ATS criteria such as keyword optimization, formatting, and overall structure. Provide only the numerical score, without any additional comments or explanations.",
          ]);
          setScore(result.response.text());
        } catch (err) {
          console.error("Error fetching ATS score:", err);
          setError("Failed to evaluate the resume.");
        } finally {
          setLoading(false);
        }
      };

      reader.onerror = () => {
        setError("Failed to read the file.");
        setLoading(false);
      };

      reader.readAsDataURL(file);
    };

    fetchScore();
  }, [file]);

  return { score, loading, error };
}
