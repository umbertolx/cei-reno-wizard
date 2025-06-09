
import { useState } from "react";
import { FormData } from "../Configuratore";
import { QuestionWithOptions, QuestionOption, InfoBox } from "../shared/QuestionWithOptions";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const ConfiguratoreElettrico = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [tipoRistrutturazione, setTipoRistrutturazione] = useState<string>(formData.tipoRistrutturazione || "");

  const handleSubmit = () => {
    updateFormData({ 
      tipoRistrutturazione 
    });
    onNext();
  };

  const options: QuestionOption[] = [
    {
      id: 'completa',
      label: 'Ristrutturazione completa'
    },
    {
      id: 'nuova',
      label: 'Nuova costruzione'
    },
    {
      id: 'parziale',
      label: 'Intervento parziale'
    }
  ];

  const infoBox: InfoBox = {
    title: 'Cosa comporta una ristrutturazione completa?',
    content: 'Una ristrutturazione completa prevede lavori sui pavimenti con demolizione del massetto o l\'aggiunta di controsoffitti per il passaggio degli impianti.'
  };

  return (
    <QuestionWithOptions
      badge="Impianto elettrico"
      icon="/lovable-uploads/c7408342-e29b-40fb-a65e-1c92eca62469.png"
      iconAlt="Electrical work icon"
      title="Tipo di intervento"
      description="Scegli il tipo di lavoro che meglio descrive il tuo progetto elettrico"
      infoBox={infoBox}
      options={options}
      selectedValue={tipoRistrutturazione}
      onSelectionChange={setTipoRistrutturazione}
      onNext={handleSubmit}
      onBack={onBack}
    />
  );
};
