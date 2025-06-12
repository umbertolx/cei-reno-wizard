
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
      id: 'sistema-filare',
      title: 'Sistema filare (KNX)',
      subtitle: 'Soluzione professionale',
      description: 'Il sistema più stabile e personalizzabile. Ideale per chi vuole un impianto duraturo con il massimo controllo.',
      features: [
        { icon: CheckCircle, text: 'Massima affidabilità' },
        { icon: Settings, text: 'Già cablato nella costruzione' },
        { icon: Clock, text: 'Espandibile nel tempo' },
        { icon: DollarSign, text: 'Investimento a lungo termine' }
      ]
    },
    {
      id: 'wireless',
      title: 'Sistema wireless (BTicino)',
      subtitle: 'Soluzione semplificata',
      description: 'Facile da installare e più economico. Perfetto per chi vuole la domotica senza grandi lavori.',
      features: [
        { icon: Wifi, text: 'Senza fili aggiuntivi' },
        { icon: CheckCircle, text: 'Installazione veloce' },
        { icon: DollarSign, text: 'Costo contenuto' }
      ]
    }
  ];

  return (
    <ScenarioComparison
      badge="Impianto elettrico"
      icon="/lovable-uploads/c7408342-e29b-40fb-a65e-1c92eca62469.png"
      iconAlt="Electrical work icon"
      title="Scegli il tipo di domotica che preferisci per la tua casa"
      options={domoticaOptions}
      selectedValue={tipoDomotica}
      onSelectionChange={setTipoDomotica}
      onNext={handleSubmit}
      onBack={onBack}
      nextButtonText="Avanti"
      backButtonText="Indietro"
    />
  );
};
