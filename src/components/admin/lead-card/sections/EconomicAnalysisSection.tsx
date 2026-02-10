import { Lead } from "@/types/lead";
import { Euro, TrendingDown, Percent, Zap, Sun, Shield, PiggyBank } from "lucide-react";

interface EconomicAnalysisSectionProps {
  lead: Lead;
}

export const EconomicAnalysisSection = ({ lead }: EconomicAnalysisSectionProps) => {
  const { stime, stimaMin, stimaMax, stimaMedia, tipoProprietà } = lead;

  const hasEstimates = stimaMin || stimaMax || stimaMedia;
  if (!hasEstimates) return null;

  // ── IVA ──────────────────────────────────────────────────────────────────
  const isPrimaCasa = tipoProprietà === "prima casa";
  const aliquotaIva = isPrimaCasa ? 0.10 : 0.22;
  const iva = Math.round(stimaMedia * aliquotaIva);

  // ── Detrazione fiscale ───────────────────────────────────────────────────
  const aliquotaDetrazione = isPrimaCasa ? 0.50 : 0.36;
  const detrazioneLabel = isPrimaCasa ? "50%" : "36%";
  const detrazioneTotale = Math.round(stimaMedia * aliquotaDetrazione);
  const detrazioneAnno = Math.round(detrazioneTotale / 10);

  // ── Costi per modulo (da stime JSONB) ────────────────────────────────────
  const moduloCosts: { label: string; icon: React.ReactNode; costo: number; colorClass: string }[] = [];
  if (stime?.elettrico) {
    moduloCosts.push({
      label: "Elettrico",
      icon: <Zap className="h-4 w-4" />,
      costo: stime.elettrico.costo,
      colorClass: "text-[#d8010c]",
    });
  }
  if (stime?.fotovoltaico) {
    moduloCosts.push({
      label: "Fotovoltaico",
      icon: <Sun className="h-4 w-4" />,
      costo: stime.fotovoltaico.costo,
      colorClass: "text-yellow-600",
    });
  }
  if (stime?.sicurezza) {
    moduloCosts.push({
      label: "Sicurezza",
      icon: <Shield className="h-4 w-4" />,
      costo: stime.sicurezza.costo,
      colorClass: "text-red-600",
    });
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
      <h3 className="flex items-center gap-2 text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">
        <Euro className="h-5 w-5 text-gray-700" />
        Analisi Economica
      </h3>

      <div className="space-y-4 md:space-y-6">
        {/* Stime principali: min / media / max */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          <div className="bg-gray-50 rounded-xl p-4 md:p-5 text-center">
            <span className="inline-block bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-xs font-bold mb-2">
              Range Cliente
            </span>
            <div className="text-xs md:text-sm text-gray-500">Preventivo Minimo</div>
            <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1 font-nums">
              €{stimaMin?.toLocaleString("it-IT") || "N/D"}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 md:p-5 text-center border border-gray-200">
            <span className="inline-block bg-[#d8010c] text-white rounded-full px-3 py-1 text-xs font-bold mb-2">
              Stima Ricasa
            </span>
            <div className="text-xs md:text-sm text-gray-500">Valore Medio</div>
            <p className="text-xl md:text-2xl font-bold text-[#d8010c] mt-1 font-nums">
              €{stimaMedia?.toLocaleString("it-IT") || "N/D"}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 md:p-5 text-center">
            <span className="inline-block bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-xs font-bold mb-2">
              Range Cliente
            </span>
            <div className="text-xs md:text-sm text-gray-500">Preventivo Massimo</div>
            <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1 font-nums">
              €{stimaMax?.toLocaleString("it-IT") || "N/D"}
            </p>
          </div>
        </div>

        {/* Costi per modulo */}
        {moduloCosts.length > 0 && (
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Suddivisione per Modulo
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {moduloCosts.map(({ label, icon, costo, colorClass }) => (
                <div key={label} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className={`flex items-center gap-2 ${colorClass}`}>
                    {icon}
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                  <span className="font-semibold text-gray-900 font-nums">€{costo.toLocaleString("it-IT")}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* IVA & Detrazioni */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2">
              <Percent className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500">
                IVA ({isPrimaCasa ? "10% ristrutturazione" : "22% standard"})
              </span>
            </div>
            <span className="font-semibold text-gray-900 font-nums">+€{iva.toLocaleString("it-IT")}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500">
                Detrazione {detrazioneLabel}
              </span>
            </div>
            <span className="font-semibold text-gray-900 font-nums">−€{detrazioneTotale.toLocaleString("it-IT")}</span>
          </div>
        </div>

        {/* Info detrazione recupero annuo */}
        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-200">
          <PiggyBank className="h-4 w-4 text-gray-400 flex-shrink-0" />
          <p className="text-xs md:text-sm text-gray-600">
            <span className="font-medium">Recupero annuo:</span> <span className="font-nums">€{detrazioneAnno.toLocaleString("it-IT")}/anno</span> per 10 anni
            {isPrimaCasa ? " (prima casa)" : " (seconda casa)"}
          </p>
        </div>
      </div>
    </div>
  );
};
