
import { useState } from "react";
import { Lead, leadStates, CustomColumn } from "@/data/mockLeads";
import { LeadCard } from "./LeadCard";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2, Check, X, Trash2 } from "lucide-react";

interface KanbanColumnProps {
  stato: string;
  leads: Lead[];
  onViewDetails: (lead: Lead) => void;
  customTitle?: string;
  onTitleChange?: (stato: string, title: string) => void;
  customColumn?: CustomColumn;
  onDeleteColumn?: (columnId: string) => void;
  isDefaultColumn?: boolean;
  allCardsExpanded?: boolean;
  isDraggedOver?: boolean;
}

export const KanbanColumn = ({ 
  stato, 
  leads, 
  onViewDetails, 
  customTitle, 
  onTitleChange,
  customColumn,
  onDeleteColumn,
  isDefaultColumn = false,
  allCardsExpanded = false,
  isDraggedOver = false
}: KanbanColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: stato,
    data: {
      type: 'column',
      stato: stato
    }
  });

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(customTitle || customColumn?.label || leadStates[stato as keyof typeof leadStates]?.label || stato);

  const stateInfo = customColumn || leadStates[stato as keyof typeof leadStates];
  const displayTitle = customTitle || customColumn?.label || stateInfo?.label || stato;
  const columnColor = customColumn?.color || stateInfo?.color || "bg-gray-500";

  const handleSaveTitle = () => {
    if (onTitleChange && editedTitle.trim()) {
      onTitleChange(stato, editedTitle.trim());
    }
    setIsEditingTitle(false);
  };

  const handleCancelEdit = () => {
    setEditedTitle(customTitle || customColumn?.label || stateInfo?.label || stato);
    setIsEditingTitle(false);
  };

  const handleDeleteColumn = () => {
    if (onDeleteColumn && customColumn && !isDefaultColumn) {
      onDeleteColumn(customColumn.id);
    }
  };

  // Enhanced visual feedback for drag over
  const dragOverClass = (isOver || isDraggedOver) 
    ? 'bg-blue-50 border-2 border-blue-300 border-dashed ring-2 ring-blue-200 ring-opacity-50' 
    : '';

  return (
    <div className="flex-1 min-w-80 max-w-80">
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
              {customColumn && !isDefaultColumn && (
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={handleDeleteColumn}
                  className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
          )}
          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-sm font-medium ${columnColor}`}>
            {leads.length}
          </span>
        </div>
      </div>

      <div
        ref={setNodeRef}
        className={`bg-gray-50 rounded-lg p-4 h-[calc(100vh-280px)] overflow-y-auto transition-all duration-200 min-h-32 ${dragOverClass}`}
      >
        <SortableContext
          items={leads.map(lead => lead.id)}
          strategy={verticalListSortingStrategy}
        >
          {leads.length === 0 ? (
            <div className="text-center text-gray-500 py-8 h-full flex flex-col justify-center">
              <p className="mb-2">Nessun lead in questo stato</p>
              {(isOver || isDraggedOver) && (
                <div className="text-blue-600 font-medium text-sm animate-pulse">
                  <p>🎯 Rilascia qui per spostare il lead</p>
                  <p className="text-xs mt-1">in "{displayTitle}"</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {leads.map((lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  onViewDetails={() => onViewDetails(lead)}
                  forceExpanded={allCardsExpanded}
                />
              ))}
              {(isOver || isDraggedOver) && (
                <div className="text-center text-blue-600 font-medium py-4 text-sm animate-pulse border-2 border-dashed border-blue-300 rounded-lg bg-white/50">
                  <p>🎯 Rilascia qui per aggiungere a "{displayTitle}"</p>
                </div>
              )}
            </div>
          )}
        </SortableContext>
      </div>
    </div>
  );
};
