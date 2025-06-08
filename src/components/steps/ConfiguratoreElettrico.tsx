
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
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header con titolo principale */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1c1c1c]">
          Configuratore <span className="text-[#d8010c]">elettrico</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Configura il tuo impianto elettrico rispondendo a poche domande.<br />
          Ti aiuteremo a creare un preventivo personalizzato e preciso.
        </p>
      </div>

      {/* Contenuto principale */}
      <div className="space-y-8">
        {/* Domanda principale */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <Zap className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1c1c1c]">
              Stai ristrutturando completamente il tuo immobile?
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Una ristrutturazione completa prevede lavori sui pavimenti con demolizione del massetto o l'aggiunta di controsoffitti
            </p>
          </div>
        </div>

        {/* Opzioni di risposta */}
        <div className="max-w-2xl mx-auto space-y-4">
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
                  Sì, è una ristrutturazione completa
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
                  È una nuova costruzione
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
                  No, è solo un intervento parziale
                </label>
              </div>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Pulsanti di navigazione */}
      <div className="flex gap-4 justify-center pt-8">
        <Button 
          onClick={onBack}
          variant="outline"
          className="px-8 py-3 text-gray-700 border-gray-300 hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Indietro
        </Button>
        
        <Button 
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="px-8 py-3 bg-[#d8010c] hover:bg-[#b8000a] text-white disabled:opacity-50"
        >
          Avanti
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};
