
import { useState } from "react";
import { Lead, leadStates, CustomColumn, counterColors, availableColors } from "@/types/lead";
import { LeadCard } from "./LeadCard";
import { DeleteColumnDialog } from "./DeleteColumnDialog";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { GripVertical, Pencil, Check, X, Trash2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

// Maps counter bg-X-500 colors to faded bg-X-100/80 for the header box
const fadedColorMap: Record<string, string> = {
  "bg-green-500": "bg-green-100/80",
  "bg-yellow-500": "bg-yellow-100/80",
  "bg-red-500": "bg-red-100/80",
  "bg-orange-500": "bg-orange-100/80",
  "bg-cyan-500": "bg-cyan-100/80",
  "bg-blue-500": "bg-blue-100/80",
  "bg-purple-500": "bg-purple-100/80",
  "bg-pink-500": "bg-pink-100/80",
  "bg-indigo-500": "bg-indigo-100/80",
  "bg-teal-500": "bg-teal-100/80",
  "bg-lime-500": "bg-lime-100/80",
  "bg-amber-500": "bg-amber-100/80",
  "bg-gray-500": "bg-gray-200/80",
};

interface KanbanColumnProps {
  stato: string;
  leads: Lead[];
  onViewDetails: (lead: Lead) => void;
  customTitle?: string;
  onTitleChange?: (stato: string, title: string) => void;
  customColor?: string;
  onColorChange?: (stato: string, color: string) => void;
  customColumn?: CustomColumn;
  onDeleteColumn?: (columnId: string) => void;
  isDefaultColumn?: boolean;
  allCardsExpanded?: boolean;
  isDraggedOver?: boolean;
  isDraggable?: boolean;
  dragListeners?: SyntheticListenerMap;
}

export const KanbanColumn = ({ 
  stato, 
  leads, 
  onViewDetails, 
  customTitle, 
  onTitleChange,
  customColor,
  onColorChange,
  customColumn,
  onDeleteColumn,
  isDefaultColumn = false,
  allCardsExpanded = false,
  isDraggedOver = false,
  isDraggable = false,
  dragListeners
}: KanbanColumnProps) => {
  const isMobile = useIsMobile();
  const { setNodeRef, isOver } = useDroppable({
    id: stato,
    data: {
      type: 'column',
      stato: stato,
      accepts: ['lead']
    }
  });

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(customTitle || customColumn?.label || leadStates[stato as keyof typeof leadStates]?.label || stato);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const stateInfo = customColumn || leadStates[stato as keyof typeof leadStates];
  const displayTitle = customTitle || customColumn?.label || stateInfo?.label || stato;
  const counterColor = customColor || counterColors[stato] || customColumn?.color || "bg-gray-500";
  const headerBgColor = fadedColorMap[counterColor] || "bg-gray-100/60";

  const [editedColor, setEditedColor] = useState(counterColor);

  const handleSaveTitle = () => {
    if (onTitleChange && editedTitle.trim()) {
      onTitleChange(stato, editedTitle.trim());
    }
    if (onColorChange && editedColor !== counterColor) {
      onColorChange(stato, editedColor);
    }
    setIsEditingTitle(false);
  };

  const handleCancelEdit = () => {
    setEditedTitle(customTitle || customColumn?.label || stateInfo?.label || stato);
    setEditedColor(counterColor);
    setIsEditingTitle(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (onDeleteColumn && customColumn && !isDefaultColumn) {
      onDeleteColumn(customColumn.id);
    }
  };

  const isDragActive = isOver || isDraggedOver;
  const dragOverClass = isDragActive
    ? 'bg-blue-50 border-2 border-blue-300 border-dashed ring-2 ring-blue-200 ring-opacity-50 shadow-lg' 
    : '';

  return (
    <>
      <div className="min-w-[280px] md:min-w-[350px] w-[80vw] md:w-[350px] max-w-[350px] flex-shrink-0 flex flex-col snap-start">
        {/* Column Header */}
        <div className={`flex items-center gap-2 mb-3 md:mb-4 ${headerBgColor} rounded-xl px-3 py-2`}>
          {isDraggable && (
            <div
              {...dragListeners}
              className="flex items-center justify-center p-1 -ml-1 rounded-lg cursor-grab hover:bg-white/60 active:cursor-grabbing transition-colors touch-none"
            >
              <GripVertical className="h-4 w-4 text-gray-400" />
            </div>
          )}
          
          {isEditingTitle ? (
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex items-center gap-2">
                <input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="bg-white border border-gray-200 rounded-xl h-8 px-3 text-sm font-semibold text-gray-700 focus:border-[#d8010c] focus:ring-1 focus:ring-[#d8010c]/20 transition-colors outline-none flex-1 min-w-0"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveTitle();
                    if (e.key === 'Escape') handleCancelEdit();
                  }}
                  autoFocus
                />
                <button
                  onClick={handleSaveTitle}
                  className="bg-white border border-gray-200 rounded-xl p-2 hover:bg-[#F9FBFF] transition-colors flex-shrink-0"
                >
                  <Check className="h-3 w-3 text-gray-500" />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-white border border-gray-200 rounded-xl p-2 hover:bg-[#F9FBFF] transition-colors flex-shrink-0"
                >
                  <X className="h-3 w-3 text-gray-500" />
                </button>
              </div>
              <div className="flex items-center gap-1.5 px-1">
                {availableColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setEditedColor(color)}
                    className={`w-5 h-5 rounded-full ${color} transition-all flex-shrink-0 ${
                      editedColor === color ? 'ring-2 ring-gray-400 ring-offset-1 scale-110' : 'hover:scale-110'
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <>
              <span className="font-semibold text-gray-700 text-sm truncate">{displayTitle}</span>
              {!isMobile && (
                <button
                  onClick={() => {
                    setEditedColor(counterColor);
                    setIsEditingTitle(true);
                  }}
                  className="p-1 hover:bg-[#F9FBFF] rounded-xl transition-colors flex-shrink-0"
                >
                  <Pencil className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
              {!isMobile && customColumn && !isDefaultColumn && (
                <button
                  onClick={handleDeleteClick}
                  className="p-1 hover:bg-red-50 rounded-xl transition-colors flex-shrink-0"
                >
                  <Trash2 className="h-3.5 w-3.5 text-red-400 hover:text-red-600" />
                </button>
              )}
            </>
          )}
          
          <span className={`ml-auto w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 font-nums ${counterColor}`}>
            {leads.length}
          </span>
        </div>

        {/* Column body */}
        <div
          ref={setNodeRef}
          className={`rounded-xl md:rounded-2xl p-3 md:p-4 flex-1 overflow-y-auto kanban-col-scroll transition-all duration-300 min-h-32 ${dragOverClass} ${!isDragActive ? 'bg-[#F9FBFF]/50' : ''}`}
          style={{ maxHeight: 'calc(100vh - 320px)' }}
        >
          <SortableContext
            items={leads.map(lead => lead.id)}
            strategy={verticalListSortingStrategy}
          >
            {leads.length === 0 ? (
              <div className="text-center text-gray-400 py-8 h-full flex flex-col justify-center">
                <p className="text-sm mb-2">Nessun lead in questo stato</p>
                {isDragActive && (
                  <div className="text-blue-600 font-medium text-sm animate-pulse bg-white/80 rounded-xl p-4 border-2 border-dashed border-blue-300">
                    <p>🎯 Rilascia qui per spostare il lead</p>
                    <p className="text-xs mt-1">in "{displayTitle}"</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3 md:space-y-4">
                {leads.map((lead) => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    onViewDetails={() => onViewDetails(lead)}
                    forceExpanded={allCardsExpanded}
                  />
                ))}
                {isDragActive && (
                  <div className="text-center text-blue-600 font-medium py-4 text-sm animate-pulse border-2 border-dashed border-blue-300 rounded-xl bg-white/80 mx-2">
                    <p>🎯 Rilascia qui per aggiungere a "{displayTitle}"</p>
                  </div>
                )}
              </div>
            )}
          </SortableContext>
        </div>
      </div>

      <DeleteColumnDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        columnName={displayTitle}
        leadCount={leads.length}
      />
    </>
  );
};
