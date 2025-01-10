import { ChevronDown } from "lucide-react";
import { ResumeDropdown } from "./ResumeDropdown";
import { CoverLetterDropdown } from "./coverLetterDropdown"
import { useState } from "react";
import { Link } from "react-router";

export function NavBar({ toggleTheme, theme }) {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCoverLetterOpen, setIsCoverLetterOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b shadow-md transition-colors duration-300 ${
        theme === "dark" ? "bg-black-700 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2">
            <svg
              className={`h-8 w-8 ${
                theme === "dark" ? "text-white" : "text-black-500"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
            </svg>
            <span className="text-xl font-semibold">Resume Analyzer</span>
          </a>
          <div className="hidden md:flex items-center gap-6">
            <button
              className="flex items-center gap-2 hover:text-gray-900"
              onClick={() => setIsResumeOpen(!isResumeOpen)}
              onMouseEnter={() => setIsResumeOpen(true)}
              
              
            >
              Resume
              <ChevronDown className="h-4 w-4" />
            </button>
            <button
              className="flex items-center gap-2 hover:text-gray-900"
              onClick={() => setIsCoverLetterOpen(!isCoverLetterOpen)}
              onMouseEnter={() => setIsCoverLetterOpen(true)}
            >
              Cover Letter
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M12 3v1m0 16v1m7.07-13.07l-.707.707M4.93 4.93l-.707.707m16.97 9.869a9 9 0 1 0-16.94 0 9 9 0 0 0 16.94 0z" />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z" />
              </svg>
            )}
          </button>
          <button className="hover:text-gray-900">
            <Link to="/login">Log In</Link>
          </button>
          <button className="bg-black-600 text-white px-4 py-2 rounded-lg hover:bg-black-500">
            <Link to="/signup">Sign Up</Link>
          </button>
        </div>
        
      </div>
      <div
          className={`absolute top-full left-0 w-full bg-white shadow-lg border-t transform transition-all duration-300 ${
            isResumeOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4"
          }`}
          onMouseLeave={() => setIsResumeOpen(false)}
        >
          {isResumeOpen && (
            <ResumeDropdown
              onClose={() => setIsResumeOpen(false)}
              theme={theme}
            />
          )}
        </div>

      {/* Cover Letter Dropdown */}
      <div
        className={`absolute top-full left-0 w-full bg-white shadow-lg border-t transform transition-all duration-300 ${
          isCoverLetterOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
        onMouseLeave={() => setIsCoverLetterOpen(false)}
      >
        {isCoverLetterOpen && (
          <CoverLetterDropdown
            onClose={() => setIsCoverLetterOpen(false)}
            theme={theme}
          />
        )}
      </div>
    </nav>
  );
}
