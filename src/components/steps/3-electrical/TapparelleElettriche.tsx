import { useState } from "react";
import { FormData } from "../../Configuratore";
import { QuestionStepLayout } from "../../templates/QuestionStepLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const TapparelleElettriche = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [elettrificareTapparelle, setElettrificareTapparelle] = useState<string>(
    formData.elettrificareTapparelle || ""
  );
  const [numeroTapparelle, setNumeroTapparelle] = useState<number>(
    formData.numeroTapparelle || 0
  );

  const infoBox = {
    title: "Come funziona l'elettrificazione delle tapparelle",
    content: "Per elettrificare le tapparelle è necessario creare delle tracce murarie per far passare i cavi elettrici fino ai motori. In base al numero di finestre che hai indicato, stimeremo un percorso ottimale per minimizzare i lavori e i costi, considerando la disposizione degli ambienti e la posizione del quadro elettrico."
  };

  const options = [
    { 
      id: 'si', 
      label: 'Sì', 
      description: 'Voglio elettrificare le tapparelle' 
    },
    { 
      id: 'no', 
      label: 'No', 
      description: 'Non voglio elettrificare le tapparelle' 
    }
  ];

  const handleSelectionChange = (value: string) => {
    setElettrificareTapparelle(value);
    if (value === 'no') {
      setNumeroTapparelle(0);
    }
  };

  const handleNext = () => {
    updateFormData({ 
      elettrificareTapparelle,
      numeroTapparelle: elettrificareTapparelle === 'si' ? numeroTapparelle : undefined
    });
    onNext();
  };

  const isFormValid = elettrificareTapparelle !== "" && 
    (elettrificareTapparelle === 'no' || (elettrificareTapparelle === 'si' && numeroTapparelle > 0));

  const conditionalContent = elettrificareTapparelle === 'si' && (
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
  );

  return (
    <QuestionStepLayout
      badge="Impianto elettrico"
      title="Vuoi elettrificare le tapparelle?"
      icon="/lovable-uploads/c7408342-e29b-40fb-a65e-1c92eca62469.png"
      options={options}
      selectedValue={elettrificareTapparelle}
      onSelectionChange={handleSelectionChange}
      infoBox={infoBox}
      conditionalContent={conditionalContent}
      onNext={handleNext}
      onBack={onBack}
    />
  );
};