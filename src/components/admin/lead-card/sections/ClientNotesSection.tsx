import { Lead } from "@/types/lead";
import { MessageSquare } from "lucide-react";

interface ClientNotesSectionProps {
  lead: Lead;
}

export const ClientNotesSection = ({ lead }: ClientNotesSectionProps) => {
  if (!lead.note) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-4">
        <MessageSquare className="h-5 w-5 text-gray-700" />
        Note del Cliente
      </h3>
      <div className="p-4 bg-[#F9FBFF] rounded-xl border-l-4 border-[#d8010c]">
        <p className="text-sm text-gray-700 italic leading-relaxed">
          "{lead.note}"
        </p>
      </div>
    </div>
  );
};
