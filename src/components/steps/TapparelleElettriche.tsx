
import { useState } from "react";
import { FormData } from "../Configuratore";
import { QuestionWithOptions, QuestionOption } from "../shared/QuestionWithOptions";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const TapparelleElettriche = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [elettrificareTapparelle, setElettrificareTapparelle] = useState<string>(formData.elettrificareTapparelle || "");

  const handleSubmit = () => {
    updateFormData({ 
      elettrificareTapparelle 
    });
    onNext();
  };

  const options: QuestionOption[] = [
    {
      id: 'si',
      label: 'Sì'
    },
    {
      id: 'no',
      label: 'No'
    }
  ];

  return (
    <QuestionWithOptions
      badge="Impianto elettrico"
      icon="/lovable-uploads/c7408342-e29b-40fb-a65e-1c92eca62469.png"
      iconAlt="Electrical work icon"
      title="Vuoi elettrificare le tapparelle?"
      options={options}
      selectedValue={elettrificareTapparelle}
      onSelectionChange={setElettrificareTapparelle}
      onNext={handleSubmit}
      onBack={onBack}
      nextButtonText="Ricominca"
      backButtonText="Indietro"
    />
  );
};
