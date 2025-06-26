
import { Button } from "@/components/ui/button";
import { Expand, Minimize } from "lucide-react";

interface CardExpansionToggleProps {
  allExpanded: boolean;
  onToggle: () => void;
}

export const CardExpansionToggle = ({ allExpanded, onToggle }: CardExpansionToggleProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onToggle}
      className="flex items-center gap-2"
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
    </Button>
  );
};
