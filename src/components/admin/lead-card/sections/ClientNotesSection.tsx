import { Lead } from "@/types/lead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

interface ClientNotesSectionProps {
  lead: Lead;
}

export const ClientNotesSection = ({ lead }: ClientNotesSectionProps) => {
  if (!lead.note) {
    return null;
  }

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MessageSquare className="h-5 w-5 text-primary" />
          Note del Cliente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
          <p className="text-foreground italic leading-relaxed">
            "{lead.note}"
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
