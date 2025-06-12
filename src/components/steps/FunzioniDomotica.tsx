
import { useState } from "react";
import { FormData } from "../Configuratore";
import { StickyNavigationBar } from "../shared/StickyNavigationBar";
import { CheckCircle, Lightbulb, Shield, Thermometer, Music, Phone, Zap, Camera, Sparkles } from "lucide-react";

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
  bgPattern: string;
};

export const FunzioniDomotica = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [selectedFunctions, setSelectedFunctions] = useState<string[]>(formData.funzioniDomotica || []);

  const funzioni: FunzioneDomotica[] = [
    {
      id: 'luci',
      title: 'Controllo luci',
      description: 'Gestisci illuminazione e atmosfera di casa',
      icon: Lightbulb,
      color: 'text-yellow-600',
      bgPattern: 'bg-yellow-50 border-yellow-200'
    },
    {
      id: 'tapparelle',
      title: 'Tapparelle automatiche',
      description: 'Apertura e chiusura automatica delle tapparelle',
      icon: Shield,
      color: 'text-blue-600',
      bgPattern: 'bg-blue-50 border-blue-200'
    },
    {
      id: 'clima',
      title: 'Gestione clima',
      description: 'Controllo temperatura e climatizzazione',
      icon: Thermometer,
      color: 'text-orange-600',
      bgPattern: 'bg-orange-50 border-orange-200'
    },
    {
      id: 'videocitofono',
      title: 'Videocitofono smart',
      description: 'Rispondi al citofono dal tuo smartphone',
      icon: Phone,
      color: 'text-green-600',
      bgPattern: 'bg-green-50 border-green-200'
    },
    {
      id: 'audio',
      title: 'Audio diffuso',
      description: 'Sistema audio in tutta la casa',
      icon: Music,
      color: 'text-purple-600',
      bgPattern: 'bg-purple-50 border-purple-200'
    },
    {
      id: 'prese',
      title: 'Prese intelligenti',
      description: 'Controllo remoto di elettrodomestici',
      icon: Zap,
      color: 'text-indigo-600',
      bgPattern: 'bg-indigo-50 border-indigo-200'
    },
    {
      id: 'sicurezza',
      title: 'Sistema sicurezza',
      description: 'Allarmi, telecamere e sensori',
      icon: Camera,
      color: 'text-red-600',
      bgPattern: 'bg-red-50 border-red-200'
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

  return (
    <div className="space-y-8 pb-32">
      {/* Badge */}
      <div className="flex justify-center">
        <div className="bg-[#d8010c] text-white px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Impianto elettrico
        </div>
      </div>

      {/* Header */}
      <div className="max-w-5xl mx-auto space-y-8 mt-16">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-[#d8010c]/10 rounded-2xl flex items-center justify-center">
              <img 
                src="/lovable-uploads/c7408342-e29b-40fb-a65e-1c92eca62469.png" 
                alt="Smart home icon" 
                className="w-12 h-12 object-contain"
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#1c1c1c] mb-3">
              Scegli le funzioni domotiche
            </h2>
            <p className="text-lg text-[#1c1c1c]/70 max-w-2xl mx-auto">
              Tocca le carte per selezionare le funzionalità che vuoi controllare con il sistema KNX
            </p>
          </div>
        </div>

        {/* Selection Counter */}
        {selectedFunctions.length > 0 && (
          <div className="flex justify-center">
            <div className="bg-white border-2 border-[#d8010c] rounded-2xl px-6 py-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#d8010c] rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-[#1c1c1c] font-semibold text-lg">
                  {selectedFunctions.length} funzioni selezionate
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Functions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {funzioni.map((funzione) => {
            const isSelected = selectedFunctions.includes(funzione.id);
            const Icon = funzione.icon;

            return (
              <div
                key={funzione.id}
                onClick={() => toggleFunction(funzione.id)}
                className={`
                  relative group cursor-pointer transition-all duration-300 transform
                  ${isSelected 
                    ? 'scale-105 shadow-xl' 
                    : 'hover:scale-102 hover:shadow-lg'
                  }
                `}
              >
                <div className={`
                  relative p-6 rounded-3xl border-2 transition-all duration-300
                  ${isSelected 
                    ? 'border-[#d8010c] bg-white shadow-2xl' 
                    : `${funzione.bgPattern} hover:border-gray-300`
                  }
                `}>
                  {/* Selection indicator */}
                  <div className={`
                    absolute -top-2 -right-2 w-8 h-8 rounded-full border-3 transition-all duration-300
                    ${isSelected 
                      ? 'bg-[#d8010c] border-white scale-110' 
                      : 'bg-white border-gray-300 group-hover:border-[#d8010c]/30'
                    }
                  `}>
                    {isSelected && (
                      <CheckCircle className="w-full h-full text-white p-1" />
                    )}
                  </div>

                  {/* Icon with animation */}
                  <div className={`
                    w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300
                    ${isSelected 
                      ? 'bg-[#d8010c]/10 transform rotate-6' 
                      : 'bg-white group-hover:bg-white/80'
                    }
                  `}>
                    <Icon className={`
                      w-8 h-8 transition-all duration-300
                      ${isSelected 
                        ? 'text-[#d8010c] scale-110' 
                        : `${funzione.color} group-hover:scale-110`
                      }
                    `} />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className={`
                      font-bold text-lg transition-colors duration-300
                      ${isSelected ? 'text-[#d8010c]' : 'text-[#1c1c1c]'}
                    `}>
                      {funzione.title}
                    </h3>
                    <p className="text-sm text-[#1c1c1c]/70 leading-relaxed">
                      {funzione.description}
                    </p>
                  </div>

                  {/* Decorative element */}
                  <div className={`
                    absolute bottom-0 left-0 w-full h-1 rounded-b-3xl transition-all duration-300
                    ${isSelected 
                      ? 'bg-[#d8010c]' 
                      : 'bg-transparent group-hover:bg-gray-200'
                    }
                  `} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Functions Display */}
        {selectedFunctions.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4 text-[#1c1c1c] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#d8010c]" />
              Le tue funzioni selezionate:
            </h3>
            <div className="flex flex-wrap gap-3">
              {selectedFunctions.map(id => {
                const funzione = funzioni.find(f => f.id === id);
                if (!funzione) return null;
                
                return (
                  <div 
                    key={id} 
                    className="flex items-center gap-2 bg-[#d8010c]/10 text-[#d8010c] px-4 py-2 rounded-full border border-[#d8010c]/20"
                  >
                    <funzione.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{funzione.title}</span>
                  </div>
                );
              })}
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
