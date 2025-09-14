import { useState, useEffect } from "react";
import { FormData } from "../../../Configuratore";
import { FeatureConfigurationLayout } from "../../../templates";
import { StickyNavigationBar } from "../../../shared/StickyNavigationBar";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const ElectricalInterventions = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [interventiElettrici, setInterventiElettrici] = useState<Record<string, any>>(
    formData.moduloElettrico?.interventiElettrici || {}
  );

  useEffect(() => {
    updateFormData({
      moduloElettrico: {
        ...formData.moduloElettrico,
        interventiElettrici
      }
    });
  }, [interventiElettrici]);

  const interventoFeatures = [
    {
      id: "tapparelleElettriche",
      title: "Elettrificare tapparelle",
      description: "Automatizza le tue tapparelle esistenti",
      advancedOption: {
        title: "Numero di tapparelle da elettrificare",
        description: "Specifica quante tapparelle vuoi elettrificare",
        type: "number" as const,
        placeholder: "Inserisci il numero"
      }
    },
    {
      id: "puntiLuce",
      title: "Aggiungere punti luce",
      description: "Installazione di nuovi punti luce negli ambienti",
      advancedOption: {
        title: "Numero di punti luce da aggiungere", 
        description: "Specifica quanti punti luce aggiungere",
        type: "number" as const,
        placeholder: "Inserisci il numero"
      }
    },
    {
      id: "preseAggiuntive",
      title: "Prese aggiuntive",
      description: "Installazione di prese elettriche aggiuntive",
      advancedOption: {
        title: "Numero di prese da aggiungere",
        description: "Specifica quante prese aggiungere",
        type: "number" as const,
        placeholder: "Inserisci il numero"
      }
    },
    {
      id: "interruttori",
      title: "Interruttori aggiuntivi",
      description: "Installazione di interruttori e deviatori",
      advancedOption: {
        title: "Numero di interruttori da aggiungere",
        description: "Specifica quanti interruttori aggiungere", 
        type: "number" as const,
        placeholder: "Inserisci il numero"
      }
    },
    {
      id: "preseDati",
      title: "Prese dati/TV",
      description: "Installazione di prese per rete e televisione",
      advancedOption: {
        title: "Numero di prese dati da installare",
        description: "Specifica quante prese dati installare",
        type: "number" as const,
        placeholder: "Inserisci il numero"
      }
    },
    {
      id: "quadroElettrico",
      title: "Aggiornamento quadro elettrico",
      description: "Sostituzione o integrazione del quadro principale"
    },
    {
      id: "messa_terra",
      title: "Impianto di messa a terra",
      description: "Realizzazione o adeguamento impianto di terra"
    }
  ];

  const handleFeatureComplete = (featureId: string, config: any) => {
    setInterventiElettrici(prev => ({
      ...prev,
      [featureId]: config
    }));
  };

  const canProceed = Object.keys(interventiElettrici).length > 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Impianto elettrico
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Interventi elettrici specifici
            </h1>
            <p className="text-lg text-muted-foreground">
              Seleziona gli interventi elettrici aggiuntivi che vuoi realizzare
            </p>
          </div>

          <div className="space-y-6">
            {interventoFeatures.map((feature) => (
              <FeatureConfigurationLayout
                key={feature.id}
                feature={feature}
                onComplete={(config) => handleFeatureComplete(feature.id, config)}
              />
            ))}
          </div>
        </div>
      </div>
      
      <StickyNavigationBar
        onBack={onBack}
        onNext={canProceed ? onNext : undefined}
      />
    </div>
  );
};