
import { Lead } from "@/data/mockLeads";
import { Calculator, TrendingUp, DollarSign } from "lucide-react";

interface EconomicAnalysisSectionProps {
  lead: Lead;
}

export const EconomicAnalysisSection = ({ lead }: EconomicAnalysisSectionProps) => {
  const stimaMedia = lead.stimaMin && lead.stimaMax ? Math.round((lead.stimaMin + lead.stimaMax) / 2) : 0;

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200 shadow-sm">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-yellow-500 rounded-lg mr-3">
          <Calculator className="h-6 w-6 text-white" />
        </div>
        <h4 className="font-bold text-xl text-yellow-900">Analisi Economica</h4>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border-l-4 border-purple-400 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-3">
            <Calculator className="h-5 w-5 text-purple-600 mr-2" />
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wide">Valore Medio</span>
          </div>
          <div className="text-3xl font-bold text-purple-700 mb-1">€{stimaMedia?.toLocaleString()}</div>
          <div className="text-sm text-purple-600">Stima realistica</div>
        </div>
      </div>
    </div>
  );
};
