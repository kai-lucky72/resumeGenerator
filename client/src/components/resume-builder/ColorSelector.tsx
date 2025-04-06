import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AVAILABLE_COLORS } from "@/lib/utils";

interface ColorSelectorProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

export default function ColorSelector({
  selectedColor,
  onSelectColor,
}: ColorSelectorProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-neutral-800">Color Scheme</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-3">
          {AVAILABLE_COLORS.map((color) => (
            <div key={color.id} className="color-option">
              <button
                type="button"
                onClick={() => onSelectColor(color.id)}
                className={`h-8 w-full rounded-md border-2 ${
                  selectedColor === color.id
                    ? "border-primary"
                    : "border-gray-200 hover:border-opacity-50 hover:border-primary"
                } shadow-sm transition-colors`}
                style={{ backgroundColor: color.value }}
                aria-label={`Select ${color.name} color scheme`}
              />
              <p className="text-xs text-center mt-1">{color.name}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
