import { Lead } from "@/types/lead";
import { TrendingDown, CircleCheck } from "lucide-react";

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
  const detrazione = Math.round(stimaMedia * 0.50);

  return (
    <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
      {/* Header con range preventivo grande come nel riferimento */}
      <div className="px-6 py-6 border-b border-border/30">
        <p className="text-sm text-muted-foreground mb-3">
          {lead.superficie} m² • {lead.indirizzo}, {lead.cap} {lead.citta}, Italia
        </p>
        <div className="text-center py-4">
          <p className="text-3xl md:text-4xl font-bold text-foreground">
            €{lead.stimaMin?.toLocaleString('it-IT')} - €{lead.stimaMax?.toLocaleString('it-IT')}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Costo stimato prima delle detrazioni fiscali (IVA esclusa)
          </p>
        </div>
      </div>

      {/* Sezione detrazioni - stile verde come nel riferimento */}
      <div className="px-6 py-5 bg-emerald-50 dark:bg-emerald-950/30 border-t border-emerald-100 dark:border-emerald-900/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
              <CircleCheck className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-emerald-800 dark:text-emerald-200">
                Quanto recuperi con le detrazioni
              </p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400">
                Detrazione fiscale 50% in 10 anni
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl md:text-3xl font-bold text-emerald-700 dark:text-emerald-300">
              €{detrazione.toLocaleString('it-IT')}
            </p>
          </div>
        </div>
      </div>

      {/* Costo finale netto */}
      <div className="px-6 py-4 bg-muted/30 border-t border-border/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Costo netto dopo detrazioni</span>
          </div>
          <span className="text-lg font-bold text-foreground">
            €{Math.round(stimaMedia - detrazione).toLocaleString('it-IT')}
          </span>
        </div>
      </div>
    </div>
  );
};
