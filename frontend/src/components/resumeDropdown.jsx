import { ChevronDown, Layout, FileText, Box, File, BookOpen, Clock, Zap, CheckCircle } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export function ResumeDropdown({ onClose, theme }) {
  return (
    <div
      className={`absolute top-full left-0 w-full shadow-lg border-t transform transition-all duration-300 ${
        theme === "dark" ? "bg-black-600 text-white" : "bg-white text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto p-8 grid grid-cols-[1fr_1fr_1fr_1.5fr] gap-8">
        <div className="flex flex-col gap-0">
          <h3 className={`flex items-center gap-2 font-medium mb-6 text-left text-black-600 ${
            theme==="dark" ? "text-white": "text-black-600"
          }`}>
            <Layout className="h-5 w-5" />
            Resume Templates
            <ChevronRight className="h-4 w-4" />
          </h3>
          <div className="space-y-6 text-left">
            <div>
	      <a href="https://www.overleaf.com/latex/templates/tagged/cv" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-medium mb-1 hover:underline">
                <Layout className="h-4 w-4" />
                Creative Templates
              </a>
              <p className="text-xs text-gray-600">
                Creative resume for creative industries to capture the recruiter's attention
              </p>
            </div>
            <div>
            <a href="https://enhancv.com/resume-templates/traditional/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-medium mb-1 hover:underline">
                <FileText className="h-4 w-4" />
                Traditional Templates
              </a>
              <p className="text-xs text-gray-600">
                For conservative industries when you need to show your career accomplishments
              </p>
            </div>
            <div>
            <a href="https://resumegenius.com/resume-templates/basic-templates" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-medium mb-1 hover:underline" >
                <File className="h-4 w-4" />
                Simple Templates
              </a>
              <p className="text-xs text-gray-600">
                Focus on your skills and accomplishments with simple resume templates
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-0">
          <h3 className={`flex items-center gap-2 font-medium mb-6 text-left text-black-600 ${
            theme==="dark" ? "text-white": "text-black-600"
          }`}>
            <BookOpen className="h-5 w-5" />
            Resume Writing Guides
            <ChevronRight className="h-4 w-4" />
          </h3>
          <div className="space-y-6 text-left">
            <div>
            <Link to="/writing" className="font-medium mb-1 hover:underline">
              Writing a Resume
            </Link>

              <p className="text-xs text-gray-600 ">
                The most comprehensive guide on the internet about writing a resume
              </p>
            </div>
            <div>
              <Link to="/summary" className="font-medium mb-1 hover:underline">
                Resume Summary
              </Link>
              <p className="text-xs text-gray-600">
                How to include and write a summary that gets your point across quickly
              </p>
            </div>
            <div>
              <Link to="/fitting" className="font-medium mb-1 hover:underline">
                Fitting Experience on One Page
              </Link>
              <p className="text-xs text-gray-600">
                The tricks behind fitting a lot of experience on a single page
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-0">
          <div>
            <h3 className={`flex items-center gap-2 font-medium mb-6 text-left text-black-600 ${
            theme==="dark" ? "text-white": "text-black-600"
          }`}>
              <Layout className="h-5 w-5" />
              Resume Examples
              <ChevronRight className="h-4 w-4 text-left" />
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/examples" className="hover:underline text-primary">
                  Project Manager
                </Link>
              </li>
              <li>
                <Link to="/examples" className="hover:underline text-primary">
                  Data Scientist
                </Link>
              </li>
              <li>
                <Link to="/examples" className="hover:underline text-primary">
                  Software Engineer
                </Link>
              </li>
              <li>
                <Link to="/examples" className="hover:underline text-primary">
                  Business Analyst
                </Link>  
              </li>
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
