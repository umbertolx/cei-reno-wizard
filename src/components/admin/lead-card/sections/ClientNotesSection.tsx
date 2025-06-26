
import { Lead } from "@/data/mockLeads";

interface ClientNotesSectionProps {
  lead: Lead;
}

export const ClientNotesSection = ({ lead }: ClientNotesSectionProps) => {
  if (!lead.note) {
    return null;
  }

  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
      <div className="flex items-center mb-2">
        <div className="text-xl mr-2">💬</div>
        <h4 className="font-bold text-amber-800">Note del Cliente</h4>
      </div>
      <div className="bg-white p-3 rounded italic text-gray-700">
        "{lead.note}"
      </div>
    </div>
  );
};
