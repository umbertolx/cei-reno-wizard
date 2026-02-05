import { Lead } from "@/types/lead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Calendar, Clock, CheckCircle, Copy } from "lucide-react";
import { toast } from "sonner";

interface ContactInfoSectionProps {
  lead: Lead;
}

export const ContactInfoSection = ({ lead }: ContactInfoSectionProps) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/D';
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copiato negli appunti`);
    } catch {
      toast.error("Errore nella copia");
    }
  };

  const TableRow = ({ label, value, copyable, icon: Icon }: { 
    label: string; 
    value: string | React.ReactNode; 
    copyable?: string;
    icon?: React.ComponentType<{ className?: string }>;
  }) => (
    <div className="flex items-center justify-between py-2.5 px-3 border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
      <div className="flex items-center gap-2 text-muted-foreground">
        {Icon && <Icon className="h-4 w-4" />}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-foreground text-right">{value}</span>
        {copyable && (
          <button 
            onClick={() => copyToClipboard(copyable, label)}
            className="p-1 hover:bg-muted rounded transition-colors"
            title="Copia"
          >
            <Copy className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-2 bg-muted/30">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Phone className="h-4 w-4 text-primary" />
          Contatti & Cronologia
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border/50">
          <TableRow 
            label="Telefono" 
            value={lead.telefono || 'N/D'} 
            copyable={lead.telefono}
            icon={Phone}
          />
          <TableRow 
            label="Email" 
            value={lead.email || 'N/D'} 
            copyable={lead.email}
            icon={Mail}
          />
          <TableRow 
            label="Indirizzo" 
            value={
              <div className="text-right">
                <div>{lead.indirizzo || 'N/D'}</div>
                {lead.citta && (
                  <div className="text-xs text-muted-foreground">
                    {lead.citta}{lead.cap ? `, ${lead.cap}` : ''} - {lead.regione}
                  </div>
                )}
              </div>
            }
            icon={MapPin}
          />
          <TableRow 
            label="Data Richiesta" 
            value={formatDate(lead.dataRichiesta)}
            icon={Calendar}
          />
          <TableRow 
            label="Ultimo Contatto" 
            value={lead.dataUltimoContatto ? formatDate(lead.dataUltimoContatto) : 'Mai contattato'}
            icon={Clock}
          />
        </div>

        {/* Moduli selezionati */}
        {lead.moduliSelezionati && lead.moduliSelezionati.length > 0 && (
          <div className="p-3 border-t border-border/50 bg-muted/20">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              Moduli Richiesti
            </p>
            <div className="flex flex-wrap gap-1.5">
              {lead.moduliSelezionati.map((modulo) => (
                <Badge key={modulo} variant="secondary" className="gap-1 text-xs">
                  <CheckCircle className="h-3 w-3" />
                  {modulo.charAt(0).toUpperCase() + modulo.slice(1).replace(/-/g, ' ')}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Sopralluogo */}
        {lead.sopralluogoRichiesto && (
          <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border-t border-amber-200 dark:border-amber-800">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-amber-600" />
              <div>
                <p className="text-sm font-medium text-amber-800 dark:text-amber-200">Sopralluogo Richiesto</p>
                {lead.dataSopralluogo && (
                  <p className="text-xs text-amber-600 dark:text-amber-400">
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
