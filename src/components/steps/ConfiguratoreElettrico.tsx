
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
  const [expandedItem, setExpandedItem] = useState<string>("");

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
      label: 'Ristrutturazione completa',
      description: 'Lavori sui pavimenti con demolizione del massetto o aggiunta di controsoffitti per il passaggio degli impianti'
    },
    {
      id: 'nuova',
      label: 'Nuova costruzione',
      description: 'Installazione completa dell\'impianto elettrico in una nuova costruzione'
    },
    {
      id: 'parziale',
      label: 'Intervento parziale',
      description: 'Modifica o ampliamento di parti specifiche dell\'impianto esistente'
    }
  ];

  const handleItemClick = (id: string) => {
    setTipoRistrutturazione(id);
    setExpandedItem(expandedItem === id ? "" : id);
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
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 px-3 md:px-0">
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
          
          {/* Layout a cascata con box espandibili */}
          <div className="space-y-3 md:space-y-4">
            {tipiIntervento.map((tipo, index) => {
              const isSelected = tipoRistrutturazione === tipo.id;
              const isExpanded = expandedItem === tipo.id;
              
              return (
                <Collapsible
                  key={tipo.id}
                  open={isExpanded}
                  onOpenChange={() => setExpandedItem(isExpanded ? "" : tipo.id)}
                >
                  <div
                    className={`
                      rounded-xl transition-all duration-300 border cursor-pointer
                      ${isSelected 
                        ? 'bg-[#d8010c]/5 border-[#d8010c] text-[#1c1c1c] shadow-sm' 
                        : 'bg-white border-gray-200 hover:border-[#d8010c] hover:shadow-sm'
                      }
                      ${index > 0 ? 'ml-4 md:ml-8' : ''} 
                      ${index > 1 ? 'ml-8 md:ml-16' : ''}
                    `}
                  >
                    <CollapsibleTrigger
                      onClick={() => handleItemClick(tipo.id)}
                      className="w-full p-4 text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-base text-[#1c1c1c]">
                            {tipo.label}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-3">
                          {isSelected && (
                            <div className="w-5 h-5 bg-[#d8010c] rounded-full flex items-center justify-center">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                          <ChevronDown 
                            className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`} 
                          />
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent className="px-4 pb-4">
                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {tipo.description}
                        </p>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
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
