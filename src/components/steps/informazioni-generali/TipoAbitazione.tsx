
import { FormData } from "../../Configuratore";
import { Label } from "@/components/ui/label";
import { Check, CheckCircle } from "lucide-react";

type TipoAbitazioneProps = {
  value: string;
  onChange: (value: string) => void;
  isComplete?: boolean;
};

export const TipoAbitazione = ({ value, onChange, isComplete }: TipoAbitazioneProps) => {
  const tipiAbitazione = [
    {
      id: 'appartamento',
      label: 'Appartamento',
      description: 'Unità abitativa in condominio'
    },
    {
      id: 'casa indipendente',
      label: 'Casa indipendente',
      description: 'Villa o casa singola'
    }
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] flex-shrink-0 flex items-center justify-center">
          <img 
            src="/lovable-uploads/4d476208-9875-4160-a9cd-6af03be67b0b.png" 
            alt="Building type icon" 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl md:text-2xl font-medium text-[#1c1c1c]">Tipologia abitazione</h2>
            {isComplete && (
              <CheckCircle className="h-5 w-5 text-green-600" />
            )}
          </div>
          <p className="text-sm md:text-base text-[#1c1c1c] opacity-90">
            Seleziona il tipo che meglio descrive il tuo progetto
          </p>
        </div>
      </div>
      
      <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
        {tipiAbitazione.map((tipo) => {
          const isSelected = value === tipo.id;
          
          return (
            <div
              key={tipo.id}
              onClick={() => onChange(tipo.id)}
              className={`
                p-4 rounded-xl transition-all duration-200 border cursor-pointer hover:scale-[1.02]
                ${isSelected 
                  ? 'bg-[#d8010c]/5 border-[#d8010c] text-[#1c1c1c] shadow-md' 
                  : 'bg-white border-gray-200 hover:border-[#d8010c] hover:shadow-sm'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div className="text-left flex-1 min-w-0">
                  <div className="font-semibold text-base text-[#1c1c1c]">
                    {tipo.label}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">
                    {tipo.description}
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
