import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { NavBar } from './nav-bar';

export function ResumeChecker() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isEvaluateButtonDisabled, setIsEvaluateButtonDisabled] = useState(true);
  const [theme, setTheme] = useState('light'); 

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
    const uploadedFile = e.dataTransfer.files[0];
    if (
      uploadedFile &&
      (uploadedFile.type === 'application/pdf' ||
        uploadedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    ) {
      setFile(uploadedFile);
    }
  };

  const handleJobDescriptionChange = (e) => {
    const description = e.target.value;
    setJobDescription(description);
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleEvaluateClick = () => {
    console.log('Evaluating resume with job description:', jobDescription);
  };

  const checkIfButtonShouldBeEnabled = () => {
    if (file && jobDescription.trim()) {
      setIsEvaluateButtonDisabled(false);
    } else {
      setIsEvaluateButtonDisabled(true);
    }
  };

  React.useEffect(() => {
    checkIfButtonShouldBeEnabled();
  }, [file, jobDescription]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark' : 'light';
  }, [theme]);

  return (
    <div
      className={cn(
        'w-screen min-h-screen transition-colors',
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gradient-to-br from-emerald-50/80 to-purple-50/80'
      )}
    >
      <NavBar toggleTheme={toggleTheme} theme={theme} />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 pt-20">
        <div className="w-full max-w-3xl text-center mb-8">
          <div className="space-y-4">
            <div className="text-blue-400 font-medium pt-2">RESUME CHECKER</div>
            <h1 className={`text-4xl md:text-5xl font-bold ${theme==="light" ?"text-gray-900" :"text-white"}`}>
              Is your resume good enough?
            </h1>
            <div className="inline-flex items-center gap-2 text-sm text-gray-600 mb-2">
              <span>Home</span>
              <span className="text-gray-400">&nbsp;&gt;&nbsp;</span>
              <span className="text-blue-400">Resume Checker</span>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A free and fast AI resume checker doing 16 crucial checks to ensure your resume is ready to perform and get you interview callbacks.
            </p>
          </div>
        </div>

        <Card
          className={cn(
            'w-full max-w-2xl mx-auto rounded-lg border-2 border-dashed transition-colors',
            isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <p className="text-lg font-medium mb-2">Drop your resume here or choose a file.</p>
            <p className="text-sm text-gray-500 mb-4">PDF & DOCX only. Max 2MB file size.</p>
            <Button
              variant="primary"
              onClick={() => document.getElementById('file-upload')?.click()}
              className="bg-black-600 text-white px-6 py-2 rounded-lg hover:bg-black-500 transition-colors"
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
          </CardContent>
        </Card>

        <div className="w-full max-w-2xl mt-8">
          <textarea
            placeholder="Enter job description here"
            value={jobDescription}
            onChange={handleJobDescriptionChange}
            className={`w-full h-28 p-4 border rounded-lg border-gray-300 ${ 
              theme==="dark" ? " bg-black-600 text-white": "text-gray-600 bg-white"}`}
          />
        </div>

        <div className="w-full max-w-2xl mt-4">
          <Button
            variant="primary"
            onClick={handleEvaluateClick}
            disabled={isEvaluateButtonDisabled}
            className="w-full py-2 px-6 rounded-lg bg-black-600 text-white hover:bg-black-500 transition-colors"
          >
            Evaluate
          </Button>
        </div>

      </div>
    </div>
  );
}
