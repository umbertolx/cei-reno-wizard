
import { Lead } from "@/data/mockLeads";
import { Button } from "@/components/ui/button";
import { MapPin, ChevronDown } from "lucide-react";

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
  const getInitials = (nome: string, cognome: string) => {
    return `${nome.charAt(0)}${cognome.charAt(0)}`.toUpperCase();
  };

  return (
    <div 
      {...attributes}
      {...listeners}
      className="flex items-center space-x-3 mb-3 cursor-grab"
    >
      <div className="w-10 h-10 bg-[#d8010c] rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
        {getInitials(lead.nome, lead.cognome)}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 truncate">
          {lead.nome} {lead.cognome}
        </h3>
        <p className="text-sm text-gray-600 flex items-center truncate">
          <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
          {lead.citta}, {lead.cap}
        </p>
      </div>
      {forceExpanded === undefined && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleExpansion}
          className="p-1 h-8 w-8"
        >
          <ChevronDown 
            className={`h-4 w-4 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`} 
          />
        </Button>
      )}
    </div>
  );
};
