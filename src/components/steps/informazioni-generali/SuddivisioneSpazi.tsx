
import { FormData } from "../../Configuratore";
import { StanzaCounter } from "./StanzaCounter";
import { LayoutDashboard } from "lucide-react";

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
    <div className="space-y-5">
      <div className="flex items-center justify-between bg-gradient-to-r from-[#fde1d3] to-[#f4f4f4] p-5 rounded-xl border border-[#f0f0f0] shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-[rgba(216,121,122,0.2)] p-3 rounded-full">
            <LayoutDashboard className="h-6 w-6 text-[#d8010c]" />
          </div>
          <h2 className="text-2xl font-medium text-[#1c1c1c]">Suddivisione degli spazi</h2>
        </div>
        <div className="text-base font-medium px-4 py-2 bg-white rounded-lg border-2 border-[#fbe12e] shadow-sm">
          Totale: <span className="text-[#d8010c]">{totalRooms}</span> {totalRooms === 1 ? 'stanza' : 'stanze'}
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
