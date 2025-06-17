
import { useState } from "react";
import { FormData } from "@/types/FormData";
import { QuestionWithOptions, QuestionOption } from "../shared/QuestionWithOptions";

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
    
    // Per Livello 3, vai alla pagina di scelta domotica
    // Per Livello 1 e 2, vai alla pagina delle tapparelle
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

  const infoBox = {
    title: "Come funzionano i livelli dell'impianto elettrico",
    content: "Il Livello 1 include solo i punti luce e prese base necessari per legge. Il Livello 2 aggiunge più punti luce, prese dati e TV. Il Livello 3 include domotica avanzata con controllo smart di luci, tapparelle e sistemi di sicurezza."
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
