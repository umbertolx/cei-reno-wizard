
import { useState } from "react";
import { FormData } from "../Configuratore";
import { QuestionWithOptions, QuestionOption } from "../shared/QuestionWithOptions";

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

  const options: QuestionOption[] = [
    {
      id: 'knx',
      label: 'Domotica filare professionale (KNX) - Massima stabilità e controllo completo'
    },
    {
      id: 'wireless',
      label: 'Domotica wireless semplificata (BTicino Living Now) - Controlla luci, prese e tapparelle via app'
    },
    {
      id: 'help',
      label: 'Non sono sicuro, aiutatemi voi'
    }
  ];

  const infoBox = {
    title: "Che differenza c'è tra i due sistemi?",
    content: "L'impianto filare (KNX) è una soluzione professionale, molto affidabile e stabile nel tempo. Richiede un cablaggio dedicato e ha un costo più elevato, ma offre il massimo in termini di personalizzazione e prestazioni. L'impianto wireless (BTicino Living Now) comunica via radio ed è più semplice e veloce da installare. Ha funzionalità più limitate, ma può essere una buona soluzione quando si vuole contenere il budget."
  };

  return (
    <QuestionWithOptions
      badge="Domotica avanzata"
      icon="/lovable-uploads/c7408342-e29b-40fb-a65e-1c92eca62469.png"
      iconAlt="Smart home icon"
      title="Scegli il tipo di domotica che preferisci per la tua casa"
      infoBox={infoBox}
      options={options}
      selectedValue={tipoDomotica}
      onSelectionChange={setTipoDomotica}
      onNext={handleSubmit}
      onBack={onBack}
    />
  );
};
