import { useState } from "react";
import { FormData } from "../../Configuratore";
import { QuestionStepLayout } from "../../templates";
import { Sun, Moon } from "lucide-react";
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

  const handleSelectionChange = (value: string) => {
    handleObiettivoChange(value);
  };

  const infoBox = {
    title: "Perché questa informazione è importante",
    content: "Conoscere il tuo obiettivo principale ci permette di dimensionare l'impianto in modo ottimale. Se punti al risparmio, ottimizzeremo per ridurre la bolletta. Se vuoi l'indipendenza energetica, progetteremo un impianto più grande per massimizzare l'autoconsumo."
  };

  // Seconda domanda sempre visibile, non condizionale
  const additionalContent = (
    <div className="space-y-4 md:space-y-6 px-3 md:px-0">
      {/* Header con stile del titolo principale */}
      <div className="space-y-3">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#1c1c1c] leading-tight">
          Quando consumi di più l'energia elettrica?
        </h1>
        <div className="w-full h-px bg-gray-200"></div>
        <p className="text-sm md:text-base text-[#1c1c1c] opacity-75 mt-3">
          Sposta il cursore per indicare se i tuoi consumi sono più concentrati durante il giorno o la sera
        </p>
      </div>

      {/* InfoBox con stato gestito correttamente */}
      <InfoBox
        title="Perché è importante?"
        content="Conoscere i tuoi orari di consumo è fondamentale per stimare se ha senso installare una batteria di accumulo e di che potenza. Se l'energia viene consumata principalmente durante il giorno, quando i pannelli fotovoltaici producono, l'autoconsumo è già ottimizzato. Se invece l'energia viene utilizzata prevalentemente la sera, quando i pannelli hanno produzione quasi zero, diventa essenziale valutare un sistema di accumulo per immagazzinare l'energia prodotta di giorno e utilizzarla quando serve."
        isOpen={infoBoxOpen}
        onToggle={setInfoBoxOpen}
      />
      
      {/* Contenuto senza bordo */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 px-3 py-2 bg-transparent rounded-full border border-black">
            <Sun className="h-5 w-5 text-black" />
            <span className="text-sm font-semibold text-black">Giorno</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 bg-transparent rounded-full border border-black">
            <span className="text-sm font-semibold text-black">Sera</span>
            <Moon className="h-5 w-5 text-black" />
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
        
        <div className="text-center text-sm text-black">
          <span className="font-medium uppercase">
            {consumoEnergetico[0]}% GIORNO | {100 - consumoEnergetico[0]}% SERA
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <QuestionStepLayout
      badge="Impianto fotovoltaico"
      title="Obiettivi consumi"
      description="Qual è il tuo obiettivo principale?"
      infoBox={infoBox}
      options={obiettivoOptions}
      selectedValue={obiettivoPrincipale}
      onSelectionChange={handleSelectionChange}
      conditionalContent={additionalContent}
      onNext={onNext}
      onBack={onBack}
    />
  );
};