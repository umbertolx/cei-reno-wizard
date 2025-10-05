import { ScenarioComparisonLayout, ScenarioOption } from '@/components/templates';
import { InfoBoxType } from '@/components/shared/InfoBox';

type Props = {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export const SecurityLevel = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const livelloDotazione = formData.moduloSicurezza?.livelloDotazione || '';

  const scenarios: ScenarioOption[] = [
    {
      id: 'standard',
      title: 'Standard',
      description: 'Protezione completa per la tua casa',
      features: [
        { text: 'Sensori di movimento certificati' },
        { text: 'Centrale di allarme con app' },
        { text: 'Sirena di avviso' },
        { text: 'Installazione professionale' },
        { text: 'Garanzia 2 anni' }
      ]
    },
    {
      id: 'premium',
      title: 'Premium',
      description: 'Massima qualità e tecnologia avanzata',
      features: [
        { text: 'Sensori ad alta precisione con anti-mascheramento' },
        { text: 'Centrale con backup batteria 72h' },
        { text: 'Telecamere con intelligenza artificiale' },
        { text: 'Integrazione domotica avanzata' },
        { text: 'Garanzia 5 anni estesa' }
      ]
    }
  ];

  const handleSelection = (value: string) => {
    updateFormData({
      moduloSicurezza: {
        ...formData.moduloSicurezza,
        livelloDotazione: value
      }
    });
  };

  return (
    <ScenarioComparisonLayout
      badge="Impianto di sicurezza"
      title="Scegli il livello di dotazione"
      description="Seleziona la qualità dei componenti per il tuo impianto di sicurezza"
      options={scenarios}
      selectedValue={livelloDotazione}
      onSelectionChange={handleSelection}
      onBack={onBack}
      onNext={onNext}
    />
  );
};
