
import { FormData } from "../../Configuratore";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type TipoAbitazioneProps = {
  value: string;
  onChange: (value: string) => void;
};

export const TipoAbitazione = ({ value, onChange }: TipoAbitazioneProps) => {
  return (
    <div className="space-y-8 px-4 py-6">
      {/* Header minimalista */}
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-bold text-gray-900 leading-tight">
          Che tipo di immobile<br />stai ristrutturando?
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Seleziona il tipo che meglio descrive il tuo progetto
        </p>
      </div>
      
      {/* Cards semplificate e moderne */}
      <RadioGroup 
        value={value} 
        onValueChange={onChange}
        className="space-y-3"
      >
        {/* Appartamento */}
        <div 
          className={`relative rounded-xl border-2 p-6 transition-all duration-200 cursor-pointer ${
            value === 'appartamento' 
              ? 'border-[#d8010c] bg-[#d8010c]/5 ring-2 ring-[#d8010c]/20' 
              : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
          }`}
          onClick={() => onChange('appartamento')}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label 
                htmlFor="appartamento" 
                className="text-lg font-semibold text-gray-900 cursor-pointer block mb-1"
              >
                Appartamento
              </Label>
              <p className="text-sm text-gray-600 leading-relaxed">
                Condomini, attici e spazi condivisi
              </p>
            </div>
            
            <div className="ml-4">
              <RadioGroupItem 
                value="appartamento" 
                id="appartamento" 
                className={`w-6 h-6 ${
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
          className={`relative rounded-xl border-2 p-6 transition-all duration-200 cursor-pointer ${
            value === 'casa indipendente' 
              ? 'border-[#d8010c] bg-[#d8010c]/5 ring-2 ring-[#d8010c]/20' 
              : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
          }`}
          onClick={() => onChange('casa indipendente')}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label 
                htmlFor="casa" 
                className="text-lg font-semibold text-gray-900 cursor-pointer block mb-1"
              >
                Casa indipendente
              </Label>
              <p className="text-sm text-gray-600 leading-relaxed">
                Ville, villette e abitazioni autonome
              </p>
            </div>
            
            <div className="ml-4">
              <RadioGroupItem 
                value="casa indipendente" 
                id="casa" 
                className={`w-6 h-6 ${
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
