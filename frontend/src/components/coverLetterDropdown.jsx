import { ChevronDown, Layout, FileText, Box, File, BookOpen, Clock, Zap, CheckCircle, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export function CoverLetterDropdown({ onClose, theme }) {
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
            Cover Letter Templates
            <ChevronRight className="h-4 w-4" />
          </h3>
          <div className="space-y-6 text-left">
            <div>
              <a href="https://resumegenius.com/cover-letter-templates/modern-templates" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-medium mb-1 hover:underline">
                <Layout className="h-4 w-4" />
                Modern Templates
              </a>
              <p className="text-xs text-gray-600">
                Contemporary designs perfect for tech, creative, and startup roles
              </p>
            </div>
            <div>
              <a href="https://create.microsoft.com/en-us/templates/cover-letters" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-medium mb-1 hover:underline">
                <FileText className="h-4 w-4" />
                Professional Templates
              </a>
              <p className="text-xs text-gray-600">
                Classic formats ideal for corporate, legal, and executive positions
              </p>
            </div>
            <div>
              <a href="https://resumegenius.com/cover-letter-examples/academic-cover-letter-sample" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-medium mb-1 hover:underline">
                <File className="h-4 w-4" />
                Academic Templates
              </a>
              <p className="text-xs text-gray-600">
                Structured formats for academic and research positions
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-0">
          <h3 className={`flex items-center gap-2 font-medium mb-6 text-left text-black-600 ${
            theme==="dark" ? "text-white": "text-black-600"
          }`}>
            <BookOpen className="h-5 w-5" />
            Writing Guides
            <ChevronRight className="h-4 w-4" />
          </h3>
          <div className="space-y-6 text-left">
            <div>
              <Link to="/cover-letter-writing" className="font-medium mb-1 hover:underline">
                Writing a Cover Letter
              </Link>
              <p className="text-xs text-gray-600">
                Step-by-step guide to crafting a compelling cover letter
              </p>
            </div>
            <div>
              <div className="font-medium mb-1">Opening Paragraphs</div>
              <p className="text-xs text-gray-600">
                How to write attention-grabbing introductions that showcase your value
              </p>
            </div>
            <div>
              <div className="font-medium mb-1">Addressing Requirements</div>
              <p className="text-xs text-gray-600">
                Techniques for matching your skills to job requirements effectively
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
              Industry Examples
              <ChevronRight className="h-4 w-4 text-left" />
            </h3>
            <ul className="space-y-2">
              <li>Software Engineer</li>
              <li>Marketing Manager</li>
              <li>Research Assistant</li>
              <li>Product Manager</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6">
          <img
            src="cover-letter.png"
            alt="Cover Letter Preview"
            className="w-full h-min rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}