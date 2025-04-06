import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AVAILABLE_TEMPLATES } from "@/lib/utils";

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (template: string) => void;
}

export default function TemplateSelector({
  selectedTemplate,
  onSelectTemplate,
}: TemplateSelectorProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-neutral-800">Choose a Template</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {AVAILABLE_TEMPLATES.map((template) => (
            <div
              key={template.id}
              className={`template-option border-2 ${
                selectedTemplate === template.id
                  ? "border-primary"
                  : "border-gray-200 hover:border-primary"
              } rounded-md p-1 cursor-pointer transition-colors`}
              onClick={() => onSelectTemplate(template.id)}
            >
              {template.id === "professional" && (
                <div className="bg-gray-100 p-2 rounded">
                  <div className="h-8 bg-primary mb-1 rounded"></div>
                  <div className="flex space-x-1">
                    <div className="w-1/3 bg-gray-300 h-20 rounded"></div>
                    <div className="w-2/3 space-y-1">
                      <div className="h-2 bg-gray-300 rounded"></div>
                      <div className="h-2 bg-gray-300 rounded"></div>
                      <div className="h-2 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              )}

              {template.id === "modern" && (
                <div className="bg-gray-100 p-2 rounded">
                  <div className="h-8 bg-cyan-600 mb-1 rounded"></div>
                  <div className="space-y-1">
                    <div className="h-2 bg-gray-300 rounded"></div>
                    <div className="h-2 bg-gray-300 rounded"></div>
                    <div className="h-2 bg-gray-300 rounded"></div>
                  </div>
                </div>
              )}

              {template.id === "minimalist" && (
                <div className="bg-gray-100 p-2 rounded">
                  <div className="flex">
                    <div className="w-1/4 h-28 bg-gray-500 rounded-l"></div>
                    <div className="w-3/4 p-2 space-y-1">
                      <div className="h-2 bg-gray-300 rounded"></div>
                      <div className="h-2 bg-gray-300 rounded"></div>
                      <div className="h-2 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-xs text-center mt-1 font-medium">{template.name}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
