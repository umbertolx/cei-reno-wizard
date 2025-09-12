import { FormData } from "../Configuratore";
import { StickyNavigationBar } from "../shared/StickyNavigationBar";
import { Check, Plus, ChevronDown, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Slider } from "@/components/ui/slider";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const ObiettiviConsumi = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [infoBoxOpen, setInfoBoxOpen] = useState(false);
  
  const obiettivoPrincipale = formData.moduloFotovoltaico?.obiettivoPrincipale || "";
  const consumoEnergetico = formData.moduloFotovoltaico?.consumoEnergetico || [50];

  const obiettivoOptions = [
    { id: "risparmio-bolletta", label: "Risparmio in bolletta" },
    { id: "indipendenza-energetica", label: "Indipendenza energetica" }
  ];

  const handleObiettivoChange = (value: string) => {
    updateFormData({ 
      moduloFotovoltaico: { 
        ...formData.moduloFotovoltaico, 
        obiettivoPrincipale: value 
      } 
    });
  };

  const handleConsumoChange = (value: number[]) => {
    updateFormData({ 
      moduloFotovoltaico: { 
        ...formData.moduloFotovoltaico, 
        consumoEnergetico: value 
      } 
    });
  };

  const canProceed = obiettivoPrincipale;

  const handleNext = () => {
    if (canProceed) {
      onNext();
    }
  };

  const renderOptionButton = (option: any, isSelected: boolean, onClick: () => void) => (
    <div
      key={option.id}
      onClick={onClick}
      className={`
        rounded-xl transition-all duration-300 border cursor-pointer p-4 mx-3 md:mx-0
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

  const infoBox = {
    title: "Informazioni su obiettivi e consumi",
    content: "Queste informazioni ci aiutano a dimensionare correttamente il tuo impianto fotovoltaico in base alle tue esigenze specifiche e ai tuoi pattern di consumo energetico."
  };

  return (
    <div className="space-y-6">
      {/* Badge */}
      <div className="flex justify-center">
        <div className="bg-[#d8010c] text-white px-3 py-1.5 md:px-6 md:py-3 rounded-full text-sm font-medium">
          Impianto fotovoltaico
        </div>
      </div>

      {/* Contenuto principale */}
      <div className="max-w-4xl md:mx-auto space-y-6 md:space-y-8 mt-8 md:mt-16">
        <div className="space-y-4 md:space-y-6">
          {/* Header - Layout responsive */}
          <div className="flex items-center gap-4 px-3 md:px-0">
            <div className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] flex-shrink-0 flex items-center justify-center">
              <img 
                src="/lovable-uploads/4d476208-9875-4160-a9cd-6af03be67b0b.png"
                alt="House icon"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-medium text-[#1c1c1c]">Obiettivi e consumi</h2>
            </div>
          </div>

          {/* Box informativo - collassabile su mobile e desktop */}
          <div>
            <Collapsible open={infoBoxOpen} onOpenChange={setInfoBoxOpen}>
              <CollapsibleTrigger className="w-full">
                <div className="bg-transparent border border-yellow-200 rounded-xl p-4 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Plus className="h-5 w-5 flex-shrink-0" color="#d8010c" strokeWidth={3} />
                      <span className="text-sm font-medium text-yellow-800 text-left">
                        {infoBox.title}
                      </span>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-yellow-600 transition-transform duration-200 ${infoBoxOpen ? 'rotate-180' : ''}`} />
                  </div>
                  {infoBoxOpen && (
                    <div className="mt-3 pt-3 border-t border-yellow-200">
                      <p className="text-sm text-yellow-800 text-left">
                        {infoBox.content}
                      </p>
                    </div>
                  )}
                </div>
              </CollapsibleTrigger>
            </Collapsible>
          </div>
          
          {/* Obiettivo principale */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-lg font-semibold text-[#1c1c1c] px-3 md:px-0">
              Qual è il tuo obiettivo principale con il fotovoltaico?
            </h3>
            {obiettivoOptions.map((option) =>
              renderOptionButton(
                option,
                obiettivoPrincipale === option.id,
                () => handleObiettivoChange(option.id)
              )
            )}
          </div>

          {/* Consumo energetico */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-lg font-semibold text-[#1c1c1c] px-3 md:px-0">
              Quando consumi più energia in casa?
            </h3>
            
            <div className="px-3 md:px-0">
              <div className="space-y-8">
                {/* Slider */}
                <div className="px-4 py-2">
                  <Slider
                    value={consumoEnergetico}
                    onValueChange={handleConsumoChange}
                    max={100}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                </div>
                
                {/* Labels e percentuali */}
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <Sun className="h-5 w-5 text-yellow-500" />
                    <div className="text-center">
                      <div className="text-sm font-medium text-[#1c1c1c]">Giorno</div>
                      <div className="text-lg font-bold text-[#d8010c]">{consumoEnergetico[0]}%</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="text-center">
                      <div className="text-sm font-medium text-[#1c1c1c]">Sera</div>
                      <div className="text-lg font-bold text-[#d8010c]">{100 - consumoEnergetico[0]}%</div>
                    </div>
                    <Moon className="h-5 w-5 text-indigo-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pulsanti di navigazione */}
      <StickyNavigationBar
        onBack={onBack}
        onNext={handleNext}
        isNextDisabled={!canProceed}
        nextButtonText="Avanti"
        backButtonText="Indietro"
      />
    </div>
  );
};