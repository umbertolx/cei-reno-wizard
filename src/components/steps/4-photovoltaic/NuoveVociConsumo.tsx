import { useState } from "react";
import { FormData } from "../../Configuratore";
import { FeatureConfigurationLayout } from "../../templates/FeatureConfigurationLayout";
import { StepLayout } from "../../templates";

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
      id: 'piano_induzione',
      title: 'Piano a induzione',
      description: 'Consumi elevati durante la cottura, ma molto più efficienti del gas.'
    },
    {
      id: 'climatizzatori',
      title: 'Climatizzatori',
      description: 'Stima basata su un impianto moderno che raffresca tutta la casa. Consideriamo quante persone abitano l\'immobile e se è prima o seconda casa.'
    },
    {
      id: 'pompa_calore',
      title: 'Pompa di calore (riscaldamento + raffrescamento)',
      description: 'Copre sia inverno che estate, a pavimento o con radiatori. È un sistema ad alta efficienza che sostituisce gas e stufe.'
    },
    {
      id: 'boiler_elettrico',
      title: 'Boiler elettrico (scaldabagno)',
      description: 'Il consumo dipende da quanti bagni ci sono, quante persone vivono in casa e se è abitazione principale o secondaria.'
    },
    {
      id: 'auto_elettrica',
      title: 'Auto elettrica',
      description: 'Stima basata su 15.000 km/anno con un\'auto di nuova generazione. Puoi personalizzare il tuo chilometraggio.',
      advancedOption: {
        title: 'Chilometraggio annuale personalizzato',
        description: 'Inserisci i km annui (default: 15.000, range: 5.000–50.000).',
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
      description: 'Consumo base per pompe e filtraggio. Se la piscina è riscaldata, aggiungiamo l\'energia per mantenere l\'acqua.',
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
    <StepLayout
      badge="Impianto fotovoltaico"
      title="Hai in programma di aggiungere nuove voci di consumo impattanti?"
      description="Seleziona gli elettrodomestici o sistemi che hai intenzione di installare o acquistare"
      icon="/lovable-uploads/693eea79-0bc5-4475-8f7b-5b1a2f4b248a.png"
      iconAlt="Energy consumption icon"
      onNext={onNext}
      onBack={onBack}
      isNextDisabled={!canProceed}
    >
      {/* Features */}
      <div className="space-y-4">
        {consumoFeatures.map((feature) => (
          <FeatureConfigurationLayout
            key={feature.id}
            feature={feature}
            onComplete={handleFeatureComplete}
          />
        ))}
      </div>
    </StepLayout>
  );
};

export default NuoveVociConsumo;