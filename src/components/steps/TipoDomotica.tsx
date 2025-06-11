
import { useState } from "react";
import { FormData } from "../Configuratore";
import { TipoDomoticaSelector } from "./TipoDomoticaSelector";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const TipoDomotica = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [tipoDomotica, setTipoDomotica] = useState<string>(formData.tipoDomotica || "");

  const handleSubmit = () => {
    updateFormData({ tipoDomotica });
    onNext();
  };

  return (
    <TipoDomoticaSelector
      selectedValue={tipoDomotica}
      onSelectionChange={setTipoDomotica}
      onNext={handleSubmit}
      onBack={onBack}
    />
  );
};
