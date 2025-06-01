
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, TrendingUp, FileText, Zap, Sun, Shield, Thermometer } from "lucide-react";

type Props = {
  onStart: () => void;
};

export const BenvenutoTool = ({ onStart }: Props) => {
  return (
    <div className="space-y-8 text-center">
      {/* Header principale */}
      <div className="space-y-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1c1c1c] leading-tight">
          Configura il tuo impianto e<br />
          <span className="text-[#d8010c]">ottieni subito un budget</span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Seleziona, configura e ricevi un <strong>budget gratuito online</strong> per il tuo intervento. 
          Senza impegno, in pochi passaggi.
        </p>

        {/* CTA principale */}
        <Button 
          onClick={onStart}
          className="w-full sm:w-auto px-12 py-6 text-lg bg-[#fbe12e] hover:bg-[#d8010c] text-black hover:text-white rounded-xl flex items-center justify-center gap-3 mx-auto transition-all duration-300"
        >
          Inizia configurazione
          <ArrowRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Moduli disponibili */}
      <div className="bg-[#f4f4f4] rounded-xl p-6 max-w-4xl mx-auto">
        <h3 className="text-xl font-bold text-[#1c1c1c] mb-6">
          Moduli disponibili
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-4 rounded-lg border-l-4 border-[#d8010c]">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-[#d8010c]" />
              <div className="font-semibold text-[#1c1c1c]">Impianto elettrico</div>
            </div>
            <div className="text-gray-600">Rifacimento e adeguamento</div>
          </div>
          <div className="bg-white p-4 rounded-lg border-l-4 border-[#fbe12e]">
            <div className="flex items-center gap-2 mb-2">
              <Sun className="h-4 w-4 text-[#d8010c]" />
              <div className="font-semibold text-[#1c1c1c]">Impianto fotovoltaico</div>
            </div>
            <div className="text-gray-600">Pannelli e accumulo</div>
          </div>
          <div className="bg-white p-4 rounded-lg border-l-4 border-[#d8010c]">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-[#d8010c]" />
              <div className="font-semibold text-[#1c1c1c]">Impianto di sicurezza</div>
            </div>
            <div className="text-gray-600">Allarmi e videosorveglianza</div>
          </div>
          <div className="bg-white p-4 rounded-lg border-l-4 border-[#fbe12e]">
            <div className="flex items-center gap-2 mb-2">
              <Thermometer className="h-4 w-4 text-[#d8010c]" />
              <div className="font-semibold text-[#1c1c1c]">Impianto termotecnico</div>
            </div>
            <div className="text-gray-600">Riscaldamento e climatizzazione</div>
          </div>
        </div>
      </div>

      {/* Esempio di budget migliorato */}
      <div className="bg-white border-2 border-[#fbe12e] rounded-2xl p-6 max-w-3xl mx-auto shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#1c1c1c]">
            Esempio di configurazione
          </h3>
          <span className="bg-[#fbe12e] text-[#1c1c1c] px-3 py-1 rounded-full text-sm font-medium">
            Budget stimato
          </span>
        </div>
        
        {/* Dettagli intervento */}
        <div className="bg-[#f4f4f4] rounded-lg p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">Tipologia abitazione</div>
              <div className="font-medium">Appartamento 80 mq</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Interventi selezionati</div>
              <div className="flex flex-wrap gap-1">
                <span className="bg-white px-2 py-1 rounded text-xs border-l-2 border-[#d8010c]">
                  Impianto elettrico completo
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stima prezzo */}
        <div className="text-center py-4">
          <div className="text-3xl font-bold text-[#d8010c] mb-2">€ 4.500 - € 6.800</div>
          <div className="text-sm text-green-600 font-semibold mb-3">
            Possibili detrazioni fino al 50%
          </div>
          <div className="text-xs text-gray-500">
            Include panoramica su bonus fiscali e detrazioni applicabili
          </div>
        </div>
      </div>

      {/* Vantaggi */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        <div className="text-center">
          <div className="bg-[#fbe12e]/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
            <Calculator className="h-6 w-6 text-[#d8010c]" />
          </div>
          <h4 className="font-bold text-base text-[#1c1c1c] mb-2">Budget immediato</h4>
          <p className="text-sm text-gray-600">Calcolo personalizzato in tempo reale</p>
        </div>

        <div className="text-center">
          <div className="bg-[#fbe12e]/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="h-6 w-6 text-[#d8010c]" />
          </div>
          <h4 className="font-bold text-base text-[#1c1c1c] mb-2">Panoramica detrazioni</h4>
          <p className="text-sm text-gray-600">Bonus e agevolazioni applicabili</p>
        </div>

        <div className="text-center">
          <div className="bg-[#fbe12e]/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
            <FileText className="h-6 w-6 text-[#d8010c]" />
          </div>
          <h4 className="font-bold text-base text-[#1c1c1c] mb-2">Senza impegno</h4>
          <p className="text-sm text-gray-600">Gratuito e personalizzato</p>
        </div>
      </div>

      <p className="text-sm text-gray-500">
        🔒 Gratuito • ⚡ Pochi minuti • 🏠 Budget personalizzato
      </p>
    </div>
  );
};
