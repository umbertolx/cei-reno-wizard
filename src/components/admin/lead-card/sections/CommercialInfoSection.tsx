import { Lead } from "@/types/lead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, CheckCircle } from "lucide-react";

interface CommercialInfoSectionProps {
  lead: Lead;
}

export const CommercialInfoSection = ({ lead }: CommercialInfoSectionProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="border-border">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-primary" />
          Cronologia & Stato
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground uppercase">Data Richiesta</p>
              <p className="font-medium text-foreground">{formatDate(lead.dataRichiesta)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground uppercase">Ultimo Contatto</p>
              <p className="font-medium text-foreground">
                {lead.dataUltimoContatto ? formatDate(lead.dataUltimoContatto) : 'Mai contattato'}
              </p>
            </div>
          </div>
        </div>

        {/* Moduli selezionati */}
        {lead.moduliSelezionati && lead.moduliSelezionati.length > 0 && (
          <div>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
              Moduli Selezionati
            </p>
            <div className="flex flex-wrap gap-2">
              {lead.moduliSelezionati.map((modulo) => (
                <Badge key={modulo} variant="outline" className="gap-1">
                  <CheckCircle className="h-3 w-3" />
                  {modulo.charAt(0).toUpperCase() + modulo.slice(1)}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Sopralluogo */}
        {lead.sopralluogoRichiesto && (
          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
            <div className="flex items-center gap-2">
              <span className="text-xl">📅</span>
              <div>
                <p className="font-medium text-amber-800 dark:text-amber-200">Sopralluogo Richiesto</p>
                {lead.dataSopralluogo && (
                  <p className="text-sm text-amber-600 dark:text-amber-400">
                    {lead.dataSopralluogo} {lead.orarioSopralluogo && `alle ${lead.orarioSopralluogo}`}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
