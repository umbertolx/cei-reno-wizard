import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InputFieldProps = {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  type?: string;
  min?: number;
  max?: number;
  placeholder?: string;
};

/**
 * Single input field component
 */
export const InputFieldComponent = ({
  id,
  label,
  value,
  onChange,
  type = "number",
  min = 1,
  max = 20,
  placeholder
}: InputFieldProps) => {
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
      
      <Input
        id={id}
        type={type}
        min={min}
        max={max}
        value={value || 1}
        onChange={(e) => onChange(Math.max(1, parseInt(e.target.value) || 1))}
        placeholder={placeholder}
        className="text-sm h-10"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};