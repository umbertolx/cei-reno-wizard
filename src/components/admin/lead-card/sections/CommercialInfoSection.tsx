
import { Lead } from "@/data/mockLeads";
import { Clock, Calendar, BarChart3, Eye } from "lucide-react";

interface CommercialInfoSectionProps {
  lead: Lead;
}

export const CommercialInfoSection = ({ lead }: CommercialInfoSectionProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const completionPercentage = ((lead.moduliCompletati?.length || 0) / 12) * 100;

  return (
    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-gray-600 rounded-lg mr-3">
          <Clock className="h-6 w-6 text-white" />
        </div>
        <h4 className="font-bold text-xl text-gray-800">Info Commerciali</h4>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white/80 backdrop-blur-sm p-5 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-3">
            <Calendar className="h-5 w-5 text-gray-600 mr-2" />
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Ultimo Contatto</span>
          </div>
          <div className="font-bold text-lg text-gray-900">
            {lead.dataUltimoContatto ? formatDate(lead.dataUltimoContatto) : (
              <span className="text-orange-600">Mai contattato</span>
            )}
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm p-5 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-3">
            <BarChart3 className="h-5 w-5 text-gray-600 mr-2" />
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Progresso Moduli</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="font-bold text-lg text-gray-900 mr-3">{lead.moduliCompletati?.length || 0}/12</span>
            <span className="text-sm font-medium text-gray-600">({Math.round(completionPercentage)}%)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500" 
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {lead.sopralluogoRichiesto && (
        <div className="bg-gradient-to-r from-orange-100 to-yellow-100 border-2 border-orange-300 p-5 rounded-xl">
          <div className="flex items-center text-orange-800">
            <div className="text-2xl mr-3">🔍</div>
            <div>
              <span className="font-bold text-lg">SOPRALLUOGO RICHIESTO</span>
              <p className="text-sm text-orange-700 mt-1">Il cliente ha richiesto un sopralluogo tecnico</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
