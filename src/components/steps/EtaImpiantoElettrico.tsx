import { useState } from "react";
import { FormData } from "@/types/FormData";
import { QuestionWithOptions, QuestionOption, InfoBox } from "../shared/QuestionWithOptions";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const EtaImpiantoElettrico = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [impiantoVecchio, setImpiantoVecchio] = useState<string>(formData.impiantoVecchio || "");

  const handleSubmit = () => {
    updateFormData({ 
      impiantoVecchio 
    });
    onNext();
  };

  const options: QuestionOption[] = [
    {
      id: 'si',
      label: 'Sì, ha bisogno di essere aggiornato'
    },
    {
      id: 'no',
      label: 'No, è stato certificato di recente'
    }
  ];

  const infoBox: InfoBox = {
    title: 'Informazioni utili',
    content: "Se l'impianto elettrico ha più di 20 anni, è consigliabile un rifacimento completo per garantire sicurezza ed efficienza. In questo caso, vengono tirati nuovi cavi sfruttando le tracce esistenti. Se invece l'impianto è recente e a norma, si può optare per un aggiornamento parziale, aggiungendo nuove prese, interruttori o soluzioni smart senza interventi invasivi."
  };

  return (
    <QuestionWithOptions
      badge="Impianto elettrico"
      icon="/lovable-uploads/c7408342-e29b-40fb-a65e-1c92eca62469.png"
      iconAlt="Electrical work icon"
      title="Il tuo impianto elettrico è vecchio o non più a norma?"
      infoBox={infoBox}
      options={options}
      selectedValue={impiantoVecchio}
      onSelectionChange={setImpiantoVecchio}
      onNext={handleSubmit}
      onBack={onBack}
    />
  );
};


