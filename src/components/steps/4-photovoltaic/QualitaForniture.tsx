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
      description: `
        <div class="space-y-4">
          <div class="flex items-center gap-3 mb-4">
            <img src="${standardImage}" alt="Sistema fotovoltaico standard" class="w-full h-32 object-cover rounded-lg border">
          </div>
          
          <div class="space-y-4">
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                Pannelli Fotovoltaici Standard
              </h4>
              <div class="grid grid-cols-1 gap-2 text-sm text-gray-700">
                <div class="flex justify-between">
                  <span>• Tecnologia:</span>
                  <span class="font-medium">Policristallina</span>
                </div>
                <div class="flex justify-between">
                  <span>• Efficienza:</span>
                  <span class="font-medium">18-20%</span>
                </div>
                <div class="flex justify-between">
                  <span>• Garanzia prodotto:</span>
                  <span class="font-medium">12 anni</span>
                </div>
                <div class="flex justify-between">
                  <span>• Garanzia prestazioni:</span>
                  <span class="font-medium">25 anni</span>
                </div>
              </div>
            </div>
            
            ${hasBattery ? `
            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                Sistema di Accumulo Standard
              </h4>
              <div class="grid grid-cols-1 gap-2 text-sm text-gray-700">
                <div class="flex justify-between">
                  <span>• Tecnologia:</span>
                  <span class="font-medium">Litio Ferro Fosfato (LiFePO4)</span>
                </div>
                <div class="flex justify-between">
                  <span>• Cicli di vita:</span>
                  <span class="font-medium">6.000+ cicli</span>
                </div>
                <div class="flex justify-between">
                  <span>• Efficienza:</span>
                  <span class="font-medium">95%</span>
                </div>
                <div class="flex justify-between">
                  <span>• Garanzia:</span>
                  <span class="font-medium">10 anni</span>
                </div>
              </div>
            </div>
            ` : ''}
            
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-900 mb-2">💰 Investimento</h4>
              <p class="text-sm text-gray-700">
                <strong>Prezzo base</strong> - Ottimo rapporto qualità-prezzo per iniziare con il fotovoltaico
              </p>
            </div>
          </div>
        </div>
      `,
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
      description: `
        <div class="space-y-4">
          <div class="flex items-center gap-3 mb-4">
            <img src="${premiumImage}" alt="Sistema fotovoltaico premium" class="w-full h-32 object-cover rounded-lg border">
          </div>
          
          <div class="space-y-4">
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span class="w-2 h-2 bg-blue-600 rounded-full"></span>
                Pannelli Fotovoltaici Premium
              </h4>
              <div class="grid grid-cols-1 gap-2 text-sm text-gray-700">
                <div class="flex justify-between">
                  <span>• Tecnologia:</span>
                  <span class="font-medium">Monocristallina ultima generazione</span>
                </div>
                <div class="flex justify-between">
                  <span>• Efficienza:</span>
                  <span class="font-medium text-green-600">21-23% (+15% prestazioni)</span>
                </div>
                <div class="flex justify-between">
                  <span>• Garanzia prodotto:</span>
                  <span class="font-medium text-green-600">20 anni (+67%)</span>
                </div>
                <div class="flex justify-between">
                  <span>• Garanzia prestazioni:</span>
                  <span class="font-medium text-green-600">30 anni (+20%)</span>
                </div>
              </div>
            </div>
            
            ${hasBattery ? `
            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span class="w-2 h-2 bg-green-600 rounded-full"></span>
                Sistema di Accumulo Premium
              </h4>
              <div class="grid grid-cols-1 gap-2 text-sm text-gray-700">
                <div class="flex justify-between">
                  <span>• Tecnologia:</span>
                  <span class="font-medium">Litio NMC di alta qualità</span>
                </div>
                <div class="flex justify-between">
                  <span>• Cicli di vita:</span>
                  <span class="font-medium text-green-600">10.000+ cicli (+67%)</span>
                </div>
                <div class="flex justify-between">
                  <span>• Efficienza:</span>
                  <span class="font-medium text-green-600">98% (+3%)</span>
                </div>
                <div class="flex justify-between">
                  <span>• Garanzia:</span>
                  <span class="font-medium text-green-600">15 anni (+50%)</span>
                </div>
              </div>
            </div>
            ` : ''}
            
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-900 mb-2">💰 Investimento</h4>
              <p class="text-sm text-gray-700">
                <strong>+20-25% rispetto allo standard</strong> - Maggiore produzione energetica e durata nel tempo garantiscono un ritorno sull'investimento superiore
              </p>
            </div>
          </div>
        </div>
      `,
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