import { Lead } from "@/types/lead";
import { Building2, Ruler, Layers, Home, Users, MapPin } from "lucide-react";

interface PropertyDataSectionProps {
  lead: Lead;
}

const roomLabels: Record<string, string> = {
  soggiorni: "Soggiorno",
  cucine: "Cucina",
  camere_doppie: "Camera Doppia",
  camere_singole: "Camera Singola",
  bagni: "Bagno",
  altro: "Altro",
};

export const PropertyDataSection = ({ lead }: PropertyDataSectionProps) => {
  const cap = lead.indirizzoDettagli?.cap || "";
  const piano = lead.indirizzoDettagli?.piano || "";

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
      <h3 className="flex items-center gap-2 text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">
        <Building2 className="h-5 w-5 text-gray-700" />
        Informazioni Immobile
      </h3>
      <div className="space-y-4 md:space-y-6">
        {/* Dati principali - 3 stat cards */}
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          <div className="bg-[#F9FBFF] rounded-xl p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-gray-900 font-nums">{lead.superficie || 0}</div>
            <div className="text-[10px] md:text-xs text-gray-500">mq totali</div>
          </div>

          <div className="bg-[#F9FBFF] rounded-xl p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-gray-900 font-nums">
              {Object.entries(lead.composizione)
                .reduce((sum, [, val]) => sum + Number(val), 0)}
            </div>
            <div className="text-[10px] md:text-xs text-gray-500">stanze totali</div>
          </div>

          <div className="bg-[#F9FBFF] rounded-xl p-3 md:p-4 text-center">
            <div className="text-sm md:text-2xl font-bold text-gray-900 capitalize leading-tight">
              {lead.tipologiaAbitazione?.replace(/_/g, " ") || "N/D"}
            </div>
            <div className="text-[10px] md:text-xs text-gray-500">tipologia</div>
          </div>
        </div>

        {/* Extra info row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          {piano && (
            <div className="flex items-center gap-2 p-3 bg-[#F9FBFF] rounded-xl">
              <Layers className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <div>
                <p className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wide">Piano</p>
                <p className="font-semibold text-gray-900 text-sm font-nums">{piano}</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 p-3 bg-[#F9FBFF] rounded-xl">
            <Users className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <div>
              <p className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wide">Persone</p>
              <p className="font-semibold text-gray-900 text-sm font-nums">{lead.numeroPersone || 2}</p>
            </div>
          </div>

          {lead.tipoProprietà && (
            <div className="flex items-center gap-2 p-3 bg-[#F9FBFF] rounded-xl">
              <Home className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <div>
                <p className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wide">Proprietà</p>
                <p className="font-semibold text-gray-900 text-sm capitalize">{lead.tipoProprietà}</p>
              </div>
            </div>
          )}
        </div>

        {/* Indirizzo */}
        <div className="flex items-start gap-3 p-3 md:p-4 bg-[#F9FBFF] rounded-xl">
          <MapPin className="h-4 w-4 md:h-5 md:w-5 text-gray-400 mt-0.5 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Indirizzo</p>
            <p className="font-medium text-gray-900 text-sm md:text-base truncate">{lead.indirizzo || "N/D"}</p>
            <p className="text-xs md:text-sm text-gray-500 truncate">
              {lead.citta}
              {cap ? `, ${cap}` : ""}
              {lead.regione ? ` - ${lead.regione}` : ""}
            </p>
          </div>
        </div>

        {/* Composizione ambienti */}
        {lead.composizione && (
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Composizione Stanze
            </p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {Object.entries(lead.composizione).map(([stanza, numero]) => {
                const count = Number(numero);
                return (
                  <div
                    key={stanza}
                    className="bg-[#F9FBFF] rounded-xl p-2 md:p-3 text-center"
                  >
                    <div className="text-base md:text-lg font-bold text-gray-900 font-nums">{count}</div>
                    <div className="text-[10px] md:text-xs text-gray-500">{roomLabels[stanza] || stanza}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
