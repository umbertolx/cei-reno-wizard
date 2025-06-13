
import { useState } from "react";
import { FormData } from "../Configuratore";
import { MultiSelectWithVisualization, SelectableOption } from "../shared/MultiSelectWithVisualization";
import { InteractiveHouseSVG } from "../shared/InteractiveHouseSVG";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const FunzioniDomotica = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [funzioniDomotica, setFunzioniDomotica] = useState<string[]>(formData.funzioniDomotica || []);

  const handleSubmit = () => {
    updateFormData({ funzioniDomotica });
    onNext();
  };

  const domoticaOptions: SelectableOption[] = [
    {
      id: 'luci',
      label: 'Comandare le luci',
      description: 'Controllo intelligente di tutte le luci della casa con scenari personalizzati',
      visualizationKey: 'luci'
    },
    {
      id: 'tapparelle',
      label: 'Comandare le tapparelle',
      description: 'Apertura e chiusura automatica delle tapparelle con programmazione oraria',
      visualizationKey: 'tapparelle'
    },
    {
      id: 'tende',
      label: 'Comandare le tende interne e/o esterne',
      description: 'Gestione automatica delle tende per il controllo della privacy e della luce',
      visualizationKey: 'tende'
    },
    {
      id: 'videocitofono',
      label: 'Videocitofono integrato',
      description: 'Sistema di videocitofonia collegato con apertura cancello automatica',
      visualizationKey: 'videocitofono'
    },
    {
      id: 'audio',
      label: 'Impianto audio diffuso',
      description: 'Sistema audio multiroom per diffondere musica in tutta la casa',
      visualizationKey: 'audio'
    },
    {
      id: 'clima',
      label: 'Riscaldamento, aria condizionata e acqua calda',
      description: 'Controllo completo del sistema climatico con programmazione intelligente',
      visualizationKey: 'clima'
    },
    {
      id: 'prese',
      label: 'Prese smart',
      description: 'Prese elettriche intelligenti per il controllo remoto degli elettrodomestici',
      visualizationKey: 'prese'
    },
    {
      id: 'sicurezza',
      label: 'Sistema di sicurezza',
      description: 'Allarme antifurto integrato con sensori di movimento e apertura',
      visualizationKey: 'sicurezza'
    }
  ];

  return (
    <MultiSelectWithVisualization
      badge="Impianto elettrico"
      icon="/lovable-uploads/c7408342-e29b-40fb-a65e-1c92eca62469.png"
      iconAlt="Electrical work icon"
      title="Scegli le funzioni smart per la tua casa"
      description="Seleziona tutte le funzioni domotiche che desideri integrare nel tuo sistema KNX"
      options={domoticaOptions}
      selectedValues={funzioniDomotica}
      onSelectionChange={setFunzioniDomotica}
      onNext={handleSubmit}
      onBack={onBack}
      nextButtonText="Continua"
      backButtonText="Indietro"
    >
      <InteractiveHouseSVG selectedFunctions={funzioniDomotica} />
    </MultiSelectWithVisualization>
  );
};
