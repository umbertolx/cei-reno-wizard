import { Lead } from "@/types/lead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Home, Ruler, Layers, Users, DoorOpen } from "lucide-react";

interface PropertyTableSectionProps {
  lead: Lead;
}

export const PropertyTableSection = ({ lead }: PropertyTableSectionProps) => {
  const roomLabels: Record<string, string> = {
    cucina: 'Cucina',
    cameraDoppia: 'Camera Doppia',
    cameraSingola: 'Camera Singola',
    bagno: 'Bagno',
    soggiorno: 'Soggiorno',
    altro: 'Altro'
  };

  const getTotalRooms = () => {
    if (!lead.composizione) return 0;
    return Object.values(lead.composizione).reduce((sum, val) => sum + Number(val || 0), 0);
  };

  const TableRow = ({ label, value, icon: Icon }: { 
    label: string; 
    value: string | number | React.ReactNode; 
    icon?: React.ComponentType<{ className?: string }>;
  }) => (
    <div className="flex items-center justify-between py-2.5 px-3 border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
      <div className="flex items-center gap-2 text-muted-foreground">
        {Icon && <Icon className="h-4 w-4" />}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <span className="text-sm font-semibold text-foreground">{value}</span>
    </div>
  );

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-2 bg-muted/30">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Building2 className="h-4 w-4 text-primary" />
          Dati Immobile
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border/50">
          <TableRow 
            label="Tipologia" 
            value={
              <span className="capitalize">
                {lead.tipologiaAbitazione?.replace(/_/g, ' ') || 'N/D'}
              </span>
            }
            icon={Home}
          />
          <TableRow 
            label="Superficie" 
            value={`${lead.superficie || 0} mq`}
            icon={Ruler}
          />
          <TableRow 
            label="Piano" 
            value={lead.piano || 'N/D'}
            icon={Layers}
          />
          <TableRow 
            label="Persone" 
            value={lead.numeroPersone || 2}
            icon={Users}
          />
          <TableRow 
            label="Totale Stanze" 
            value={getTotalRooms()}
            icon={DoorOpen}
          />
        </div>

        {/* Composizione ambienti */}
        {lead.composizione && getTotalRooms() > 0 && (
          <div className="p-3 border-t border-border/50 bg-muted/20">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              Composizione
            </p>
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(lead.composizione).map(([stanza, numero]) => {
                const count = Number(numero);
                if (count <= 0) return null;
                return (
                  <Badge key={stanza} variant="outline" className="text-xs font-medium">
                    {count}× {roomLabels[stanza] || stanza}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
