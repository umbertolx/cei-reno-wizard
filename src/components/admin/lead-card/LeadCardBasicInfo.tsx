import { Lead } from "@/types/lead";
import { Home, Calendar, Euro } from "lucide-react";
import { formatDateShort } from "@/lib/utils";

interface LeadCardBasicInfoProps {
  lead: Lead;
}

export const LeadCardBasicInfo = ({ lead }: LeadCardBasicInfoProps) => {
  return (
    <div className="mt-3 space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center text-gray-500">
          <Home className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
          {lead.tipologiaAbitazione === 'appartamento' ? 'Appartamento' : 
           lead.tipologiaAbitazione === 'casa indipendente' ? 'Casa indipendente' : 'Villa'}
        </span>
        <span className="text-gray-900">{lead.superficie} mq</span>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center text-gray-500">
          <Euro className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
          Stima Ricasa
        </span>
        <span className="font-semibold text-[#d8010c]">
          €{lead.stimaMedia?.toLocaleString("it-IT") || "N/D"}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center text-gray-500">
          <Calendar className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
          Richiesta
        </span>
        <span className="text-gray-900 text-xs">
          {formatDateShort(lead.dataRichiesta)}
        </span>
      </div>
    </div>
  );
};
