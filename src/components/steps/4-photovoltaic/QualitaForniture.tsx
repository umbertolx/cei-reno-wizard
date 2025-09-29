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

  const options = [
    {
      id: 'standard',
      title: 'Standard',
      description: `
        <div class="space-y-4">
          <div class="flex items-center gap-3 mb-4">
            <img src="${standardImage}" alt="Sistema fotovoltaico standard" class="w-full h-32 object-cover rounded-lg">
          </div>
          
          <div class="space-y-3">
            <div>
              <h4 class="font-semibold text-gray-900 mb-2">Pannelli Fotovoltaici</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• Tecnologia policristallina</li>
                <li>• Efficienza 18-20%</li>
                <li>• Garanzia prodotto 12 anni</li>
                <li>• Garanzia prestazioni 25 anni</li>
              </ul>
            </div>
            
            <div>
              <h4 class="font-semibold text-gray-900 mb-2">Sistema di Accumulo</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• Batteria al litio ferro fosfato</li>
                <li>• Cicli di vita: 6.000+</li>
                <li>• Efficienza 95%</li>
                <li>• Garanzia 10 anni</li>
              </ul>
            </div>
          </div>
        </div>
      `,
      features: [
        { text: "Tecnologia affidabile e testata" },
        { text: "Ottimo rapporto qualità-prezzo" },
        { text: "Garanzie standard del settore" },
        { text: "Installazione semplificata" }
      ]
    },
    {
      id: 'premium',
      title: 'Premium',
      description: `
        <div class="space-y-4">
          <div class="flex items-center gap-3 mb-4">
            <img src="${premiumImage}" alt="Sistema fotovoltaico premium" class="w-full h-32 object-cover rounded-lg">
          </div>
          
          <div class="space-y-3">
            <div>
              <h4 class="font-semibold text-gray-900 mb-2">Pannelli Fotovoltaici</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• Tecnologia monocristallina di ultima generazione</li>
                <li>• Efficienza 21-23%</li>
                <li>• Garanzia prodotto 20 anni</li>
                <li>• Garanzia prestazioni 30 anni</li>
              </ul>
            </div>
            
            <div>
              <h4 class="font-semibold text-gray-900 mb-2">Sistema di Accumulo</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• Batteria al litio NMC di alta qualità</li>
                <li>• Cicli di vita: 10.000+</li>
                <li>• Efficienza 98%</li>
                <li>• Garanzia 15 anni</li>
              </ul>
            </div>
          </div>
        </div>
      `,
      features: [
        { text: "Massima efficienza e produzione" },
        { text: "Tecnologia di ultima generazione" },
        { text: "Garanzie estese" },
        { text: "Maggiore durata nel tempo" },
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