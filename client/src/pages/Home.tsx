import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { ResumeData, resumeDataSchema } from "@shared/schema";
import { defaultResumeData, downloadPdf } from "@/lib/utils";

import PersonalInfoForm from "@/components/resume-builder/PersonalInfoForm";
import ExperienceForm from "@/components/resume-builder/ExperienceForm";
import EducationForm from "@/components/resume-builder/EducationForm";
import SkillsForm from "@/components/resume-builder/SkillsForm";
import TemplateSelector from "@/components/resume-builder/TemplateSelector";
import ColorSelector from "@/components/resume-builder/ColorSelector";
import ResumePreview from "@/components/resume-builder/ResumePreview";

function Home() {
  const { toast } = useToast();
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState("professional");
  const [selectedColor, setSelectedColor] = useState("indigo");
  const resumePreviewRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const updateResumeData = (newData: Partial<ResumeData>) => {
    setResumeData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  const saveResume = async () => {
    try {
      // Validate resume data
      resumeDataSchema.parse(resumeData);

      // In a real app with authentication, we'd have a userId
      // For this demo, we'll use a placeholder
      const userId = 1;

      await apiRequest("POST", "/api/resumes", {
        userId,
        name: `${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName} Resume`,
        template: selectedTemplate,
        color: selectedColor,
        data: resumeData,
      });

      toast({
        title: "Success!",
        description: "Your resume has been saved.",
      });
    } catch (error) {
      console.error("Error saving resume:", error);
      toast({
        title: "Error",
        description: "Failed to save your resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  const generatePdf = async () => {
    if (!resumePreviewRef.current) return;

    setIsGeneratingPdf(true);
    try {
      // Get the HTML content of the resume
      const resumeHtml = resumePreviewRef.current.innerHTML;

      const response = await fetch('/api/resumes/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ html: resumeHtml }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const pdfBlob = await response.blob();
      const fullName = `${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}`.trim();
      const filename = fullName ? `${fullName}_resume.pdf` : 'resume.pdf';
      
      downloadPdf(pdfBlob, filename);

      toast({
        title: "Success!",
        description: "Your resume has been downloaded.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <header className="bg-primary shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Resume Builder</h1>
          <div className="flex space-x-2">
            <button
              onClick={saveResume}
              className="bg-white text-primary px-4 py-2 rounded shadow hover:bg-gray-100 transition duration-200 flex items-center text-sm font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              Save
            </button>
            <button
              onClick={generatePdf}
              disabled={isGeneratingPdf}
              className="bg-cyan-600 text-white px-4 py-2 rounded shadow hover:bg-cyan-700 transition duration-200 flex items-center text-sm font-medium disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isGeneratingPdf ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download PDF
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-5 space-y-6">
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onSelectTemplate={setSelectedTemplate}
            />
            
            <ColorSelector
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
            />
            
            <PersonalInfoForm
              personalInfo={resumeData.personalInfo}
              onChange={(personalInfo) => updateResumeData({ personalInfo })}
            />
            
            <ExperienceForm
              experiences={resumeData.experience}
              onChange={(experience) => updateResumeData({ experience })}
            />
            
            <EducationForm
              educations={resumeData.education}
              onChange={(education) => updateResumeData({ education })}
            />
            
            <SkillsForm
              skills={resumeData.skills}
              onChange={(skills) => updateResumeData({ skills })}
            />
          </div>

          {/* Right Column - Preview */}
          <div className="lg:col-span-7">
            <div className="sticky top-8">
              <ResumePreview
                resumeData={resumeData}
                template={selectedTemplate}
                color={selectedColor}
                forwardedRef={resumePreviewRef}
                onGeneratePdf={generatePdf}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
