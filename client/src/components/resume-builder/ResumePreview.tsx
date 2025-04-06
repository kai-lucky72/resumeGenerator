import { forwardRef, RefObject } from "react";
import { ResumeData } from "@shared/schema";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer, Download } from "lucide-react";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalistTemplate from "./templates/MinimalistTemplate";

interface ResumePreviewProps {
  resumeData: ResumeData;
  template: string;
  color: string;
  forwardedRef: RefObject<HTMLDivElement>;
  onGeneratePdf: () => void;
}

export default function ResumePreview({
  resumeData,
  template,
  color,
  forwardedRef,
  onGeneratePdf,
}: ResumePreviewProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row justify-between items-center py-4 px-6 border-b">
        <h2 className="text-lg font-semibold text-neutral-800">Resume Preview</h2>
        <div className="flex space-x-2">
          <Button
            onClick={handlePrint}
            variant="ghost"
            size="sm"
            className="flex items-center text-neutral-600 hover:text-primary"
          >
            <Printer className="h-4 w-4 mr-1" />
            Print
          </Button>
          <Button
            onClick={onGeneratePdf}
            variant="ghost"
            size="sm"
            className="flex items-center text-neutral-600 hover:text-primary"
          >
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div 
          id="resume-preview" 
          ref={forwardedRef}
          className="bg-white shadow border border-gray-200 mx-auto"
          style={{ 
            width: "100%",
            maxWidth: "850px",
            minHeight: "500px",
            pageBreakInside: "avoid",
            pageBreakAfter: "always"
          }}
        >
          {template === "professional" && (
            <ProfessionalTemplate resumeData={resumeData} colorScheme={color} />
          )}
          
          {template === "modern" && (
            <ModernTemplate resumeData={resumeData} colorScheme={color} />
          )}
          
          {template === "minimalist" && (
            <MinimalistTemplate resumeData={resumeData} colorScheme={color} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
