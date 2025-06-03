
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
    <div className="flex items-center justify-between py-3">
      <div className="flex flex-col flex-1 min-w-0 pr-4">
        <Label htmlFor={type} className="text-lg font-medium text-[#1c1c1c] mb-1">
          {label}
        </Label>
        <span className="text-sm text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis">
          {description}
        </span>
      </div>
      
      <div className="flex items-center space-x-3 flex-shrink-0">
        <Button 
          variant="outline" 
          size="icon"
          className={`w-10 h-10 rounded-full border-2 ${
            isAtMin 
              ? 'opacity-40 cursor-not-allowed border-gray-200' 
              : 'border-gray-300 hover:border-[#d8010c] hover:bg-[#d8010c] hover:text-white'
          }`}
          onClick={() => onChange(Math.max(0, value - 1))}
          disabled={isAtMin}
        >
          <Minus className="h-4 w-4" />
        </Button>
        
        <span className="w-10 text-center font-bold text-xl text-[#d8010c]">
          {value || 0}
        </span>
        
        <Button 
          variant="outline" 
          size="icon"
          className={`w-10 h-10 rounded-full border-2 ${
            isAtMax 
              ? 'opacity-40 cursor-not-allowed border-gray-200' 
              : 'border-gray-300 hover:border-[#d8010c] hover:bg-[#d8010c] hover:text-white'
          }`}
          onClick={() => onChange(value + 1)}
          disabled={isAtMax}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
