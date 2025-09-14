import { useState } from "react";
import { FormData } from "../../Configuratore";
import { QuestionStepLayout } from "../../templates";
import { Slider } from "@/components/ui/slider";
import { InfoBox } from "../../shared/InfoBox";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const ExpansionGoals = ({ formData, updateFormData, onNext, onBack }: Props) => {
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

  const handleSelectionChange = (value: string) => {
    handleObiettivoChange(value);
  };

  const infoBox = {
    title: "Perché questa informazione è importante",
    content: "Conoscere il tuo obiettivo di ampliamento ci permette di calcolare la potenza aggiuntiva necessaria. Se il tuo impianto attuale copre già una buona parte dei consumi, potremo ottimizzare l'ampliamento per i tuoi obiettivi specifici."
  };

  // Seconda domanda sempre visibile, non condizionale
  const additionalContent = (
    <div className="space-y-4 md:space-y-6 px-3 md:px-0">
      {/* Header con stile del titolo principale */}
      <div className="space-y-3">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#1c1c1c] leading-tight">
          Che percentuale dei tuoi consumi copre attualmente l'impianto?
        </h1>
        <div className="w-full h-px bg-gray-200"></div>
        <p className="text-sm md:text-base text-[#1c1c1c] opacity-75 mt-3">
          Indica approssimativamente quanto del tuo fabbisogno energetico è coperto dall'impianto attuale
        </p>
      </div>

      {/* InfoBox con stato gestito correttamente */}
      <InfoBox
        title="Perché è importante?"
        content="Conoscere la percentuale di copertura attuale ci permette di dimensionare correttamente l'ampliamento dell'impianto fotovoltaico. Se l'impianto esistente copre già una buona parte dei consumi, l'ampliamento sarà calibrato per raggiungere i tuoi obiettivi specifici senza sovradimensionare il sistema."
        isOpen={infoBoxOpen}
        onToggle={setInfoBoxOpen}
      />
      
      {/* Contenuto senza bordo */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-sm font-medium text-black">
          <span>0%</span>
          <span>100%</span>
        </div>
        
        <Slider
          value={percentualeCopertura}
          onValueChange={handleCoperturaChange}
          max={100}
          min={0}
          step={5}
          className="w-full"
        />
        
        <div className="text-center text-sm text-black">
          <span className="font-medium uppercase">
            {percentualeCopertura[0]}% DEI CONSUMI ATTUALMENTE COPERTI
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <QuestionStepLayout
      badge="Ampliamento fotovoltaico"
      title="Obiettivi ampliamento"
      description="Qual è il tuo obiettivo con questo ampliamento?"
      infoBox={infoBox}
      options={obiettivoOptions}
      selectedValue={obiettivoAmpliamento}
      onSelectionChange={handleSelectionChange}
      conditionalContent={additionalContent}
      onNext={onNext}
      onBack={onBack}
    />
  );
};