
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Minus } from "lucide-react";

type StanzaCounterProps = {
  type: string;
  label: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
  maxValue?: number;
};

export const StanzaCounter = ({ 
  type, 
  label, 
  description, 
  value, 
  onChange, 
  maxValue = Infinity 
}: StanzaCounterProps) => {
  const isAtMax = value >= maxValue;
  const isAtMin = value <= 0;

  return (
    <div className="flex flex-col space-y-2 p-4 border rounded-xl hover:shadow-md transition-shadow duration-300 bg-white">
      <div className="flex flex-col">
        <Label htmlFor={type} className="text-lg font-bold">{label}</Label>
        <span className="text-sm text-gray-500">{description}</span>
      </div>
      <div className="flex items-center border rounded-lg hover:border-[#1c1c1c] transition-colors mt-2">
        <Button 
          type="button" 
          variant="ghost" 
          className={`text-xl h-12 px-6 ${isAtMin ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#fbe12e] hover:text-black'}`}
          onClick={() => onChange(Math.max(0, value - 1))}
          disabled={isAtMin}
        >
          <Minus className="h-5 w-5" />
        </Button>
        <div className="flex-1 text-center text-lg font-medium">
          {value || 0}
        </div>
        <Button 
          type="button" 
          variant="ghost" 
          className={`text-xl h-12 px-6 ${isAtMax ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#fbe12e] hover:text-black'}`}
          onClick={() => onChange(value + 1)}
          disabled={isAtMax}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>
      {maxValue !== Infinity && (
        <div className="text-xs text-gray-500 mt-1 text-right">
          Max: {maxValue}
        </div>
      )}
    </div>
  );
};
