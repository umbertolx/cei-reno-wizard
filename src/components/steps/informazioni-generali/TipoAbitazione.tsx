
import { FormData } from "../../Configuratore";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Home, Building2 } from "lucide-react";

type TipoAbitazioneProps = {
  value: string;
  onChange: (value: string) => void;
};

export const TipoAbitazione = ({ value, onChange }: TipoAbitazioneProps) => {
  return (
    <div className="space-y-6">
      {/* Header con spacing ottimizzato per mobile */}
      <div className="text-center px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1c1c1c] mb-3 leading-tight">
          Che tipo di immobile stai ristrutturando?
        </h2>
        <p className="text-base text-gray-600 leading-relaxed max-w-md mx-auto">
          Seleziona il tipo di abitazione per personalizzare il tuo progetto
        </p>
      </div>
      
      {/* Cards ottimizzate per mobile */}
      <RadioGroup 
        value={value} 
        onValueChange={onChange}
        className="space-y-4 px-4"
      >
        {/* Appartamento Card */}
        <div 
          className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
            value === 'appartamento' 
              ? 'border-[#d8010c] bg-[#d8010c] shadow-lg scale-[1.02]' 
              : 'border-gray-200 bg-white hover:border-[#fbe12e] hover:shadow-md'
          }`}
          onClick={() => onChange('appartamento')}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${
                value === 'appartamento' 
                  ? 'bg-white/20 text-white' 
                  : 'bg-[#d8010c]/10 text-[#d8010c]'
              }`}>
                <Building2 className="h-6 w-6" />
              </div>
              
              <RadioGroupItem 
                value="appartamento" 
                id="appartamento" 
                className={`${
                  value === 'appartamento' 
                    ? 'border-white text-white' 
                    : 'border-gray-300'
                }`} 
              />
            </div>
            
            <div className="space-y-2">
              <Label 
                htmlFor="appartamento" 
                className={`text-xl font-bold cursor-pointer block ${
                  value === 'appartamento' ? 'text-white' : 'text-[#1c1c1c]'
                }`}
              >
                Appartamento
              </Label>
              <p className={`text-sm leading-relaxed ${
                value === 'appartamento' 
                  ? 'text-white/90' 
                  : 'text-gray-600'
              }`}>
                Condomini, residence, attici e spazi condivisi
              </p>
            </div>
          </div>
          
          {/* Indicatore di selezione */}
          {value === 'appartamento' && (
            <div className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-[#d8010c] rounded-full"></div>
            </div>
          )}
        </div>
        
        {/* Casa Indipendente Card */}
        <div 
          className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
            value === 'casa indipendente' 
              ? 'border-[#d8010c] bg-[#d8010c] shadow-lg scale-[1.02]' 
              : 'border-gray-200 bg-white hover:border-[#fbe12e] hover:shadow-md'
          }`}
          onClick={() => onChange('casa indipendente')}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${
                value === 'casa indipendente' 
                  ? 'bg-white/20 text-white' 
                  : 'bg-[#d8010c]/10 text-[#d8010c]'
              }`}>
                <Home className="h-6 w-6" />
              </div>
              
              <RadioGroupItem 
                value="casa indipendente" 
                id="casa" 
                className={`${
                  value === 'casa indipendente' 
                    ? 'border-white text-white' 
                    : 'border-gray-300'
                }`} 
              />
            </div>
            
            <div className="space-y-2">
              <Label 
                htmlFor="casa" 
                className={`text-xl font-bold cursor-pointer block ${
                  value === 'casa indipendente' ? 'text-white' : 'text-[#1c1c1c]'
                }`}
              >
                Casa indipendente
              </Label>
              <p className={`text-sm leading-relaxed ${
                value === 'casa indipendente' 
                  ? 'text-white/90' 
                  : 'text-gray-600'
              }`}>
                Ville, villette a schiera e abitazioni autonome
              </p>
            </div>
          </div>
          
          {/* Indicatore di selezione */}
          {value === 'casa indipendente' && (
            <div className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-[#d8010c] rounded-full"></div>
            </div>
          )}
        </div>
      </RadioGroup>
    </div>
  );
};
