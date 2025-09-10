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
      <div className="flex items-center gap-4 px-3 md:px-0">
        <div className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] flex-shrink-0 flex items-center justify-center">
          <img 
            src="/lovable-uploads/417ced15-f2dc-47e1-8b8c-d0faf5b9717e.png" 
            alt="Floor plan icon" 
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-medium text-[#1c1c1c]">Numero di persone</h2>
          <p className="text-base text-[#1c1c1c] opacity-80 hidden md:block">Quante persone abitano l'immobile</p>
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