
import { Lead } from "@/data/mockLeads";
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";

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
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 shadow-sm">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-blue-500 rounded-lg mr-3">
          <User className="h-6 w-6 text-white" />
        </div>
        <h4 className="font-bold text-xl text-blue-900">Dati Personali</h4>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-blue-100">
            <div className="flex items-center mb-2">
              <User className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Nome Completo</span>
            </div>
            <div className="text-lg font-bold text-gray-900">{lead.nome} {lead.cognome}</div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-blue-100">
            <div className="flex items-center mb-2">
              <Mail className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Email</span>
            </div>
            <div className="text-blue-700 font-medium">{lead.email}</div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-blue-100">
            <div className="flex items-center mb-2">
              <Phone className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Telefono</span>
            </div>
            <div className="font-semibold text-gray-900">{lead.telefono}</div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-blue-100">
            <div className="flex items-center mb-2">
              <MapPin className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Indirizzo</span>
            </div>
            <div className="text-gray-900 font-medium">{lead.indirizzo}</div>
            <div className="text-blue-700 font-semibold mt-1">{lead.citta} ({lead.cap})</div>
            <div className="text-gray-600">{lead.regione}</div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-blue-100">
            <div className="flex items-center mb-2">
              <Calendar className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Data Richiesta</span>
            </div>
            <div className="font-semibold text-gray-900">{formatDate(lead.dataRichiesta)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
