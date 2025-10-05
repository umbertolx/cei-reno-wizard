import { ScenarioComparisonLayout, ScenarioOption } from '@/components/templates';
import { InfoBoxType } from '@/components/shared/InfoBox';
import standardSystemImage from '@/assets/security-standard-system.jpg';
import premiumSystemImage from '@/assets/security-premium-system.jpg';

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
      description: (
        <div className="space-y-4">
          <img 
            src={standardSystemImage} 
            alt="Sistema di sicurezza Standard" 
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="space-y-3 text-sm">
            <p className="font-medium text-[#1c1c1c]">Protezione affidabile per la tua abitazione</p>
            <p className="text-[#1c1c1c]/80">
              Il livello Standard offre una soluzione completa di sicurezza con componenti certificati e tecnologia collaudata. 
              Include sensori di movimento, una centrale di controllo con gestione tramite app e una sirena di allarme. 
              Perfetto per chi cerca una protezione efficace a un prezzo contenuto.
            </p>
            <p className="text-[#1c1c1c]/80">
              L'installazione viene eseguita da tecnici professionisti e include una garanzia di 2 anni su tutti i componenti.
            </p>
          </div>
        </div>
      ),
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
      description: (
        <div className="space-y-4">
          <img 
            src={premiumSystemImage} 
            alt="Sistema di sicurezza Premium" 
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="space-y-3 text-sm">
            <p className="font-medium text-[#1c1c1c]">Massima tecnologia e sicurezza avanzata</p>
            <p className="text-[#1c1c1c]/80">
              Il livello Premium rappresenta il top di gamma nella sicurezza domestica. Equipaggiato con sensori ad alta precisione 
              dotati di tecnologia anti-mascheramento, una centrale con backup batteria di 72 ore e telecamere con intelligenza artificiale 
              per il riconoscimento avanzato.
            </p>
            <p className="text-[#1c1c1c]/80">
              Include integrazione completa con i sistemi domotici e una garanzia estesa di 5 anni. 
              La scelta ideale per chi non vuole compromessi sulla sicurezza.
            </p>
          </div>
        </div>
      ),
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
