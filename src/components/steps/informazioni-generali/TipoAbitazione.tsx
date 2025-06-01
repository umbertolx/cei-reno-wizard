
import { FormData } from "../../Configuratore";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type TipoAbitazioneProps = {
  value: string;
  onChange: (value: string) => void;
};

export const TipoAbitazione = ({ value, onChange }: TipoAbitazioneProps) => {
  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 py-4 sm:py-6">
      {/* Header ottimizzato per mobile */}
      <div className="text-center space-y-2 sm:space-y-3">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
          Che tipo di immobile<br className="hidden sm:block" />
          <span className="sm:hidden"> </span>stai ristrutturando?
        </h2>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md mx-auto">
          Seleziona il tipo che meglio descrive il tuo progetto
        </p>
      </div>
      
      {/* Cards ottimizzate per touch */}
      <RadioGroup 
        value={value} 
        onValueChange={onChange}
        className="space-y-4 sm:space-y-3 max-w-lg mx-auto"
      >
        {/* Appartamento */}
        <div 
          className={`relative rounded-xl border-2 p-5 sm:p-6 min-h-[80px] transition-all duration-200 cursor-pointer touch-manipulation ${
            value === 'appartamento' 
              ? 'border-[#d8010c] bg-[#d8010c]/8 ring-2 ring-[#d8010c]/20 shadow-md' 
              : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 active:bg-gray-100'
          }`}
          onClick={() => onChange('appartamento')}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              <Label 
                htmlFor="appartamento" 
                className="text-lg sm:text-xl font-semibold text-gray-900 cursor-pointer block mb-1 leading-tight"
              >
                Appartamento
              </Label>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Condomini, attici e spazi condivisi
              </p>
            </div>
            
            <div className="flex-shrink-0">
              <RadioGroupItem 
                value="appartamento" 
                id="appartamento" 
                className={`w-8 h-8 sm:w-6 sm:h-6 touch-manipulation ${
                  value === 'appartamento' 
                    ? 'border-[#d8010c] text-[#d8010c]' 
                    : 'border-gray-300'
                }`} 
              />
            </div>
          </div>
        </div>
        
        {/* Casa indipendente */}
        <div 
          className={`relative rounded-xl border-2 p-5 sm:p-6 min-h-[80px] transition-all duration-200 cursor-pointer touch-manipulation ${
            value === 'casa indipendente' 
              ? 'border-[#d8010c] bg-[#d8010c]/8 ring-2 ring-[#d8010c]/20 shadow-md' 
              : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 active:bg-gray-100'
          }`}
          onClick={() => onChange('casa indipendente')}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              <Label 
                htmlFor="casa" 
                className="text-lg sm:text-xl font-semibold text-gray-900 cursor-pointer block mb-1 leading-tight"
              >
                Casa indipendente
              </Label>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Ville, villette e abitazioni autonome
              </p>
            </div>
            
            <div className="flex-shrink-0">
              <RadioGroupItem 
                value="casa indipendente" 
                id="casa" 
                className={`w-8 h-8 sm:w-6 sm:h-6 touch-manipulation ${
                  value === 'casa indipendente' 
                    ? 'border-[#d8010c] text-[#d8010c]' 
                    : 'border-gray-300'
                }`} 
              />
            </div>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};
