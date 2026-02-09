import { Lead } from "@/types/lead";
import { Home, Calendar, Euro } from "lucide-react";

interface LeadCardBasicInfoProps {
  lead: Lead;
}

export const LeadCardBasicInfo = ({ lead }: LeadCardBasicInfoProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

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
          Preventivo
        </span>
        <span className="font-semibold text-[#d8010c]">
          €{lead.stimaMin?.toLocaleString("it-IT")} - €{lead.stimaMax?.toLocaleString("it-IT")}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center text-gray-500">
          <Calendar className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
          Richiesta
        </span>
        <span className="text-gray-900 text-xs">
          {formatDate(lead.dataRichiesta)}
        </span>
      </div>
    </div>
  );
};
