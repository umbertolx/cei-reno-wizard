
import { Expand, Minimize } from "lucide-react";

interface CardExpansionToggleProps {
  allExpanded: boolean;
  onToggle: () => void;
}

export const CardExpansionToggle = ({ allExpanded, onToggle }: CardExpansionToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl px-4 py-2 font-medium text-sm transition-colors"
    >
      {allExpanded ? (
        <>
          <Minimize className="h-4 w-4" />
          Chiudi Tutte
        </>
      ) : (
        <>
          <Expand className="h-4 w-4" />
          Espandi Tutte
        </>
      )}
    </button>
  );
};
