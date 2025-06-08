
import { useState } from "react";
import { FormData } from "../Configuratore";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, ArrowLeft, Zap } from "lucide-react";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const ConfiguratoreElettrico = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [tipoRistrutturazione, setTipoRistrutturazione] = useState<string>(formData.tipoRistrutturazione || "");

  const handleSubmit = () => {
    updateFormData({ 
      tipoRistrutturazione 
    });
    onNext();
  };

  const isFormValid = tipoRistrutturazione !== "";

  return (
    <div className="space-y-4">
      {/* Badge Impianti Civili */}
      <div className="flex justify-center">
        <div className="bg-[#d8010c] text-white px-3 py-1.5 md:px-6 md:py-3 rounded-full text-sm font-medium">
          Impianti Civili
        </div>
      </div>

      {/* Header principale */}
      <div className="space-y-2 md:space-y-3 mt-7 text-center mb-12 md:mb-16">
        <h1 className="text-[28px] md:text-[40px] font-bold text-[#1c1c1c] leading-[1.05]">
          <span className="md:inline">Configuratore</span>
          <span className="text-[#d8010c] md:inline"> elettrico</span>
        </h1>
        
        <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Configura il tuo impianto elettrico rispondendo a poche domande. <br className="hidden md:block" />
          Ti aiuteremo a creare un preventivo personalizzato e preciso.
        </p>
      </div>

      {/* Contenuto principale */}
      <div className="max-w-4xl md:mx-auto space-y-6 md:space-y-8">
        {/* Card della domanda */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-start gap-4 md:gap-6">
            <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="h-6 w-6 md:h-8 md:w-8 text-white" />
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-bold text-[#1c1c1c] mb-3 leading-tight">
                Stai ristrutturando completamente il tuo immobile?
              </h2>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Una ristrutturazione completa prevede lavori sui pavimenti con demolizione del massetto o l'aggiunta di controsoffitti
              </p>
            </div>
          </div>
        </div>

        {/* Opzioni di risposta */}
        <div className="space-y-4 md:space-y-5">
          <RadioGroup value={tipoRistrutturazione} onValueChange={setTipoRistrutturazione}>
            <div 
              className={`
                group border-2 rounded-2xl p-4 md:p-6 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md
                ${tipoRistrutturazione === 'completa' 
                  ? 'border-[#d8010c] bg-gradient-to-br from-red-50 to-pink-50 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                }
              `}
              onClick={() => setTipoRistrutturazione('completa')}
            >
              <div className="flex items-center space-x-4">
                <RadioGroupItem 
                  value="completa" 
                  id="completa" 
                  className={`border-2 ${tipoRistrutturazione === 'completa' ? 'border-[#d8010c] text-[#d8010c]' : 'border-gray-400'}`}
                />
                <label htmlFor="completa" className="text-base md:text-lg font-semibold text-[#1c1c1c] cursor-pointer flex-1">
                  Sì, è una ristrutturazione completa
                </label>
              </div>
            </div>

            <div 
              className={`
                group border-2 rounded-2xl p-4 md:p-6 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md
                ${tipoRistrutturazione === 'nuova' 
                  ? 'border-[#d8010c] bg-gradient-to-br from-red-50 to-pink-50 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                }
              `}
              onClick={() => setTipoRistrutturazione('nuova')}
            >
              <div className="flex items-center space-x-4">
                <RadioGroupItem 
                  value="nuova" 
                  id="nuova" 
                  className={`border-2 ${tipoRistrutturazione === 'nuova' ? 'border-[#d8010c] text-[#d8010c]' : 'border-gray-400'}`}
                />
                <label htmlFor="nuova" className="text-base md:text-lg font-semibold text-[#1c1c1c] cursor-pointer flex-1">
                  È una nuova costruzione
                </label>
              </div>
            </div>

            <div 
              className={`
                group border-2 rounded-2xl p-4 md:p-6 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md
                ${tipoRistrutturazione === 'parziale' 
                  ? 'border-[#d8010c] bg-gradient-to-br from-red-50 to-pink-50 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                }
              `}
              onClick={() => setTipoRistrutturazione('parziale')}
            >
              <div className="flex items-center space-x-4">
                <RadioGroupItem 
                  value="parziale" 
                  id="parziale" 
                  className={`border-2 ${tipoRistrutturazione === 'parziale' ? 'border-[#d8010c] text-[#d8010c]' : 'border-gray-400'}`}
                />
                <label htmlFor="parziale" className="text-base md:text-lg font-semibold text-[#1c1c1c] cursor-pointer flex-1">
                  No, è solo un intervento parziale
                </label>
              </div>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Pulsanti di navigazione */}
      <div className="max-w-4xl md:mx-auto flex gap-3 md:gap-4 mt-8 px-3 md:px-0">
        <Button 
          onClick={onBack}
          variant="outline"
          className="
            flex-1 md:flex-none md:px-8 py-4 md:py-5
            text-base md:text-lg 
            border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400
            rounded-xl 
            flex items-center justify-center gap-2
            transition-all duration-300
            min-h-[48px] md:min-h-[56px]
            font-medium
          "
        >
          <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
          <span>Indietro</span>
        </Button>
        
        <Button 
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="
            flex-1 md:flex-auto px-6 py-4 md:py-5
            text-base md:text-lg 
            bg-[#d8010c] hover:bg-[#b8000a]
            text-white 
            rounded-xl 
            flex items-center justify-center gap-2
            transition-all duration-300 
            shadow-sm hover:shadow-md
            disabled:opacity-50 disabled:cursor-not-allowed
            min-h-[48px] md:min-h-[56px]
            font-medium
          "
        >
          <span>Avanti</span>
          <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
      </div>
    </div>
  );
};
