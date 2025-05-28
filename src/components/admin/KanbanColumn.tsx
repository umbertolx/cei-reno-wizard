
import { Lead, leadStates } from "@/data/mockLeads";
import { LeadCard } from "./LeadCard";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

interface KanbanColumnProps {
  stato: keyof typeof leadStates;
  leads: Lead[];
  onViewDetails: (lead: Lead) => void;
}

export const KanbanColumn = ({ stato, leads, onViewDetails }: KanbanColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: stato,
  });

  const stateInfo = leadStates[stato];

  return (
    <div className="flex-1 min-w-80">
      {/* Header della colonna */}
      <div className="mb-4 bg-white rounded-lg p-4 shadow-sm border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">{stateInfo.label}</h3>
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
