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
      description: 'Sistemi di climatizzazione per riscaldamento e raffrescamento'
    },
    {
      id: 'pompa_calore',
      title: 'Pompa di calore (riscaldamento + raffrescamento)',
      description: 'Sistema efficiente per riscaldamento e raffrescamento'
    },
    {
      id: 'boiler_elettrico',
      title: 'Boiler elettrico (scaldabagno)',
      description: 'Scaldabagno elettrico per acqua calda sanitaria'
    },
    {
      id: 'auto_elettrica',
      title: 'Auto elettrica',
      description: 'Ricarica domestica per veicoli elettrici'
    },
    {
      id: 'piscina',
      title: 'Piscina',
      description: 'Sistemi di filtrazione e riscaldamento per piscina'
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

            {/* Info box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">
                Perché ti chiediamo queste informazioni?
              </h4>
              <p className="text-sm text-blue-800">
                Conoscere i tuoi piani futuri ci aiuta a dimensionare correttamente l'impianto fotovoltaico, 
                considerando anche i consumi aggiuntivi che potrebbero aumentare nel tempo.
              </p>
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