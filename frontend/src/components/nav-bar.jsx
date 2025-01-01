import { ChevronDown } from 'lucide-react';
import { ResumeDropdown } from './ResumeDropdown';
import { useState } from 'react';

export function NavBar() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-md">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2">
            <svg
              className="h-8 w-8 text-black-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
            </svg>
            <span className="text-xl font-semibold text-black-500">Resume Analyzer</span>
          </a>
          <div className="hidden md:flex items-center gap-6">
            <button
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsResumeOpen(!isResumeOpen)}
              onMouseEnter={() => setIsResumeOpen(true)}
              onMouseLeave={() => setIsResumeOpen(false)}
            >
              Resume
              <ChevronDown className="h-4 w-4" />
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              Cover Letter
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-600 hover:text-gray-900">Sign in</button>
          <button className="bg-black-600 text-white px-4 py-2 rounded-lg hover:bg-black-500">
            Get Started
          </button>
        </div>
      </div>

      <div
        className={`absolute top-full left-0 w-full bg-white shadow-lg border-t transform transition-all duration-300 ${
          isResumeOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
        onMouseEnter={() => setIsResumeOpen(true)}
        onMouseLeave={() => setIsResumeOpen(false)}
      >
        {isResumeOpen && <ResumeDropdown onClose={() => setIsResumeOpen(false)} />}
      </div>
    </nav>
  );
}
