import { FormData } from "../../Configuratore";
import { StickyNavigationBar } from "../../shared/StickyNavigationBar";
import { Check, Plus, ChevronDown, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Slider } from "@/components/ui/slider";
import { InfoBox } from "../../shared/InfoBox";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const ConsumptionGoals = ({ formData, updateFormData, onNext, onBack }: Props) => {
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
    title: "Perché questa informazione è importante",
    content: "Conoscere il tuo obiettivo principale ci permette di dimensionare l'impianto in modo ottimale. Se punti al risparmio, ottimizzeremo per ridurre la bolletta. Se vuoi l'indipendenza energetica, progetteremo un impianto più grande per massimizzare l'autoconsumo."
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
              <h2 className="text-xl md:text-2xl font-medium text-[#1c1c1c]">Obiettivi consumi</h2>
            </div>
          </div>

          {/* Box informativo - collassabile su mobile e desktop */}
          <InfoBox
            title={infoBox.title}
            content={infoBox.content}
            isOpen={infoBoxOpen}
            onToggle={setInfoBoxOpen}
          />
          
          {/* Obiettivo principale */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-lg font-semibold text-[#1c1c1c] px-3 md:px-0">
              Qual è il tuo obiettivo principale?
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
          <div className="space-y-4 md:space-y-6 px-3 md:px-0">
            <div>
              <h3 className="text-lg font-semibold text-[#1c1c1c] mb-2">
                Quando consumi di più l'energia elettrica?
              </h3>
              <p className="text-xs text-gray-500 italic">
                Sposta il cursore per indicare se i tuoi consumi sono più concentrati durante il giorno o la sera
              </p>
            </div>
            
            <div className="space-y-4 bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between text-sm font-medium text-gray-700">
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4 text-yellow-500" />
                  <span>Giorno</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Sera</span>
                  <Moon className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <Slider
                value={consumoEnergetico}
                onValueChange={handleConsumoChange}
                max={100}
                min={0}
                step={10}
                className="w-full"
              />
              
              <div className="text-center text-sm text-gray-600">
                <span className="font-medium">
                  {consumoEnergetico[0]}% giorno - {100 - consumoEnergetico[0]}% sera
                </span>
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