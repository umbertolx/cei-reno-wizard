import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

type NumeroPersoneSelectorProps = {
  value: number;
  onChange: (value: number) => void;
};

export const NumeroPersoneSelector = ({ value, onChange }: NumeroPersoneSelectorProps) => {
  const handleIncrement = () => {
    if (value < 10) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || 1;
    if (newValue >= 1 && newValue <= 10) {
      onChange(newValue);
    }
  };

  return (
    <div className="space-y-4">
      <Label className="text-xl font-bold text-[#1c1c1c]">
        Quante persone vivono nell'unità abitativa?
      </Label>
      
      <div className="flex items-center justify-center space-x-4">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full border-2 border-[#d8010c] text-[#d8010c] hover:bg-[#d8010c] hover:text-white"
          onClick={handleDecrement}
          disabled={value <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        
        <Input
          type="number"
          min="1"
          max="10"
          value={value}
          onChange={handleInputChange}
          className="w-20 text-center text-xl font-bold border-2 border-[#d8010c] focus:ring-[#d8010c]"
        />
        
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full border-2 border-[#d8010c] text-[#d8010c] hover:bg-[#d8010c] hover:text-white"
          onClick={handleIncrement}
          disabled={value >= 10}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <p className="text-sm text-gray-600 text-center">
        Numero di persone che vivono contemporaneamente nell'abitazione
      </p>
    </div>
  );
};