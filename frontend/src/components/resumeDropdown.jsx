import { useState } from "react";
import {
  ChevronDown,
  Layout,
  FileText,
  Box,
  File,
  BookOpen,
  Clock,
  Zap,
  CheckCircle,
} from "lucide-react";
import { ChevronRight } from "lucide-react";

export function ResumeDropdown({ onClose }) {
  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t">
    
      <div className="max-w-7xl mx-auto p-8 grid grid-cols-[1fr_1fr_1fr_1.5fr] gap-8">
        <div className="flex flex-col gap-0">
          <h3 className="flex items-center gap-2 text-Black-600 font-medium mb-6 text-left">
            <Layout className="h-5 w-5" />
            Resume Templates
            <ChevronRight className="h-4 w-4" />
          </h3>
          <div className="space-y-6 text-left">
            <div>
              <div className="flex items-center gap-2 font-medium mb-1">
                <Layout className="h-4 w-4" />
                Creative Templates
              </div>
              <p className="text-xs text-gray-600">
                Creative resume for creative industries to capture the
                recruiter's attention
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 font-medium mb-1">
                <FileText className="h-4 w-4" />
                Traditional Templates
              </div>
              <p className="text-xs text-gray-600">
                For conservative industries when you need to show your career
                accomplishments
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 font-medium mb-1">
                <File className="h-4 w-4" />
                Simple Templates
              </div>
              <p className="text-xs text-gray-600">
                Focus on your skills and accomplishments with simple resume
                templates
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-0">
          <h3 className="flex items-center gap-1 text-black-600 font-medium mb-6 text-left">
            <BookOpen className="h-5 w-5" />
            Resume Writing Guides
            <ChevronRight className="h-4 w-4" />
          </h3>
          <div className="space-y-6 text-left">
            <div>
              <div className="font-medium mb-1">Writing a Resume</div>
              <p className="text-xs text-gray-600 ">
                The most comprehensive guide on the internet about writing a
                resume
              </p>
            </div>
            <div>
              <div className="font-medium mb-1">Resume Summary</div>
              <p className="text-xs text-gray-600">
                How to include and write a summary that gets your point across
                quickly
              </p>
            </div>
            <div>
              <div className="font-medium mb-1">Fitting Experience on One Page</div>
              <p className="text-xs text-gray-600">
                The tricks behind fitting a lot of experience on a single page
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-0">
          <div>
            <h3 className="flex items-center gap-2 text-black-600 font-medium mb-4 ">
              <Layout className="h-5 w-5" />
              Resume Examples
              <ChevronRight className="h-4 w-4 text-left" />
            </h3>
            <ul className="space-y-2">
              <li>Project Manager</li>
              <li>Data Scientist</li>
              <li>Scrum Master</li>
              <li>Business Analyst</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-4 text-left">
            ATS-friendly resume builder
          </h3>
          <img
            src="resume.png"
            alt="Resume Preview"
            className="w-full h-min rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
