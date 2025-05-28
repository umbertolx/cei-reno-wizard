
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
  const { setNodeRef, isOver } = useDroppable({
    id: stato,
  });

  const stateInfo = leadStates[stato];

  return (
    <div className="flex-1 min-w-80">
      {/* Header della colonna con gradiente */}
      <div className="mb-6">
        <div className={`relative overflow-hidden rounded-xl p-6 bg-gradient-to-br ${stateInfo.gradient} shadow-lg border border-white/20`}>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-lg mb-1">{stateInfo.label}</h3>
              <p className="text-white/80 text-sm">{leads.length} lead{leads.length !== 1 ? 's' : ''}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {leads.length}
              </span>
            </div>
          </div>
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
        </div>
      </div>

      {/* Zona drop per le card */}
      <div
        ref={setNodeRef}
        className={`min-h-96 rounded-xl p-4 transition-all duration-300 ${
          isOver 
            ? 'bg-gradient-to-b from-blue-50 to-blue-100 border-2 border-dashed border-blue-300 shadow-inner' 
            : 'bg-gray-50/80 backdrop-blur-sm border border-gray-200/50'
        }`}
      >
        <SortableContext
          items={leads.map(lead => lead.id)}
          strategy={verticalListSortingStrategy}
        >
          {leads.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gray-200 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1h-4" />
                  </svg>
                </div>
              </div>
              <p className="font-medium">Nessun lead</p>
              <p className="text-sm">Trascina qui i lead per cambiarli di stato</p>
            </div>
          ) : (
            <div className="space-y-3">
              {leads.map((lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  onViewDetails={() => onViewDetails(lead)}
                />
              ))}
            </div>
          )}
        </SortableContext>
      </div>
    </div>
  );
};
