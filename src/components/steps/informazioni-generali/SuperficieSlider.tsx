
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Ruler } from "lucide-react";

type SuperficieSliderProps = {
  value: number;
  onChange: (value: number) => void;
};

export const SuperficieSlider = ({ value, onChange }: SuperficieSliderProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="icon-cei flex items-center justify-center w-[75px] h-[75px] rounded-full bg-[rgba(216,121,122,0.2)]">
          <Ruler className="h-8 w-8 text-[#1c1c1c] stroke-[1.5]" />
        </div>
        <h2 className="ml-4 text-xl md:text-2xl font-medium text-[#1c1c1c]">Superficie in mq</h2>
      </div>
      
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="superficie" className="text-base font-medium">Superficie in mq</Label>
          <span className="text-lg font-bold">{value} mq</span>
        </div>
        
        <Slider
          id="superficie"
          min={20}
          max={500}
          step={1}
          defaultValue={[value || 20]}
          value={[value || 20]}
          onValueChange={(values) => onChange(values[0])}
          className="py-4"
        />
        
        <p className="text-sm text-[#1c1c1c] opacity-60">Inserisci una stima approssimativa se non hai una misura precisa.</p>
      </div>
    </div>
  );
};
