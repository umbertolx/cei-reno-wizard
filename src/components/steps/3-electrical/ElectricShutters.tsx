import { useState } from "react";
import { FormData } from "../../Configuratore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QuestionStepLayout } from "../../templates";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const ElectricShutters = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [numeroTapparelle, setNumeroTapparelle] = useState<number>(formData.numeroTapparelle || 0);
  const currentValue = formData.elettrificareTapparelle || "";

  const handleSelectionChange = (value: string) => {
    updateFormData({ 
      elettrificareTapparelle: value,
      numeroTapparelle: value === 'si' ? numeroTapparelle : undefined
    });
  };

  const handleNext = () => {
    updateFormData({ 
      elettrificareTapparelle: currentValue,
      numeroTapparelle: currentValue === 'si' ? numeroTapparelle : undefined
    });
    onNext();
  };

  const options = [
    { id: 'si', label: 'Sì' },
    { id: 'no', label: 'No' }
  ];

  const infoBox = {
    title: "Come funziona l'elettrificazione delle tapparelle",
    content: "Per elettrificare le tapparelle è necessario creare delle tracce murarie per far passare i cavi elettrici fino ai motori. In base al numero di finestre che hai indicato, stimeremo un percorso ottimale per minimizzare i lavori e i costi, considerando la disposizione degli ambienti e la posizione del quadro elettrico."
  };

  const conditionalContent = currentValue === 'si' ? (
    <div className="space-y-2">
      <Label htmlFor="numeroTapparelle" className="text-base font-medium text-[#1c1c1c]">
        Quante tapparelle vuoi elettrificare?
      </Label>
      <Input
        id="numeroTapparelle"
        type="number"
        min="1"
        max="50"
        value={numeroTapparelle || ""}
        onChange={(e) => setNumeroTapparelle(parseInt(e.target.value) || 0)}
        placeholder="Es. 5"
        className="text-base h-12"
      />
    </div>
  ) : null;

  const isFormValid = currentValue !== "" && 
    (currentValue === 'no' || (currentValue === 'si' && numeroTapparelle > 0));

  return (
    <QuestionStepLayout
      badge="Impianto elettrico"
      title="Vuoi elettrificare le tapparelle?"
      infoBox={infoBox}
      options={options}
      selectedValue={currentValue}
      onSelectionChange={handleSelectionChange}
      conditionalContent={conditionalContent}
      onNext={handleNext}
      onBack={onBack}
    />
  );
};