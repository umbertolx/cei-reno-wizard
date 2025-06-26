
import { Lead } from "@/data/mockLeads";
import { Calculator } from "lucide-react";

interface EconomicAnalysisSectionProps {
  lead: Lead;
}

export const EconomicAnalysisSection = ({ lead }: EconomicAnalysisSectionProps) => {
  const stimaMedia = lead.stimaMin && lead.stimaMax ? Math.round((lead.stimaMin + lead.stimaMax) / 2) : 0;

  return (
    <div className="bg-yellow-50 rounded-lg p-4">
      <div className="flex items-center mb-4">
        <Calculator className="h-5 w-5 text-yellow-600 mr-2" />
        <h4 className="font-bold text-lg text-yellow-800">Analisi Economica</h4>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border-l-4 border-green-400">
          <div className="text-xs font-medium text-gray-500 mb-1">PREVENTIVO MINIMO</div>
          <div className="text-2xl font-bold text-green-600">€{lead.stimaMin?.toLocaleString()}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border-l-4 border-blue-400">
          <div className="text-xs font-medium text-gray-500 mb-1">PREVENTIVO MASSIMO</div>
          <div className="text-2xl font-bold text-blue-600">€{lead.stimaMax?.toLocaleString()}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border-l-4 border-gray-400">
          <div className="text-xs font-medium text-gray-500 mb-1">VALORE MEDIO</div>
          <div className="text-2xl font-bold text-gray-700">€{stimaMedia?.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};
