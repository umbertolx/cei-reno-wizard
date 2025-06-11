
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
    content: 'Tutti e tre i livelli rispettano la norma CEI 64-8, che regola gli impianti elettrici nelle abitazioni. Il Livello 1 è il minimo previsto per legge: garantisce la sicurezza e l\'essenziale (pochi punti luce e prese). Il Livello 2 offre più comfort, con un numero maggiore di prese, punti luce e circuiti dedicati. Il Livello 3 è il più completo, con dotazioni evolute, predisposizione per domotica, più sicurezza e flessibilità d\'uso.'
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
