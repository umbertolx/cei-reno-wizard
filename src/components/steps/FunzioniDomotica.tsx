
import { useState } from "react";
import { FormData } from "../Configuratore";
import { StickyNavigationBar } from "../shared/StickyNavigationBar";
import { CheckCircle, Lightbulb, Shield, Thermometer, Music, Phone, Zap, Camera } from "lucide-react";

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
};

export const FunzioniDomotica = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [selectedFunctions, setSelectedFunctions] = useState<string[]>(formData.funzioniDomotica || []);

  const funzioni: FunzioneDomotica[] = [
    {
      id: 'luci',
      title: 'Controllo luci',
      description: 'Gestisci illuminazione e atmosfera di casa',
      icon: Lightbulb
    },
    {
      id: 'tapparelle',
      title: 'Tapparelle automatiche',
      description: 'Apertura e chiusura automatica delle tapparelle',
      icon: Shield
    },
    {
      id: 'clima',
      title: 'Gestione clima',
      description: 'Controllo temperatura e climatizzazione',
      icon: Thermometer
    },
    {
      id: 'videocitofono',
      title: 'Videocitofono smart',
      description: 'Rispondi al citofono dal tuo smartphone',
      icon: Phone
    },
    {
      id: 'audio',
      title: 'Audio diffuso',
      description: 'Sistema audio in tutta la casa',
      icon: Music
    },
    {
      id: 'prese',
      title: 'Prese intelligenti',
      description: 'Controllo remoto di elettrodomestici',
      icon: Zap
    },
    {
      id: 'sicurezza',
      title: 'Sistema sicurezza',
      description: 'Allarmi, telecamere e sensori',
      icon: Camera
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
    <div className="space-y-6 pb-32">
      {/* Badge */}
      <div className="flex justify-center">
        <div className="bg-[#d8010c] text-white px-6 py-3 rounded-full text-sm font-medium">
          Impianto elettrico
        </div>
      </div>

      {/* Header */}
      <div className="max-w-4xl mx-auto space-y-8 mt-16">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-[100px] h-[100px] flex-shrink-0 flex items-center justify-center">
              <img 
                src="/lovable-uploads/c7408342-e29b-40fb-a65e-1c92eca62469.png" 
                alt="Smart home icon" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-2xl font-medium text-[#1c1c1c]">
                Scegli le funzioni domotiche
              </h2>
              <p className="text-base text-[#1c1c1c] opacity-80">
                Seleziona le funzionalità che vuoi controllare con il sistema KNX
              </p>
            </div>
          </div>

          {/* Counter */}
          {selectedFunctions.length > 0 && (
            <div className="bg-[#d8010c]/10 border border-[#d8010c]/20 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#d8010c]" />
                <span className="text-[#1c1c1c] font-medium">
                  {selectedFunctions.length} funzioni selezionate
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Functions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {funzioni.map((funzione) => {
            const isSelected = selectedFunctions.includes(funzione.id);
            const Icon = funzione.icon;

            return (
              <div
                key={funzione.id}
                onClick={() => toggleFunction(funzione.id)}
                className={`
                  p-6 rounded-xl border-2 cursor-pointer transition-all duration-200
                  ${isSelected 
                    ? 'border-[#d8010c] bg-[#d8010c]/5 shadow-md' 
                    : 'border-gray-200 bg-white hover:border-[#d8010c]/50 hover:shadow-sm'
                  }
                `}
              >
                <div className="flex items-start gap-4">
                  <div className={`
                    w-12 h-12 rounded-lg flex items-center justify-center
                    ${isSelected ? 'bg-[#d8010c] text-white' : 'bg-gray-100 text-gray-600'}
                  `}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg text-[#1c1c1c]">
                        {funzione.title}
                      </h3>
                      
                      <div className={`
                        w-5 h-5 rounded-full border-2 flex items-center justify-center
                        ${isSelected 
                          ? 'border-[#d8010c] bg-[#d8010c]' 
                          : 'border-gray-300'
                        }
                      `}>
                        {isSelected && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-[#1c1c1c]/70">
                      {funzione.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Functions Summary */}
        {selectedFunctions.length > 0 && (
          <div className="bg-gradient-to-r from-[#d8010c] to-purple-600 rounded-xl p-6 text-white">
            <h3 className="font-semibold text-lg mb-3">Funzioni selezionate:</h3>
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
