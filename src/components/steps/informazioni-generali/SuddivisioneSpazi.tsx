
import { FormData } from "../../Configuratore";
import { StanzaCounter } from "./StanzaCounter";
import { CheckCircle } from "lucide-react";

type SuddivisioneProps = {
  composizione: FormData['composizione'];
  onChangeStanza: (tipo: keyof FormData['composizione'], value: number) => void;
  totalRooms: number;
  isComplete?: boolean;
};

export const SuddivisioneSpazi = ({ composizione, onChangeStanza, totalRooms, isComplete }: SuddivisioneProps) => {
  const stanze = [
    { 
      key: 'soggiorno', 
      label: 'Sala/Living', 
      desc: 'Soggiorno, sala da pranzo',
      maxValue: Infinity
    },
    { 
      key: 'cucina', 
      label: 'Cucina', 
      desc: 'Cucina o angolo cottura',
      maxValue: 1
    },
    { 
      key: 'cameraDoppia', 
      label: 'Camera doppia', 
      desc: 'Camera matrimoniale',
      maxValue: Infinity
    },
    { 
      key: 'cameraSingola', 
      label: 'Camera singola', 
      desc: 'Camera singola, studio',
      maxValue: Infinity
    },
    { 
      key: 'bagno', 
      label: 'Bagno', 
      desc: 'Bagno completo o di servizio',
      maxValue: Infinity
    }
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] flex-shrink-0 flex items-center justify-center">
          <img 
            src="/lovable-uploads/417ced15-f2dc-47e1-8b8c-d0faf5b9717e.png" 
            alt="Floor plan icon" 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl md:text-2xl font-medium text-[#1c1c1c]">Suddivisione spazi</h2>
            {isComplete && (
              <CheckCircle className="h-5 w-5 text-green-600" />
            )}
          </div>
          <p className="text-sm md:text-base text-[#1c1c1c] opacity-90">
            Indica il numero <span className="hidden md:inline">di stanze per ogni tipologia</span>
          </p>
        </div>
        {totalRooms > 0 && (
          <div className="text-xs md:text-sm font-medium px-2 py-1 md:px-3 md:py-1.5 rounded-lg border bg-[#d8010c]/5 text-[#d8010c] border-[#d8010c]/20">
            {`${totalRooms} ${totalRooms === 1 ? 'stanza' : 'stanze'}`}
          </div>
        )}
      </div>
      
      <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 space-y-4 md:space-y-6 shadow-sm hover:shadow-md transition-all duration-200">
        {stanze.map((stanza) => (
          <StanzaCounter
            key={stanza.key}
            type={stanza.key}
            label={stanza.label}
            description={stanza.desc}
            value={composizione[stanza.key as keyof FormData['composizione']]}
            onChange={(value) => onChangeStanza(stanza.key as keyof FormData['composizione'], value)}
            maxValue={stanza.maxValue}
          />
        ))}
      </div>
    </div>
  );
};
