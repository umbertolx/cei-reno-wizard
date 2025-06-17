import { useState } from "react";
import { FormData } from "@/types/FormData";
import { QuestionWithOptions, QuestionOption, InfoBox } from "../shared/QuestionWithOptions";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const TipoDomotica = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [tipoDomotica, setTipoDomotica] = useState<string>(formData.tipoDomotica || "");

  const handleSubmit = () => {
    updateFormData({ 
      tipoDomotica 
    });
    onNext();
  };

  const options: QuestionOption[] = [
    {
      id: 'nessuna',
      label: 'Nessuna domotica'
    },
    {
      id: 'base',
      label: 'Domotica di base (es. Amazon Alexa, Google Home)'
    },
    {
      id: 'knx',
      label: 'Sistema KNX (domotica filare)'
    }
  ];

  const infoBox: InfoBox = {
    title: 'Che differenza c\'è tra i vari sistemi?',
    content: "I sistemi base sono più semplici da installare e usare, ma meno flessibili. Il sistema KNX è più complesso, ma offre il massimo controllo e personalizzazione."
  };

  return (
    <QuestionWithOptions
      badge="Impianto elettrico"
      icon="/lovable-uploads/c7408342-e29b-40fb-a65e-1c92eca62469.png"
      iconAlt="Electrical work icon"
      title="Che tipo di domotica ti interessa?"
      description="Scegli il sistema domotico che preferisci"
      infoBox={infoBox}
      options={options}
      selectedValue={tipoDomotica}
      onSelectionChange={setTipoDomotica}
      onNext={handleSubmit}
      onBack={onBack}
    />
  );
};
