
import { Lead } from "@/data/mockLeads";
import { Calculator, TrendingUp, DollarSign, Receipt, TrendingDown } from "lucide-react";

interface EconomicAnalysisSectionProps {
  lead: Lead;
}

export const EconomicAnalysisSection = ({ lead }: EconomicAnalysisSectionProps) => {
  // Calcolo IVA (22%)
  const ivaMin = lead.stimaMin ? Math.round(lead.stimaMin * 0.22) : 0;
  const ivaMax = lead.stimaMax ? Math.round(lead.stimaMax * 0.22) : 0;
  
  // Calcolo detrazione fiscale (50% per ristrutturazioni)
  const detrazioneMin = lead.stimaMin ? Math.round(lead.stimaMin * 0.50) : 0;
  const detrazioneMax = lead.stimaMax ? Math.round(lead.stimaMax * 0.50) : 0;

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200 shadow-sm">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-yellow-500 rounded-lg mr-3">
          <Calculator className="h-6 w-6 text-white" />
        </div>
        <h4 className="font-bold text-xl text-yellow-900">Analisi Economica</h4>
      </div>
      
      {/* Preventivi principali */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border-l-4 border-green-400 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-3">
            <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-xs font-bold text-green-600 uppercase tracking-wide">Preventivo Minimo</span>
          </div>
          <div className="text-3xl font-bold text-green-700 mb-1">€{lead.stimaMin?.toLocaleString()}</div>
          <div className="text-sm text-green-600">Base di partenza</div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border-l-4 border-blue-400 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-3">
            <DollarSign className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Preventivo Massimo</span>
          </div>
          <div className="text-3xl font-bold text-blue-700 mb-1">€{lead.stimaMax?.toLocaleString()}</div>
          <div className="text-sm text-blue-600">Configurazione completa</div>
        </div>
      </div>

      {/* Sezione fiscale */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border-l-4 border-red-400 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-3">
            <Receipt className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-xs font-bold text-red-600 uppercase tracking-wide">IVA (22%)</span>
          </div>
          <div className="text-lg font-bold text-red-700 mb-1">€{ivaMin?.toLocaleString()} - €{ivaMax?.toLocaleString()}</div>
          <div className="text-sm text-red-600">Da aggiungere al preventivo</div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border-l-4 border-emerald-400 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-3">
            <TrendingDown className="h-5 w-5 text-emerald-600 mr-2" />
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">Detrazione Fiscale (50%)</span>
          </div>
          <div className="text-lg font-bold text-emerald-700 mb-1">€{detrazioneMin?.toLocaleString()} - €{detrazioneMax?.toLocaleString()}</div>
          <div className="text-sm text-emerald-600">Risparmio fiscale in 10 anni</div>
        </div>
      </div>
    </div>
  );
};
