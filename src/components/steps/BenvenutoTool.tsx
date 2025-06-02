
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Sun, Shield, Thermometer, Check, Sparkles } from "lucide-react";

type Props = {
  onStart: () => void;
};

type Modulo = {
  id: string;
  nome: string;
  icon: React.ComponentType<any>;
  descrizione: string;
};

export const BenvenutoTool = ({ onStart }: Props) => {
  const [moduliSelezionati, setModuliSelezionati] = useState<string[]>(['impianto-elettrico']);
  
  // Animated text rotation - more elegant
  const tipiImpianto = ["elettrico", "fotovoltaico", "di sicurezza", "termotecnico"];
  const [currentTypeIndex, setCurrentTypeIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentTypeIndex((prev) => (prev + 1) % tipiImpianto.length);
        setIsVisible(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const moduli: Modulo[] = [
    {
      id: 'impianto-elettrico',
      nome: 'Impianto elettrico',
      icon: Zap,
      descrizione: 'Rifacimento completo impianto'
    },
    {
      id: 'fotovoltaico',
      nome: 'Fotovoltaico',
      icon: Sun,
      descrizione: 'Pannelli solari e storage'
    },
    {
      id: 'sicurezza',
      nome: 'Sicurezza',
      icon: Shield,
      descrizione: 'Allarmi e videosorveglianza'
    },
    {
      id: 'termotecnico',
      nome: 'Termotecnico',
      icon: Thermometer,
      descrizione: 'Riscaldamento e climatizzazione'
    }
  ];

  const toggleModulo = (moduloId: string) => {
    setModuliSelezionati(prev => {
      if (prev.includes(moduloId)) {
        // Non permettere di deselezionare se è l'ultimo rimasto
        if (prev.length === 1) {
          return prev;
        }
        return prev.filter(id => id !== moduloId);
      } else if (prev.length < 4) {
        return [...prev, moduloId];
      }
      return prev;
    });
  };

  return (
    <div className="space-y-4 px-4">
      {/* Badge Impianti Civili */}
      <div className="flex justify-center">
        <div className="bg-[#d8010c] text-white px-4 py-2 rounded-full text-xs font-medium">
          Impianti Civili
        </div>
      </div>

      {/* Header principale */}
      <div className="space-y-2 text-center">
        <h1 className="text-xs font-bold text-[#1c1c1c] leading-tight">
          <span className="block">Progetta il tuo impianto</span>
          <br />
          <span 
            className={`text-[#d8010c] transition-all duration-700 ease-in-out transform block ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
            }`}
          >
            {tipiImpianto[currentTypeIndex]}
          </span>
        </h1>
        
        <p className="text-xs text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Configura, personalizza e scopri i costi del tuo progetto
        </p>
      </div>

      {/* Budget estimation box - card style */}
      <div className="relative max-w-full mx-auto mb-8">
        {/* Example badge */}
        <div className="flex justify-center mb-2">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium border border-blue-200">
            <Sparkles className="h-3 w-3" />
            Esempio di progetto
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4">
            {/* Header section */}
            <div className="text-center mb-4">
              <div className="text-xs text-gray-500 mb-1 font-medium">
                Budget stimato per questo progetto
              </div>
              <div className="text-xs font-bold text-gray-900 mb-2">
                €28.350 - €34.550
              </div>
              
              {/* Tax deductions */}
              <div className="text-xs text-green-700 font-semibold mb-3">
                Fino a €14.175 Bonus Casa (1ª)
              </div>
            </div>

            {/* Project details in a clean grid */}
            <div className="border-t border-gray-200 pt-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* Left column */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="h-2.5 w-2.5 text-green-600" />
                    </div>
                    <span className="text-xs text-gray-700">Appartamento</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="h-2.5 w-2.5 text-green-600" />
                    </div>
                    <span className="text-xs text-gray-700">83 mq</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="h-2.5 w-2.5 text-green-600" />
                    </div>
                    <span className="text-xs text-gray-700">Torino</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="h-2.5 w-2.5 text-green-600" />
                    </div>
                    <span className="text-xs text-gray-700">4 locali + 2 bagni</span>
                  </div>
                </div>
                
                {/* Right column */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="h-2.5 w-2.5 text-green-600" />
                    </div>
                    <span className="text-xs text-gray-700">Impianto elettrico</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="h-2.5 w-2.5 text-green-600" />
                    </div>
                    <span className="text-xs text-gray-700">Domotica KNX</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="h-2.5 w-2.5 text-green-600" />
                    </div>
                    <span className="text-xs text-gray-700">Impianto di sicurezza</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Module selection */}
      <div className="max-w-4xl mx-auto">
        <div className="mb-4 text-center">
          <h2 className="text-xs font-bold text-[#1c1c1c] mb-1">Seleziona i moduli per il tuo progetto</h2>
          <p className="text-xs text-gray-600">
            Puoi selezionare 1 o più moduli ({moduliSelezionati.length}/4 selezionati)
          </p>
        </div>
        
        <div className="space-y-3 mb-6">
          {moduli.map((modulo) => {
            const isSelected = moduliSelezionati.includes(modulo.id);
            const isDisabled = !isSelected && moduliSelezionati.length >= 4;
            const isLastSelected = isSelected && moduliSelezionati.length === 1;
            
            return (
              <div
                key={modulo.id}
                onClick={() => !isDisabled && !isLastSelected && toggleModulo(modulo.id)}
                className={`
                  p-4 rounded-xl transition-all duration-300 border bg-white shadow-sm
                  ${isSelected 
                    ? 'border-[#d8010c] bg-[#d8010c]/5' 
                    : isDisabled
                    ? 'border-gray-200 cursor-not-allowed opacity-50'
                    : 'border-gray-200 hover:border-[#d8010c] hover:shadow-md cursor-pointer'
                  } ${isLastSelected ? 'cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left flex-1 min-w-0">
                    <div className="font-semibold text-xs text-[#1c1c1c] mb-0.5">
                      {modulo.nome}
                    </div>
                    <div className="text-xs text-gray-600">
                      {modulo.descrizione}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="ml-3 flex-shrink-0">
                      <div className="w-5 h-5 bg-[#d8010c] rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="space-y-3">
          <Button 
            onClick={onStart}
            disabled={moduliSelezionati.length === 0}
            className="
              w-full px-6 py-4
              text-xs 
              bg-[#d8010c] hover:bg-[#b8000a]
              text-white 
              rounded-xl 
              flex items-center justify-center gap-2
              transition-all duration-300 
              shadow-sm hover:shadow-md
              disabled:opacity-50 disabled:cursor-not-allowed
              min-h-[48px]
            "
          >
            <span>Inizia ora</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
