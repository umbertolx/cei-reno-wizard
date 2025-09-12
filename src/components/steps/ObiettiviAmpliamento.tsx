import { FormData } from "../Configuratore";
import { StickyNavigationBar } from "../shared/StickyNavigationBar";
import { Check, Plus, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Slider } from "@/components/ui/slider";
import { InfoBox } from "../shared/InfoBox";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const ObiettiviAmpliamento = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [infoBoxOpen, setInfoBoxOpen] = useState(false);
  
  const obiettivoAmpliamento = formData.moduloFotovoltaico?.obiettivoAmpliamento || "";
  const percentualeCopertura = formData.moduloFotovoltaico?.percentualeCopertura || [50];

  const obiettivoOptions = [
    { id: "risparmio-bolletta", label: "Risparmiare di più in bolletta" },
    { id: "indipendenza-energetica", label: "Indipendenza energetica" }
  ];

  const handleObiettivoChange = (value: string) => {
    updateFormData({ 
      moduloFotovoltaico: { 
        ...formData.moduloFotovoltaico, 
        obiettivoAmpliamento: value 
      } 
    });
  };

  const handleCoperturaChange = (value: number[]) => {
    updateFormData({ 
      moduloFotovoltaico: { 
        ...formData.moduloFotovoltaico, 
        percentualeCopertura: value 
      } 
    });
  };

  const canProceed = obiettivoAmpliamento;

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
    title: "Informazioni sull'ampliamento",
    content: "Queste informazioni ci aiutano a dimensionare correttamente l'ampliamento del tuo impianto fotovoltaico in base alle tue esigenze attuali e agli obiettivi di miglioramento."
  };

  return (
    <div className="space-y-6">
      {/* Badge */}
      <div className="flex justify-center">
        <div className="bg-[#d8010c] text-white px-3 py-1.5 md:px-6 md:py-3 rounded-full text-sm font-medium">
          Ampliamento fotovoltaico
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
              <h2 className="text-xl md:text-2xl font-medium text-[#1c1c1c]">Obiettivi ampliamento</h2>
            </div>
          </div>

          {/* Box informativo - collassabile su mobile e desktop */}
          <InfoBox
            title={infoBox.title}
            content={infoBox.content}
            isOpen={infoBoxOpen}
            onToggle={setInfoBoxOpen}
          />
          
          {/* Obiettivo ampliamento */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-lg font-semibold text-[#1c1c1c] px-3 md:px-0">
              Qual è il tuo obiettivo con l'ampliamento?
            </h3>
            {obiettivoOptions.map((option) =>
              renderOptionButton(
                option,
                obiettivoAmpliamento === option.id,
                () => handleObiettivoChange(option.id)
              )
            )}
          </div>

          {/* Percentuale copertura attuale */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-lg font-semibold text-[#1c1c1c] px-3 md:px-0">
              Con l'impianto attuale, che percentuale dei tuoi consumi riesci a coprire?
            </h3>
            <p className="text-sm text-gray-600 px-3 md:px-0">
              Inserisci % consumi coperta da impianto fotovoltaico
            </p>
            
            <div className="px-3 md:px-0">
              <div className="space-y-8">
                {/* Slider */}
                <div className="px-4 py-2">
                  <Slider
                    value={percentualeCopertura}
                    onValueChange={handleCoperturaChange}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                </div>
                
                {/* Percentuale visualizzata */}
                <div className="flex justify-center">
                  <div className="text-center">
                    <div className="text-sm font-medium text-[#1c1c1c]">Copertura attuale</div>
                    <div className="text-2xl font-bold text-[#d8010c]">{percentualeCopertura[0]}%</div>
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