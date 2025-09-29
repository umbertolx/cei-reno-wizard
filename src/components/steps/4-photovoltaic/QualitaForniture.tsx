import { FormData } from "../../Configuratore";
import { ScenarioComparisonLayout } from "../../templates";
import { SystemSummary } from "../components/SystemSummary";
import standardImage from "@/assets/standard-photovoltaic-system.jpg";
import premiumImage from "@/assets/premium-photovoltaic-system.jpg";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const QualitaForniture = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const currentValue = formData.moduloFotovoltaico?.qualitaForniture || "";
  const hasBattery = formData.moduloFotovoltaico?.batteriaAccumulo === 'si';

  const options = [
    {
      id: 'standard',
      title: 'Standard',
      description: (
        <div className="space-y-4">
          <img src={standardImage} alt="Sistema fotovoltaico standard" className="w-full h-32 object-cover" />
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-3">
                Pannelli Fotovoltaici Standard
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Tecnologia:</span>
                  <span className="font-medium">Policristallina</span>
                </div>
                <div className="flex justify-between">
                  <span>Efficienza:</span>
                  <span className="font-medium">18-20%</span>
                </div>
                <div className="flex justify-between">
                  <span>Garanzia prodotto:</span>
                  <span className="font-medium">12 anni</span>
                </div>
                <div className="flex justify-between">
                  <span>Garanzia prestazioni:</span>
                  <span className="font-medium">25 anni</span>
                </div>
              </div>
            </div>
            
            {hasBattery && (
              <div>
                <h4 className="font-semibold text-foreground mb-3">
                  Sistema di Accumulo Standard
                </h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Tecnologia:</span>
                    <span className="font-medium">Litio Ferro Fosfato (LiFePO4)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cicli di vita:</span>
                    <span className="font-medium">6.000+ cicli</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Efficienza:</span>
                    <span className="font-medium">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Garanzia:</span>
                    <span className="font-medium">10 anni</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="pt-2 border-t border-border">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Prezzo base</strong> - Ottimo rapporto qualità-prezzo per iniziare con il fotovoltaico
              </p>
            </div>
          </div>
        </div>
      ),
      features: [
        { text: "Tecnologia affidabile e testata nel tempo" },
        { text: "Ottimo rapporto qualità-prezzo" },
        { text: "Garanzie standard del settore" },
        { text: "Installazione semplificata" }
      ]
    },
    {
      id: 'premium',
      title: 'Premium',
      description: (
        <div className="space-y-4">
          <img src={premiumImage} alt="Sistema fotovoltaico premium" className="w-full h-32 object-cover" />
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-3">
                Pannelli Fotovoltaici Premium
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Tecnologia:</span>
                  <span className="font-medium">Monocristallina ultima generazione</span>
                </div>
                <div className="flex justify-between">
                  <span>Efficienza:</span>
                  <span className="font-medium text-green-600">21-23% (+15% prestazioni)</span>
                </div>
                <div className="flex justify-between">
                  <span>Garanzia prodotto:</span>
                  <span className="font-medium text-green-600">20 anni (+67%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Garanzia prestazioni:</span>
                  <span className="font-medium text-green-600">30 anni (+20%)</span>
                </div>
              </div>
            </div>
            
            {hasBattery && (
              <div>
                <h4 className="font-semibold text-foreground mb-3">
                  Sistema di Accumulo Premium
                </h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Tecnologia:</span>
                    <span className="font-medium">Litio NMC di alta qualità</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cicli di vita:</span>
                    <span className="font-medium text-green-600">10.000+ cicli (+67%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Efficienza:</span>
                    <span className="font-medium text-green-600">98% (+3%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Garanzia:</span>
                    <span className="font-medium text-green-600">15 anni (+50%)</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="pt-2 border-t border-border">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">+20-25% rispetto allo standard</strong> - Maggiore produzione energetica e durata nel tempo garantiscono un ritorno sull'investimento superiore
              </p>
            </div>
          </div>
        </div>
      ),
      features: [
        { text: "Massima efficienza energetica (+15% produzione)" },
        { text: "Tecnologia di ultima generazione" },
        { text: "Garanzie estese fino a 30 anni" },
        { text: "Maggiore durata e affidabilità nel tempo" },
        { text: "Design estetico superiore" }
      ]
    }
  ];

  const handleSelectionChange = (value: string) => {
    updateFormData({
      moduloFotovoltaico: {
        ...formData.moduloFotovoltaico,
        qualitaForniture: value
      }
    });
  };

  // Contenuto di riepilogo per SystemSummary (opzionale)
  const summaryContent = null;

  return (
    <ScenarioComparisonLayout
      badge="Impianto fotovoltaico"
      title="Scegli la qualità delle forniture"
      description="Seleziona il livello qualitativo dei componenti del tuo impianto fotovoltaico. La scelta influenza efficienza, durata e garanzie del sistema."
      options={options}
      selectedValue={currentValue}
      onSelectionChange={handleSelectionChange}
      onNext={onNext}
      onBack={onBack}
      nextButtonText="Continua"
      backButtonText="Indietro"
      additionalContent={summaryContent}
    />
  );
};