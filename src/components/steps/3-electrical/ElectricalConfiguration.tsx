import { useState } from "react";
import { FormData } from "../../Configuratore";
import { QuestionStepLayout } from "../../templates";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const ElectricalConfiguration = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const currentValue = formData.moduloElettrico?.tipoRistrutturazione || "";

  const handleSelectionChange = (value: string | string[]) => {
    if (typeof value === 'string') {
      updateFormData({ 
        moduloElettrico: { 
          ...formData.moduloElettrico, 
          tipoRistrutturazione: value 
        } 
      });
    }
  };

  const options = [
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

  const infoBox = {
    title: 'Cosa comporta una ristrutturazione completa?',
    content: 'Una ristrutturazione completa prevede lavori sui pavimenti con demolizione del massetto o l\'aggiunta di controsoffitti per il passaggio degli impianti.'
  };

  return (
    <QuestionStepLayout
      badge="Impianto elettrico"
      title="Tipo di intervento"
      description="Scegli il tipo di lavoro che meglio descrive il tuo progetto elettrico"
      infoBox={infoBox}
      options={options}
      selectedValue={currentValue}
      onSelectionChange={handleSelectionChange}
      onNext={onNext}
      onBack={onBack}
    />
  );
};