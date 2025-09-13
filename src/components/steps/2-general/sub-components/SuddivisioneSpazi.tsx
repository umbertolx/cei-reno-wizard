
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
          
          <div className="flex items-center bg-gray-50 rounded-full p-1 border border-gray-200">
            <Button 
              variant="ghost" 
              size="icon"
              className={`w-8 h-8 rounded-full ${
                isAtMin 
                  ? 'opacity-40 cursor-not-allowed text-gray-400' 
                  : 'text-gray-600 hover:text-[#d8010c] hover:bg-white hover:shadow-sm'
              }`}
              onClick={() => onChangeStanza(stanza.key as keyof FormData['composizione'], Math.max(0, value - 1))}
              disabled={isAtMin}
            >
              <Minus className="h-4 w-4" />
            </Button>
            
            <div className="min-w-[40px] text-center font-semibold text-lg text-[#d8010c] px-2">
              {value || 0}
            </div>
            
            <Button 
              variant="ghost" 
              size="icon"
              className={`w-8 h-8 rounded-full ${
                isAtMax 
                  ? 'opacity-40 cursor-not-allowed text-gray-400' 
                  : 'text-gray-600 hover:text-[#d8010c] hover:bg-white hover:shadow-sm'
              }`}
              onClick={() => onChangeStanza(stanza.key as keyof FormData['composizione'], value + 1)}
              disabled={isAtMax}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

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
          <h2 className="text-xl md:text-2xl font-medium text-[#1c1c1c]">Suddivisione spazi</h2>
          <p className="text-base text-[#1c1c1c] opacity-80 hidden md:block">Indica il numero di stanze per ogni tipologia</p>
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
