
import { CheckCircle } from "lucide-react";

type IndirizzoFieldProps = {
  value: string;
  onChange: (value: string) => void;
  onSelectLocation: (location: string) => void;
  isComplete?: boolean;
};

export const IndirizzoField = ({ value, onChange, onSelectLocation, isComplete }: IndirizzoFieldProps) => {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] flex-shrink-0 flex items-center justify-center">
          <img 
            src="/lovable-uploads/14822282-293b-4be9-93a5-cbc34e07f6c6.png" 
            alt="Location map icon" 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl md:text-2xl font-medium text-[#1c1c1c]">Indirizzo immobile</h2>
            {isComplete && (
              <CheckCircle className="h-5 w-5 text-green-600" />
            )}
          </div>
          <p className="text-sm md:text-base text-[#1c1c1c] opacity-90">
            Inserisci l'indirizzo <span className="hidden md:inline">completo</span>
          </p>
        </div>
      </div>
      
      <div className="p-4 rounded-xl transition-all duration-200 border cursor-pointer bg-white border-gray-200 hover:border-[#d8010c] hover:shadow-sm hover:scale-[1.01]">
        <div className="flex items-center justify-between">
          <div className="text-left flex-1 min-w-0">
            <input
              type="text"
              placeholder="Via, numero civico, città"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full font-semibold text-base text-[#1c1c1c] bg-transparent border-0 outline-none placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
