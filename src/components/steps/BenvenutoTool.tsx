
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, TrendingUp, FileText } from "lucide-react";

type Props = {
  onStart: () => void;
};

export const BenvenutoTool = ({ onStart }: Props) => {
  return (
    <div className="space-y-8 text-center">
      {/* Header principale */}
      <div className="space-y-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1c1c1c] leading-tight">
          Calcola subito quanto costa<br />
          <span className="text-[#d8010c]">ristrutturare casa</span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Configuratore gratuito in <strong>3 semplici passaggi</strong>. 
          Ottieni una stima personalizzata e scopri tutte le detrazioni disponibili.
        </p>

        {/* CTA principale in alto */}
        <Button 
          onClick={onStart}
          className="w-full sm:w-auto px-12 py-6 text-lg bg-[#fbe12e] hover:bg-[#d8010c] text-black hover:text-white rounded-xl flex items-center justify-center gap-3 mx-auto transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Inizia la configurazione gratuita
          <ArrowRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Esempio di stima */}
      <div className="bg-gradient-to-r from-[#fbe12e]/20 to-[#d8010c]/20 rounded-2xl p-8 max-w-2xl mx-auto">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-[#1c1c1c] mb-4">
            Esempio di stima
          </h3>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-sm text-gray-600 mb-2">Appartamento 80 mq • Ristrutturazione completa</div>
            <div className="text-4xl font-bold text-[#d8010c] mb-2">€ 32.000 - € 48.000</div>
            <div className="text-sm text-green-600 font-semibold">
              Possibile detrazione fino al 50% con Bonus Casa
            </div>
          </div>
        </div>
      </div>

      {/* Benefici chiave */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="bg-[#fbe12e]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Calculator className="h-8 w-8 text-[#d8010c]" />
          </div>
          <h4 className="font-bold text-lg text-[#1c1c1c] mb-2">Stima immediata</h4>
          <p className="text-gray-600">Calcolo personalizzato in base alle tue esigenze</p>
        </div>

        <div className="text-center">
          <div className="bg-[#fbe12e]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-8 w-8 text-[#d8010c]" />
          </div>
          <h4 className="font-bold text-lg text-[#1c1c1c] mb-2">Detrazioni fiscali</h4>
          <p className="text-gray-600">Panoramica completa su bonus e agevolazioni</p>
        </div>

        <div className="text-center">
          <div className="bg-[#fbe12e]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <FileText className="h-8 w-8 text-[#d8010c]" />
          </div>
          <h4 className="font-bold text-lg text-[#1c1c1c] mb-2">Consulenza gratuita</h4>
          <p className="text-gray-600">Sopralluogo e preventivo dettagliato senza impegno</p>
        </div>
      </div>

      {/* Come funziona - versione semplificata */}
      <div className="bg-[#f4f4f4] rounded-xl p-6 max-w-3xl mx-auto">
        <h3 className="text-xl font-bold text-[#1c1c1c] mb-6 text-center">
          Come funziona
        </h3>
        <div className="flex items-center justify-center space-x-8">
          <div className="text-center">
            <div className="bg-[#fbe12e] text-[#1c1c1c] rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-2">1</div>
            <p className="text-sm text-gray-700">Inserisci i dati<br />della casa</p>
          </div>
          
          <ArrowRight className="h-6 w-6 text-gray-400" />
          
          <div className="text-center">
            <div className="bg-[#fbe12e] text-[#1c1c1c] rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-2">2</div>
            <p className="text-sm text-gray-700">Configura le<br />preferenze</p>
          </div>
          
          <ArrowRight className="h-6 w-6 text-gray-400" />
          
          <div className="text-center">
            <div className="bg-[#fbe12e] text-[#1c1c1c] rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-2">3</div>
            <p className="text-sm text-gray-700">Ricevi stima<br />e consulenza</p>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500">
        🔒 Gratuito • ⚡ 3 minuti • 🏠 Risultati personalizzati
      </p>
    </div>
  );
};
