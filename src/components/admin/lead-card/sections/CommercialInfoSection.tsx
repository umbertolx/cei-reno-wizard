import { Lead } from "@/types/lead";
import { Clock, Calendar, CheckCircle } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

interface CommercialInfoSectionProps {
  lead: Lead;
}

export const CommercialInfoSection = ({ lead }: CommercialInfoSectionProps) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
      <h3 className="flex items-center gap-2 text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">
        <Clock className="h-5 w-5 text-gray-700" />
        Cronologia & Stato
      </h3>
      <div className="space-y-3 md:space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <div className="flex items-center gap-3 p-3 bg-[#F9FBFF] rounded-xl">
            <Calendar className="h-4 w-4 md:h-5 md:w-5 text-gray-400 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wide">Data Richiesta</p>
              <p className="font-medium text-gray-900 text-sm md:text-base truncate font-nums">{formatDateTime(lead.dataRichiesta)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-[#F9FBFF] rounded-xl">
            <Clock className="h-4 w-4 md:h-5 md:w-5 text-gray-400 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wide">Ultimo Contatto</p>
              <p className="font-medium text-gray-900 text-sm md:text-base truncate font-nums">
                {lead.dataUltimoContatto ? formatDateTime(lead.dataUltimoContatto) : 'Mai contattato'}
              </p>
            </div>
          </div>
        </div>

        {/* Moduli selezionati */}
        {lead.moduliSelezionati && lead.moduliSelezionati.length > 0 && (
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Moduli Selezionati
            </p>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {lead.moduliSelezionati.map((modulo) => (
                <span key={modulo} className="flex items-center gap-1 bg-yellow-400 text-gray-900 rounded-full px-3 py-1.5 text-xs font-medium">
                  <CheckCircle className="h-3 w-3" />
                  {modulo.charAt(0).toUpperCase() + modulo.slice(1)}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Sopralluogo */}
        {lead.sopralluogoRichiesto && (
          <div className="p-3 md:p-4 bg-[#F9FBFF] rounded-xl border border-gray-200">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-800 text-sm md:text-base">Sopralluogo Richiesto</p>
                {lead.dataSopralluogo && (
                  <p className="text-xs md:text-sm text-gray-500 font-nums">
                    {lead.dataSopralluogo} {lead.orarioSopralluogo && `alle ${lead.orarioSopralluogo}`}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
