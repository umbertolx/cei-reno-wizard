import { FormData } from "../../Configuratore";
import { QuestionStepLayout } from "../../templates";
import { Sun, Moon } from "lucide-react";
import { Slider } from "@/components/ui/slider";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const ConsumptionGoals = ({ formData, updateFormData, onNext, onBack }: Props) => {
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

  const conditionalContent = obiettivoPrincipale ? (
    <div className="space-y-4 md:space-y-6 px-3 md:px-0">
      {/* Contenuto rimosso come richiesto dall'utente */}
    </div>
  ) : null;

  return (
    <QuestionStepLayout
      badge="Impianto fotovoltaico"
      title="Obiettivi consumi"
      description="Qual è il tuo obiettivo principale?"
      infoBox={infoBox}
      options={obiettivoOptions}
      selectedValue={obiettivoPrincipale}
      onSelectionChange={handleSelectionChange}
      conditionalContent={conditionalContent}
      onNext={onNext}
      onBack={onBack}
    />
  );
};