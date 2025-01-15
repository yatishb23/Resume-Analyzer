import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { ChevronDown, ChevronUp, Lock, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "./theme";

function ATS({ score ,issues}) {
  const [expandedSections, setExpandedSections] = useState(["CONTENT"]);
  const { theme } = useTheme();

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
    // ... other sections
  ];

  const toggleSection = (sectionName) => {
    setExpandedSections((prev) =>
      prev.includes(sectionName)
        ? prev.filter((name) => name !== sectionName)
        : [...prev, sectionName]
    );
  };

  return (
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
          <div className="text-4xl font-bold text-orange-400 mt-2">{score}/100</div>
          <div className="text-gray-500 dark:text-gray-400 mt-1">{issues} Issues</div>
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
              {/* Section items */}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default ATS;
