import { useState } from "react";
import { FormData } from "../Configuratore";
import { QuestionWithOptions, QuestionOption, InfoBox } from "../shared/QuestionWithOptions";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const TipoImpiantoElettrico = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [tipoImpianto, setTipoImpianto] = useState<string>(formData.tipoImpianto || "");

  const handleSubmit = () => {
    updateFormData({ 
      tipoImpianto 
    });
    
    // Per Livello 1 e 2, vai alla pagina delle tapparelle
    // Per Livello 3, salta direttamente ai dati di contatto (2 step avanti)
    if (tipoImpianto === 'livello3') {
      onNext();
      onNext();
    } else {
      onNext();
    }
  };

  const options: QuestionOption[] = [
    {
      id: 'livello1',
      label: 'Livello 1: Standard Minimo'
    },
    {
      id: 'livello2',
      label: 'Livello 2: Impianto Avanzato'
    },
    {
      id: 'livello3',
      label: 'Livello 3: Domotico e Smart Home'
    }
  ];

  return (
    <QuestionWithOptions
      badge="Impianto elettrico"
      icon="/lovable-uploads/c7408342-e29b-40fb-a65e-1c92eca62469.png"
      iconAlt="Electrical work icon"
      title="Che tipo di impianto elettrico vuoi installare?"
      options={options}
      selectedValue={tipoImpianto}
      onSelectionChange={setTipoImpianto}
      onNext={handleSubmit}
      onBack={onBack}
    />
  );
};
