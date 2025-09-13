
import { useState, useEffect } from "react";
import { WelcomeStepLayout } from "../../templates";

type Props = {
  onStart: (selectedModules: string[]) => void;
};

export const WelcomePage = ({ onStart }: Props) => {
  const [moduliSelezionati, setModuliSelezionati] = useState<string[]>(['impianto-elettrico']);

  // Animated text rotation - more elegant
  const tipiImpianto = ["elettrico", "fotovoltaico", "di sicurezza", "termotecnico"];

  const modules = [{
    id: 'impianto-elettrico',
    name: 'Impianto elettrico',
    description: 'Rifacimento completo impianto'
  }, {
    id: 'fotovoltaico',
    name: 'Impianto fotovoltaico',
    description: 'Pannelli solari e storage'
  }, {
    id: 'sicurezza',
    name: 'Impianto di sicurezza',
    description: 'Allarmi e videosorveglianza'
  }, {
    id: 'termotecnico',
    name: 'Impianto termotecnico',
    description: 'Riscaldamento e climatizzazione'
  }];

  const exampleProject = {
    title: "Esempio di progetto",
    minPrice: 13450,
    maxPrice: 19330,
    deductionText: "Fino a €8.195 Bonus Casa (1ª)",
    features: [
      { label: "Appartamento", column: "left" as const },
      { label: "83 mq", column: "left" as const },
      { label: "Torino", column: "left" as const },
      { label: "4 locali + 2 bagni", column: "left" as const },
      { label: "Impianto elettrico", column: "right" as const },
      { label: "Domotica KNX", column: "right" as const },
      { label: "Impianto di sicurezza", column: "right" as const }
    ]
  };

  const toggleModule = (moduleId: string) => {
    setModuliSelezionati(prev => {
      if (prev.includes(moduleId)) {
        // Non permettere di deselezionare se è l'ultimo rimasto
        if (prev.length === 1) {
          return prev;
        }
        return prev.filter(id => id !== moduleId);
      } else if (prev.length < 4) {
        return [...prev, moduleId];
      }
      return prev;
    });
  };

  return (
    <WelcomeStepLayout
      badge="Impianti Civili"
      title="Progetta il tuo impianto"
      subtitle="Configura, esplora le opzioni ed ottieni un budget su misura, gratis ed online."
      animatedWords={tipiImpianto}
      exampleProject={exampleProject}
      modules={modules}
      selectedModules={moduliSelezionati}
      onModuleToggle={toggleModule}
      onStart={onStart}
      ctaText="Inizia ora"
      minSelections={1}
      maxSelections={4}
    />
  );
};
