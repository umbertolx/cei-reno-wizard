
import { Lead } from "@/data/mockLeads";
import { User } from "lucide-react";

interface PersonalDataSectionProps {
  lead: Lead;
}

export const PersonalDataSection = ({ lead }: PersonalDataSectionProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-blue-50 rounded-lg p-4">
      <div className="flex items-center mb-4">
        <User className="h-5 w-5 text-blue-600 mr-2" />
        <h4 className="font-bold text-lg text-blue-800">Dati Personali</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <div className="text-xs font-medium text-gray-500 mb-1">NOME COMPLETO</div>
            <div className="text-lg font-semibold text-gray-900">{lead.nome} {lead.cognome}</div>
          </div>
          <div>
            <div className="text-xs font-medium text-gray-500 mb-1">EMAIL</div>
            <div className="text-blue-600 underline">{lead.email}</div>
          </div>
          <div>
            <div className="text-xs font-medium text-gray-500 mb-1">TELEFONO</div>
            <div className="font-semibold text-gray-900">{lead.telefono}</div>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <div className="text-xs font-medium text-gray-500 mb-1">INDIRIZZO COMPLETO</div>
            <div className="text-gray-900">{lead.indirizzo}</div>
            <div className="text-gray-600">{lead.citta} ({lead.cap})</div>
            <div className="text-gray-500">{lead.regione}</div>
          </div>
          <div>
            <div className="text-xs font-medium text-gray-500 mb-1">DATA RICHIESTA</div>
            <div className="text-gray-900">{formatDate(lead.dataRichiesta)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
