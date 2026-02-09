import { Lead } from "@/types/lead";
import { Euro, TrendingUp, TrendingDown, Percent } from "lucide-react";

interface EconomicAnalysisSectionProps {
  lead: Lead;
}

export const EconomicAnalysisSection = ({ lead }: EconomicAnalysisSectionProps) => {
  const hasEstimates = lead.stimaMin || lead.stimaMax || lead.stimaMedia;

  if (!hasEstimates) {
    return null;
  }

  // Calcoli fiscali
  const stimaMedia = lead.stimaMedia || Math.round((lead.stimaMin + lead.stimaMax) / 2);
  const iva = Math.round(stimaMedia * 0.22);
  const detrazione = Math.round(stimaMedia * 0.50);

  return (
    <div className="bg-white rounded-xl md:rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
      <h3 className="flex items-center gap-2 text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">
        <Euro className="h-5 w-5 text-gray-700" />
        Analisi Economica
      </h3>
      <div className="space-y-4 md:space-y-6">
        {/* Stime principali */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          <div className="border-2 border-green-200 bg-green-50/30 rounded-xl md:rounded-2xl p-4 md:p-5 text-center">
            <span className="inline-block bg-green-600 text-white rounded-full px-2.5 md:px-3 py-0.5 md:py-1 text-xs font-bold mb-2">Range Cliente</span>
            <div className="text-xs md:text-sm text-gray-600">Preventivo Minimo</div>
            <p className="text-xl md:text-2xl font-bold text-green-600 mt-1">
              €{lead.stimaMin?.toLocaleString('it-IT') || 'N/D'}
            </p>
          </div>
          
          <div className="border-2 border-blue-200 bg-blue-50/30 rounded-xl md:rounded-2xl p-4 md:p-5 text-center">
            <span className="inline-block bg-blue-600 text-white rounded-full px-2.5 md:px-3 py-0.5 md:py-1 text-xs font-bold mb-2">Stima Ricasa</span>
            <div className="text-xs md:text-sm text-gray-600">Valore Medio</div>
            <p className="text-xl md:text-2xl font-bold text-blue-600 mt-1">
              €{stimaMedia?.toLocaleString('it-IT') || 'N/D'}
            </p>
          </div>
          
          <div className="border-2 border-green-200 bg-green-50/30 rounded-xl md:rounded-2xl p-4 md:p-5 text-center">
            <span className="inline-block bg-green-600 text-white rounded-full px-2.5 md:px-3 py-0.5 md:py-1 text-xs font-bold mb-2">Range Cliente</span>
            <div className="text-xs md:text-sm text-gray-600">Preventivo Massimo</div>
            <p className="text-xl md:text-2xl font-bold text-green-600 mt-1">
              €{lead.stimaMax?.toLocaleString('it-IT') || 'N/D'}
            </p>
          </div>
        </div>

        {/* Info fiscali */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2">
              <Percent className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500">IVA (22%)</span>
            </div>
            <span className="font-semibold text-gray-900">+€{iva.toLocaleString('it-IT')}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600">Detrazione 50%</span>
            </div>
            <span className="font-semibold text-green-700">-€{detrazione.toLocaleString('it-IT')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
