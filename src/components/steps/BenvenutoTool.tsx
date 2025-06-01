
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Sun, Shield, Thermometer, Check } from "lucide-react";

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
    <div className="space-y-6 md:space-y-8 text-left md:text-center px-4 md:px-0">
      {/* Badge Impianti Civili - Mobile: sinistra, Desktop: centro */}
      <div className="flex justify-start md:justify-center">
        <div className="bg-gradient-to-r from-[#d8010c] to-[#ff1744] md:bg-[#d8010c] text-white px-4 py-2 md:px-6 md:py-3 rounded-full text-sm font-medium shadow-lg md:shadow-none">
          Impianti Civili
        </div>
      </div>

      {/* Header principale con animazione elegante - Mobile: sinistra */}
      <div className="space-y-3 md:space-y-4">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#1c1c1c] leading-tight text-left md:text-center">
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

      {/* Budget estimation box - Mobile: design futuristico a sinistra */}
      <div className="bg-gradient-to-br from-[#fbe12e] via-[#ffd700] to-[#ffed4e] md:bg-[#fbe12e] p-4 md:p-6 rounded-xl md:rounded-2xl shadow-xl md:shadow-lg max-w-lg md:mx-auto border-l-4 border-[#d8010c] md:border-l-0 relative overflow-hidden">
        {/* Effetto futuristico solo mobile */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8 md:hidden"></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 bg-[#d8010c]/20 rounded-full -ml-6 -mb-6 md:hidden"></div>
        
        <div className="text-left md:text-center relative z-10">
          <div className="text-sm text-gray-700 mb-2 font-medium">Budget stimato per questo progetto</div>
          <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1c1c1c] mb-3">
            €45.000 - €55.000
          </div>
          <div className="bg-gradient-to-r from-green-600 to-green-500 md:bg-green-600 text-white px-3 py-1.5 rounded-lg inline-block font-medium text-sm mb-3 shadow-lg md:shadow-none">
            + Detrazioni fiscali disponibili
          </div>
          
          {/* Dettagli configurazione minimal */}
          <div className="text-xs text-gray-600 pt-2 border-t border-gray-300/50">
            <div className="flex items-center justify-start md:justify-center gap-2 md:gap-3 flex-wrap">
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3 text-green-600" />
                Appartamento 80 m²
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3 text-green-600" />
                Torino
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3 text-green-600" />
                4 locali
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3 text-green-600" />
                Impianto + Sicurezza
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Module selection - Mobile: layout futuristico */}
      <div className="max-w-4xl md:mx-auto">
        <div className="mb-6 text-left md:text-center">
          <h2 className="text-xl md:text-2xl font-bold text-[#1c1c1c] mb-2">Seleziona i moduli per il tuo progetto</h2>
          <p className="text-sm text-gray-600">
            Puoi selezionare 1 o più moduli ({moduliSelezionati.length}/4 selezionati)
          </p>
        </div>
        
        {/* Mobile: Design a card futuristico, Desktop: grid normale */}
        <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4 mb-8">
          {moduli.map((modulo, index) => {
            const Icon = modulo.icon;
            const isSelected = moduliSelezionati.includes(modulo.id);
            const isDisabled = !isSelected && moduliSelezionati.length >= 4;
            const isLastSelected = isSelected && moduliSelezionati.length === 1;
            
            return (
              <div
                key={modulo.id}
                onClick={() => !isDisabled && !isLastSelected && toggleModulo(modulo.id)}
                className={`
                  p-4 md:p-6 rounded-xl transition-all duration-300 min-h-[72px] md:min-h-auto
                  relative overflow-hidden group
                  ${isSelected 
                    ? 'bg-gradient-to-r from-[#d8010c]/10 to-[#d8010c]/5 md:bg-[#d8010c]/5 border-2 border-[#d8010c] text-[#1c1c1c] shadow-xl md:shadow-lg transform translate-x-2 md:translate-x-0' 
                    : isDisabled
                    ? 'bg-gray-100 border-2 border-gray-200 cursor-not-allowed opacity-50'
                    : 'bg-white/80 md:bg-white border-2 border-gray-200 hover:border-[#d8010c] hover:shadow-lg md:hover:shadow-md cursor-pointer hover:translate-x-1 md:hover:translate-x-0'
                  } ${isLastSelected ? 'cursor-not-allowed' : 'cursor-pointer'}
                `}
                style={{
                  // Effetto sfalsato solo mobile
                  transform: `translateX(${isSelected ? '8px' : index % 2 === 1 ? '4px' : '0px'}) translateY(0px)`,
                  '@media (min-width: 768px)': {
                    transform: 'translateX(0px) translateY(0px)'
                  }
                } as React.CSSProperties}
              >
                {/* Effetto glow solo mobile per selected */}
                {isSelected && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d8010c]/20 to-transparent rounded-xl md:hidden"></div>
                )}
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`
                    p-3 rounded-full flex-shrink-0 transition-all duration-300
                    ${isSelected 
                      ? 'bg-gradient-to-br from-[#d8010c] to-[#b8000a] md:bg-[#d8010c] text-white shadow-lg md:shadow-none' 
                      : 'bg-gray-100 text-[#d8010c] group-hover:bg-[#d8010c]/10'
                    }
                  `}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <div className={`font-semibold text-base md:text-lg ${isSelected ? 'text-[#1c1c1c]' : 'text-[#1c1c1c]'}`}>
                      {modulo.nome}
                    </div>
                    <div className={`text-sm ${isSelected ? 'text-gray-700' : 'text-gray-600'} hidden md:block`}>
                      {modulo.descrizione}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="ml-auto flex-shrink-0">
                      <div className="w-6 h-6 bg-gradient-to-br from-[#d8010c] to-[#b8000a] md:bg-[#d8010c] rounded-full flex items-center justify-center shadow-lg md:shadow-none">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button - Mobile: design futuristico */}
        <div className="space-y-6">
          <Button 
            onClick={onStart}
            disabled={moduliSelezionati.length === 0}
            className="
              w-full px-6 md:px-12 py-4 md:py-6 
              text-lg md:text-xl 
              bg-gradient-to-r from-[#d8010c] to-[#b8000a] md:bg-[#d8010c] hover:from-[#b8000a] hover:to-[#a0000a] md:hover:bg-[#b8000a] 
              text-white 
              rounded-xl 
              flex items-center justify-center gap-3 
              transition-all duration-300 
              shadow-xl md:shadow-lg
              disabled:opacity-50 disabled:cursor-not-allowed
              min-h-[64px] md:min-h-[56px]
              relative overflow-hidden group
            "
          >
            {/* Effetto shine solo mobile */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 md:hidden"></div>
            <span className="relative z-10">Inizia ora</span>
            <ArrowRight className="h-5 w-5 md:h-6 md:w-6 relative z-10" />
          </Button>
          
          <div className="text-sm text-gray-500 text-left md:text-center">
            Gratuito • Pochi minuti • Senza impegno
          </div>
        </div>
      </div>
    </div>
  );
};
