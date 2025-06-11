
import { useState } from "react";
import { FormData } from "../Configuratore";
import { ScenarioComparison } from "../shared/ScenarioComparison";
import { CheckCircle, Settings, Clock, DollarSign, Wifi } from "lucide-react";

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

  const domoticaOptions = [
    {
      id: 'knx',
      title: 'Impianto domotico filare (KNX)',
      subtitle: 'Domotica filare professionale',
      description: 'Questo sistema collega tutti i dispositivi con un cavo dedicato. È il più stabile, il più personalizzabile e quello scelto da chi vuole un impianto professionale',
      features: [
        { icon: CheckCircle, text: 'Affidabilità professionale' },
        { icon: Settings, text: 'Già predisposto nella costruzione' },
        { icon: Clock, text: 'Personalizzabile nel tempo' },
        { icon: DollarSign, text: 'Più costoso, ma duraturo' }
      ]
    },
    {
      id: 'wireless',
      title: 'Impianto domotico wireless (BTicino Living Now)',
      subtitle: 'Domotica wireless semplificata',
      description: 'Questo impianto usa connessioni wireless tra i dispositivi. È più semplice da installare e ha un costo più contenuto',
      features: [
        { icon: Wifi, text: 'Comunicazione radio' },
        { icon: CheckCircle, text: 'Installazione più veloce' },
        { icon: DollarSign, text: 'Soluzione più economica' }
      ]
    }
  ];

  const infoBox = {
    title: "Come funzionano i tipi di domotica",
    content: "Il sistema KNX è filare e più stabile, perfetto per nuove costruzioni. Il wireless è più semplice da installare e adatto per ristrutturazioni."
  };

  return (
    <ScenarioComparison
      badge="Domotica avanzata"
      icon="/lovable-uploads/c7408342-e29b-40fb-a65e-1c92eca62469.png"
      iconAlt="Electrical work icon"
      title="Scegli il tipo di domotica che preferisci per la tua casa"
      infoBox={infoBox}
      options={domoticaOptions}
      selectedValue={tipoDomotica}
      onSelectionChange={setTipoDomotica}
      onNext={handleSubmit}
      onBack={onBack}
      nextButtonText="Avanti →"
      backButtonText="← Indietro"
    />
  );
};
