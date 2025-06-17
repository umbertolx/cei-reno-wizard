
import { useState } from "react";
import { FormData } from "../Configuratore";
import { QuestionWithOptions, QuestionOption, InfoBox } from "../shared/QuestionWithOptions";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const EtaImpiantoElettrico = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [etaImpianto, setEtaImpianto] = useState<string>(formData.etaImpianto || "");

  const handleSubmit = () => {
    updateFormData({ 
      etaImpianto 
    });
    
    // Dopo aver selezionato l'età dell'impianto, vai direttamente ai dati di contatto
    onNext();
    onNext();
  };

  const options: QuestionOption[] = [
    {
      id: 'aggiornato',
      label: 'Sì, ha bisogno di essere aggiornato'
    },
    {
      id: 'recente',
      label: 'No, è stato certificato di recente'
    }
  ];

  const infoBox: InfoBox = {
    title: "Quando è necessario aggiornare l'impianto elettrico?",
    content: "Se l'impianto elettrico ha più di 20 anni, è consigliabile un rifacimento completo per garantire sicurezza ed efficienza. In questo caso, vengono tirati nuovi cavi sfruttando le tracce esistenti. Se invece l'impianto è recente e a norma, si può optare per un aggiornamento parziale, aggiungendo nuove prese, interruttori o soluzioni smart senza interventi invasivi."
  };

  return (
    <QuestionWithOptions
      badge="Impianto elettrico"
      icon="/lovable-uploads/954360cb-c237-4de9-82be-73bcc02d0297.png"
      iconAlt="Electrical work icon"
      title="Il tuo impianto elettrico è vecchio o non più a norma?"
      infoBox={infoBox}
      options={options}
      selectedValue={etaImpianto}
      onSelectionChange={setEtaImpianto}
      onNext={handleSubmit}
      onBack={onBack}
    />
  );
};
