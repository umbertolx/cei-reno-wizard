
import { useState } from "react";
import { Lead, leadStates } from "@/data/mockLeads";
import { LeadCard } from "./LeadCard";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2, Check, X } from "lucide-react";

interface KanbanColumnProps {
  stato: keyof typeof leadStates;
  leads: Lead[];
  onViewDetails: (lead: Lead) => void;
  customTitle?: string;
  onTitleChange?: (stato: keyof typeof leadStates, title: string) => void;
}

export const KanbanColumn = ({ 
  stato, 
  leads, 
  onViewDetails, 
  customTitle, 
  onTitleChange 
}: KanbanColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: stato,
  });

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(customTitle || leadStates[stato].label);

  const stateInfo = leadStates[stato];
  const displayTitle = customTitle || stateInfo.label;

  const handleSaveTitle = () => {
    if (onTitleChange && editedTitle.trim()) {
      onTitleChange(stato, editedTitle.trim());
    }
    setIsEditingTitle(false);
  };

  const handleCancelEdit = () => {
    setEditedTitle(customTitle || stateInfo.label);
    setIsEditingTitle(false);
  };

  return (
    <div className="flex-1 min-w-80">
      {/* Header della colonna compatto */}
      <div className="mb-4 bg-white rounded-lg p-3 shadow-sm border">
        <div className="flex items-center justify-between">
          {isEditingTitle ? (
            <div className="flex items-center space-x-2 flex-1">
              <Input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="text-sm font-semibold"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveTitle();
                  if (e.key === 'Escape') handleCancelEdit();
                }}
                autoFocus
              />
              <Button size="sm" variant="ghost" onClick={handleSaveTitle}>
                <Check className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
                <X className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 flex-1">
              <h3 className="font-semibold text-gray-900 text-sm">{displayTitle}</h3>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setIsEditingTitle(true)}
                className="h-6 w-6 p-0"
              >
                <Edit2 className="h-3 w-3" />
              </Button>
            </div>
          )}
          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-sm font-medium ${stateInfo.color}`}>
            {leads.length}
          </span>
        </div>
      </div>

      {/* Zona drop per le card */}
      <div
        ref={setNodeRef}
        className="min-h-96 bg-gray-50 rounded-lg p-4"
      >
        <SortableContext
          items={leads.map(lead => lead.id)}
          strategy={verticalListSortingStrategy}
        >
          {leads.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p>Nessun lead in questo stato</p>
            </div>
          ) : (
            leads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onViewDetails={() => onViewDetails(lead)}
              />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  );
};
