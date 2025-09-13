
import { Check, Calendar } from "lucide-react";

type UtilizzoAbitazioneSelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

export const UtilizzoAbitazioneSelector = ({ value, onChange }: UtilizzoAbitazioneSelectorProps) => {
  const opzioniProprieta = [
    { 
      id: 'prima casa', 
      label: 'Prima Casa',
      description: 'Abitata tutto l\'anno'
    },
    { 
      id: 'seconda casa', 
      label: 'Seconda Casa',
      description: 'Abitata solo parzialmente (max 20%)'
    }
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header con nuovo stile */}
      <div className="px-3 md:px-0">
        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#1c1c1c] leading-tight flex items-center gap-3">
            <Calendar className="h-6 w-6 text-[#d8010c]" />
            Utilizzo
          </h1>
          <div className="w-full h-px bg-gray-200"></div>
          <p className="text-sm md:text-base text-[#1c1c1c] opacity-75 mt-3">
            Seleziona se si tratta della tua abitazione principale
          </p>
        </div>
      </div>
      
      <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
        {opzioniProprieta.map((opzione) => {
          const isSelected = value === opzione.id;
          
          return (
            <div
              key={opzione.id}
              onClick={() => onChange(opzione.id)}
              className={`
                p-4 rounded-xl transition-all duration-300 border cursor-pointer
                ${isSelected 
                  ? 'bg-[#d8010c]/5 border-[#d8010c] text-[#1c1c1c] shadow-sm' 
                  : 'bg-white border-gray-200 hover:border-[#d8010c] hover:shadow-sm'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div className="text-left flex-1 min-w-0">
                  <div className="font-semibold text-base text-[#1c1c1c]">
                    {opzione.label}
                  </div>
                  <div className="text-sm text-[#1c1c1c] opacity-70 mt-1">
                    {opzione.description}
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
    </div>
  );
};
