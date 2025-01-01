import { useState } from 'react';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils'; // Utility function for conditional class names

export function ResumeChecker() {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (
      file &&
      (file.type === 'application/pdf' ||
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    ) {
      console.log('File uploaded:', file);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-emerald-50/80 to-purple-50/80">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4">
        <div className="w-full max-w-3xl text-center mb-8">
          
          <div className="space-y-4">
            <div className="text-blue-400 font-medium">RESUME CHECKER</div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Is your resume good enough?
            </h1>
            <div className="inline-flex items-center gap-2 text-sm text-gray-600 mb-2">
            <span>Home</span>
            <span className="text-gray-400">&nbsp;&gt;&nbsp;</span>
            <span className="text-blue-400">Resume Checker</span>
          </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A free and fast AI resume checker doing 16 crucial checks to ensure your resume is ready to perform and get you interview callbacks.
            </p>
          </div>
        </div>

        <Card
          className={cn(
            'w-full max-w-2xl mx-auto rounded-lg border-2 border-dashed transition-colors',
            isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <p className="text-lg font-medium mb-2">Drop your resume here or choose a file.</p>
            <p className="text-sm text-gray-500 mb-4">PDF & DOCX only. Max 2MB file size.</p>
            <Button
              variant="primary"
              onClick={() => document.getElementById('file-upload')?.click()}
              className="bg-black-600 text-white px-6 py-2 rounded-lg hover:bg-black-500 transition-colors"
            >
              Upload Your Resume
            </Button>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".pdf,.docx"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  console.log('File selected:', file);
                }
              }}
            />
            <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
              <Lock className="h-4 w-4" />
              <span>Privacy guaranteed</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
