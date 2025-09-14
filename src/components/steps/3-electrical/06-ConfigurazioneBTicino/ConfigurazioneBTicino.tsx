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

export const ConfigurazioneBTicino = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [bticinoConfig, setBticinoConfig] = useState<Record<string, any>>(formData.moduloElettrico?.bTicinoConfig || {});

  const featureCategories = [
    {
      title: "Illuminazione Smart",
      features: [
        {
          id: "livingNow",
          title: "Living Now Smart",
          description: "Interruttori e prese intelligenti con controllo wireless",
          advancedOption: {
            title: "Numero di punti luce smart",
            type: "number" as const,
            placeholder: "Es. 12"
          }
        },
        {
          id: "scenariLuce",
          title: "Scenari luminosi",
          description: "Atmosfere predefinite controllabili da app"
        }
      ]
    },
    {
      title: "Clima e Benessere",
      features: [
        {
          id: "smartherstat",
          title: "Smarther Thermostat",
          description: "Termostato intelligente connesso con geolocalizzazione",
          advancedOption: {
            title: "Tipo di impianto",
            type: "select" as const,
            options: ["Caldaia tradizionale", "Pompa di calore", "Impianto radiante"]
          }
        },
        {
          id: "controlloClimaWireless",
          title: "Controllo clima wireless",
          description: "Gestione temperatura ambiente da remoto"
        }
      ]
    },
    {
      title: "Multimedia e Intrattenimento",
      features: [
        {
          id: "sistemaAudioBTicino",
          title: "Sistema Audio BTicino",
          description: "Diffusori integrati con controllo smart",
          advancedOption: {
            title: "Numero di ambienti",
            type: "select" as const,
            options: ["2 ambienti", "3 ambienti", "4 ambienti", "5+ ambienti"]
          }
        }
      ]
    },
    {
      title: "Sicurezza Connessa", 
      features: [
        {
          id: "videocitofono",
          title: "Videocitofono Smart",
          description: "Classe 300 con risposta da smartphone"
        },
        {
          id: "sistemaAntifurtoBTicino",
          title: "Sistema antifurto wireless",
          description: "Sensori e centrale MyHome Security"
        }
      ]
    },
    {
      title: "Gestione Energia",
      features: [
        {
          id: "smartPlugs",
          title: "Smart Plugs",
          description: "Prese intelligenti per monitoraggio consumi",
          advancedOption: {
            title: "Numero di Smart Plugs",
            type: "number" as const,
            placeholder: "Es. 6"
          }
        },
        {
          id: "sistemaFotovoltaico",
          title: "Integrazione fotovoltaico",
          description: "Monitoraggio produzione e autoconsumo energia"
        }
      ]
    }
  ];

  const handleFeatureComplete = (featureId: string, config: any) => {
    const updatedConfig = { ...bticinoConfig, [featureId]: config };
    setBticinoConfig(updatedConfig);
    updateFormData({ 
      moduloElettrico: {
        ...formData.moduloElettrico,
        bTicinoConfig: updatedConfig
      }
    });
  };

  const canProceed = Object.keys(bticinoConfig).length > 0;

  return (
    <StepLayout
      badge="Sistema Domotico"
      title="Configurazione Sistema BTicino"
      description="Configura le soluzioni smart BTicino per la tua abitazione"
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