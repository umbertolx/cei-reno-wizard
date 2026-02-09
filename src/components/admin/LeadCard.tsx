
import { Lead } from "@/types/lead";
import { Eye } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState, useEffect } from "react";
import { LeadCardHeader } from "./lead-card/LeadCardHeader";
import { LeadCardBasicInfo } from "./lead-card/LeadCardBasicInfo";
import { LeadCardExpandedContent } from "./lead-card/LeadCardExpandedContent";

interface LeadCardProps {
  lead: Lead;
  onViewDetails: () => void;
  forceExpanded?: boolean;
}

export const LeadCard = ({ lead, onViewDetails, forceExpanded = false }: LeadCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    if (forceExpanded !== undefined) {
      setIsExpanded(forceExpanded);
    }
  }, [forceExpanded]);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: lead.id,
    data: {
      type: 'lead',
      lead
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onViewDetails();
  };

  const toggleExpansion = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (forceExpanded === undefined) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-2xl border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer ${
        isDragging ? 'shadow-xl ring-2 ring-[#d8010c]/30 rotate-3' : ''
      }`}
    >
      <LeadCardHeader
        lead={lead}
        isExpanded={isExpanded}
        forceExpanded={forceExpanded}
        onToggleExpansion={toggleExpansion}
        attributes={attributes}
        listeners={listeners}
      />

      <LeadCardBasicInfo lead={lead} />

      {isExpanded && (
        <div className="mt-4 md:mt-6">
          <LeadCardExpandedContent lead={lead} />
        </div>
      )}

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <button
          onClick={handleViewDetails}
          type="button"
          className="w-full bg-white border border-gray-200 rounded-xl py-2.5 md:py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors active:bg-gray-100"
        >
          <Eye className="h-4 w-4" />
          Dettagli Completi
        </button>
      </div>
    </div>
  );
};
