
import { Lead } from "@/data/mockLeads";
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
    <div className="space-y-2 mb-3">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center text-gray-600">
          <Home className="h-3 w-3 mr-1" />
          {lead.tipologiaAbitazione === 'appartamento' ? 'Appartamento' : 
           lead.tipologiaAbitazione === 'casa indipendente' ? 'Casa indipendente' : 'Villa'}
        </span>
        <span className="font-medium">{lead.superficie} mq</span>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center text-gray-600">
          <Euro className="h-3 w-3 mr-1" />
          Preventivo
        </span>
        <span className="font-medium text-green-600 text-xs">
          €{lead.stimaMin?.toLocaleString()} - €{lead.stimaMax?.toLocaleString()}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center text-gray-600">
          <Calendar className="h-3 w-3 mr-1" />
          Richiesta
        </span>
        <span className="text-gray-600 text-xs">
          {formatDate(lead.dataRichiesta)}
        </span>
      </div>
    </div>
  );
};
