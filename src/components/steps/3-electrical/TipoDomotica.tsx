
import { useState } from "react";
import { FormData } from "../../Configuratore";
import { ScenarioComparisonLayout } from "../../templates";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const TipoDomotica = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [tipoDomotica, setTipoDomotica] = useState<string>(formData.moduloElettrico?.tipoDomotica || "");

  const handleSubmit = () => {
    updateFormData({ 
      moduloElettrico: {
        ...formData.moduloElettrico,
        tipoDomotica
      }
    });
    onNext();
  };

  const domoticaOptions = [
    {
      id: 'knx',
      title: 'Sistema filare (KNX)',
      description: 'KNX è il protocollo internazionale per la domotica più affidabile al mondo. Essendo cablato fisicamente durante la costruzione, garantisce connessioni stabili e tempi di risposta istantanei. Non dipende dal WiFi, quindi funziona sempre anche in caso di problemi di rete. È espandibile nel tempo senza limiti e rappresenta un vero investimento che aumenta il valore dell\'immobile. Ogni componente comunica attraverso il bus dedicato, rendendo il sistema immune a interferenze e hackeraggi.',
      features: [
        { text: 'Massima sicurezza e affidabilità' },
        { text: 'Tempi di risposta istantanei' },
        { text: 'Già cablato nella costruzione' },
        { text: 'Espandibile senza limiti nel tempo' },
        { text: 'Aumenta il valore dell\'immobile' }
      ]
    },
    {
      id: 'wireless',
      title: 'Sistema wireless (BTicino)',
      description: 'Il sistema wireless BTicino è una soluzione moderna e conveniente per chi vuole la domotica senza opere murarie. Funziona tramite protocolli radio affidabili e può essere installato rapidamente in case esistenti. Pur essendo più economico, offre comunque buone prestazioni per le funzioni base della domotica come luci, tapparelle e controllo clima. È la scelta ideale per ristrutturazioni o per chi vuole iniziare con un budget contenuto.',
      features: [
        { text: 'Installazione senza opere murarie' },
        { text: 'Veloce da installare e configurare' },
        { text: 'Tecnologia radio affidabile BTicino' },
        { text: 'Investimento iniziale contenuto' }
      ]
    }
  ];

  return (
    <ScenarioComparisonLayout
      badge="Impianto elettrico"
      icon="/lovable-uploads/c7408342-e29b-40fb-a65e-1c92eca62469.png"
      iconAlt="Electrical work icon"
      title="Scegli il tipo di domotica che preferisci per la tua casa"
      description="Due approcci diversi alla domotica: KNX per la massima robustezza e prestazioni, wireless per semplicità e convenienza"
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
