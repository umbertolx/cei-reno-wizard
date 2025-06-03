
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
    <div className="flex items-center justify-between py-2.5 md:py-3">
      <div className="flex flex-col flex-1 min-w-0 pr-3 md:pr-4">
        <Label htmlFor={type} className="text-sm md:text-lg font-medium text-[#1c1c1c] mb-0.5 md:mb-1">
          {label}
        </Label>
        <span className="text-xs md:text-sm text-gray-600">
          {description}
        </span>
      </div>
      
      <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
        <Button 
          variant="outline" 
          size="icon"
          className={`w-9 h-9 md:w-10 md:h-10 rounded-full border-2 transition-all duration-200 ${
            isAtMin 
              ? 'opacity-40 cursor-not-allowed border-gray-200' 
              : 'border-gray-300 hover:border-[#d8010c] hover:bg-[#d8010c] hover:text-white hover:scale-105'
          }`}
          onClick={() => onChange(Math.max(0, value - 1))}
          disabled={isAtMin}
        >
          <Minus className="h-3 w-3 md:h-4 md:w-4" />
        </Button>
        
        <span className="w-8 md:w-10 text-center font-bold text-lg md:text-xl text-[#d8010c]">
          {value || 0}
        </span>
        
        <Button 
          variant="outline" 
          size="icon"
          className={`w-9 h-9 md:w-10 md:h-10 rounded-full border-2 transition-all duration-200 ${
            isAtMax 
              ? 'opacity-40 cursor-not-allowed border-gray-200' 
              : 'border-gray-300 hover:border-[#d8010c] hover:bg-[#d8010c] hover:text-white hover:scale-105'
          }`}
          onClick={() => onChange(value + 1)}
          disabled={isAtMax}
        >
          <Plus className="h-3 w-3 md:h-4 md:w-4" />
        </Button>
      </div>
    </div>
  );
};
