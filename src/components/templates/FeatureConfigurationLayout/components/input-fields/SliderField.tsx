import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

type SliderFieldProps = {
  id: string;
  label: string;
  value: number;
  onChange: (values: number[]) => void;
  min?: number;
  max?: number;
};

/**
 * Slider input field component
 */
export const SliderField = ({
  id,
  label,
  value,
  onChange,
  min = 1,
  max = 20
}: SliderFieldProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="text-sm font-medium text-[#1c1c1c]">
          {label}
        </Label>
        <span className="text-sm font-bold text-[#d8010c]">
          {value || 1}
        </span>
      </div>
      
      <div className="space-y-2">
        <Slider
          value={[value || 1]}
          onValueChange={onChange}
          max={max}
          min={min}
          step={1}
          className="py-2"
          onClick={(e) => e.stopPropagation()}
        />
        
        <div className="flex justify-between text-xs text-gray-500">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    </div>
  );
};