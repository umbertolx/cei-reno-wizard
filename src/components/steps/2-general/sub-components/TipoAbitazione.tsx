
import { FormData } from "../../../Configuratore";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

type TipoAbitazioneProps = {
  value: string;
  onChange: (value: string) => void;
};

export const TipoAbitazione = ({ value, onChange }: TipoAbitazioneProps) => {
  const tipiAbitazione = [
    {
      id: 'appartamento',
      label: 'Appartamento'
    },
    {
      id: 'casa indipendente',
      label: 'Casa indipendente'
    }
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header con nuovo stile */}
      <div className="px-3 md:px-0">
        <div className="space-y-3">
          <h1 className="text-lg md:text-xl font-semibold text-[#1c1c1c] leading-tight">
            Tipologia abitazione
          </h1>
          <div className="w-full h-px bg-gray-200"></div>
          <p className="text-sm md:text-base text-[#1c1c1c] opacity-75 mt-3">
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
                    {tipo.label}
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
