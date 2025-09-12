
import { useState } from "react";
import { FormData } from "../Configuratore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowRight, ArrowLeft, Plus, Check, ChevronDown } from "lucide-react";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const TapparelleElettriche = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [elettrificareTapparelle, setElettrificareTapparelle] = useState<string>(formData.elettrificareTapparelle || "");
  const [numeroTapparelle, setNumeroTapparelle] = useState<number>(formData.numeroTapparelle || 0);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const handleSubmit = () => {
    updateFormData({ 
      elettrificareTapparelle,
      numeroTapparelle: elettrificareTapparelle === 'si' ? numeroTapparelle : undefined
    });
    onNext();
  };

  const isFormValid = elettrificareTapparelle !== "" && 
    (elettrificareTapparelle === 'no' || (elettrificareTapparelle === 'si' && numeroTapparelle > 0));

  const options = [
    { id: 'si', label: 'Sì' },
    { id: 'no', label: 'No' }
  ];

  return (
    <div className="space-y-6">
      {/* Badge */}
      <div className="flex justify-center">
        <div className="bg-[#d8010c] text-white px-3 py-1.5 md:px-6 md:py-3 rounded-full text-sm font-medium">
          Impianto elettrico
        </div>
      </div>

      {/* Contenuto principale */}
      <div className="max-w-4xl md:mx-auto space-y-6 md:space-y-8 mt-8 md:mt-16">
        <div className="space-y-4 md:space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4 px-3 md:px-0">
            <div className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] flex-shrink-0 flex items-center justify-center">
              <img 
                src="/lovable-uploads/c7408342-e29b-40fb-a65e-1c92eca62469.png"
                alt="Electrical work icon"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-medium text-[#1c1c1c]">
                Vuoi elettrificare le tapparelle?
              </h2>
            </div>
          </div>

          {/* Box informativo collassabile su mobile */}
          <Collapsible open={isInfoOpen} onOpenChange={setIsInfoOpen}>
            <CollapsibleTrigger className="w-full md:hidden">
              <div className="bg-transparent border-dashed border border-[#d8010c] rounded-lg p-4 hover:bg-yellow-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Plus className="h-5 w-5 flex-shrink-0" color="#d8010c" strokeWidth={3} />
                      <span className="text-sm font-medium text-black text-left uppercase">
                        Come funziona l'elettrificazione delle tapparelle
                      </span>
                    </div>
                  </div>
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent className="md:block">
              <div className="bg-transparent border-dashed border border-[#d8010c] rounded-lg p-4 md:mt-0 mt-0">
                <div className="flex items-start gap-3">
                  <Plus className="h-5 w-5 text-black flex-shrink-0 fill-black mt-0.5 hidden md:block" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1 hidden md:block">Come funziona l'elettrificazione delle tapparelle</p>
                    <p>
                      Per elettrificare le tapparelle è necessario creare delle tracce murarie per far passare i cavi elettrici fino ai motori. 
                      In base al numero di finestre che hai indicato, stimeremo un percorso ottimale per minimizzare i lavori e i costi, 
                      considerando la disposizione degli ambienti e la posizione del quadro elettrico.
                    </p>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Opzioni Sì/No */}
          <div className="space-y-3 md:space-y-4">
            {options.map((option) => {
              const isSelected = elettrificareTapparelle === option.id;
              
              return (
                <div
                  key={option.id}
                  onClick={() => setElettrificareTapparelle(option.id)}
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
                        {option.label}
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

          {/* Campo numero tapparelle - mostrato solo se selezionato "Sì" */}
          {elettrificareTapparelle === 'si' && (
            <div className="space-y-2">
              <Label htmlFor="numeroTapparelle" className="text-base font-medium text-[#1c1c1c]">
                Quante tapparelle vuoi elettrificare?
              </Label>
              <Input
                id="numeroTapparelle"
                type="number"
                min="1"
                max="50"
                value={numeroTapparelle || ""}
                onChange={(e) => setNumeroTapparelle(parseInt(e.target.value) || 0)}
                placeholder="Es. 5"
                className="text-base h-12"
              />
            </div>
          )}
        </div>
      </div>

      {/* Pulsanti di navigazione */}
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
