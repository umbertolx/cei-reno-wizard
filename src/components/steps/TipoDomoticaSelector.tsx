
import { useState } from "react";
import { Check, Zap, Wifi, HelpCircle, Home, Settings, Shield, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  selectedValue: string;
  onSelectionChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
};

type DomoticOption = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: Array<{
    icon: any;
    text: string;
  }>;
  className: string;
};

export const TipoDomoticaSelector = ({ selectedValue, onSelectionChange, onNext, onBack }: Props) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const options: DomoticOption[] = [
    {
      id: 'knx',
      title: 'Domotica filare professionale',
      subtitle: 'KNX - Massima stabilità e controllo completo',
      description: 'Sistema cablato professionale con massima affidabilità. Richiede predisposizione durante i lavori ma offre prestazioni superiori e personalizzazione totale.',
      features: [
        { icon: Shield, text: 'Massima affidabilità' },
        { icon: Settings, text: 'Controllo completo' },
        { icon: Home, text: 'Scalabile nel tempo' },
        { icon: DollarSign, text: 'Investimento superiore' }
      ],
      className: 'border-blue-200 hover:border-blue-400 hover:shadow-blue-100'
    },
    {
      id: 'wireless',
      title: 'Domotica wireless semplificata',
      subtitle: 'BTicino Living Now - Controllo smart essenziale',
      description: 'Sistema wireless facile da installare, ideale per controllo base di luci, prese e tapparelle. Soluzione più economica con buone funzionalità smart.',
      features: [
        { icon: Wifi, text: 'Installazione rapida' },
        { icon: Zap, text: 'Setup semplificato' },
        { icon: DollarSign, text: 'Costo contenuto' },
        { icon: Settings, text: 'Funzioni essenziali' }
      ],
      className: 'border-green-200 hover:border-green-400 hover:shadow-green-100'
    }
  ];

  const handleCardClick = (optionId: string) => {
    onSelectionChange(optionId);
  };

  const handleHelpClick = () => {
    onSelectionChange('help');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          <Home className="w-4 h-4" />
          Domotica avanzata
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Scegli il tipo di domotica che preferisci per la tua casa
        </h2>
      </div>

      {/* Main Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {options.map((option) => {
          const isSelected = selectedValue === option.id;
          const isHovered = hoveredCard === option.id;
          
          return (
            <div
              key={option.id}
              className={`
                relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200
                ${isSelected 
                  ? 'border-primary shadow-lg shadow-primary/20 bg-primary/5' 
                  : `border-gray-200 hover:shadow-md ${option.className}`
                }
                ${isHovered ? 'transform scale-[1.02]' : ''}
              `}
              onClick={() => handleCardClick(option.id)}
              onMouseEnter={() => setHoveredCard(option.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}

              {/* Card Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {option.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {option.subtitle}
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {option.features.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <div key={index} className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{feature.text}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {option.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Help Option */}
      <div className="flex justify-center">
        <button
          onClick={handleHelpClick}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition-all duration-200
            ${selectedValue === 'help'
              ? 'border-primary bg-primary/5 text-primary'
              : 'border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-800'
            }
          `}
        >
          <HelpCircle className="w-5 h-5" />
          <span className="font-medium">Non sono sicuro, aiutatemi voi</span>
        </button>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button
          variant="outline"
          onClick={onBack}
          className="px-8"
        >
          Indietro
        </Button>
        
        <Button
          onClick={onNext}
          disabled={!selectedValue}
          className="px-8"
        >
          Avanti
        </Button>
      </div>
    </div>
  );
};
