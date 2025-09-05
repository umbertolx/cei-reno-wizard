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

const NuoveVociConsumo = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [nuoveVociConsumo, setNuoveVociConsumo] = useState<Record<string, any>>(
    formData.moduloFotovoltaico?.nuoveVociConsumo || {}
  );

  const consumoFeatures = [
    {
      id: 'climatizzatori',
      title: 'Climatizzatori',
      description: 'Terremo conto di un utilizzo medio, calcolato su un impianto di nuova generazione che copre la superficie dell\'intero appartamento. Il consumo è legato all\'utilizzo della casa come prima o seconda abitazione e al numero di soggetti che abitano l\'immobile.'
    },
    {
      id: 'pompa_calore',
      title: 'Pompa di calore (riscaldamento + raffrescamento)',
      description: 'Vale sia per aria acqua che per acqua acqua e prevede riscaldamento invernale e raffrescamento estivo sia per sistemi a pavimento che a radiatori. Sistema ad alta efficienza energetica.'
    },
    {
      id: 'boiler_elettrico',
      title: 'Boiler elettrico (scaldabagno)',
      description: 'Il consumo verrà dimensionato in base al numero di bagni, alla frequenza di utilizzo dell\'immobile come prima o seconda casa e al numero di inquilini che utilizzano l\'abitazione.'
    },
    {
      id: 'auto_elettrica',
      title: 'Auto elettrica',
      description: 'Consideriamo 15.000 km annuali con un\'auto media di nuova generazione. Puoi personalizzare i chilometri percorsi annualmente.',
      advancedOption: {
        title: 'Chilometraggio annuale personalizzato',
        description: 'Specifica quanti chilometri percorri mediamente all\'anno per calcolare il consumo energetico più preciso per la ricarica domestica.',
        requiresInput: true,
        inputType: 'number',
        inputPlaceholder: '15000',
        inputLabel: 'Chilometri annuali',
        inputMin: 5000,
        inputMax: 50000,
        useSlider: true,
        defaultValue: 15000
      }
    },
    {
      id: 'piscina',
      title: 'Piscina',
      description: 'L\'opzione base prevede pompe e filtraggio. Puoi aggiungere anche il riscaldamento per un utilizzo esteso durante l\'anno.',
      advancedOption: {
        title: 'Configurazione piscina',
        description: 'Scegli se la tua piscina include solo filtrazione e pompe o anche il sistema di riscaldamento per un utilizzo prolungato.',
        options: [
          { 
            id: 'solo_filtraggio', 
            label: 'Solo pompe e filtraggio',
            description: 'Sistema base per mantenimento e pulizia dell\'acqua'
          },
          { 
            id: 'con_riscaldamento', 
            label: 'Pompe, filtraggio + riscaldamento',
            description: 'Sistema completo per utilizzo esteso durante l\'anno'
          }
        ]
      }
    }
  ];

  const handleFeatureComplete = (featureId: string, config: any) => {
    const updatedConfig = {
      ...nuoveVociConsumo,
      [featureId]: config
    };
    setNuoveVociConsumo(updatedConfig);
    updateFormData({ 
      moduloFotovoltaico: {
        ...formData.moduloFotovoltaico,
        nuoveVociConsumo: updatedConfig
      }
    });
  };

  // Controlla se almeno una voce di consumo è stata configurata per abilitare il pulsante Avanti
  const canProceed = true; // Questo step è opzionale, può procedere anche senza selezioni

  return (
    <>
      <div className="space-y-6">
        {/* Badge */}
        <div className="flex justify-center">
          <div className="bg-[#d8010c] text-white px-3 py-1.5 md:px-6 md:py-3 rounded-full text-sm font-medium">
            Fotovoltaico
          </div>
        </div>

        {/* Contenuto principale */}
        <div className="max-w-4xl md:mx-auto space-y-6 md:space-y-8 mt-8 md:mt-16">
          <div className="space-y-4 md:space-y-6">
            {/* Header - Layout responsive */}
            <div className="flex items-center gap-4 px-3 md:px-0">
              <div className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] flex-shrink-0 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/693eea79-0bc5-4475-8f7b-5b1a2f4b248a.png" 
                  alt="Energy consumption icon" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-medium text-[#1c1c1c]">
                  Hai in programma di aggiungere nuove voci di consumo impattanti?
                </h2>
                <p className="text-base text-[#1c1c1c] opacity-80">
                  Seleziona gli elettrodomestici o sistemi che hai intenzione di installare o acquistare
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {consumoFeatures.map((feature) => (
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

export default NuoveVociConsumo;