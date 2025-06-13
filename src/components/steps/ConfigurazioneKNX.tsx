
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
        description: 'Il protocollo DALI permette il controllo individuale di ogni singolo apparecchio illuminante con precisione assoluta. Regola intensità, colore, temperatura della luce e crea effetti dinamici. Perfetto per illuminazione architetturale, retail e ambienti che richiedono scenari luminosi complessi.',
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
    },
    {
      id: 'tapparelle',
      title: 'Controllo tapparelle',
      description: 'Gestisci l\'apertura e la chiusura delle tapparelle o tende motorizzate da app o da pulsanti intelligenti. Puoi impostare orari automatici, scenari coordinati con le luci, o regolare l\'apertura a una determinata percentuale.'
    }
  ];

  const handleFeatureComplete = (featureId: string, config: any) => {
    const updatedConfig = {
      ...knxConfig,
      [featureId]: config
    };
    setKnxConfig(updatedConfig);
    updateFormData({ knxConfig: updatedConfig });

    // Controlla se tutte le feature attive sono state configurate
    const allFeaturesConfigured = features.every(feature => 
      updatedConfig[feature.id] !== undefined
    );

    if (allFeaturesConfigured) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      {/* Badge */}
      <div className="flex justify-center">
        <div className="bg-[#d8010c] text-white px-3 py-1.5 md:px-6 md:py-3 rounded-full text-sm font-medium">
          Impianto elettrico
        </div>
      </div>

      {/* Contenuto principale */}
      <div className="max-w-4xl md:mx-auto space-y-6 md:space-y-8 mt-8 md:mt-16">
        <div className="space-y-4 md:space-y-6">
          {/* Header - Layout responsive */}
          <div className="flex items-center gap-4 px-3 md:px-0">
            <div className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] flex-shrink-0 flex items-center justify-center">
              <img 
                src="/lovable-uploads/c7408342-e29b-40fb-a65e-1c92eca62469.png" 
                alt="Electrical work icon" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-medium text-[#1c1c1c]">Configurazione KNX</h2>
              <p className="text-base text-[#1c1c1c] opacity-80 hidden md:block">
                Personalizza le funzionalità del tuo impianto domotico filare
              </p>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-4">
            {features.map((feature) => (
              <KNXFeatureSelector
                key={feature.id}
                feature={feature}
                onComplete={handleFeatureComplete}
                onBack={onBack}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
