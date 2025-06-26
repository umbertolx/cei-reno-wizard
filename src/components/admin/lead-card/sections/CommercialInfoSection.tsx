
import { Lead } from "@/data/mockLeads";
import { Clock } from "lucide-react";

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

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center mb-4">
        <Clock className="h-5 w-5 text-gray-600 mr-2" />
        <h4 className="font-bold text-lg text-gray-800">Info Commerciali</h4>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-3 rounded-lg">
          <div className="text-xs font-medium text-gray-500 mb-1">ULTIMO CONTATTO</div>
          <div className="font-medium text-gray-900">
            {lead.dataUltimoContatto ? formatDate(lead.dataUltimoContatto) : 'Mai contattato'}
          </div>
        </div>
        
        <div className="bg-white p-3 rounded-lg">
          <div className="text-xs font-medium text-gray-500 mb-1">MODULI COMPLETATI</div>
          <div className="flex items-center">
            <span className="font-bold text-gray-900 mr-2">{lead.moduliCompletati?.length || 0}/12</span>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${((lead.moduliCompletati?.length || 0) / 12) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {lead.sopralluogoRichiesto && (
        <div className="mt-4 bg-orange-100 border border-orange-300 p-3 rounded-lg">
          <div className="flex items-center text-orange-800">
            <div className="text-xl mr-2">🔍</div>
            <span className="font-bold">SOPRALLUOGO RICHIESTO</span>
          </div>
        </div>
      )}
    </div>
  );
};
