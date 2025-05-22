
import { FormData } from "../../Configuratore";
import { StanzaCounter } from "./StanzaCounter";

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
      desc: 'Soggiorno, sala da pranzo o spazi living aperti',
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
      desc: 'Corridoi, ripostigli, etc.',
      maxValue: Infinity
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-[100px] h-[100px] flex-shrink-0 flex items-center justify-center">
          <img 
            src="/lovable-uploads/417ced15-f2dc-47e1-8b8c-d0faf5b9717e.png" 
            alt="Floor plan icon" 
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-medium text-[#1c1c1c]">Suddivisione degli spazi</h2>
        </div>
        <div className="ml-auto text-sm font-medium px-3 py-1.5 bg-white rounded-md border border-[#fbe12e]">
          {totalRooms} {totalRooms === 1 ? 'stanza' : 'stanze'}
        </div>
      </div>
      
      <div className="space-y-3">
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
