import { Lead } from "@/types/lead";
import { MapPin, ChevronDown } from "lucide-react";
import { getInitials } from "@/lib/utils";

interface LeadCardHeaderProps {
  lead: Lead;
  isExpanded: boolean;
  forceExpanded?: boolean;
  onToggleExpansion: (e: React.MouseEvent) => void;
  attributes: any;
  listeners: any;
}

export const LeadCardHeader = ({ 
  lead, 
  isExpanded, 
  forceExpanded, 
  onToggleExpansion, 
  attributes, 
  listeners 
}: LeadCardHeaderProps) => {
  const cap = lead.indirizzoDettagli?.cap || "";

  return (
    <div 
      {...attributes}
      {...listeners}
      className="flex items-center gap-3 cursor-grab"
    >
      <div className="w-10 h-10 bg-[#d8010c] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
        {getInitials(lead.nome, lead.cognome)}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 text-base truncate">
          {lead.nome} {lead.cognome}
        </h3>
        <p className="text-sm text-gray-500 flex items-center truncate">
          <MapPin className="h-3 w-3 mr-1 text-gray-400 flex-shrink-0" />
          {lead.citta}{cap ? `, ${cap}` : ""}
        </p>
      </div>
      {forceExpanded === undefined && (
        <button
          onClick={onToggleExpansion}
          className="bg-white border border-gray-200 rounded-xl p-2 hover:bg-[#F9FBFF] transition-colors flex-shrink-0"
        >
          <ChevronDown 
            className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`} 
          />
        </button>
      )}
    </div>
  );
};
