
import { useState } from "react";
import { FormData } from "../Configuratore";
import { KNXFeatureSelector } from "../shared/KNXFeatureSelector";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const ConfigurazioneKNX = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [currentFeature, setCurrentFeature] = useState<number>(0);
  const [knxConfig, setKnxConfig] = useState<Record<string, any>>(
    formData.knxConfig || {}
  );

  const features = [
    {
      id: 'luci',
      title: 'Controllo luci',
      description: 'Regola l\'illuminazione da pulsanti intelligenti o da app. Puoi impostare l\'intensità, programmare accensioni e creare scenari (es. notte, lettura, relax).',
      advancedOption: {
        title: 'Controllo avanzato con KNX+DALI',
        description: 'Controllo granulare di ogni singolo punto luce, colori e temperatura. Ideale per illuminazione d\'atmosfera o tecnica.',
        options: [
          { 
            id: 'standard', 
            label: 'Controllo standard',
            description: 'Controllo di base per accensione, spegnimento e dimmerazione delle luci'
          },
          { 
            id: 'avanzato', 
            label: 'Controllo avanzato (KNX+DALI)',
            description: 'Controllo granulare di ogni singolo punto luce, colori e temperatura'
          }
        ]
      }
    }
  ];

  const handleFeatureComplete = (featureId: string, config: any) => {
    const updatedConfig = {
      ...knxConfig,
      [featureId]: config
    };
    setKnxConfig(updatedConfig);
    updateFormData({ knxConfig: updatedConfig });

    // Per ora passiamo al prossimo step dato che abbiamo solo una feature
    // In futuro qui incrementeremo currentFeature
    onNext();
  };

  const currentFeatureData = features[currentFeature];

  return (
    <div className="space-y-6">
      {/* Badge */}
      <div className="flex justify-center">
        <div className="bg-[#d8010c] text-white px-6 py-3 rounded-full text-sm font-medium">
          Impianto elettrico
        </div>
      </div>

      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3">
          <img 
            src="/lovable-uploads/c7408342-e29b-40fb-a65e-1c92eca62469.png" 
            alt="Electrical work icon" 
            className="w-12 h-12"
          />
          <h1 className="text-3xl md:text-4xl font-medium text-[#1c1c1c]">
            Configurazione KNX
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Personalizza le funzionalità del tuo impianto domotico filare
        </p>
      </div>

      {/* Feature Selector */}
      <div className="max-w-4xl mx-auto">
        <KNXFeatureSelector
          feature={currentFeatureData}
          onComplete={handleFeatureComplete}
          onBack={onBack}
        />
      </div>
    </div>
  );
};
