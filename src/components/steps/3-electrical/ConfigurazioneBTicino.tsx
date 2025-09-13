import { useState } from "react";
import { FormData } from "../../Configuratore";
import { FeatureConfigurationLayout } from "../../templates/FeatureConfigurationLayout";
import { StickyNavigationBar } from "../../shared/StickyNavigationBar";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const ConfigurazioneBTicino = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [bTicinoConfig, setBTicinoConfig] = useState<Record<string, any>>(
    formData.bTicinoConfig || {}
  );

  const featureCategories = [
    {
      title: "Illuminazione e Automazione",
      description: "Controllo wireless di luci e aperture",
      features: [
        {
          id: 'luci',
          title: 'Controllo luci wireless',
          description: 'Gestisci l\'illuminazione tramite interruttori smart BTicino e app MyHome. Controlli wireless per accensione, spegnimento e regolazione intensità luminosa senza opere murarie aggiuntive.'
        },
        {
          id: 'tapparelle',
          title: 'Controllo tapparelle wireless',
          description: 'Gestisci tapparelle e tende motorizzate tramite comandi wireless BTicino. Controllo da app MyHome, programmazione orari e scenari coordinati senza cavi aggiuntivi.',
          advancedOption: {
            title: 'Numero di tapparelle',
            description: 'Specifica quante tapparelle vuoi controllare con il sistema wireless BTicino per calcolare il numero di attuatori radio necessari.',
            requiresInput: true,
            inputType: 'number',
            inputPlaceholder: 'Es. 8',
            inputLabel: 'Numero di tapparelle',
            inputMin: 1,
            inputMax: 50,
            useSlider: true
          }
        },
        {
          id: 'tende',
          title: 'Controllo tende wireless',
          description: 'Aggiungi il controllo wireless per tende interne ed esterne. Gestione tramite app MyHome e comandi radio, installazione rapida senza tracce murarie.',
          advancedOption: {
            title: 'Numero di tende motorizzate',
            description: 'Specifica quante tende vuoi controllare con attuatori wireless BTicino per il calcolo degli apparecchi necessari.',
            requiresMultipleInputs: true,
            inputs: [
              {
                id: 'tendeInterne',
                label: 'Numero di tende interne',
                inputType: 'number',
                inputPlaceholder: 'Es. 4',
                inputMin: 0,
                inputMax: 30,
                useSlider: true
              },
              {
                id: 'tendeEsterne',
                label: 'Numero di tende esterne',
                inputType: 'number',
                inputPlaceholder: 'Es. 6',
                inputMin: 0,
                inputMax: 30,
                useSlider: true
              }
            ]
          }
        }
      ]
    },
    {
      title: "Clima e Comfort",
      description: "Gestione wireless della temperatura",
      features: [
        {
          id: 'clima',
          title: 'Controllo Clima Wireless',
          description: 'Utilizza termostati wireless BTicino per controllare climatizzatori e pompe di calore. Sensori di temperatura senza fili e gestione da app MyHome.',
          advancedOption: {
            title: 'Controllo clima wireless',
            description: 'Il sistema BTicino wireless permette il controllo della temperatura tramite termostati radio. Installazione semplificata senza cablaggio aggiuntivo.',
            options: [
              { 
                id: 'solo_clima', 
                label: 'Controllo clima wireless',
                description: 'Gestione temperatura via termostati wireless BTicino'
              }
            ]
          }
        }
      ]
    },
    {
      title: "Multimedia e Comunicazione",
      description: "Audio e videocitofonia wireless",
      features: [
        {
          id: 'audio',
          title: 'Controllo audio wireless',
          description: 'Integra il controllo del sistema audio tramite comandi wireless BTicino. Gestione volume e sorgenti da app MyHome e interruttori smart radio.',
          advancedOption: {
            title: 'Sistema audio wireless',
            description: 'Controllo wireless del tuo impianto audio esistente tramite la tecnologia radio BTicino, senza necessità di cavi aggiuntivi.',
            options: [
              { 
                id: 'solo_controllo', 
                label: 'Solo controllo audio wireless',
                description: 'Controllo del sistema audio esistente tramite comandi radio BTicino'
              }
            ]
          }
        },
        {
          id: 'videocitofono',
          title: 'Videocitofono smart wireless',
          description: 'Videocitofono BTicino con connettività wireless. Ricevi chiamate su smartphone, apri da remoto e integra con altri dispositivi smart della casa.'
        }
      ]
    },
    {
      title: "Sicurezza e Controllo",
      description: "Gestione wireless e interfacce smart",
      features: [
        {
          id: 'sicurezza',
          title: 'Predisposizione sicurezza wireless',
          description: 'Predisponi sensori di sicurezza wireless compatibili con il sistema BTicino. Rilevatori volumetrici e contatti porta senza fili per futuri ampliamenti.'
        },
        {
          id: 'supervisor',
          title: 'App MyHome e controllo centralizzato',
          description: 'Controlla tutto il sistema wireless BTicino da app MyHome. Interfaccia intuitiva per gestire luci, clima, tapparelle e scenari da smartphone e tablet.'
        },
        {
          id: 'prese',
          title: 'Prese smart wireless',
          description: 'Prese intelligenti BTicino con controllo wireless. Gestisci elettrodomestici da remoto, monitora consumi e crea automatismi tramite app MyHome.'
        }
      ]
    }
  ];

  const handleFeatureComplete = (featureId: string, config: any) => {
    const updatedConfig = {
      ...bTicinoConfig,
      [featureId]: config
    };
    setBTicinoConfig(updatedConfig);
    updateFormData({ bTicinoConfig: updatedConfig });
  };

  // Controlla se almeno una feature è stata configurata per abilitare il pulsante Avanti
  const canProceed = Object.keys(bTicinoConfig).length > 0;

  return (
    <>
      <div className="space-y-6">
        {/* Contenuto principale */}
        <div className="max-w-4xl md:mx-auto space-y-6 md:space-y-8 mt-8 md:mt-16">
          <div className="space-y-4 md:space-y-6">
            {/* Categories */}
            <div className="space-y-8">
              {featureCategories.map((category) => (
                <div key={category.title} className="space-y-4">
                  {/* Category Header */}
                  <div className="border-b border-gray-200 pb-3">
                    <h3 className="text-lg font-semibold text-[#1c1c1c]">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {category.description}
                    </p>
                  </div>
                  
                  {/* Features in this category */}
                  <div className="space-y-4">
                    {category.features.map((feature) => (
                <FeatureConfigurationLayout
                  key={feature.id}
                  feature={feature}
                  onComplete={handleFeatureComplete}
                />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <StickyNavigationBar
        onBack={onBack}
        onNext={onNext}
        isNextDisabled={!canProceed}
      />
    </>
  );
};
