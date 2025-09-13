
import { FormData } from "../../../Configuratore";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

type SuddivisioneProps = {
  composizione: FormData['composizione'];
  onChangeStanza: (tipo: keyof FormData['composizione'], value: number) => void;
  totalRooms: number;
};

export const SuddivisioneSpazi = ({ composizione, onChangeStanza, totalRooms }: SuddivisioneProps) => {
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

  const RoomCard = ({ stanza }: { stanza: typeof stanze[0] }) => {
    const value = composizione[stanza.key as keyof FormData['composizione']];
    const isAtMax = value >= stanza.maxValue;
    const isAtMin = value <= 0;

    return (
      <div className={`p-4 rounded-xl transition-all duration-300 border cursor-pointer ${
        value > 0
          ? 'bg-[#d8010c]/5 border-[#d8010c] shadow-sm'
          : 'bg-white border-gray-200 hover:border-[#d8010c] hover:shadow-sm'
      }`}>
        <div className="flex items-center justify-between">
          <div className="text-left flex-1 min-w-0 pr-4">
            <div className="font-semibold text-base text-[#1c1c1c] mb-1">
              {stanza.label}
            </div>
            <div className="text-sm text-gray-600">
              {stanza.desc}
            </div>
          </div>
          
          <div className="flex items-center bg-[#d8010c] rounded-full px-1 py-0.5">
            <Button 
              variant="ghost" 
              size="icon"
              className={`w-7 h-7 rounded-xl ${
                isAtMin 
                  ? 'opacity-30 cursor-not-allowed text-white/50' 
                  : 'text-white hover:text-white hover:bg-white/10 hover:scale-105 transition-all duration-200'
              }`}
              onClick={() => onChangeStanza(stanza.key as keyof FormData['composizione'], Math.max(0, value - 1))}
              disabled={isAtMin}
            >
              <Minus className="h-3.5 w-3.5" strokeWidth={2.5} />
            </Button>
            
            <div className="min-w-[32px] text-center font-bold text-base text-white px-3">
              {value || 0}
            </div>
            
            <Button 
              variant="ghost" 
              size="icon"
              className={`w-7 h-7 rounded-xl ${
                isAtMax 
                  ? 'opacity-30 cursor-not-allowed text-white/50' 
                  : 'text-white hover:text-white hover:bg-white/10 hover:scale-105 transition-all duration-200'
              }`}
              onClick={() => onChangeStanza(stanza.key as keyof FormData['composizione'], value + 1)}
              disabled={isAtMax}
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header con nuovo stile */}
      <div className="px-3 md:px-0">
        <div className="space-y-3">
          <h1 className="text-lg md:text-xl font-semibold text-[#1c1c1c] leading-tight">
            Suddivisione spazi
          </h1>
          <p className="text-sm md:text-base text-[#1c1c1c] opacity-75 mt-3">
            Indica il numero di stanze per ogni tipologia
          </p>
        </div>
      </div>
      
      <div className="space-y-3 md:space-y-4">
        {stanze.map((stanza) => (
          <RoomCard key={stanza.key} stanza={stanza} />
        ))}
      </div>
    </div>
  );
};
