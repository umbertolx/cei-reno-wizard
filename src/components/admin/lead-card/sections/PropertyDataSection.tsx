import { Lead } from "@/types/lead";
import { Building2, Ruler, Layers, Home, Users, MapPin } from "lucide-react";

interface PropertyDataSectionProps {
  lead: Lead;
}

export const PropertyDataSection = ({ lead }: PropertyDataSectionProps) => {
  const roomLabels: Record<string, string> = {
    cucina: 'Cucina',
    cameraDoppia: 'Camera Doppia',
    cameraSingola: 'Camera Singola',
    bagno: 'Bagno',
    soggiorno: 'Soggiorno',
    altro: 'Altro'
  };

  return (
    <div className="bg-white rounded-xl md:rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
      <h3 className="flex items-center gap-2 text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">
        <Building2 className="h-5 w-5 text-gray-700" />
        Informazioni Immobile
      </h3>
      <div className="space-y-4 md:space-y-6">
        {/* Dati principali */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="text-center p-3 md:p-4 bg-gray-50 rounded-xl">
            <Home className="h-4 w-4 md:h-5 md:w-5 text-gray-400 mx-auto mb-1.5 md:mb-2" />
            <p className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Tipologia</p>
            <p className="font-semibold text-gray-900 capitalize text-sm md:text-base">{lead.tipologiaAbitazione?.replace('_', ' ') || 'N/D'}</p>
          </div>
          
          <div className="text-center p-3 md:p-4 bg-gray-50 rounded-xl">
            <Ruler className="h-4 w-4 md:h-5 md:w-5 text-gray-400 mx-auto mb-1.5 md:mb-2" />
            <p className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Superficie</p>
            <p className="font-semibold text-gray-900 text-sm md:text-base">{lead.superficie || 0} mq</p>
          </div>
          
          <div className="text-center p-3 md:p-4 bg-gray-50 rounded-xl">
            <Layers className="h-4 w-4 md:h-5 md:w-5 text-gray-400 mx-auto mb-1.5 md:mb-2" />
            <p className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Piano</p>
            <p className="font-semibold text-gray-900 text-sm md:text-base">{lead.piano || 'N/D'}</p>
          </div>
          
          <div className="text-center p-3 md:p-4 bg-gray-50 rounded-xl">
            <Users className="h-4 w-4 md:h-5 md:w-5 text-gray-400 mx-auto mb-1.5 md:mb-2" />
            <p className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Persone</p>
            <p className="font-semibold text-gray-900 text-sm md:text-base">{lead.numeroPersone || 2}</p>
          </div>
        </div>

        {/* Indirizzo */}
        <div className="flex items-start gap-3 p-3 md:p-4 bg-gray-50 rounded-xl">
          <MapPin className="h-4 w-4 md:h-5 md:w-5 text-gray-400 mt-0.5 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Indirizzo</p>
            <p className="font-medium text-gray-900 text-sm md:text-base truncate">{lead.indirizzo || 'N/D'}</p>
            <p className="text-xs md:text-sm text-gray-500 truncate">{lead.citta}, {lead.cap} - {lead.regione}</p>
          </div>
        </div>

        {/* Composizione ambienti */}
        {lead.composizione && Object.keys(lead.composizione).length > 0 && (
          <div>
            <p className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 md:mb-3">Composizione Ambienti</p>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {Object.entries(lead.composizione).map(([stanza, numero]) => {
                const count = Number(numero);
                if (count <= 0) return null;
                return (
                  <span key={stanza} className="bg-gray-100 text-gray-800 rounded-full px-2.5 md:px-3 py-1 md:py-1.5 text-xs font-medium">
                    {count}x {roomLabels[stanza] || stanza}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
