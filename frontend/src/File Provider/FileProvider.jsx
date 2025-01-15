import React, { createContext, useState, useContext } from "react";

// Create File Context
const FileContext = createContext();

// File Provider Component
export const FileProvider = ({ children }) => {
  const [file, setFile] = useState(null);
  const [resumeContent, setResumeContent] = useState("");

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();

      if (selectedFile.type === "application/pdf") {
        reader.onload = (event) => {
          const content = event.target?.result;
          setResumeContent(content);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        reader.onload = (event) => {
          const content = event.target?.result;
          setResumeContent(content);
        };
        reader.readAsText(selectedFile);
      }
    }
  };

  const resetFile = () => {
    setFile(null);
    setResumeContent("");
  };

  return (
    <FileContext.Provider
      value={{ file, resumeContent, handleFileUpload, resetFile }}
    >
      {children}
    </FileContext.Provider>
  );
};

// Custom Hook to Use File Context
export const useFileContext = () => {
  return useContext(FileContext);
};
