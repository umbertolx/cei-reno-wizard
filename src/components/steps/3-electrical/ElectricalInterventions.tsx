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

export const ElectricalInterventions = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [interventiElettrici, setInterventiElettrici] = useState<Record<string, any>>(
    formData.interventiElettrici || {}
  );

  const interventoFeatures = [
    {
      id: 'tapparelleElettriche',
      title: 'Elettrificare le tapparelle',
      description: 'Portiamo la corrente fino alle finestre per motorizzare le tapparelle e renderle controllabili da interruttore o app.',
      image: '/lovable-uploads/fe24b59f-57ea-4463-a1da-970fbfe1242c.png',
      advancedOption: {
        title: 'Numero di tapparelle',
        description: 'Specifica quante tapparelle vuoi elettrificare per calcolare correttamente il costo degli interventi necessari.',
        requiresInput: true,
        inputType: 'number',
        inputPlaceholder: 'Es. 8',
        inputLabel: 'Numero di tapparelle',
        inputMin: 0,
        inputMax: 15,
        useSlider: true
      }
    },
    {
      id: 'puntiLuce',
      title: 'Aggiungere nuovi punti luce',
      description: 'Installiamo nuovi punti luce a soffitto o a parete dove prima non c\'erano.',
      image: '/lovable-uploads/85e3fe85-3d4a-498d-9bba-3b25c28bae0c.png',
      advancedOption: {
        title: 'Numero di punti luce',
        description: 'Indica quanti nuovi punti luce vuoi aggiungere. Puoi lasciare vuoto se non lo sai ancora.',
        requiresInput: true,
        inputType: 'number',
        inputPlaceholder: 'Es. 5 (lascia vuoto se non lo sai)',
        inputLabel: 'Numero di punti luce',
        inputMin: 0,
        inputMax: 20,
        useSlider: true
      }
    },
    {
      id: 'modificareTracce',
      title: 'Modificare le tracce esistenti',
      description: 'Aggiorniamo il percorso dei cavi o spostiamo i punti elettrici per adattarli a una nuova disposizione degli ambienti.',
      image: '/lovable-uploads/0103e1ac-a25b-4b60-8cf9-b93ccc65cd6e.png'
    },
    {
      id: 'sostituirePreseInterruttori',
      title: 'Sostituire prese e interruttori',
      description: 'Cambiamo i frutti esistenti con modelli più moderni o compatibili con il nuovo impianto.',
      image: '/lovable-uploads/e4018e3d-af29-46a5-b9a0-6ee8a266e5c6.png'
    },
    {
      id: 'comandiSmart',
      title: 'Comandi smart',
      description: 'Installiamo pulsanti intelligenti compatibili con i sistemi domotici per controllare luci, tapparelle o altri dispositivi.',
      image: '/lovable-uploads/cfe162f6-b15e-4476-8b03-d10078b34010.png'
    }
  ];

  const handleFeatureComplete = (featureId: string, config: any) => {
    const updatedConfig = {
      ...interventiElettrici,
      [featureId]: config
    };
    setInterventiElettrici(updatedConfig);
    updateFormData({ interventiElettrici: updatedConfig });
  };

  // Controlla se almeno un intervento è stato configurato per abilitare il pulsante Avanti
  const canProceed = Object.keys(interventiElettrici).length > 0;

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
            {/* Header con nuovo stile */}
            <div className="px-3 md:px-0">
              <div className="space-y-3">
                <h1 className="text-2xl md:text-3xl font-semibold text-[#1c1c1c] leading-tight">
                  Seleziona gli interventi elettrici
                </h1>
                <p className="text-sm md:text-base text-[#1c1c1c] opacity-75 mt-3">
                  Scegli quali lavori elettrici includere nel rifacimento
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {interventoFeatures.map((feature) => (
                <FeatureConfigurationLayout
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