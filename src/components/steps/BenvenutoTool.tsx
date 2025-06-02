
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
    <div className="space-y-3 md:space-y-8 px-3 md:px-0">
      {/* Badge Impianti Civili */}
      <div className="flex justify-start md:justify-center">
        <div className="bg-[#d8010c] text-white px-3 py-1.5 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-medium">
          Impianti Civili
        </div>
      </div>

      {/* Header principale - titolo più grande */}
      <div className="space-y-2 md:space-y-4">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#1c1c1c] leading-tight text-left md:text-center">
          <span className="block md:inline">Progetta il tuo impianto</span>
          <br className="hidden md:block" />
          <span 
            className={`text-[#d8010c] transition-all duration-700 ease-in-out transform block md:inline ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
            }`}
          >
            {tipiImpianto[currentTypeIndex]}
          </span>
        </h1>
        
        <p className="text-base md:text-xl text-gray-600 max-w-2xl text-left md:text-center md:mx-auto">
          Configura, personalizza e scopri i costi del tuo progetto
        </p>
      </div>

      {/* Redesigned Budget estimation box - mobile optimized */}
      <div className="relative max-w-full md:max-w-3xl md:mx-auto">
        {/* Example badge */}
        <div className="flex justify-start md:justify-center mb-2 md:mb-4">
          <div className="inline-flex items-center gap-1.5 md:gap-2 bg-blue-50 text-blue-700 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-xs md:text-sm font-medium border border-blue-200">
            <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
            Esempio di progetto
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-xl md:rounded-3xl shadow-xl overflow-hidden">
          {/* Subtle decorative elements */}
          <div className="absolute top-0 right-0 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-tr from-indigo-50 to-transparent rounded-tr-full opacity-50"></div>
          
          <div className="relative p-4 md:p-8">
            {/* Header section */}
            <div className="text-center mb-4 md:mb-6">
              <div className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2 font-medium">
                Budget stimato per questo progetto
              </div>
              <div className="text-2xl md:text-5xl font-bold text-gray-900 mb-2 md:mb-4">
                €28.350 - €34.550
              </div>
              
              {/* Tax deductions */}
              <div className="text-base md:text-xl text-green-700 font-semibold mb-3 md:mb-6">
                €14.175 detrazioni Bonus Casa
              </div>
            </div>

            {/* Project details in a clean grid */}
            <div className="border-t border-gray-200 pt-3 md:pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                {/* Left column */}
                <div className="space-y-1.5 md:space-y-3">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="h-2.5 w-2.5 md:h-3 md:w-3 text-green-600" />
                    </div>
                    <span className="text-xs md:text-sm text-gray-700">Appartamento</span>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="h-2.5 w-2.5 md:h-3 md:w-3 text-green-600" />
                    </div>
                    <span className="text-xs md:text-sm text-gray-700">83 mq</span>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="h-2.5 w-2.5 md:h-3 md:w-3 text-green-600" />
                    </div>
                    <span className="text-xs md:text-sm text-gray-700">Torino</span>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="h-2.5 w-2.5 md:h-3 md:w-3 text-green-600" />
                    </div>
                    <span className="text-xs md:text-sm text-gray-700">4 locali + 2 bagni</span>
                  </div>
                </div>
                
                {/* Right column */}
                <div className="space-y-1.5 md:space-y-3">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="h-2.5 w-2.5 md:h-3 md:w-3 text-green-600" />
                    </div>
                    <span className="text-xs md:text-sm text-gray-700">Impianto elettrico</span>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="h-2.5 w-2.5 md:h-3 md:w-3 text-green-600" />
                    </div>
                    <span className="text-xs md:text-sm text-gray-700">Domotica KNX</span>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="h-2.5 w-2.5 md:h-3 md:w-3 text-green-600" />
                    </div>
                    <span className="text-xs md:text-sm text-gray-700">Impianto di sicurezza</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Module selection - titolo più grande */}
      <div className="max-w-4xl md:mx-auto">
        <div className="mb-4 md:mb-8 text-left md:text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1c1c1c] mb-2 md:mb-3">Seleziona i moduli per il tuo progetto</h2>
          <p className="text-sm md:text-base text-gray-600">
            Puoi selezionare 1 o più moduli ({moduliSelezionati.length}/4 selezionati)
          </p>
        </div>
        
        {/* Mobile: spazi ridotti, Desktop: grid normale */}
        <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-2 md:gap-4 mb-6 md:mb-10">
          {moduli.map((modulo) => {
            const Icon = modulo.icon;
            const isSelected = moduliSelezionati.includes(modulo.id);
            const isDisabled = !isSelected && moduliSelezionati.length >= 4;
            const isLastSelected = isSelected && moduliSelezionati.length === 1;
            
            return (
              <div
                key={modulo.id}
                onClick={() => !isDisabled && !isLastSelected && toggleModulo(modulo.id)}
                className={`
                  p-4 md:p-6 rounded-xl transition-all duration-300
                  ${isSelected 
                    ? 'bg-[#d8010c]/5 border-2 border-[#d8010c] text-[#1c1c1c] shadow-lg' 
                    : isDisabled
                    ? 'bg-gray-100 border-2 border-gray-200 cursor-not-allowed opacity-50'
                    : 'bg-white border-2 border-gray-200 hover:border-[#d8010c] hover:shadow-lg cursor-pointer'
                  } ${isLastSelected ? 'cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div className={`
                    p-2.5 md:p-3 rounded-full flex-shrink-0 transition-all duration-300
                    ${isSelected 
                      ? 'bg-[#d8010c] text-white' 
                      : 'bg-gray-100 text-[#d8010c] group-hover:bg-[#d8010c]/10'
                    }
                  `}>
                    <Icon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <div className={`font-semibold text-base md:text-lg ${isSelected ? 'text-[#1c1c1c]' : 'text-[#1c1c1c]'}`}>
                      {modulo.nome}
                    </div>
                    <div className={`text-xs md:text-sm ${isSelected ? 'text-gray-700' : 'text-gray-600'} hidden md:block`}>
                      {modulo.descrizione}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="ml-auto flex-shrink-0">
                      <div className="w-5 h-5 md:w-6 md:h-6 bg-[#d8010c] rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 md:h-4 md:w-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="space-y-3 md:space-y-6">
          <Button 
            onClick={onStart}
            disabled={moduliSelezionati.length === 0}
            className="
              w-full px-6 md:px-12 py-5 md:py-6 
              text-lg md:text-xl 
              bg-[#d8010c] hover:bg-[#b8000a] md:hover:bg-[#b8000a] 
              text-white 
              rounded-xl 
              flex items-center justify-center gap-3 
              transition-all duration-300 
              shadow-lg
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            <span>Inizia ora</span>
            <ArrowRight className="h-5 w-5 md:h-6 md:w-6" />
          </Button>
          
          <div className="text-xs md:text-sm text-gray-500 text-left md:text-center">
            Gratuito • Pochi minuti • Senza impegno
          </div>
        </div>
      </div>
    </div>
  );
};
