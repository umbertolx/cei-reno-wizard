import { Check } from "lucide-react";

type NumeroPersoneSelectorProps = {
  value: number;
  onChange: (value: number) => void;
};

export const NumeroPersoneSelector = ({ value, onChange }: NumeroPersoneSelectorProps) => {
  const opzioniPersone = [
    { id: 1, label: '1 persona' },
    { id: 2, label: '2 persone' },
    { id: 3, label: '3 persone' },
    { id: 4, label: '4 persone' },
    { id: 5, label: '5+ persone' }
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header con nuovo stile */}
      <div className="px-3 md:px-0">
        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#1c1c1c] leading-tight">
            Numero di persone
          </h1>
          <div className="w-full h-px bg-gray-200"></div>
          <p className="text-sm md:text-base text-[#1c1c1c] opacity-75 mt-3">
            Quante persone abitano l'immobile
          </p>
        </div>
      </div>
      
      <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4">
        {opzioniPersone.map((opzione) => {
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