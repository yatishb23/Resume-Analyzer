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
import ChatPage from "./ChatPage";
import FileUpload from "./fileUpload";
import NewPropt from "./NewPropt";
import ATS from "./ATS";

export default function Feedback() {
  
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  

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
      <div className="h-full w-full pt-20 pb-6 pl-8 pr-8">
        <div className="grid grid-cols-1 lg:grid-cols-[400px,1fr] gap-4 max-w-full">
          {/* Left Panel */}
          <ATS/>
          <ChatBotCard />
          {/* <FileUpload/> */}
          {/* <NewPropt/> */}
        </div>
      </div>
    </div>
  );
  
}
