
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Minus } from "lucide-react";

type StanzaCounterProps = {
  type: string;
  label: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
};

export const StanzaCounter = ({ type, label, description, value, onChange }: StanzaCounterProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-col">
        <Label htmlFor={type} className="text-lg font-bold">{label}</Label>
        <span className="text-sm text-gray-500">{description}</span>
      </div>
      <div className="flex items-center border rounded-lg hover:border-[#1c1c1c] transition-colors">
        <Button 
          type="button" 
          variant="ghost" 
          className="text-xl h-12 px-6 hover:bg-[#fbe12e] hover:text-black"
          onClick={() => onChange(Math.max(0, value - 1))}
        >
          <Minus className="h-5 w-5" />
        </Button>
        <div className="flex-1 text-center text-lg">
          {value || 0}
        </div>
        <Button 
          type="button" 
          variant="ghost" 
          className="text-xl h-12 px-6 hover:bg-[#fbe12e] hover:text-black"
          onClick={() => onChange(value + 1)}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
