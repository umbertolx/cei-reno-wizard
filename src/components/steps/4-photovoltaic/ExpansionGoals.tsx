import { FormData } from "../../Configuratore";
import { QuestionStepLayout } from "../../templates";
import { Slider } from "@/components/ui/slider";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const ExpansionGoals = ({ formData, updateFormData, onNext, onBack }: Props) => {
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

  const handleSelectionChange = (value: string) => {
    handleObiettivoChange(value);
  };

  const infoBox = {
    title: "Perché questa informazione è importante",
    content: "Conoscere il tuo obiettivo di ampliamento ci permette di calcolare la potenza aggiuntiva necessaria. Se il tuo impianto attuale copre già una buona parte dei consumi, potremo ottimizzare l'ampliamento per i tuoi obiettivi specifici."
  };

  const conditionalContent = obiettivoAmpliamento ? (
    <div className="space-y-4 md:space-y-6 px-3 md:px-0">
      <div>
        <h3 className="text-lg font-semibold text-[#1c1c1c] mb-2">
          Che percentuale dei tuoi consumi copre attualmente l'impianto?
        </h3>
        <p className="text-xs text-gray-500 italic">
          Indica approssimativamente quanto del tuo fabbisogno energetico è coperto dall'impianto attuale
        </p>
      </div>
      
      <div className="space-y-4 bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between text-sm font-medium text-gray-700">
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
        
        <div className="text-center text-sm text-gray-600">
          <span className="font-medium text-lg text-[#d8010c]">
            {percentualeCopertura[0]}%
          </span>
          <span className="ml-2">dei consumi attualmente coperti</span>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <QuestionStepLayout
      badge="Ampliamento fotovoltaico"
      title="Obiettivi ampliamento"
      description="Qual è il tuo obiettivo con questo ampliamento?"
      infoBox={infoBox}
      options={obiettivoOptions}
      selectedValue={obiettivoAmpliamento}
      onSelectionChange={handleSelectionChange}
      conditionalContent={conditionalContent}
      onNext={onNext}
      onBack={onBack}
    />
  );
};