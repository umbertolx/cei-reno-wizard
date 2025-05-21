
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
    { key: 'soggiorno', label: 'Sala/Living', desc: 'Soggiorno, sala da pranzo o spazi living aperti' },
    { key: 'cucina', label: 'Cucina', desc: 'Cucina o angolo cottura' },
    { key: 'cameraDoppia', label: 'Camera doppia', desc: 'Camera matrimoniale o camera principale' },
    { key: 'cameraSingola', label: 'Camera singola', desc: 'Camera singola, studio o camera ospiti' },
    { key: 'bagno', label: 'Bagno', desc: 'Bagno completo o di servizio' },
    { key: 'altro', label: 'Altro', desc: 'Altri spazi come corridoi, ripostigli, etc.' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="icon-cei flex items-center justify-center w-[75px] h-[75px] rounded-full bg-[rgba(216,121,122,0.2)]">
            <LayoutDashboard className="h-8 w-8 text-[#1c1c1c]" />
          </div>
          <h2 className="ml-4 text-xl md:text-2xl font-medium text-[#1c1c1c]">Suddivisione degli spazi</h2>
        </div>
        <div className="text-lg font-medium">
          Totale: {totalRooms} {totalRooms === 1 ? 'stanza' : 'stanze'}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stanze.map((stanza) => (
          <StanzaCounter
            key={stanza.key}
            type={stanza.key}
            label={stanza.label}
            description={stanza.desc}
            value={composizione[stanza.key as keyof FormData['composizione']]}
            onChange={(value) => onChangeStanza(stanza.key as keyof FormData['composizione'], value)}
          />
        ))}
      </div>
    </div>
  );
};
