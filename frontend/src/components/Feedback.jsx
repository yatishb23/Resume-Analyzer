"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Check, X, Lock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useTheme } from "./theme";
import { NavBar } from "./nav-bar";
import ChatBotCard from "./BotCard";

export default function Feedback() {
  const [expandedSections, setExpandedSections] = useState(["CONTENT"]);
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const sections = [
    {
      name: "CONTENT",
      score: 50,
      items: [
        { name: "ATS Parse Rate", status: "success" },
        { name: "Quantifying Impact", status: "locked" },
        { name: "Repetition", status: "error" },
        { name: "Spelling & Grammar", status: "locked" },
      ],
    },
    {
      name: "FORMAT",
      score: 67,
      items: [],
    },
    {
      name: "SECTIONS",
      score: 33,
      items: [],
    },
    {
      name: "SKILLS",
      score: 100,
      items: [],
    },
    {
      name: "STYLE",
      score: 75,
      items: [],
    },
  ];

  const toggleSection = (sectionName) => {
    setExpandedSections((prev) =>
      prev.includes(sectionName)
        ? prev.filter((name) => name !== sectionName)
        : [...prev, sectionName]
    );
  };

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the time to your preference (2 seconds)

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 animate-spin text-gray-600 dark:text-gray-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
        </svg>
      </div>
    );
  }
  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-black-600 overflow-x-hidden">
      <NavBar toggleTheme={toggleTheme} theme={theme} />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[400px,1fr] gap-4 justify-center">
          {/* Left Panel */}
          <Card
            className={` max-h-[670px] overflow-y-auto scrollbar-hidden ${
              theme === "dark" ? "bg-black-700 border border-purple-300" : ""
            }`}
          >
            <CardContent className="p-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                  Your Score
                </h2>
                <div className="text-4xl font-bold text-orange-400 mt-2">
                  65/100
                </div>
                <div className="text-gray-500 dark:text-gray-400 mt-1">
                  11 Issues
                </div>
              </div>

              <div className="space-y-2">
                {sections.map((section) => (
                  <div
                    key={section.name}
                    className="border dark:border-gray-700 rounded-lg"
                  >
                    <button
                      onClick={() => toggleSection(section.name)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {section.name}
                        </span>
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded text-sm",
                            section.score >= 80
                              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                              : section.score >= 60
                              ? "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
                              : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                          )}
                        >
                          {section.score}%
                        </span>
                      </div>
                      {expandedSections.includes(section.name) ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>

                    {expandedSections.includes(section.name) &&
                      section.items.length > 0 && (
                        <div className="px-4 pb-4">
                          {section.items.map((item) => (
                            <div
                              key={item.name}
                              className="flex items-center gap-3 py-2"
                            >
                              {item.status === "success" && (
                                <Check className="h-4 w-4 text-green-500" />
                              )}
                              {item.status === "error" && (
                                <X className="h-4 w-4 text-red-500" />
                              )}
                              {item.status === "locked" && (
                                <Lock className="h-4 w-4 text-gray-400" />
                              )}
                              <span className="text-gray-600 dark:text-gray-400">
                                {item.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <ChatBotCard />
          {/* Right Panel */}
          {/* <Card className={` ${ theme==='dark' ? "bg-black-700 border border-purple-300":""}`}>
            <CardHeader className="flex flex-row items-center justify-between p-6">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
                  <div className="h-6 w-6 text-purple-600 dark:text-purple-400">
                    📄
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  CONTENT
                </h2>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 px-4 py-1 rounded-full text-sm text-gray-600 dark:text-gray-300">
                5 ISSUES FOUND
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-200">
                    <span className="text-purple-600 dark:text-purple-400">
                      ⚡
                    </span>
                    ATS PARSE RATE
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    An{" "}
                    <span className="font-medium">
                      Applicant Tracking System
                    </span>{" "}
                    commonly referred to as{" "}
                    <span className="font-medium">ATS</span> is a system used by
                    employers and recruiters to quickly scan a large number of
                    job applications.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    A high parse rate of your resume ensures that the ATS can
                    read your resume, experience, and skills. This increases the
                    chance of getting your resume seen by recruiters.
                  </p>

                  <div className="space-y-4">
                    <Progress value={87} className="h-2" />
                    <div className="text-center">
                      <h4 className="font-semibold text-xl mb-2 text-gray-800 dark:text-gray-200">
                        Great!
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        We parsed 87% of your resume successfully using an
                        industry-leading ATS.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900 rounded-xl p-8 text-center">
                  <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-4">
                    Job-Winning Resume In Minutes
                  </h3>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6">
                    Create an Enhancy Resume
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  );
}
