
import { useState } from "react";
import { FormData } from "../Configuratore";
import { StickyNavigationBar } from "../shared/StickyNavigationBar";
import { CheckCircle, Lightbulb, Shield, Thermometer, Music, Phone, Zap, Camera, Volume2 } from "lucide-react";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

type FunzioneDomotica = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
  category: 'base' | 'comfort' | 'security';
  isPopular?: boolean;
};

export const FunzioniDomotica = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [selectedFunctions, setSelectedFunctions] = useState<string[]>(formData.funzioniDomotica || []);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const funzioni: FunzioneDomotica[] = [
    {
      id: 'luci',
      title: 'Controllo luci',
      description: 'Gestisci illuminazione e atmosfera',
      icon: Lightbulb,
      color: 'text-yellow-600',
      gradient: 'from-yellow-400 to-amber-500',
      category: 'base',
      isPopular: true
    },
    {
      id: 'tapparelle',
      title: 'Tapparelle smart',
      description: 'Automatizza apertura e chiusura',
      icon: Shield,
      color: 'text-blue-600',
      gradient: 'from-blue-400 to-cyan-500',
      category: 'comfort'
    },
    {
      id: 'tende',
      title: 'Tende motorizzate',
      description: 'Controllo tende interne ed esterne',
      icon: Shield,
      color: 'text-purple-600',
      gradient: 'from-purple-400 to-violet-500',
      category: 'comfort'
    },
    {
      id: 'videocitofono',
      title: 'Videocitofono smart',
      description: 'Rispondi dal tuo smartphone',
      icon: Phone,
      color: 'text-green-600',
      gradient: 'from-green-400 to-emerald-500',
      category: 'security',
      isPopular: true
    },
    {
      id: 'audio',
      title: 'Audio diffuso',
      description: 'Musica in tutta la casa',
      icon: Music,
      color: 'text-pink-600',
      gradient: 'from-pink-400 to-rose-500',
      category: 'comfort'
    },
    {
      id: 'clima',
      title: 'Gestione clima',
      description: 'Riscaldamento e aria condizionata intelligenti',
      icon: Thermometer,
      color: 'text-orange-600',
      gradient: 'from-orange-400 to-red-500',
      category: 'comfort',
      isPopular: true
    },
    {
      id: 'prese',
      title: 'Prese smart',
      description: 'Controllo remoto di elettrodomestici',
      icon: Zap,
      color: 'text-indigo-600',
      gradient: 'from-indigo-400 to-blue-500',
      category: 'base'
    },
    {
      id: 'sicurezza',
      title: 'Sistema sicurezza',
      description: 'Allarmi, telecamere e sensori',
      icon: Camera,
      color: 'text-red-600',
      gradient: 'from-red-400 to-pink-500',
      category: 'security'
    }
  ];

  const toggleFunction = (functionId: string) => {
    setSelectedFunctions(prev => {
      const newSelection = prev.includes(functionId)
        ? prev.filter(id => id !== functionId)
        : [...prev, functionId];
      
      updateFormData({ funzioniDomotica: newSelection });
      return newSelection;
    });
  };

  const handleSubmit = () => {
    updateFormData({ funzioniDomotica: selectedFunctions });
    onNext();
  };

  const getCardAnimation = (index: number) => {
    return {
      animationDelay: `${index * 100}ms`,
      animation: 'fade-in 0.6s ease-out forwards'
    };
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'base': return 'Essenziali';
      case 'comfort': return 'Comfort';
      case 'security': return 'Sicurezza';
      default: return category;
    }
  };

  const groupedFunctions = funzioni.reduce((groups, func) => {
    if (!groups[func.category]) {
      groups[func.category] = [];
    }
    groups[func.category].push(func);
    return groups;
  }, {} as Record<string, FunzioneDomotica[]>);

  return (
    <div className="space-y-6 pb-32">
      {/* Badge */}
      <div className="flex justify-center">
        <div className="bg-[#d8010c] text-white px-3 py-1.5 md:px-6 md:py-3 rounded-full text-sm font-medium">
          Impianto elettrico
        </div>
      </div>

      {/* Header */}
      <div className="max-w-4xl md:mx-auto space-y-6 md:space-y-8 mt-8 md:mt-16">
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center gap-4 px-3 md:px-0">
            <div className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] flex-shrink-0 flex items-center justify-center">
              <Volume2 className="w-full h-full text-[#d8010c]" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-medium text-[#1c1c1c]">
                Crea la tua casa intelligente
              </h2>
              <p className="text-base text-[#1c1c1c] opacity-80 hidden md:block">
                Seleziona le funzioni che vuoi controllare con la domotica
              </p>
            </div>
          </div>

          {/* Stats header */}
          <div className="bg-gradient-to-r from-[#d8010c]/5 to-purple-500/5 rounded-xl p-4 mx-3 md:mx-0">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#d8010c]"></div>
                <span className="text-[#1c1c1c] font-medium">
                  {selectedFunctions.length} funzioni selezionate
                </span>
              </div>
              <div className="text-[#1c1c1c]/60">
                Tocca per aggiungere/rimuovere
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-8 px-3 md:px-0">
          {Object.entries(groupedFunctions).map(([category, functions]) => (
            <div key={category} className="space-y-4">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-[#1c1c1c]">
                  {getCategoryLabel(category)}
                </h3>
                <div className="h-px bg-gray-200 flex-1"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {functions.map((funzione, index) => {
                  const isSelected = selectedFunctions.includes(funzione.id);
                  const Icon = funzione.icon;

                  return (
                    <div
                      key={funzione.id}
                      style={getCardAnimation(index)}
                      className="opacity-0"
                    >
                      <div
                        onClick={() => toggleFunction(funzione.id)}
                        onMouseEnter={() => setActiveCard(funzione.id)}
                        onMouseLeave={() => setActiveCard(null)}
                        className={`
                          relative group cursor-pointer
                          bg-white rounded-2xl border-2 transition-all duration-300
                          hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]
                          ${isSelected 
                            ? 'border-[#d8010c] shadow-lg shadow-[#d8010c]/20' 
                            : 'border-gray-200 hover:border-[#d8010c]/30'
                          }
                        `}
                      >
                        {/* Popular badge */}
                        {funzione.isPopular && (
                          <div className="absolute -top-2 -right-2 z-10">
                            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                              HOT
                            </div>
                          </div>
                        )}

                        {/* Card content */}
                        <div className="p-6">
                          <div className="flex items-start gap-4">
                            {/* Icon container */}
                            <div className={`
                              w-16 h-16 rounded-xl flex items-center justify-center
                              bg-gradient-to-br ${funzione.gradient}
                              transition-transform duration-300
                              ${activeCard === funzione.id ? 'scale-110 rotate-6' : ''}
                              ${isSelected ? 'scale-105' : ''}
                            `}>
                              <Icon className="w-8 h-8 text-white" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-semibold text-[#1c1c1c] text-lg mb-1">
                                    {funzione.title}
                                  </h4>
                                  <p className="text-sm text-[#1c1c1c]/70 leading-relaxed">
                                    {funzione.description}
                                  </p>
                                </div>

                                {/* Selection indicator */}
                                <div className={`
                                  w-6 h-6 rounded-full border-2 flex items-center justify-center
                                  transition-all duration-300 ml-2 flex-shrink-0
                                  ${isSelected 
                                    ? 'border-[#d8010c] bg-[#d8010c]' 
                                    : 'border-gray-300 group-hover:border-[#d8010c]'
                                  }
                                `}>
                                  {isSelected && (
                                    <CheckCircle className="w-4 h-4 text-white" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Interactive glow effect */}
                          {isSelected && (
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#d8010c]/10 to-transparent pointer-events-none"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom summary */}
        {selectedFunctions.length > 0 && (
          <div className="mx-3 md:mx-0">
            <div className="bg-gradient-to-r from-[#d8010c] to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Configurazione scelta</h3>
                  <p className="text-white/80 text-sm">
                    {selectedFunctions.length} funzioni per la tua casa smart
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {selectedFunctions.map(id => {
                  const funzione = funzioni.find(f => f.id === id);
                  return funzione ? (
                    <div key={id} className="bg-white/20 px-3 py-1 rounded-full text-sm">
                      {funzione.title}
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <StickyNavigationBar
        onBack={onBack}
        onNext={handleSubmit}
        nextButtonText="Continua"
        backButtonText="Indietro"
        isNextDisabled={selectedFunctions.length === 0}
      />
    </div>
  );
};
