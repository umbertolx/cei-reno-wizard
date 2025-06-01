
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Users, Calculator, ArrowRight } from "lucide-react";

type Props = {
  onStart: () => void;
};

export const BenvenutoTool = ({ onStart }: Props) => {
  const benefici = [
    {
      icon: <Clock className="h-6 w-6 text-[#fbe12e]" />,
      titolo: "Veloce e semplice",
      descrizione: "Solo 3 passaggi per ottenere la tua stima personalizzata"
    },
    {
      icon: <Calculator className="h-6 w-6 text-[#fbe12e]" />,
      titolo: "Stima immediata",
      descrizione: "Ricevi subito una valutazione precisa dei costi"
    },
    {
      icon: <Users className="h-6 w-6 text-[#fbe12e]" />,
      titolo: "Esperti qualificati",
      descrizione: "Oltre 15 anni di esperienza nel settore ristrutturazioni"
    }
  ];

  const passaggi = [
    "Inserisci le informazioni sulla tua abitazione",
    "Personalizza la configurazione secondo le tue esigenze", 
    "Ottieni la stima dettagliata e richiedi un sopralluogo gratuito"
  ];

  return (
    <div className="space-y-8 text-center">
      {/* Header principale */}
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1c1c1c] leading-tight">
          Configura la tua ristrutturazione
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Scopri quanto costa ristrutturare la tua casa con il nostro configuratore gratuito. 
          <span className="text-[#d8010c] font-semibold"> In soli 3 minuti</span> avrai una stima personalizzata e dettagliata.
        </p>
      </div>

      {/* Benefici principali */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        {benefici.map((beneficio, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center space-y-3">
              <div className="bg-[#fbe12e]/10 p-3 rounded-full">
                {beneficio.icon}
              </div>
              <h3 className="font-semibold text-[#1c1c1c] text-lg">
                {beneficio.titolo}
              </h3>
              <p className="text-gray-600 text-sm text-center">
                {beneficio.descrizione}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Come funziona */}
      <div className="bg-[#f4f4f4] rounded-xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-[#1c1c1c] mb-6">
          Come funziona
        </h2>
        <div className="space-y-4">
          {passaggi.map((passaggio, index) => (
            <div key={index} className="flex items-start space-x-4 text-left">
              <div className="bg-[#fbe12e] text-[#1c1c1c] rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                {index + 1}
              </div>
              <p className="text-gray-700 flex-1">
                {passaggio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Cosa ottieni */}
      <div className="bg-gradient-to-r from-[#fbe12e]/10 to-[#d8010c]/10 rounded-xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-[#1c1c1c] mb-4">
          Cosa ottieni
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          {[
            "Stima dettagliata dei costi di ristrutturazione",
            "Breakdown per ogni ambiente della casa",
            "Consulenza gratuita con i nostri esperti",
            "Sopralluogo gratuito e senza impegno"
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA principale */}
      <div className="space-y-4">
        <Button 
          onClick={onStart}
          className="w-full sm:w-auto px-8 py-4 sm:py-6 text-base sm:text-lg bg-[#fbe12e] hover:bg-[#d8010c] text-black hover:text-white rounded-xl flex items-center justify-center gap-3 mx-auto transition-all duration-300 focus:bg-[#d8010c] focus:text-white active:bg-[#d8010c] active:text-white"
        >
          Inizia ora la configurazione
          <ArrowRight className="h-5 w-5" />
        </Button>
        <p className="text-sm text-gray-500">
          Gratuito • Nessun impegno • Risultati immediati
        </p>
      </div>
    </div>
  );
};
