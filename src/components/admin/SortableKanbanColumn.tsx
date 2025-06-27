
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { KanbanColumn } from "./KanbanColumn";
import { Lead, CustomColumn } from "@/data/mockLeads";

interface SortableKanbanColumnProps {
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

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={isDragging ? 'z-50' : ''}
    >
      <KanbanColumn
        {...props}
        isDraggable={true}
      />
    </div>
  );
};
