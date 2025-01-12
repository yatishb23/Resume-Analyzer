import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Target, Award, CheckCircle2, AlertTriangle, Star, BookOpen, Bookmark, ArrowRight } from "lucide-react";
import { NavBar } from "@/components/nav-bar";
import { useTheme } from "@/components/theme";
import { Link } from "react-router-dom";

const ResumeSummaryPage = () => {
    const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <NavBar toggleTheme={toggleTheme} theme={theme} />
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background pb-16 pt-24">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="relative mx-auto max-w-[1200px] px-4 text-center">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-6 py-2 text-primary mb-8">
            <Star className="mr-2 h-4 w-4" />
            Resume Summary Guide
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
            Write a Powerful Resume Summary That <br />
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Captures Attention
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Learn how to craft a compelling resume summary that highlights your strengths
            and makes employers want to read more
          </p>
          {/* Image */}
          <div className="relative max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl">
            <img
              src="resume-summary1.png"
              alt="Professional resume summary writing"
              className="w-full h-auto object-cover rounded-lg"
            />
            {/*<div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />*/}
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-16 space-y-12">
        {/* Resume Summary */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">What is a Resume Summary?</CardTitle>
            <CardDescription>Understanding the power of a strong professional summary</CardDescription>
          </CardHeader>
          <CardContent className="text-left">
            <p className="text-lg text-muted-foreground mb-6">
              A resume summary is a brief statement that sits at the top of your resume and highlights your
              qualifications, skills, and notable achievements. It serves as your "elevator pitch" to potential
              employers, giving them a quick overview of your professional value.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Target className="h-6 w-6 text-primary" />, title: "Captures Attention", description: "Grabs the employer's interest in the first few seconds"
                },
                {
                  icon: <BookOpen className="h-6 w-6 text-primary" />, title: "Showcases Value", description: "Highlights your most relevant qualifications and achievements"
                },
                {
                  icon: <Bookmark className="h-6 w-6 text-primary" />, title: "Sets You Apart", description: "Differentiates you from other candidates"
                }
              ].map((item, index) => (
                <div key={index} className="p-6 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Elements */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">Key Elements of a Strong Summary</CardTitle>
            <CardDescription>Essential components that make your summary effective</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {[
                {
                  title: "Your Professional Title", content: "Start with your current role or professional identity", example: "Experienced Digital Marketing Manager with 6+ years of expertise..."
                },
                {
                  title: "Years of Experience", content: "Mention your relevant experience in the field", example: "Senior Software Developer with 8+ years of experience..."
                },
                {
                  title: "Key Achievements", content: "Include 2-3 notable accomplishments with metrics", example: "...led teams to deliver 15+ successful projects, increasing client satisfaction by 40%"
                },
                {
                  title: "Relevant Skills", content: "Highlight skills that match the job requirements", example: "...specializing in cloud architecture, agile methodologies, and team leadership"
                }
              ].map((element, index) => (
                <div key={index} className="p-6 rounded-lg bg-secondary border border-primary/10">
                  <h3 className="text-lg font-semibold mb-2">{element.title}</h3>
                  <p className="text-muted-foreground mb-4">{element.content}</p>
                  <div className="bg-primary/5 p-4 rounded-md">
                    <p className="text-sm italic">Example: {element.example}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Example Summaries */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Professional Summary Examples</CardTitle>
            <CardDescription>Real-world examples for different experience levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                {
                  level: "Entry Level", example: "Recent Computer Science graduate with strong foundation in software engineering and programming principles. Proficient in Python, Java, and C++. Completed multiple projects involving machine learning and data analysis. Seeking to leverage technical skills and internship experience in a junior developer role."
                },
                {
                  level: "Mid-Career Professional", example: "Marketing Manager with 5+ years of experience in developing and executing comprehensive marketing strategies. Expertise in digital marketing, brand development, and team leadership. Successfully increased company's social media engagement by 150% and managed campaigns with budgets exceeding $500,000."
                },
                {
                  level: "Senior Professional", example: "Senior Project Manager with 10+ years of experience leading complex IT projects in the healthcare sector. Track record of delivering projects worth $5M+ on time and under budget. Expert in agile methodologies, risk management, and stakeholder communication. Led cross-functional teams of 20+ members across multiple locations."
                }
              ].map((summary, index) => (
                <div key={index} className="p-6 rounded-lg bg-gradient-to-r from-primary/5 to-transparent border border-primary/10">
                  <h3 className="text-lg font-semibold mb-3">{summary.level}</h3>
                  <div className="flex items-start gap-4">
                    <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">{summary.example}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tips and Best Practices */}
        <Card className="bg-gradient-to-br from-primary/5 to-background">
          <CardHeader>
            <CardTitle>Tips for Writing an Effective Summary</CardTitle>
            <CardDescription>Best practices to make your summary stand out</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { tip: "Keep it concise", description: "Limit your summary to 3-5 impactful sentences" },
                { tip: "Use relevant keywords", description: "Include industry-specific terms from the job description" },
                { tip: "Focus on achievements", description: "Highlight quantifiable results and specific accomplishments" },
                { tip: "Tailor to the job", description: "Customize your summary for each position you apply to" },
                { tip: "Use active voice", description: "Write with strong, action-oriented language" },
                { tip: "Stay professional", description: "Maintain a formal tone and avoid personal pronouns" }
              ].map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-background/80">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">{tip.tip}</h4>
                    <p className="text-muted-foreground text-sm">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
          <CardContent className="relative p-20 text-center text-primary-foreground">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Perfect Your Resume Summary?
              </h2>
              <p className="text-xl mb-12 opacity-90">
                Use our AI-powered Resume Analyzer to get instant feedback on your resume summary
                and ensure it makes the right first impression.
              </p>
              <Link to="/" className="bg-background text-foreground hover:bg-background/90 text-lg px-8 py-3 rounded-lg inline-block">
                Analyze Your Resume
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResumeSummaryPage;
