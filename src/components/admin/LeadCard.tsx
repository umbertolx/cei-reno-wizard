
import { Lead } from "@/data/mockLeads";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    <Card
      ref={setNodeRef}
      style={style}
      className={`hover:shadow-lg transition-all duration-300 ${
        isDragging ? 'shadow-2xl ring-2 ring-blue-500 bg-white rotate-3' : 'hover:shadow-md'
      }`}
    >
      <CardContent className="p-4">
        <LeadCardHeader
          lead={lead}
          isExpanded={isExpanded}
          forceExpanded={forceExpanded}
          onToggleExpansion={toggleExpansion}
          attributes={attributes}
          listeners={listeners}
        />

        <LeadCardBasicInfo lead={lead} />

        {isExpanded && <LeadCardExpandedContent lead={lead} />}

        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewDetails}
            className="flex-1"
            type="button"
          >
            <Eye className="h-4 w-4 mr-1" />
            Dettagli Completi
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
