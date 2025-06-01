
import { FormData } from "../../Configuratore";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type TipoAbitazioneProps = {
  value: string;
  onChange: (value: string) => void;
};

export const TipoAbitazione = ({ value, onChange }: TipoAbitazioneProps) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-[#1c1c1c] mb-2">
          Che tipo di immobile stai ristrutturando?
        </h2>
        <p className="text-sm sm:text-base text-[#1c1c1c] opacity-80">
          Seleziona il tipo di abitazione per cui vuoi progettare l'impianto elettrico
        </p>
      </div>
      
      <RadioGroup 
        value={value} 
        onValueChange={onChange}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
      >
        <div className={`flex flex-col space-y-3 border rounded-xl p-4 sm:p-5 cursor-pointer hover:bg-[#fbe12e] hover:text-black transition-all duration-200 ${value === 'appartamento' ? 'bg-[#d8010c] text-white border-[#d8010c] shadow-md' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-3">
            <RadioGroupItem 
              value="appartamento" 
              id="appartamento" 
              className={`${value === 'appartamento' ? 'text-white border-white' : ''}`} 
            />
            <Label 
              htmlFor="appartamento" 
              className={`cursor-pointer text-base sm:text-lg font-bold ${value === 'appartamento' ? 'text-white' : ''}`}
            >
              Appartamento
            </Label>
          </div>
          <p className={`text-xs sm:text-sm ${value === 'appartamento' ? 'text-white opacity-90' : 'text-gray-600'} leading-relaxed`}>
            Condomini, residence, attici
          </p>
        </div>
        
        <div className={`flex flex-col space-y-3 border rounded-xl p-4 sm:p-5 cursor-pointer hover:bg-[#fbe12e] hover:text-black transition-all duration-200 ${value === 'casa indipendente' ? 'bg-[#d8010c] text-white border-[#d8010c] shadow-md' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-3">
            <RadioGroupItem 
              value="casa indipendente" 
              id="casa" 
              className={`${value === 'casa indipendente' ? 'text-white border-white' : ''}`} 
            />
            <Label 
              htmlFor="casa" 
              className={`cursor-pointer text-base sm:text-lg font-bold ${value === 'casa indipendente' ? 'text-white' : ''}`}
            >
              Casa indipendente
            </Label>
          </div>
          <p className={`text-xs sm:text-sm ${value === 'casa indipendente' ? 'text-white opacity-90' : 'text-gray-600'} leading-relaxed`}>
            Ville, villette a schiera
          </p>
        </div>
      </RadioGroup>
    </div>
  );
};
