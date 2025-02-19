import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Download,
  Eye,
  Code,
  Database,
  Briefcase,
  LineChart,
  ExternalLink
} from "lucide-react";
import { NavBar } from "@/components/nav-bar";
import { useTheme } from "@/components/theme";
import { Link } from "react-router-dom";

const ResumeExamplesPage = () => {
  const { theme, toggleTheme } = useTheme();

  const resumeExamples = [
    {
      title: "Software Engineer",
      description: "10+ years of full-stack development experience",
      icon: <Code className="h-6 w-6" />,
      previewImage: "softwareEngg.png",
      pdfUrl: "softwareEngg.pdf",
      fileName: "softwareEngg.pdf",
      highlights: [
        "Clean, modular code structure",
        "Strong emphasis on technical skills",
        "Project-focused achievements",
        "Clear career progression"
      ]
    },
    {
      title: "Data Scientist",
      description: "Machine learning and analytics professional",
      icon: <Database className="h-6 w-6" />,
      previewImage: "dataScientist.png",
      pdfUrl: "dataScientist.pdf",
      fileName: "dataScientist.pdf",
      highlights: [
        "Quantifiable project outcomes",
        "Emphasis on strengths",
        "Technical toolkit showcase",
        "Industry certifications"
      ]
    },
    {
      title: "Project Manager",
      description: "PMP certified with agile expertise",
      icon: <Briefcase className="h-6 w-6" />,
      previewImage: "projectManager.png",
      pdfUrl: "projectManager.pdf",
      fileName: "projectManager.pdf",
      highlights: [
        "Project portfolio highlights",
        "Team leadership examples",
        "Budget management success",
        "Stakeholder communications"
      ]
    },
    {
      title: "Business Analyst",
      description: "Strategic analysis and process improvement",
      icon: <LineChart className="h-6 w-6" />,
      previewImage: "businessAnalyst.png",
      pdfUrl: "businessAnalyst.pdf",
      fileName: "businessAnalyst.pdf",
      highlights: [
        "Process improvement metrics",
        "Requirements gathering",
        "Data-driven decisions",
        "Cross-functional collaboration"
      ]
    }
  ];

  const handlePreviewClick = (pdfUrl) => {
    window.open(pdfUrl, '_blank');
  };

  const handleDownload = async (pdfUrl, fileName) => {
    try {

      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar toggleTheme={toggleTheme} theme={theme} />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background pb-16 pt-24">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="relative mx-auto max-w-[1200px] px-4 text-center">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-6 py-2 text-primary mb-8">
            <FileText className="mr-2 h-4 w-4" />
            Professional Resume Examples
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
            Industry-Specific Resume <br />
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Templates & Examples
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Explore our curated collection of professional resume examples tailored for different roles.
            Click on any example to view the full PDF version.
          </p>
        </div>
      </div>

      {/* Examples Grid */}
      <div className="max-w-[1200px] mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {resumeExamples.map((example, index) => (
            <Card key={index} className="group overflow-hidden border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="text-primary">{example.icon}</div>
                  <div className="text-center flex-1">
                    <CardTitle className="text-lg font-bold">{example.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">{example.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Preview Image */}
                <div 
                  className="relative cursor-pointer overflow-hidden rounded-lg"
                  onClick={() => handlePreviewClick(example.pdfUrl)}
                >
                  <img
                    src={example.previewImage}
                    alt={`${example.title} Resume Example`}
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      View Full Resume
                    </div>
                  </div>
                </div>

                {/* Key Highlights */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Key Highlights</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {example.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm p-2 bg-secondary rounded-lg">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>

                {/* View/Download Buttons */}
                <div className="flex gap-4">
                  <Button
                    className="flex-1 gap-2"
                    onClick={() => handlePreviewClick(example.pdfUrl)}
                  >
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 gap-2 hover:bg-primary hover:text-primary-foreground"
                    onClick={() => handleDownload(example.pdfUrl, example.fileName)}
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="relative overflow-hidden mt-16">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
          <CardContent className="relative p-12 text-center text-primary-foreground">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Create Your Own Professional Resume?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Use our AI-powered Resume Analyzer to ensure your resume matches industry standards.
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

export default ResumeExamplesPage;
