
import { FormData } from "../../Configuratore";
import { StanzaCounter } from "./StanzaCounter";
import { LayoutDashboard, Grid2x2, Columns2, Grid3x3, SquareSplitHorizontal, SquareSplitVertical } from "lucide-react";

type SuddivisioneProps = {
  composizione: FormData['composizione'];
  onChangeStanza: (tipo: keyof FormData['composizione'], value: number) => void;
  totalRooms: number;
};

// Map stanza types to appropriate icons
const getStanzaIcon = (type: string) => {
  switch(type) {
    case 'soggiorno':
      return <LayoutDashboard className="h-5 w-5" />;
    case 'cucina':
      return <SquareSplitHorizontal className="h-5 w-5" />;
    case 'cameraDoppia':
      return <Grid2x2 className="h-5 w-5" />;
    case 'cameraSingola':
      return <Columns2 className="h-5 w-5" />;
    case 'bagno':
      return <SquareSplitVertical className="h-5 w-5" />;
    case 'altro':
      return <Grid3x3 className="h-5 w-5" />;
    default:
      return <LayoutDashboard className="h-5 w-5" />;
  }
};

export const SuddivisioneSpazi = ({ composizione, onChangeStanza, totalRooms }: SuddivisioneProps) => {
  const stanze = [
    { 
      key: 'soggiorno', 
      label: 'Sala/Living', 
      desc: 'Soggiorno, sala da pranzo o spazi living aperti',
      maxValue: Infinity
    },
    { 
      key: 'cucina', 
      label: 'Cucina', 
      desc: 'Cucina o angolo cottura',
      maxValue: 1 // Limita a massimo 1 cucina
    },
    { 
      key: 'cameraDoppia', 
      label: 'Camera doppia', 
      desc: 'Camera matrimoniale o camera principale',
      maxValue: Infinity
    },
    { 
      key: 'cameraSingola', 
      label: 'Camera singola', 
      desc: 'Camera singola, studio o camera ospiti',
      maxValue: Infinity
    },
    { 
      key: 'bagno', 
      label: 'Bagno', 
      desc: 'Bagno completo o di servizio',
      maxValue: Infinity
    },
    { 
      key: 'altro', 
      label: 'Altro', 
      desc: 'Altri spazi come corridoi, ripostigli, etc.',
      maxValue: Infinity
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-[#f8f8f8] p-4 rounded-xl">
        <div className="flex items-center">
          <div className="icon-cei flex items-center justify-center w-[75px] h-[75px] rounded-full bg-[rgba(216,121,122,0.2)]">
            <LayoutDashboard className="h-8 w-8 text-[#1c1c1c]" />
          </div>
          <h2 className="ml-4 text-xl md:text-2xl font-medium text-[#1c1c1c]">Suddivisione degli spazi</h2>
        </div>
        <div className="text-lg font-medium px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
          Totale: <span className="text-[#d8010c] font-bold">{totalRooms}</span> {totalRooms === 1 ? 'stanza' : 'stanze'}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stanze.map((stanza) => (
          <div key={stanza.key} className="relative animate-fade-in">
            <div className="absolute -top-2 -left-2 bg-[#fbe12e] rounded-full p-1 shadow-sm z-10">
              {getStanzaIcon(stanza.key)}
            </div>
            <StanzaCounter
              type={stanza.key}
              label={stanza.label}
              description={stanza.desc}
              value={composizione[stanza.key as keyof FormData['composizione']]}
              onChange={(value) => onChangeStanza(stanza.key as keyof FormData['composizione'], value)}
              maxValue={stanza.maxValue}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
