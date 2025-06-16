
import { useState } from "react";
import { FormData } from "../Configuratore";
import { KNXFeatureSelector } from "../shared/KNXFeatureSelector";
import { StickyNavigationBar } from "../shared/StickyNavigationBar";

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
      description: 'Gestisci l\'apertura e la chiusura delle tapparelle o tende motorizzate da app o da pulsanti intelligenti. Puoi impostare orari automatici, scenari coordinati con le luci, o regolare l\'apertura a una determinata percentuale.',
      advancedOption: {
        title: 'Numero di tapparelle',
        description: 'Specifica quante tapparelle vuoi controllare con il sistema KNX per calcolare correttamente il costo degli attuatori necessari.',
        requiresInput: true,
        inputType: 'number',
        inputPlaceholder: 'Es. 8',
        inputLabel: 'Numero di tapparelle',
        inputMin: 1,
        inputMax: 50
      }
    },
    {
      id: 'clima',
      title: 'Controllo Clima',
      description: 'Utilizza i frutti KNX come sensori di temperatura per controllare climatizzatori o pompe di calore compatibili. Richiede impianto termico predisposto.',
      advancedOption: {
        title: 'Gestione VMC',
        description: 'La Ventilazione Meccanica Controllata (VMC) garantisce il ricambio d\'aria negli ambienti. Con KNX puoi monitorare CO2, VOC e umidità per regolare automaticamente i flussi d\'aria in base alla qualità dell\'aria rilevata.',
        options: [
          { 
            id: 'solo_clima', 
            label: 'Solo controllo clima',
            description: 'Gestione temperatura via sensori KNX'
          },
          { 
            id: 'clima_vmc', 
            label: 'Controllo clima + VMC',
            description: 'Temperatura e qualità dell\'aria'
          }
        ]
      }
    },
    {
      id: 'audio',
      title: 'Controllo dell\'audio',
      description: 'Gestisci il sistema audio multiroom tramite domotica. Regola volume, cambia traccia o sorgente e inserisci l\'audio in scenari domotici (es. relax, cena) direttamente dai comandi dell\'impianto elettrico.',
      advancedOption: {
        title: 'Impianto audio diffuso',
        description: 'CEI può fornirti anche l\'impianto audio diffuso completo. Un sistema professionale che garantisce qualità audio superiore e perfetta integrazione con la domotica KNX.',
        options: [
          { 
            id: 'solo_controllo', 
            label: 'Solo controllo audio',
            description: 'Controllo del tuo sistema audio esistente tramite KNX'
          },
          { 
            id: 'impianto_completo', 
            label: 'Controllo + impianto audio diffuso',
            description: 'Sistema completo: controllo KNX + impianto audio fornito da CEI'
          }
        ]
      }
    },
    {
      id: 'videocitofono',
      title: 'Videocitofono smart',
      description: 'Ricevi chiamate sullo smartphone quando qualcuno suona, apri il cancello anche se non sei in casa e integra il videocitofono nei tuoi scenari domotici. Puoi attivare luci, notifiche o azioni automatiche in base all\'orario o a chi chiama.'
    },
    {
      id: 'supervisor',
      title: 'Supervisor e interfaccia di controllo',
      description: 'Controlla l\'intero impianto domotico da app o pannello touch. Visualizza e gestisci luci, clima, scenari e consumi da un\'unica interfaccia elegante e intuitiva. Include 1 supervisor base per la gestione centralizzata del sistema.'
    },
    {
      id: 'prese',
      title: 'Prese intelligenti',
      description: 'Controlla da remoto l\'accensione e lo spegnimento di elettrodomestici e monitora i consumi energetici. Ideale per piccoli elettrodomestici e gestione a distanza (es. frigorifero nella seconda casa).'
    }
  ];

  const handleFeatureComplete = (featureId: string, config: any) => {
    const updatedConfig = {
      ...knxConfig,
      [featureId]: config
    };
    setKnxConfig(updatedConfig);
    updateFormData({ knxConfig: updatedConfig });
  };

  // Controlla se almeno una feature è stata configurata per abilitare il pulsante Avanti
  const canProceed = Object.keys(knxConfig).length > 0;

  return (
    <>
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
              <div className="w-[70px] h-[70px] md:w-[100px] h-[100px] flex-shrink-0 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/c7408342-e29b-40fb-a65e-1c92eca62469.png" 
                  alt="Electrical work icon" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-medium text-[#1c1c1c]">Configurazione KNX</h2>
                <p className="text-base text-[#1c1c1c] opacity-80">
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
                />
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
