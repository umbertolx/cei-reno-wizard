
import { useState } from "react";
import { Check, Zap, Wifi, Home, Settings, Shield, DollarSign, CheckCircle, Clock } from "lucide-react";
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
};

export const TipoDomoticaSelector = ({ selectedValue, onSelectionChange, onNext, onBack }: Props) => {
  const options: DomoticOption[] = [
    {
      id: 'knx',
      title: 'Impianto domotico filare (KNX)',
      subtitle: 'Domotica filare professionale',
      description: 'Questo sistema collega tutti i dispositivi con un cavo dedicato. È il più stabile, il più personalizzabile e quello scelto da chi vuole un impianto professionale',
      features: [
        { icon: CheckCircle, text: 'Affidabilità professionale' },
        { icon: Settings, text: 'Già predisposto nella costruzione' },
        { icon: Clock, text: 'Personalizzabile nel tempo' },
        { icon: DollarSign, text: 'Più costoso, ma duraturo' }
      ]
    },
    {
      id: 'wireless',
      title: 'Impianto domotico wireless (BTicino Living Now)',
      subtitle: 'Domotica wireless semplificata',
      description: 'Questo impianto usa connessioni wireless tra i dispositivi. È più semplice da installare e ha un costo più contenuto',
      features: [
        { icon: Wifi, text: 'Comunicazione radio' },
        { icon: CheckCircle, text: 'Installazione più veloce' },
        { icon: DollarSign, text: 'Soluzione più economica' }
      ]
    }
  ];

  const handleCardClick = (optionId: string) => {
    onSelectionChange(optionId);
  };

  return (
    <div className="space-y-8">
      {/* Header - identical to other steps */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
          <Home className="w-4 h-4" />
          Domotica avanzata
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Scegli il tipo di domotica che preferisci per la tua casa
        </h2>
      </div>

      {/* Main Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        {options.map((option) => {
          const isSelected = selectedValue === option.id;
          
          return (
            <div
              key={option.id}
              className={`
                relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200
                ${isSelected 
                  ? 'border-yellow-400 bg-yellow-50' 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
              onClick={() => handleCardClick(option.id)}
            >
              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute top-4 right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
              )}

              {/* Card Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 font-medium">
                    {option.subtitle}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-2">
                  {option.features.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <IconComponent className="w-5 h-5 text-gray-600 flex-shrink-0" />
                        <span className="text-gray-800">{feature.text}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed">
                  {option.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation - identical to other steps */}
      <div className="flex justify-between pt-6">
        <Button
          variant="outline"
          onClick={onBack}
          className="px-8 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          ← Indietro
        </Button>
        
        <Button
          onClick={onNext}
          disabled={!selectedValue}
          className="px-8 py-2 bg-red-500 hover:bg-red-600 text-white disabled:opacity-50"
        >
          Avanti →
        </Button>
      </div>
    </div>
  );
};
