
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";

type SuperficieSliderProps = {
  value: number;
  onChange: (value: number) => void;
  isComplete?: boolean;
};

export const SuperficieSlider = ({ value, onChange, isComplete }: SuperficieSliderProps) => {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] flex-shrink-0 flex items-center justify-center">
          <img 
            src="/lovable-uploads/22297941-d292-41c8-a9a7-e8ceec9287c1.png" 
            alt="Measuring tape icon" 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl md:text-2xl font-medium text-[#1c1c1c]">Superficie in mq</h2>
            {isComplete && (
              <CheckCircle className="h-5 w-5 text-green-600" />
            )}
          </div>
          <p className="text-sm md:text-base text-[#1c1c1c] opacity-90">
            Inserisci una stima <span className="hidden md:inline">approssimativa se non hai una misura precisa</span>
          </p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="superficie" className="text-lg md:text-xl font-medium text-[#1c1c1c]">Superficie</Label>
          <span className="text-lg md:text-xl font-bold text-[#d8010c]">{value} mq</span>
        </div>
        
        <div className="space-y-4">
          <Slider
            id="superficie"
            min={20}
            max={500}
            step={1}
            defaultValue={[value || 20]}
            value={[value || 20]}
            onValueChange={(values) => onChange(values[0])}
            className="py-2"
          />
          
          <div className="flex justify-between text-sm text-gray-500">
            <span>20 mq</span>
            <span>500 mq</span>
          </div>
        </div>
      </div>
    </div>
  );
};
