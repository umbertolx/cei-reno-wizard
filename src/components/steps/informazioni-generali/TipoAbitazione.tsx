
import { FormData } from "../../Configuratore";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check } from "lucide-react";

type TipoAbitazioneProps = {
  value: string;
  onChange: (value: string) => void;
};

export const TipoAbitazione = ({ value, onChange }: TipoAbitazioneProps) => {
  const tipiAbitazione = [
    {
      id: 'appartamento',
      label: 'Appartamento',
      desc: 'Condomini, attici e spazi condivisi'
    },
    {
      id: 'casa indipendente',
      label: 'Casa indipendente', 
      desc: 'Ville, villette e abitazioni autonome'
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
        <div>
          <h2 className="text-xl md:text-2xl font-medium text-[#1c1c1c]">Tipologia abitazione</h2>
          <p className="text-base text-[#1c1c1c] opacity-80 hidden md:block">Seleziona il tipo che meglio descrive il tuo progetto</p>
        </div>
      </div>
      
      <RadioGroup 
        value={value} 
        onValueChange={onChange}
        className="space-y-3 md:space-y-4"
      >
        {tipiAbitazione.map((tipo) => {
          const isSelected = value === tipo.id;
          
          return (
            <div
              key={tipo.id}
              onClick={() => onChange(tipo.id)}
              className={`
                p-4 md:p-6 rounded-xl transition-all duration-300 cursor-pointer
                ${isSelected 
                  ? 'bg-[#d8010c]/5 border-2 border-[#d8010c] text-[#1c1c1c] shadow-lg' 
                  : 'bg-white border-2 border-gray-200 hover:border-[#d8010c] hover:shadow-lg'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div className="text-left flex-1 min-w-0">
                  <Label 
                    htmlFor={tipo.id}
                    className="font-semibold text-base md:text-lg text-[#1c1c1c] cursor-pointer block"
                  >
                    {tipo.label}
                  </Label>
                  {!isSelected && (
                    <div className="text-xs md:text-sm text-gray-600 md:block">
                      {tipo.desc}
                    </div>
                  )}
                </div>
                {isSelected && (
                  <div className="ml-auto flex-shrink-0">
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-[#d8010c] rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 md:h-4 md:w-4 text-white" />
                    </div>
                  </div>
                )}
                <RadioGroupItem 
                  value={tipo.id} 
                  id={tipo.id}
                  className="sr-only"
                />
              </div>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};
