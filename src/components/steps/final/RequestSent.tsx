import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";

type Props = {
  onReset: () => void;
};

export const RequestSent = ({ onReset }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center space-y-8">
      <div className="icon-cei flex items-center justify-center w-[120px] h-[120px] rounded-full bg-[rgba(216,121,122,0.2)]">
        <CircleCheck className="h-16 w-16 text-[#1c1c1c]" />
      </div>
      
      <div className="space-y-4">
        <h1 className="text-3xl md:text-5xl font-medium text-[#1c1c1c]">Richiesta inviata!</h1>
        <p className="text-lg md:text-xl text-[#1c1c1c] opacity-80">
          Grazie per aver richiesto il sopralluogo. Ti contatteremo presto per confermare l'appuntamento.
        </p>
      </div>
      
      <div className="bg-[#f4f4f4] p-6 rounded-2xl w-full max-w-md">
        <p className="text-lg text-[#1c1c1c]">
          Un nostro esperto ti contatterà entro 24-48 ore lavorative per confermare la data e l'orario del sopralluogo.
        </p>
      </div>
      
      <Button 
        onClick={onReset}
        className="mt-8 p-6 text-lg bg-[#fbe12e] hover:bg-[#d8010c] text-[#1c1c1c] hover:text-white rounded-xl transition-all duration-300"
      >
        Ricomincia configurazione
      </Button>
    </div>
  );
};