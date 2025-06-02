
import { Input } from "@/components/ui/input";

type IndirizzoFieldProps = {
  value: string;
  onChange: (value: string) => void;
  onSelectLocation: (location: string) => void;
};

export const IndirizzoField = ({ value, onChange, onSelectLocation }: IndirizzoFieldProps) => {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] flex-shrink-0 flex items-center justify-center">
          <img 
            src="/lovable-uploads/14822282-293b-4be9-93a5-cbc34e07f6c6.png" 
            alt="Location map icon" 
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h2 className="text-lg md:text-2xl font-medium text-[#1c1c1c]">Indirizzo immobile</h2>
          <p className="text-sm md:text-base text-[#1c1c1c] opacity-70 hidden md:block">Inserisci il tuo indirizzo completo</p>
        </div>
      </div>
      
      <div className="bg-white border-2 border-gray-200 rounded-xl p-4 md:p-6">
        <Input
          placeholder="Via, numero civico, città"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-base md:text-lg p-4 md:p-6 rounded-lg border-0 shadow-none"
        />
      </div>
    </div>
  );
};
