
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
    <div className="flex items-center justify-between p-4 border rounded-lg bg-white hover:border-[#1c1c1c] transition-all">
      <div className="flex flex-col">
        <Label htmlFor={type} className="text-lg font-medium">{label}</Label>
        <span className="text-xs text-gray-500">{description}</span>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon"
          className={`rounded-full ${isAtMin ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#fbe12e] hover:text-black'}`}
          onClick={() => onChange(Math.max(0, value - 1))}
          disabled={isAtMin}
        >
          <Minus className="h-4 w-4" />
        </Button>
        
        <span className="w-6 text-center font-medium">
          {value || 0}
        </span>
        
        <Button 
          variant="outline" 
          size="icon"
          className={`rounded-full ${isAtMax ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#fbe12e] hover:text-black'}`}
          onClick={() => onChange(value + 1)}
          disabled={isAtMax}
        >
          <Plus className="h-4 w-4" />
        </Button>
        
        {maxValue !== Infinity && (
          <span className="text-xs text-[#d8010c] ml-1">(max: {maxValue})</span>
        )}
      </div>
    </div>
  );
};
