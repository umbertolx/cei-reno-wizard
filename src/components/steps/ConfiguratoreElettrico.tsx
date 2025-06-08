
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
      {/* Badge Impianto Elettrico */}
      <div className="flex justify-center">
        <div className="bg-[#d8010c] text-white px-3 py-1.5 md:px-6 md:py-3 rounded-full text-sm font-medium">
          Impianto elettrico
        </div>
      </div>

      {/* Header principale */}
      <div className="space-y-2 md:space-y-3 mt-7 text-center mb-12 md:mb-16">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-[#d8010c] bg-opacity-20 rounded-full flex items-center justify-center">
            <Zap className="h-8 w-8 md:h-10 md:w-10 text-[#d8010c]" />
          </div>
        </div>
        
        <h1 className="text-[28px] md:text-[40px] font-bold text-[#1c1c1c] leading-[1.05]">
          Che tipo di <span className="text-[#d8010c]">intervento</span> stai pianificando?
        </h1>
        
        <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Seleziona il tipo di lavoro per ricevere una stima più precisa per l'impianto elettrico
        </p>
      </div>

      {/* Opzioni di risposta */}
      <div className="max-w-2xl mx-auto space-y-4 mb-8">
        <RadioGroup value={tipoRistrutturazione} onValueChange={setTipoRistrutturazione}>
          <div 
            className={`
              border-2 rounded-xl p-6 cursor-pointer transition-all duration-200
              ${tipoRistrutturazione === 'completa' 
                ? 'border-[#d8010c] bg-red-50' 
                : 'border-gray-200 hover:border-gray-300 bg-white'
              }
            `}
            onClick={() => setTipoRistrutturazione('completa')}
          >
            <div className="flex items-center space-x-4">
              <RadioGroupItem 
                value="completa" 
                id="completa" 
                className={`${tipoRistrutturazione === 'completa' ? 'border-[#d8010c] text-[#d8010c]' : ''}`}
              />
              <label htmlFor="completa" className="text-lg font-medium text-[#1c1c1c] cursor-pointer flex-1">
                Ristrutturazione completa
              </label>
            </div>
          </div>

          <div 
            className={`
              border-2 rounded-xl p-6 cursor-pointer transition-all duration-200
              ${tipoRistrutturazione === 'nuova' 
                ? 'border-[#d8010c] bg-red-50' 
                : 'border-gray-200 hover:border-gray-300 bg-white'
              }
            `}
            onClick={() => setTipoRistrutturazione('nuova')}
          >
            <div className="flex items-center space-x-4">
              <RadioGroupItem 
                value="nuova" 
                id="nuova" 
                className={`${tipoRistrutturazione === 'nuova' ? 'border-[#d8010c] text-[#d8010c]' : ''}`}
              />
              <label htmlFor="nuova" className="text-lg font-medium text-[#1c1c1c] cursor-pointer flex-1">
                Nuova costruzione
              </label>
            </div>
          </div>

          <div 
            className={`
              border-2 rounded-xl p-6 cursor-pointer transition-all duration-200
              ${tipoRistrutturazione === 'parziale' 
                ? 'border-[#d8010c] bg-red-50' 
                : 'border-gray-200 hover:border-gray-300 bg-white'
              }
            `}
            onClick={() => setTipoRistrutturazione('parziale')}
          >
            <div className="flex items-center space-x-4">
              <RadioGroupItem 
                value="parziale" 
                id="parziale" 
                className={`${tipoRistrutturazione === 'parziale' ? 'border-[#d8010c] text-[#d8010c]' : ''}`}
              />
              <label htmlFor="parziale" className="text-lg font-medium text-[#1c1c1c] cursor-pointer flex-1">
                Intervento parziale
              </label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Pulsanti di navigazione */}
      <div className="max-w-4xl md:mx-auto px-3 md:px-0 flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={onBack}
          variant="outline"
          className="flex-1 p-6 text-lg border-[#1c1c1c] text-[#1c1c1c] hover:bg-[#f4f4f4] rounded-xl flex items-center justify-center gap-2"
        >
          <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
          Indietro
        </Button>
        
        <Button 
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="
            flex-1 px-6 py-4 md:py-5
            text-base md:text-lg 
            bg-[#d8010c] hover:bg-[#b8000a]
            text-white 
            rounded-xl 
            flex items-center justify-center gap-2
            transition-all duration-300 
            shadow-sm hover:shadow-md
            min-h-[48px]
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          <span>Avanti</span>
          <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
      </div>
    </div>
  );
};
