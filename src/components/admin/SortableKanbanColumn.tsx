
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { KanbanColumn } from "./KanbanColumn";
import { Lead, CustomColumn } from "@/types/lead";

interface SortableKanbanColumnProps {
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
}

export const SortableKanbanColumn = (props: SortableKanbanColumnProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props.stato,
    data: {
      type: 'column',
      stato: props.stato,
    },
  });

  // Lock Y-axis: columns only move horizontally
  const lockedTransform = transform
    ? { ...transform, y: 0, scaleX: 1, scaleY: 1 }
    : null;

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(lockedTransform),
    transition: transition || 'transform 200ms cubic-bezier(0.25, 1, 0.5, 1)',
  };

  // When dragging, render a full-height placeholder slot (no bottom border)
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        className="w-[80vw] md:w-[340px] flex-shrink-0 z-0 pointer-events-none"
      >
        <div
          className="h-full min-h-[300px] rounded-t-2xl"
          style={{
            borderLeft: '2px dashed #cbd5e1',
            borderRight: '2px dashed #cbd5e1',
            borderTop: '2px dashed #cbd5e1',
            borderBottom: 'none',
            background: 'linear-gradient(180deg, #f1f5f9 0%, transparent 100%)',
            opacity: 0.5,
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="w-[80vw] md:w-[340px] flex-shrink-0 transition-shadow"
    >
      <KanbanColumn
        {...props}
        isDraggable={true}
        dragListeners={listeners}
      />
    </div>
  );
};
