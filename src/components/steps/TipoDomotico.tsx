
import { useState } from "react";
import { FormData } from "../Configuratore";
import { QuestionWithOptions, QuestionOption, InfoBox } from "../shared/QuestionWithOptions";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const TipoDomotico = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [tipoDomotico, setTipoDomotico] = useState<string>(formData.tipoDomotico || "");

  const handleSubmit = () => {
    updateFormData({ 
      tipoDomotico 
    });
    onNext();
  };

  const options: QuestionOption[] = [
    {
      id: 'cablato',
      label: 'Domotico cablato (filare)',
      icon: 'cable'
    },
    {
      id: 'wireless',
      label: 'Domotico wireless',
      icon: 'wifi'
    }
  ];

  const infoBox: InfoBox = {
    title: 'Quale tipo di impianto domotico vuoi inserire?',
    content: 'Un impianto domotico può essere wireless o cablato. Il wireless è più economico e richiede meno lavori sui muri, ma dipende dalla connessione internet e potrebbe diventare obsoleto se cambiano gli standard. Il cablato, invece, è più stabile e durevole nel tempo, ma richiede un budget maggiore.'
  };

  return (
    <QuestionWithOptions
      badge="Impianto elettrico"
      icon="/lovable-uploads/c7408342-e29b-40fb-a65e-1c92eca62469.png"
      iconAlt="Electrical work icon"
      title="Quale tipo di impianto domotico vuoi inserire?"
      infoBox={infoBox}
      options={options}
      selectedValue={tipoDomotico}
      onSelectionChange={setTipoDomotico}
      onNext={handleSubmit}
      onBack={onBack}
    />
  );
};
