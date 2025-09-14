import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { InputField } from "../../types";

type MultipleInputsProps = {
  inputs: InputField[];
  values: Record<string, number>;
  onInputChange: (inputId: string, values: number[]) => void;
  featureId: string;
};

/**
 * Multiple slider inputs component
 */
export const MultipleInputs = ({
  inputs,
  values,
  onInputChange,
  featureId
}: MultipleInputsProps) => {
  return (
    <div className="space-y-4">
      {inputs.map((input) => (
        <div key={input.id} className="space-y-4">
          <div className="flex items-center justify-between">
            <Label 
              htmlFor={`${featureId}-${input.id}`} 
              className="text-sm font-medium text-[#1c1c1c]"
            >
              {input.label}
            </Label>
            <span className="text-sm font-bold text-[#d8010c]">
              {values[input.id] || 1}
            </span>
          </div>
          
          <div className="space-y-2">
            <Slider
              value={[values[input.id] || 1]}
              onValueChange={(sliderValues) => onInputChange(input.id, sliderValues)}
              max={input.inputMax || 20}
              min={input.inputMin || 1}
              step={1}
              className="py-2"
              onClick={(e) => e.stopPropagation()}
            />
            
            <div className="flex justify-between text-xs text-gray-500">
              <span>{input.inputMin || 1}</span>
              <span>{input.inputMax || 20}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};