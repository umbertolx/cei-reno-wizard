
import { Lead } from "@/data/mockLeads";
import { MessageSquare } from "lucide-react";

interface ClientNotesSectionProps {
  lead: Lead;
}

export const ClientNotesSection = ({ lead }: ClientNotesSectionProps) => {
  if (!lead.note) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200 shadow-sm">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-amber-500 rounded-lg mr-3">
          <MessageSquote className="h-6 w-6 text-white" />
        </div>
        <h4 className="font-bold text-xl text-amber-800">Note del Cliente</h4>
      </div>
      <div className="bg-white/80 backdrop-blur-sm p-5 rounded-lg border border-amber-200 relative">
        <div className="absolute top-3 left-3 text-amber-400 text-3xl opacity-50">"</div>
        <div className="pl-8 pr-4 py-2 text-gray-800 font-medium italic text-lg leading-relaxed">
          {lead.note}
        </div>
        <div className="absolute bottom-3 right-3 text-amber-400 text-3xl opacity-50 rotate-180">"</div>
      </div>
    </div>
  );
};
