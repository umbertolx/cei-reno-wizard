
import { Lead } from "@/data/mockLeads";
import { Building2, Ruler, Layers, Home } from "lucide-react";

interface PropertyDataSectionProps {
  lead: Lead;
}

export const PropertyDataSection = ({ lead }: PropertyDataSectionProps) => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 shadow-sm">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-green-500 rounded-lg mr-3">
          <Building2 className="h-6 w-6 text-white" />
        </div>
        <h4 className="font-bold text-xl text-green-900">Dati Immobile</h4>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg text-center border border-green-100 hover:shadow-md transition-shadow">
          <Home className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <div className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">Tipologia</div>
          <div className="font-bold text-gray-900 capitalize">{lead.tipologiaAbitazione.replace('_', ' ')}</div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg text-center border border-green-100 hover:shadow-md transition-shadow">
          <Ruler className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <div className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">Superficie</div>
          <div className="font-bold text-gray-900">{lead.superficie} mq</div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg text-center border border-green-100 hover:shadow-md transition-shadow">
          <Layers className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <div className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">Piano</div>
          <div className="font-bold text-gray-900">{lead.piano || 'N/D'}</div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg text-center border border-green-100 hover:shadow-md transition-shadow">
          <Building2 className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <div className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">Proprietà</div>
          <div className="font-bold text-gray-900 capitalize">{lead.tipoProprietà}</div>
        </div>
      </div>
      
      <div className="bg-white/80 backdrop-blur-sm p-5 rounded-lg border border-green-100">
        <div className="text-sm font-bold text-green-700 uppercase tracking-wide mb-4">Composizione Ambienti</div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {Object.entries(lead.composizione).map(([stanza, numero]) => (
            numero > 0 && (
              <div key={stanza} className="text-center bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-700 mb-1">{numero}</div>
                <div className="text-xs font-medium text-green-600">
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
