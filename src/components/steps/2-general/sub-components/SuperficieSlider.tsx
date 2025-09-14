
import { FormData } from "../../../Configuratore";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

type SuperficieSliderProps = {
  value: number;
  onChange: (value: number) => void;
};

export const SuperficieSlider = ({ value, onChange }: SuperficieSliderProps) => {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header con nuovo stile */}
      <div className="px-3 md:px-0">
        <div className="space-y-3">
          <h1 className="text-lg md:text-xl font-semibold text-[#1c1c1c] leading-tight">
            Superficie in mq
          </h1>
          <div className="w-full h-px bg-gray-200"></div>
          <p className="text-sm md:text-base text-[#1c1c1c] opacity-75 mt-3">
            Inserisci una stima approssimativa se non hai una misura precisa
          </p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center bg-white border border-[#d8010c] rounded-full px-1 py-0.5">
            <button 
              onClick={() => onChange(Math.max(20, value - 1))}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <span className="text-lg font-medium text-[#1c1c1c]">-</span>
            </button>
            <span className="px-3 text-lg font-medium text-[#1c1c1c] min-w-[60px] text-center">
              {value}
            </span>
            <button 
              onClick={() => onChange(Math.min(500, value + 1))}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <span className="text-lg font-medium text-[#1c1c1c]">+</span>
            </button>
          </div>
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
