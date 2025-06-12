
import { useState } from "react";
import { FormData } from "../Configuratore";
import { StickyNavigationBar } from "../shared/StickyNavigationBar";
import { CheckCircle, Lightbulb, Shield, Thermometer, Music, Phone, Zap, Camera, Info, ChevronDown } from "lucide-react";

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
  detailedInfo: string;
  position: 'top-left' | 'top-right' | 'center-left' | 'center-right' | 'bottom-left' | 'bottom-right' | 'bottom-center';
};

export const FunzioniDomotica = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [selectedFunctions, setSelectedFunctions] = useState<string[]>(formData.funzioniDomotica || []);
  const [expandedInfo, setExpandedInfo] = useState<string | null>(null);

  const funzioni: FunzioneDomotica[] = [
    {
      id: 'luci',
      title: 'Controllo luci',
      description: 'Gestisci illuminazione da qualsiasi stanza',
      icon: Lightbulb,
      detailedInfo: 'Controlla tutte le luci di casa tramite app, imposta scenari personalizzati per ogni momento della giornata, regola intensità e colore.',
      position: 'top-left'
    },
    {
      id: 'tapparelle',
      title: 'Tapparelle automatiche',
      description: 'Automatizza tende e tapparelle',
      icon: Shield,
      detailedInfo: 'Programmazione automatica basata su orario e luce solare, controllo remoto, integrazione con sensori meteo.',
      position: 'top-right'
    },
    {
      id: 'clima',
      title: 'Gestione clima',
      description: 'Regola temperatura e climatizzazione',
      icon: Thermometer,
      detailedInfo: 'Controllo intelligente del riscaldamento e condizionamento, programmazione settimanale, ottimizzazione dei consumi.',
      position: 'center-left'
    },
    {
      id: 'audio',
      title: 'Audio diffuso',
      description: 'Sistema di diffusione sonora',
      icon: Music,
      detailedInfo: 'Musica in tutte le stanze, controllo volume per zona, streaming da smartphone e servizi online.',
      position: 'center-right'
    },
    {
      id: 'videocitofono',
      title: 'Videocitofono smart',
      description: 'Rispondi al citofono dallo smartphone',
      icon: Phone,
      detailedInfo: 'Visualizza e parla con i visitatori da remoto, registrazione automatica, notifiche push.',
      position: 'bottom-left'
    },
    {
      id: 'prese',
      title: 'Prese intelligenti',
      description: 'Rispondi al citofono dallo smartphone',
      icon: Zap,
      detailedInfo: 'Controllo remoto di elettrodomestici, programmazione accensione/spegnimento, monitoraggio consumi.',
      position: 'bottom-right'
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

  const toggleInfo = (functionId: string) => {
    setExpandedInfo(prev => prev === functionId ? null : functionId);
  };

  const handleSubmit = () => {
    updateFormData({ funzioniDomotica: selectedFunctions });
    onNext();
  };

  const getPositionClasses = (position: string) => {
    switch (position) {
      case 'top-left': return 'absolute top-0 left-0';
      case 'top-right': return 'absolute top-0 right-0';
      case 'center-left': return 'absolute top-1/2 left-0 -translate-y-1/2';
      case 'center-right': return 'absolute top-1/2 right-0 -translate-y-1/2';
      case 'bottom-left': return 'absolute bottom-0 left-0';
      case 'bottom-right': return 'absolute bottom-0 right-0';
      case 'bottom-center': return 'absolute bottom-0 left-1/2 -translate-x-1/2';
      default: return '';
    }
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
            <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center bg-[#d8010c]/10 rounded-2xl">
              <img 
                src="/lovable-uploads/c7408342-e29b-40fb-a65e-1c92eca62469.png" 
                alt="Smart home icon" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h2 className="text-2xl font-medium text-[#1c1c1c]">
                Scegli le funzioni domotiche
              </h2>
              <p className="text-base text-[#1c1c1c] opacity-70">
                Quali funzionalità smart vuoi avere in casa? Seleziona le opzioni che ti interessano tra quelle disponibili con il sistema KNX.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive House Section */}
        <div className="relative">
          {/* Central 3D House */}
          <div className="flex justify-center mb-8">
            <div className="relative w-80 h-80 flex items-center justify-center">
              {/* House SVG */}
              <div className="relative">
                <svg width="240" height="200" viewBox="0 0 240 200" className="drop-shadow-lg">
                  {/* House base */}
                  <path d="M40 120 L200 120 L200 180 L40 180 Z" fill="#f5f5f5" stroke="#ddd" strokeWidth="2"/>
                  {/* Roof */}
                  <path d="M20 120 L120 40 L220 120 Z" fill="#6b7280" stroke="#555" strokeWidth="2"/>
                  {/* Door */}
                  <rect x="100" y="140" width="40" height="40" fill="#8b4513" stroke="#654321" strokeWidth="1"/>
                  {/* Windows */}
                  <rect x="60" y="140" width="25" height="25" fill="#87ceeb" stroke="#4682b4" strokeWidth="1"/>
                  <rect x="155" y="140" width="25" height="25" fill="#87ceeb" stroke="#4682b4" strokeWidth="1"/>
                  {/* Smart indicators */}
                  {selectedFunctions.includes('luci') && (
                    <circle cx="72" cy="152" r="8" fill="#fbbf24" className="animate-pulse"/>
                  )}
                  {selectedFunctions.includes('clima') && (
                    <circle cx="167" cy="152" r="8" fill="#3b82f6" className="animate-pulse"/>
                  )}
                  {selectedFunctions.includes('audio') && (
                    <circle cx="120" cy="100" r="8" fill="#10b981" className="animate-pulse"/>
                  )}
                </svg>

                {/* Smart Level Indicator */}
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                  <div className="bg-[#fbbf24] rounded-full w-20 h-20 flex items-center justify-center border-4 border-white shadow-lg">
                    <div className="text-center">
                      <div className="text-xs font-bold text-[#1c1c1c]">Livello</div>
                      <div className="text-xs font-bold text-[#1c1c1c]">smart</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Function Cards positioned around the house */}
              <div className="absolute inset-0">
                {funzioni.map((funzione) => {
                  const isSelected = selectedFunctions.includes(funzione.id);
                  const Icon = funzione.icon;
                  const isExpanded = expandedInfo === funzione.id;

                  return (
                    <div
                      key={funzione.id}
                      className={`${getPositionClasses(funzione.position)} w-48`}
                    >
                      <div
                        className={`
                          bg-white rounded-xl border-2 p-4 cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg
                          ${isSelected 
                            ? 'border-[#fbbf24] bg-[#fbbf24]/5' 
                            : 'border-gray-200 hover:border-[#fbbf24]/50'
                          }
                        `}
                      >
                        {/* Main card content */}
                        <div onClick={() => toggleFunction(funzione.id)} className="flex items-start gap-3">
                          <div className={`
                            w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                            ${isSelected ? 'bg-[#fbbf24] text-white' : 'bg-gray-100 text-gray-600'}
                          `}>
                            <Icon className="w-5 h-5" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold text-sm text-[#1c1c1c] leading-tight">
                                {funzione.title}
                              </h3>
                              
                              {isSelected && (
                                <CheckCircle className="w-4 h-4 text-[#fbbf24] flex-shrink-0" />
                              )}
                            </div>
                            
                            <p className="text-xs text-[#1c1c1c]/70 leading-tight">
                              {funzione.description}
                            </p>
                          </div>
                        </div>

                        {/* Info toggle */}
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <button
                            onClick={() => toggleInfo(funzione.id)}
                            className="flex items-center gap-2 text-xs text-[#d8010c] hover:text-[#b8000a] transition-colors"
                          >
                            <Info className="w-3 h-3" />
                            <span>Scopri di più</span>
                            <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>
                          
                          {isExpanded && (
                            <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                              <p className="text-xs text-[#1c1c1c]/80 leading-relaxed">
                                {funzione.detailedInfo}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Functions Summary */}
        {selectedFunctions.length > 0 && (
          <div className="bg-[#d8010c] rounded-xl p-6 text-white">
            <h3 className="font-semibold text-lg mb-3">Hai selezionato queste funzioni</h3>
            <div className="flex flex-wrap gap-3">
              {selectedFunctions.map(id => {
                const funzione = funzioni.find(f => f.id === id);
                return funzione ? (
                  <div key={id} className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
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
