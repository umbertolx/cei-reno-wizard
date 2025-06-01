import { FormData } from "../../Configuratore";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Home, Building } from "lucide-react";

type TipoAbitazioneProps = {
  value: string;
  onChange: (value: string) => void;
};

export const TipoAbitazione = ({ value, onChange }: TipoAbitazioneProps) => {
  return (
    <div className="space-y-6 md:space-y-8 px-4 md:px-0 py-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <h2 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight">
          Che tipo di immobile stai ristrutturando?
        </h2>
        <p className="hidden md:block text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
          Seleziona il tipo che meglio descrive il tuo progetto
        </p>
      </div>
      
      {/* Mobile Layout - Box simmetrici */}
      <div className="block md:hidden">
        <RadioGroup 
          value={value} 
          onValueChange={onChange}
          className="grid grid-cols-1 gap-4 max-w-sm mx-auto"
        >
          {/* Appartamento - Mobile */}
          <div 
            className={`relative rounded-2xl border-2 transition-all duration-300 cursor-pointer h-[120px] flex items-center ${
              value === 'appartamento' 
                ? 'border-[#d8010c] bg-gradient-to-br from-[#d8010c]/10 to-[#d8010c]/5 shadow-lg' 
                : 'border-gray-200 bg-white hover:border-[#d8010c]/30 hover:shadow-md'
            }`}
            onClick={() => onChange('appartamento')}
          >
            <div className="flex items-center justify-between w-full px-6">
              <div className="flex items-center space-x-4 flex-1">
                <div className={`p-3 rounded-xl ${
                  value === 'appartamento' 
                    ? 'bg-[#d8010c] text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  <Building className="h-8 w-8" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <Label 
                    htmlFor="appartamento-mobile" 
                    className="text-lg font-semibold text-gray-900 cursor-pointer block"
                  >
                    Appartamento
                  </Label>
                </div>
              </div>
              
              <RadioGroupItem 
                value="appartamento" 
                id="appartamento-mobile" 
                className={`w-6 h-6 ${
                  value === 'appartamento' 
                    ? 'border-[#d8010c] text-[#d8010c]' 
                    : 'border-gray-300'
                }`} 
              />
            </div>
          </div>
          
          {/* Casa indipendente - Mobile */}
          <div 
            className={`relative rounded-2xl border-2 transition-all duration-300 cursor-pointer h-[120px] flex items-center ${
              value === 'casa indipendente' 
                ? 'border-[#d8010c] bg-gradient-to-br from-[#d8010c]/10 to-[#d8010c]/5 shadow-lg' 
                : 'border-gray-200 bg-white hover:border-[#d8010c]/30 hover:shadow-md'
            }`}
            onClick={() => onChange('casa indipendente')}
          >
            <div className="flex items-center justify-between w-full px-6">
              <div className="flex items-center space-x-4 flex-1">
                <div className={`p-3 rounded-xl ${
                  value === 'casa indipendente' 
                    ? 'bg-[#d8010c] text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  <Home className="h-8 w-8" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <Label 
                    htmlFor="casa-mobile" 
                    className="text-lg font-semibold text-gray-900 cursor-pointer block"
                  >
                    Casa indipendente
                  </Label>
                </div>
              </div>
              
              <RadioGroupItem 
                value="casa indipendente" 
                id="casa-mobile" 
                className={`w-6 h-6 ${
                  value === 'casa indipendente' 
                    ? 'border-[#d8010c] text-[#d8010c]' 
                    : 'border-gray-300'
                }`} 
              />
            </div>
          </div>
        </RadioGroup>
      </div>
      
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <RadioGroup 
          value={value} 
          onValueChange={onChange}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {/* Appartamento - Desktop */}
          <div 
            className={`group relative rounded-3xl border-2 p-8 lg:p-10 transition-all duration-300 cursor-pointer hover:scale-[1.02] ${
              value === 'appartamento' 
                ? 'border-[#d8010c] bg-gradient-to-br from-[#d8010c]/10 via-white to-[#d8010c]/5 shadow-xl' 
                : 'border-gray-200 bg-white hover:border-[#d8010c]/30 hover:shadow-lg'
            }`}
            onClick={() => onChange('appartamento')}
          >
            <div className="text-center space-y-6">
              <div className={`mx-auto w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                value === 'appartamento' 
                  ? 'bg-[#d8010c] text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-600 group-hover:bg-[#d8010c]/10 group-hover:text-[#d8010c]'
              }`}>
                <Building className="h-10 w-10" />
              </div>
              
              <div className="space-y-3">
                <Label 
                  htmlFor="appartamento-desktop" 
                  className="text-2xl lg:text-3xl font-bold text-gray-900 cursor-pointer block"
                >
                  Appartamento
                </Label>
                <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                  Condomini, attici e spazi condivisi
                </p>
              </div>
              
              <div className="flex justify-center">
                <RadioGroupItem 
                  value="appartamento" 
                  id="appartamento-desktop" 
                  className={`w-8 h-8 ${
                    value === 'appartamento' 
                      ? 'border-[#d8010c] text-[#d8010c]' 
                      : 'border-gray-300'
                  }`} 
                />
              </div>
            </div>
            
            {value === 'appartamento' && (
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#d8010c]/20 to-transparent pointer-events-none opacity-50"></div>
            )}
          </div>
          
          {/* Casa indipendente - Desktop */}
          <div 
            className={`group relative rounded-3xl border-2 p-8 lg:p-10 transition-all duration-300 cursor-pointer hover:scale-[1.02] ${
              value === 'casa indipendente' 
                ? 'border-[#d8010c] bg-gradient-to-br from-[#d8010c]/10 via-white to-[#d8010c]/5 shadow-xl' 
                : 'border-gray-200 bg-white hover:border-[#d8010c]/30 hover:shadow-lg'
            }`}
            onClick={() => onChange('casa indipendente')}
          >
            <div className="text-center space-y-6">
              <div className={`mx-auto w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                value === 'casa indipendente' 
                  ? 'bg-[#d8010c] text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-600 group-hover:bg-[#d8010c]/10 group-hover:text-[#d8010c]'
              }`}>
                <Home className="h-10 w-10" />
              </div>
              
              <div className="space-y-3">
                <Label 
                  htmlFor="casa-desktop" 
                  className="text-2xl lg:text-3xl font-bold text-gray-900 cursor-pointer block"
                >
                  Casa indipendente
                </Label>
                <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                  Ville, villette e abitazioni autonome
                </p>
              </div>
              
              <div className="flex justify-center">
                <RadioGroupItem 
                  value="casa indipendente" 
                  id="casa-desktop" 
                  className={`w-8 h-8 ${
                    value === 'casa indipendente' 
                      ? 'border-[#d8010c] text-[#d8010c]' 
                      : 'border-gray-300'
                  }`} 
                />
              </div>
            </div>
            
            {value === 'casa indipendente' && (
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#d8010c]/20 to-transparent pointer-events-none opacity-50"></div>
            )}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
