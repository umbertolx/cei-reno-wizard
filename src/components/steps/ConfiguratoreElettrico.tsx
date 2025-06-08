
import { useState } from "react";
import { FormData } from "../Configuratore";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, ArrowLeft, Home } from "lucide-react";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const ConfiguratoreElettrico = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [tipoRistrutturazione, setTipoRistrutturazione] = useState<string>("");

  const handleSubmit = () => {
    // Aggiorna i dati del form con la risposta
    updateFormData({ 
      // Aggiungeremo questo campo al FormData type se necessario
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

      {/* Progress indicators */}
      <div className="flex justify-center items-center space-x-4 md:space-x-8 mb-8">
        {/* Info generali - completato */}
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 bg-[#d8010c] rounded-full flex items-center justify-center mb-2">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
          <div className="h-0.5 w-12 md:w-16 bg-[#d8010c]"></div>
          <span className="text-xs text-[#d8010c] font-medium mt-1">Info generali</span>
        </div>

        {/* Configuratore - attivo */}
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 bg-[#fcec3c] rounded-full flex items-center justify-center mb-2">
            <div className="w-3 h-3 bg-black rounded-full"></div>
          </div>
          <div className="h-0.5 w-12 md:w-16 bg-[#fcec3c]"></div>
          <span className="text-xs text-black font-medium mt-1">Configuratore</span>
        </div>

        {/* Stima finale - da completare */}
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mb-2">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
          <span className="text-xs text-gray-500 font-medium mt-1">Stima finale</span>
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-8 md:mb-12">
        <p className="text-sm md:text-base text-gray-600 italic mb-4">
          Configura il tuo impianto elettrico. Rispondi alle domande per ottenere un preventivo personalizzato.
        </p>
      </div>

      {/* Contenuto principale */}
      <div className="max-w-4xl md:mx-auto space-y-6">
        {/* Card della domanda */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 md:p-6">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Home className="h-6 w-6 text-blue-600" />
            </div>
            
            <div className="flex-1">
              <h2 className="text-lg md:text-xl font-bold text-[#1c1c1c] mb-2">
                Stai ristrutturando completamente il tuo immobile?
              </h2>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                Una ristrutturazione completa prevede lavori sui pavimenti con demolizione del massetto o l'aggiunta di controsoffitti
              </p>
            </div>
          </div>
        </div>

        {/* Opzioni di risposta */}
        <div className="space-y-3">
          <RadioGroup value={tipoRistrutturazione} onValueChange={setTipoRistrutturazione}>
            <div 
              className={`
                border rounded-xl p-4 transition-all duration-200 cursor-pointer
                ${tipoRistrutturazione === 'completa' ? 'border-[#d8010c] bg-[#d8010c]/5' : 'border-gray-200 hover:border-gray-300'}
              `}
              onClick={() => setTipoRistrutturazione('completa')}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="completa" id="completa" className="border-[#d8010c] text-[#d8010c]" />
                <label htmlFor="completa" className="text-sm md:text-base font-medium text-[#1c1c1c] cursor-pointer flex-1">
                  Sì, è una ristrutturazione completa
                </label>
              </div>
            </div>

            <div 
              className={`
                border rounded-xl p-4 transition-all duration-200 cursor-pointer
                ${tipoRistrutturazione === 'nuova' ? 'border-[#d8010c] bg-[#d8010c]/5' : 'border-gray-200 hover:border-gray-300'}
              `}
              onClick={() => setTipoRistrutturazione('nuova')}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="nuova" id="nuova" className="border-[#d8010c] text-[#d8010c]" />
                <label htmlFor="nuova" className="text-sm md:text-base font-medium text-[#1c1c1c] cursor-pointer flex-1">
                  È una nuova costruzione
                </label>
              </div>
            </div>

            <div 
              className={`
                border rounded-xl p-4 transition-all duration-200 cursor-pointer
                ${tipoRistrutturazione === 'parziale' ? 'border-[#d8010c] bg-[#d8010c]/5' : 'border-gray-200 hover:border-gray-300'}
              `}
              onClick={() => setTipoRistrutturazione('parziale')}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="parziale" id="parziale" className="border-[#d8010c] text-[#d8010c]" />
                <label htmlFor="parziale" className="text-sm md:text-base font-medium text-[#1c1c1c] cursor-pointer flex-1">
                  No, è solo un intervento parziale
                </label>
              </div>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Pulsanti di navigazione */}
      <div className="max-w-4xl md:mx-auto flex gap-3 mt-8">
        <Button 
          onClick={onBack}
          variant="outline"
          className="
            flex-1 md:flex-none md:px-8 py-4 md:py-5
            text-base md:text-lg 
            border-gray-300 text-gray-700 hover:bg-gray-50
            rounded-xl 
            flex items-center justify-center gap-2
            transition-all duration-300
            min-h-[48px]
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
            min-h-[48px]
          "
        >
          <span>Ricomincìa</span>
          <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
      </div>
    </div>
  );
};
