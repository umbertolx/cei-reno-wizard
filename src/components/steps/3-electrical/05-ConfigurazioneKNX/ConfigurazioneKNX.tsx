import { useState } from "react";
import { FormData } from "../../../Configuratore";
import { StepLayout } from "../../../templates";
import { FeatureConfigurationLayout } from "../../../templates";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const ConfigurazioneKNX = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [knxConfig, setKnxConfig] = useState<Record<string, any>>(formData.moduloElettrico?.knxConfig || {});

  const featureCategories = [
    {
      title: "Illuminazione e Automazione",
      features: [
        {
          id: "controlloLuci",
          title: "Controllo luci",
          description: "Controllo avanzato dell'illuminazione con scenari predefiniti",
          advancedOption: {
            title: "Numero di punti luce da controllare",
            type: "number" as const,
            placeholder: "Es. 15"
          }
        },
        {
          id: "controlloTapparelle", 
          title: "Controllo tapparelle",
          description: "Automazione completa di tapparelle e tende",
          advancedOption: {
            title: "Numero di tapparelle da automatizzare",
            type: "number" as const,
            placeholder: "Es. 8"
          }
        },
        {
          id: "scenariIlluminazione",
          title: "Scenari illuminazione",
          description: "Creazione di atmosfere personalizzate per ogni ambiente"
        }
      ]
    },
    {
      title: "Clima e Comfort",
      features: [
        {
          id: "controlloClima",
          title: "Controllo Clima",
          description: "Gestione intelligente di riscaldamento e raffrescamento",
          advancedOption: {
            title: "Numero di zone climatiche",
            type: "select" as const,
            options: ["1 zona", "2 zone", "3 zone", "4+ zone"]
          }
        },
        {
          id: "controlloVentilazione",
          title: "Controllo ventilazione",
          description: "Sistema di ventilazione meccanica controllata"
        }
      ]
    },
    {
      title: "Sicurezza e Controllo Accessi",
      features: [
        {
          id: "sistemaAntifurto",
          title: "Sistema antifurto",
          description: "Integrazione completa con sistema di allarme KNX"
        },
        {
          id: "controlloAccessi",
          title: "Controllo accessi",
          description: "Gestione aperture e videocitofono integrato"
        },
        {
          id: "rilevazioneFumi",
          title: "Rilevazione fumi",
          description: "Sistema di rilevazione incendi integrato"
        }
      ]
    },
    {
      title: "Audio/Video e Multimedia",
      features: [
        {
          id: "sistemaAudio",
          title: "Sistema audio multistanza",
          description: "Diffusione audio sincronizzata in tutta la casa"
        },
        {
          id: "controlloTv",
          title: "Controllo TV e multimedia",
          description: "Gestione centralizzata di tutti i dispositivi multimediali"
        }
      ]
    },
    {
      title: "Gestione Energia",
      features: [
        {
          id: "monitoraggioEnergia",
          title: "Monitoraggio energia",
          description: "Controllo consumi e ottimizzazione energetica"
        },
        {
          id: "gestioneCarichi",
          title: "Gestione carichi",
          description: "Bilanciamento automatico dei carichi elettrici"
        }
      ]
    }
  ];

  const handleFeatureComplete = (featureId: string, config: any) => {
    const updatedConfig = { ...knxConfig, [featureId]: config };
    setKnxConfig(updatedConfig);
    updateFormData({ 
      moduloElettrico: {
        ...formData.moduloElettrico,
        knxConfig: updatedConfig
      }
    });
  };

  const canProceed = Object.keys(knxConfig).length > 0;

  return (
    <StepLayout
      badge="Sistema Domotico"
      title="Configurazione Sistema KNX"
      description="Seleziona e configura le funzioni KNX per la tua casa intelligente"
      onNext={canProceed ? onNext : undefined}
      onBack={onBack}
    >
      <div className="space-y-6">
        {featureCategories.map((category) => (
          <div key={category.title}>
            <h3 className="text-lg font-semibold mb-4">{category.title}</h3>
            <div className="grid gap-4">
              {category.features.map((feature) => (
                  <FeatureConfigurationLayout
                    key={feature.id}
                    feature={feature}
                    onComplete={(config) => handleFeatureComplete(feature.id, config)}
                  />
              ))}
            </div>
          </div>
        ))}
      </div>
    </StepLayout>
  );
};