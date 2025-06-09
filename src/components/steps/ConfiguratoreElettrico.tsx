
import { useState } from "react";
import { FormData } from "../Configuratore";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Info, ChevronDown } from "lucide-react";
import { Check } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const ConfiguratoreElettrico = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [tipoRistrutturazione, setTipoRistrutturazione] = useState<string>(formData.tipoRistrutturazione || "");
  const [infoBoxOpen, setInfoBoxOpen] = useState<boolean>(false);

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

  const handleItemClick = (id: string) => {
    setTipoRistrutturazione(id);
  };

  return (
    <div className="space-y-6">
      {/* Badge Impianto Elettrico */}
      <div className="flex justify-center">
        <div className="bg-[#d8010c] text-white px-3 py-1.5 md:px-6 md:py-3 rounded-full text-sm font-medium">
          Impianto elettrico
        </div>
      </div>

      {/* Contenuto principale */}
      <div className="max-w-4xl md:mx-auto space-y-6 md:space-y-8 mt-8 md:mt-16">
        <div className="space-y-4 md:space-y-6">
          {/* Header - Layout responsive come nelle pagine precedenti */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] flex-shrink-0 flex items-center justify-center mx-auto md:mx-0">
              <img 
                src="/lovable-uploads/c7408342-e29b-40fb-a65e-1c92eca62469.png" 
                alt="Electrical work icon" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-medium text-[#1c1c1c]">Tipo di intervento</h2>
              <p className="text-sm md:text-base text-gray-600 mt-1">
                Scegli il tipo di lavoro che meglio descrive il tuo progetto elettrico
              </p>
            </div>
          </div>

          {/* Box informativo - collassabile su mobile, sempre aperto su desktop */}
          <div>
            {/* Versione mobile - collassabile */}
            <div className="block md:hidden">
              <Collapsible open={infoBoxOpen} onOpenChange={setInfoBoxOpen}>
                <CollapsibleTrigger className="w-full">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Info className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                        <span className="text-sm font-medium text-yellow-800 text-left">
                          Cosa comporta una ristrutturazione completa?
                        </span>
                      </div>
                      <ChevronDown className={`h-4 w-4 text-yellow-600 transition-transform duration-200 ${infoBoxOpen ? 'rotate-180' : ''}`} />
                    </div>
                    {infoBoxOpen && (
                      <div className="mt-3 pt-3 border-t border-yellow-200">
                        <p className="text-sm text-yellow-800 text-left">
                          Una ristrutturazione completa prevede lavori sui pavimenti con demolizione del massetto o l'aggiunta di controsoffitti per il passaggio degli impianti.
                        </p>
                      </div>
                    )}
                  </div>
                </CollapsibleTrigger>
              </Collapsible>
            </div>

            {/* Versione desktop - sempre aperto */}
            <div className="hidden md:block">
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
          </div>
          
          {/* Opzioni uniformi senza cascata */}
          <div className="space-y-3 md:space-y-4">
            {tipiIntervento.map((tipo) => {
              const isSelected = tipoRistrutturazione === tipo.id;
              
              return (
                <div
                  key={tipo.id}
                  onClick={() => handleItemClick(tipo.id)}
                  className={`
                    rounded-xl transition-all duration-300 border cursor-pointer p-4
                    ${isSelected 
                      ? 'bg-[#d8010c]/5 border-[#d8010c] text-[#1c1c1c] shadow-sm' 
                      : 'bg-white border-gray-200 hover:border-[#d8010c] hover:shadow-sm'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-base text-[#1c1c1c]">
                        {tipo.label}
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 bg-[#d8010c] rounded-full flex items-center justify-center ml-3">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pulsanti di navigazione uniformi */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <Button 
          onClick={onBack}
          variant="outline"
          className="flex-1 h-12 text-base font-medium border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center justify-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Indietro
        </Button>
        
        <Button 
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="
            flex-1 h-12
            text-base font-medium
            bg-[#d8010c] hover:bg-[#b8000a]
            text-white 
            rounded-lg 
            flex items-center justify-center gap-2
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          <span>Avanti</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
