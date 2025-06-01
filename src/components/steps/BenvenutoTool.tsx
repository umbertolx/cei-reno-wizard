
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Sun, Shield, Thermometer } from "lucide-react";

type Props = {
  onStart: () => void;
};

export const BenvenutoTool = ({ onStart }: Props) => {
  return (
    <div className="space-y-12 text-center">
      {/* Header principale */}
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1c1c1c] leading-tight">
          Configura il tuo impianto<br />
          <span className="text-[#d8010c]">ottieni subito un budget</span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Seleziona il tipo di intervento e ricevi un preventivo gratuito online
        </p>

        <Button 
          onClick={onStart}
          className="px-8 py-4 text-lg bg-[#fbe12e] hover:bg-[#d8010c] text-black hover:text-white rounded-xl flex items-center justify-center gap-3 mx-auto transition-all duration-300"
        >
          Inizia configurazione
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Moduli semplificati */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <Zap className="h-8 w-8 text-[#d8010c] mx-auto mb-3" />
          <div className="font-semibold text-[#1c1c1c] text-sm">Impianto elettrico</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <Sun className="h-8 w-8 text-[#d8010c] mx-auto mb-3" />
          <div className="font-semibold text-[#1c1c1c] text-sm">Fotovoltaico</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <Shield className="h-8 w-8 text-[#d8010c] mx-auto mb-3" />
          <div className="font-semibold text-[#1c1c1c] text-sm">Sicurezza</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <Thermometer className="h-8 w-8 text-[#d8010c] mx-auto mb-3" />
          <div className="font-semibold text-[#1c1c1c] text-sm">Termotecnico</div>
        </div>
      </div>

      {/* Esempio budget semplificato */}
      <div className="bg-gradient-to-br from-[#fbe12e]/10 to-[#d8010c]/5 rounded-2xl p-8 max-w-lg mx-auto border border-[#fbe12e]/30">
        <div className="text-sm text-gray-600 mb-2">Esempio: Appartamento 80mq</div>
        <div className="text-sm text-gray-600 mb-4">Impianto elettrico completo</div>
        <div className="text-3xl font-bold text-[#d8010c] mb-2">€ 4.500 - € 6.800</div>
        <div className="text-sm text-green-600 font-medium">
          + Panoramica detrazioni fiscali
        </div>
      </div>

      <div className="text-sm text-gray-500">
        Gratuito • Pochi minuti • Senza impegno
      </div>
    </div>
  );
};
