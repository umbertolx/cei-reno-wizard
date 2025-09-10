
import { Check, Home } from "lucide-react";

type UtilizzoAbitazioneSelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

export const UtilizzoAbitazioneSelector = ({ value, onChange }: UtilizzoAbitazioneSelectorProps) => {
  const opzioniProprieta = [
    { 
      id: 'prima casa', 
      label: 'Prima Casa',
      description: 'Abitazione principale, residenza'
    },
    { 
      id: 'seconda casa', 
      label: 'Seconda Casa',
      description: 'Altri immobili, case vacanza'
    }
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center gap-4 px-3 md:px-0">
        <div className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] flex-shrink-0 flex items-center justify-center">
          <img 
            src="/lovable-uploads/417ced15-f2dc-47e1-8b8c-d0faf5b9717e.png" 
            alt="Floor plan icon" 
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-medium text-[#1c1c1c]">Utilizzo</h2>
          <p className="text-base text-[#1c1c1c] opacity-80 hidden md:block">Seleziona se si tratta della tua abitazione principale</p>
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
