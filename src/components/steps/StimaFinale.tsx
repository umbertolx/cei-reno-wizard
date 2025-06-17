import { FormData } from "@/types/FormData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  stima: {
    min: number;
    max: number;
  };
  onBack: () => void;
  onSubmit: () => void;
};

export const StimaFinale = ({ formData, updateFormData, stima, onBack, onSubmit }: Props) => {
  // Formatta il prezzo con separatore migliaia
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-5xl font-medium text-[#1c1c1c]">Stima Finale</h1>
        <p className="text-lg md:text-xl text-[#1c1c1c] opacity-80">Ecco la tua stima personalizzata. Richiedi un sopralluogo per un preventivo preciso.</p>
      </div>

      {/* Riepilogo dati abitazione */}
      <div className="bg-[#f4f4f4] p-6 rounded-2xl space-y-4">
        <h2 className="text-2xl font-medium text-[#1c1c1c]">Informazioni abitazione</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-[#1c1c1c] opacity-70">Tipologia</p>
            <p className="text-lg font-medium capitalize">{formData.tipologiaAbitazione}</p>
          </div>
          
          <div>
            <p className="text-sm text-[#1c1c1c] opacity-70">Superficie</p>
            <p className="text-lg font-medium">{formData.superficie} mq</p>
          </div>
          
          <div>
            <p className="text-sm text-[#1c1c1c] opacity-70">Indirizzo</p>
            <p className="text-lg font-medium">{formData.indirizzo}</p>
          </div>
        </div>
      </div>

      {/* Stima dei costi */}
      <div className="bg-[#fbe12e] p-6 rounded-2xl space-y-4">
        <h2 className="text-2xl font-medium text-[#1c1c1c]">La tua stima</h2>
        
        <div className="text-center py-6">
          <span className="text-xl">da </span>
          <span className="text-3xl md:text-5xl font-bold">€ {formatPrice(stima.min)}</span>
          <span className="text-xl"> a </span>
          <span className="text-3xl md:text-5xl font-bold">€ {formatPrice(stima.max)}</span>
        </div>
        
        <div className="bg-white bg-opacity-50 p-4 rounded-lg text-center">
          <p className="text-lg text-[#1c1c1c]">
            È una prima stima, per un preventivo preciso serve un sopralluogo
          </p>
        </div>
      </div>

      {/* Richiedi sopralluogo */}
      <div className="bg-[#f4f4f4] p-6 rounded-2xl space-y-4">
        <h2 className="text-2xl font-medium text-[#1c1c1c]">Richiedi un sopralluogo gratuito</h2>
        
        <p className="text-lg text-[#1c1c1c] opacity-80">
          Un nostro esperto ti contatterà per fissare un appuntamento
        </p>
        
        <div className="flex items-center space-x-4">
          <Phone className="h-6 w-6 text-[#d8010c]" />
          <p className="text-lg font-medium">Chiama subito lo 02 871 59 433</p>
        </div>
      </div>

      {/* Pulsanti */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button 
          onClick={onBack}
          variant="outline"
          className="flex-1 p-6 text-lg border-[#1c1c1c] text-[#1c1c1c] hover:bg-[#f4f4f4] rounded-xl"
        >
          Torna indietro
        </Button>
        
        <Button 
          onClick={onSubmit}
          className="flex-1 p-6 text-lg bg-[#fbe12e] hover:bg-[#d8010c] text-[#1c1c1c] hover:text-white rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
        >
          Richiedi sopralluogo
          <ArrowRight className="h-5 w-5 transform rotate-[-90deg]" />
        </Button>
      </div>
    </div>
  );
};
