import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Scissors, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Maximize2,
  MinusCircle,
  Layout,
  Type,
  ArrowLeftRight
} from "lucide-react";
import { NavBar } from "@/components/nav-bar";
import { useTheme } from "@/components/theme";
import { Link } from "react-router-dom";

const OnePageResumePage = () => {
  const { theme, toggleTheme } = useTheme();
  const [currentTip, setCurrentTip] = useState(0);

  const quickTips = [
    "Remove irrelevant work experience",
    "Use concise bullet points",
    "Adjust margins and spacing",
    "Focus on recent achievements",
    "Eliminate redundant information"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % quickTips.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavBar toggleTheme={toggleTheme} theme={theme} />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background pb-16 pt-24">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="relative mx-auto max-w-[1200px] px-4 text-center">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-6 py-2 text-primary mb-8">
            <Maximize2 className="mr-2 h-4 w-4" />
            One-Page Resume Guide
          </div>

          {/* Tips Slider */}
          <div className="h-12 mb-6">
            <div className="transition-all duration-500 ease-in-out transform">
              <p className="text-xl text-primary font-medium">
                Tip #{currentTip + 1}: {quickTips[currentTip]}
              </p>
            </div>
          </div>

          <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
            Master the Art of Fitting Your Resume on <br />
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              One Perfect Page
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Learn expert techniques to condense your experience into a powerful single-page resume
            that hiring managers will love
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-16 space-y-12">
        {/* Strategies*/}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Scissors className="h-8 w-8" />,
              title: "Smart Trimming",
              description: "Strategic ways to cut content while preserving impact",
              hover: "hover:shadow-blue-500/20"
            },
            {
              icon: <Layout className="h-8 w-8" />,
              title: "Optimal Layout",
              description: "Maximize space with intelligent formatting choices",
              hover: "hover:shadow-purple-500/20"
            },
            {
              icon: <Type className="h-8 w-8" />,
              title: "Content Optimization",
              description: "Transform verbose text into powerful statements",
              hover: "hover:shadow-green-500/20"
            }
          ].map((strategy, index) => (
            <Card 
              key={index} 
              className={`group transition-all duration-300 hover:scale-105 ${strategy.hover} border-primary/20`}
            >
              <CardContent className="pt-6">
                <div className="mb-4 text-primary group-hover:scale-110 transition-transform">
                  {strategy.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{strategy.title}</h3>
                <p className="text-muted-foreground">{strategy.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Length Reduction Techniques */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">Smart Condensing Techniques</CardTitle>
            <CardDescription>Proven strategies to reduce length while maximizing impact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Content Optimization",
                  techniques: [
                    "Focus on the last 10 years of experience",
                    "Remove redundant job duties",
                    "Eliminate outdated skills and certifications",
                    "Cut unnecessary personal details"
                  ]
                },
                {
                  title: "Format Refinement",
                  techniques: [
                    "Reduce margins to 0.5 inches",
                    "Use space-efficient fonts like Arial Narrow",
                    "Minimize white space between sections",
                    "Create compact but readable bullet points"
                  ]
                }
              ].map((section, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary">{section.title}</h3>
                  <div className="space-y-3">
                    {section.techniques.map((technique, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                        <MinusCircle className="h-5 w-5 text-primary" />
                        <span>{technique}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Before/After Examples */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Before & After Transformations</CardTitle>
            <CardDescription>See how to transform verbose content into concise statements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
                {[
                {
                    before: "Responsible for managing and overseeing a team of 5 marketing professionals in the development and implementation of various marketing campaigns and strategies that resulted in increased brand awareness",
                    after: "Led 5-person marketing team, driving campaigns that boosted brand awareness by 40%"
                },
                {
                    before: "Utilized advanced project management methodologies and techniques to successfully coordinate and complete multiple concurrent projects while ensuring adherence to deadlines and budget constraints",
                    after: "Managed $2M+ concurrent projects, delivering 100% on-time within budget"
                }
                ].map((example, index) => (
                <div key={index} className="grid md:grid-cols-2 gap-4 p-6 bg-secondary rounded-lg">
                    <div className="space-y-2 text-left">
                    <div className="flex items-center gap-2 text-destructive mb-2">
                        <AlertTriangle className="h-5 w-5" />
                        <span className="font-semibold">Before</span>
                    </div>
                    <p className="text-muted-foreground">{example.before}</p>
                    </div>
                    <div className="space-y-2 text-left">
                    <div className="flex items-center gap-2 text-primary mb-2">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="font-semibold">After</span>
                    </div>
                    <p className="text-muted-foreground">{example.after}</p>
                    </div>
                </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Final Check */}
        <Card className="bg-gradient-to-br from-primary/5 to-background border-primary/20">
          <CardHeader>
            <CardTitle>Final Length Check</CardTitle>
            <CardDescription>Essential questions to ask before finalizing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Is every bullet point necessary and impactful?",
                "Have you removed all redundant information?",
                "Are margins and spacing optimized?",
                "Is the font size appropriate (10-12pt)?",
                "Have you used strong action verbs?",
                "Is all information relevant to the job?"
              ].map((question, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-background/80 rounded-lg">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0" />
                  <p>{question}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
          <CardContent className="relative p-12 text-center text-primary-foreground">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Perfect Your One-Page Resume?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Use our AI-powered Resume Analyzer to ensure your condensed resume maintains maximum impact.
            </p>
            <Link to="/" className="bg-background text-foreground hover:bg-background/90 text-lg px-8 py-3 rounded-lg inline-block">
              Analyze Your Resume
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnePageResumePage;
