import { useState } from "react";
import { FormData } from "../Configuratore";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Info } from "lucide-react";
import { Check } from "lucide-react";

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

  const tipiIntervento = [
    {
      id: 'completa',
      label: 'Ristrutturazione completa'
    },
    {
      id: 'nuova',
      label: 'Nuova costruzione'
    },
    {
      id: 'parziale',
      label: 'Intervento parziale'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Badge Impianto Elettrico */}
      <div className="flex justify-center">
        <div className="bg-[#d8010c] text-white px-3 py-1.5 md:px-6 md:py-3 rounded-full text-sm font-medium">
          Impianto elettrico
        </div>
      </div>

      {/* Contenuto principale */}
      <div className="max-w-4xl md:mx-auto space-y-6 md:space-y-8 mt-12 md:mt-16">
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center gap-4 px-3 md:px-0">
            <div className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] flex-shrink-0 flex items-center justify-center">
              <img 
                src="/lovable-uploads/c7408342-e29b-40fb-a65e-1c92eca62469.png" 
                alt="Electrical work icon" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-medium text-[#1c1c1c]">Tipo di intervento</h2>
              <p className="text-sm md:text-base text-gray-600 mt-1">
                Scegli il tipo di lavoro che meglio descrive il tuo progetto elettrico
              </p>
            </div>
          </div>

          {/* Box informativo giallo */}
          <div className="px-3 md:px-0">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">Cosa comporta una ristrutturazione completa?</p>
                  <p>Una ristrutturazione completa prevede lavori sui pavimenti con demolizione del massetto o l'aggiunta di controsoffitti per il passaggio degli impianti.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3 md:space-y-4">
            {tipiIntervento.map((tipo) => {
              const isSelected = tipoRistrutturazione === tipo.id;
              
              return (
                <div
                  key={tipo.id}
                  onClick={() => setTipoRistrutturazione(tipo.id)}
                  className={`
                    p-4 rounded-xl transition-all duration-300 border cursor-pointer
                    ${isSelected 
                      ? 'bg-[#d8010c]/5 border-[#d8010c] text-[#1c1c1c] shadow-sm' 
                      : 'bg-white border-gray-200 hover:border-[#d8010c] hover:shadow-sm'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left flex-1 min-w-0">
                      <div className="font-semibold text-base text-[#1c1c1c]">
                        {tipo.label}
                      </div>
                    </div>
                    {isSelected && (
                      <div className="ml-3 flex-shrink-0">
                        <div className="w-5 h-5 bg-[#d8010c] rounded-full flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pulsanti di navigazione */}
      <div className="max-w-4xl md:mx-auto px-3 md:px-0 flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={onBack}
          variant="outline"
          className="flex-1 py-4 md:py-5 text-base md:text-lg border-[#1c1c1c] text-[#1c1c1c] hover:bg-[#f4f4f4] rounded-xl flex items-center justify-center gap-2"
        >
          <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
          Indietro
        </Button>
        
        <Button 
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="
            flex-1 py-4 md:py-5
            text-base md:text-lg 
            bg-[#d8010c] hover:bg-[#b8000a]
            text-white 
            rounded-xl 
            flex items-center justify-center gap-2
            transition-all duration-300 
            shadow-sm hover:shadow-md
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
