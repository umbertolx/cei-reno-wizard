
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
    onNext();
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

  const infoBox: InfoBox = {
    title: 'Quali sono le differenze tra i 3 livelli di impianto elettrico?',
    content: 'Il livello 1 offre il minimo indispensabile per legge (pochi punti luce e prese). Il livello 2 aggiunge più prese e punti luce. Il livello 3 è il più completo.'
  };

  return (
    <QuestionWithOptions
      badge="Impianto elettrico"
      icon="/lovable-uploads/c7408342-e29b-40fb-a65e-1c92eca62469.png"
      iconAlt="Electrical work icon"
      title="Che tipo di impianto elettrico vuoi installare?"
      infoBox={infoBox}
      options={options}
      selectedValue={tipoImpianto}
      onSelectionChange={setTipoImpianto}
      onNext={handleSubmit}
      onBack={onBack}
    />
  );
};
