import { useState } from "react";
import { FormData } from "../../../Configuratore";
import { QuestionStepLayout } from "../../../templates";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const ElectricalSystemType = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [tipoImpianto, setTipoImpianto] = useState<string>(formData.moduloElettrico?.tipoImpianto || "");

  const handleSelectionChange = (value: string | string[]) => {
    if (typeof value === 'string') {
      setTipoImpianto(value);
    }
  };

  const handleSubmit = () => {
    updateFormData({ 
      moduloElettrico: {
        ...formData.moduloElettrico,
        tipoImpianto
      }
    });
    onNext();
  };

  const options = [
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
    <QuestionStepLayout
      badge="Impianto elettrico"
      title="Che tipo di impianto elettrico vuoi installare?"
      infoBox={infoBox}
      options={options}
      selectedValue={tipoImpianto}
      onSelectionChange={handleSelectionChange}
      onNext={handleSubmit}
      onBack={onBack}
    />
  );
};