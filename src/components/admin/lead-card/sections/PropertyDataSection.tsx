
import { Lead } from "@/data/mockLeads";
import { Building2 } from "lucide-react";

interface PropertyDataSectionProps {
  lead: Lead;
}

export const PropertyDataSection = ({ lead }: PropertyDataSectionProps) => {
  return (
    <div className="bg-green-50 rounded-lg p-4">
      <div className="flex items-center mb-4">
        <Building2 className="h-5 w-5 text-green-600 mr-2" />
        <h4 className="font-bold text-lg text-green-800">Dati Immobile</h4>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-white p-3 rounded-lg text-center">
          <div className="text-xs font-medium text-gray-500 mb-1">TIPOLOGIA</div>
          <div className="font-semibold text-gray-900 capitalize">{lead.tipologiaAbitazione.replace('_', ' ')}</div>
        </div>
        <div className="bg-white p-3 rounded-lg text-center">
          <div className="text-xs font-medium text-gray-500 mb-1">SUPERFICIE</div>
          <div className="font-semibold text-gray-900">{lead.superficie} mq</div>
        </div>
        <div className="bg-white p-3 rounded-lg text-center">
          <div className="text-xs font-medium text-gray-500 mb-1">PIANO</div>
          <div className="font-semibold text-gray-900">{lead.piano || 'N/D'}</div>
        </div>
        <div className="bg-white p-3 rounded-lg text-center">
          <div className="text-xs font-medium text-gray-500 mb-1">PROPRIETÀ</div>
          <div className="font-semibold text-gray-900 capitalize">{lead.tipoProprietà}</div>
        </div>
      </div>
      
      <div className="bg-white p-3 rounded-lg">
        <div className="text-xs font-medium text-gray-500 mb-2">COMPOSIZIONE AMBIENTI</div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {Object.entries(lead.composizione).map(([stanza, numero]) => (
            numero > 0 && (
              <div key={stanza} className="text-center">
                <div className="text-lg font-bold text-gray-900">{numero}</div>
                <div className="text-xs text-gray-600">
                  {stanza === 'cameraDoppia' ? 'Cam. Doppie' : 
                   stanza === 'cameraSingola' ? 'Cam. Singole' : 
                   stanza === 'bagno' ? 'Bagni' :
                   stanza === 'soggiorno' ? 'Soggiorni' :
                   stanza === 'cucina' ? 'Cucine' :
                   stanza === 'altro' ? 'Altri' : stanza}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};
