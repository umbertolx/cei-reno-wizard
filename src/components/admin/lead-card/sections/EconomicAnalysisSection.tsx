import { Lead } from "@/types/lead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="border-border">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Euro className="h-5 w-5 text-primary" />
          Analisi Economica
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stime principali */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="h-4 w-4 text-green-600" />
              <span className="text-xs font-medium text-green-600 uppercase">Minimo</span>
            </div>
            <p className="text-2xl font-bold text-green-700 dark:text-green-400">
              €{lead.stimaMin?.toLocaleString('it-IT') || 'N/D'}
            </p>
          </div>
          
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-2">
              <Euro className="h-4 w-4 text-blue-600" />
              <span className="text-xs font-medium text-blue-600 uppercase">Media</span>
            </div>
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
              €{stimaMedia?.toLocaleString('it-IT') || 'N/D'}
            </p>
          </div>
          
          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-amber-600" />
              <span className="text-xs font-medium text-amber-600 uppercase">Massimo</span>
            </div>
            <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">
              €{lead.stimaMax?.toLocaleString('it-IT') || 'N/D'}
            </p>
          </div>
        </div>

        {/* Info fiscali */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Percent className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">IVA (22%)</span>
            </div>
            <span className="font-semibold text-foreground">+€{iva.toLocaleString('it-IT')}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600">Detrazione 50%</span>
            </div>
            <span className="font-semibold text-green-700 dark:text-green-400">-€{detrazione.toLocaleString('it-IT')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
