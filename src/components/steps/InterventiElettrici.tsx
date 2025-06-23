
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

export const InterventiElettrici = ({ formData, updateFormData, onNext, onBack }: Props) => {
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
      description: 'Installiamo nuovi punti luce a soffitto o a parete dove prima non c\'erano.'
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
      description: 'Cambiamo i frutti esistenti con modelli più moderni o compatibili con il nuovo impianto.'
    },
    {
      id: 'comandiSmart',
      title: 'Comandi smart',
      description: 'Installiamo pulsanti intelligenti compatibili con i sistemi domotici per controllare luci, tapparelle o altri dispositivi.'
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
                <h2 className="text-xl md:text-2xl font-medium text-[#1c1c1c]">Seleziona gli interventi elettrici</h2>
                <p className="text-base text-[#1c1c1c] opacity-80">
                  Scegli quali lavori elettrici includere nel rifacimento
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {interventoFeatures.map((feature) => (
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
