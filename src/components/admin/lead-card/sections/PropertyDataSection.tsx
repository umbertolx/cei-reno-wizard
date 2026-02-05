import { Lead } from "@/types/lead";
import { Building2, Ruler, Layers, Home, Users, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PropertyDataSectionProps {
  lead: Lead;
}

export const PropertyDataSection = ({ lead }: PropertyDataSectionProps) => {
  const roomLabels: Record<string, string> = {
    cucina: 'Cucina',
    cameraDoppia: 'Camera Doppia',
    cameraSingola: 'Camera Singola',
    bagno: 'Bagno',
    soggiorno: 'Soggiorno',
    altro: 'Altro'
  };

  return (
    <Card className="border-border">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Building2 className="h-5 w-5 text-primary" />
          Informazioni Immobile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Dati principali */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <Home className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Tipologia</p>
            <p className="font-semibold text-foreground capitalize">{lead.tipologiaAbitazione?.replace('_', ' ') || 'N/D'}</p>
          </div>
          
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <Ruler className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Superficie</p>
            <p className="font-semibold text-foreground">{lead.superficie || 0} mq</p>
          </div>
          
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <Layers className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Piano</p>
            <p className="font-semibold text-foreground">{lead.piano || 'N/D'}</p>
          </div>
          
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <Users className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Persone</p>
            <p className="font-semibold text-foreground">{lead.numeroPersone || 2}</p>
          </div>
        </div>

        {/* Indirizzo */}
        <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
          <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Indirizzo</p>
            <p className="font-medium text-foreground">{lead.indirizzo || 'N/D'}</p>
            <p className="text-sm text-muted-foreground">{lead.citta}, {lead.cap} - {lead.regione}</p>
          </div>
        </div>

        {/* Composizione ambienti */}
        {lead.composizione && Object.keys(lead.composizione).length > 0 && (
          <div>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Composizione Ambienti</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(lead.composizione).map(([stanza, numero]) => {
                const count = Number(numero);
                if (count <= 0) return null;
                return (
                  <Badge key={stanza} variant="secondary" className="px-3 py-1.5">
                    {count}x {roomLabels[stanza] || stanza}
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
