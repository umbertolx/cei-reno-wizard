import { Lead } from "@/types/lead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Sun, Shield, AlertCircle } from "lucide-react";

interface ConfigurationSectionProps {
  lead: Lead;
}

// Helper per formattare le chiavi in label leggibili
const formatKey = (key: string): string => {
  return key
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
};

// Helper per formattare i valori
const formatValue = (value: any): string => {
  if (value === null || value === undefined) return 'N/D';
  if (typeof value === 'boolean') return value ? 'Sì' : 'No';
  if (typeof value === 'number') return value.toLocaleString('it-IT');
  if (typeof value === 'string') {
    if (value === 'si' || value === 'sì') return 'Sì';
    if (value === 'no') return 'No';
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  return String(value);
};

// Componente per renderizzare un modulo
const ModuleSection = ({ 
  title, 
  icon: Icon, 
  data, 
  colorClass 
}: { 
  title: string; 
  icon: React.ComponentType<{ className?: string }>; 
  data: Record<string, any> | null | undefined;
  colorClass: string;
}) => {
  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  // Filtra i campi da escludere
  const excludedFields = ['id', 'created_at', 'updated_at', 'lead_id'];
  
  const entries = Object.entries(data).filter(([key, value]) => {
    if (excludedFields.includes(key)) return false;
    if (value === null || value === undefined || value === '') return false;
    if (typeof value === 'object' && Object.keys(value).length === 0) return false;
    return true;
  });

  if (entries.length === 0) return null;

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className={`flex items-center gap-2 text-lg ${colorClass}`}>
          <Icon className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {entries.map(([key, value]) => {
            // Se il valore è un oggetto, mostralo in modo diverso
            if (typeof value === 'object' && value !== null) {
              const nestedEntries = Object.entries(value).filter(([, v]) => v !== null && v !== undefined && v !== '');
              if (nestedEntries.length === 0) return null;
              
              return (
                <div key={key} className="col-span-full p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground mb-2">{formatKey(key)}</p>
                  <div className="flex flex-wrap gap-2">
                    {nestedEntries.map(([nestedKey, nestedValue]) => (
                      <Badge key={nestedKey} variant="secondary" className="text-xs">
                        {formatKey(nestedKey)}: {formatValue(nestedValue)}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            }
            
            return (
              <div key={key} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span className="text-sm text-muted-foreground">{formatKey(key)}</span>
                <span className="font-medium text-foreground">{formatValue(value)}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export const ConfigurationSection = ({ lead }: ConfigurationSectionProps) => {
  const { moduloElettrico, moduloFotovoltaico, moduloSicurezza, informazioniGenerali } = lead;

  const hasAnyModule = 
    (moduloElettrico && Object.keys(moduloElettrico).length > 0) ||
    (moduloFotovoltaico && Object.keys(moduloFotovoltaico).length > 0) ||
    (moduloSicurezza && Object.keys(moduloSicurezza).length > 0) ||
    (informazioniGenerali && Object.keys(informazioniGenerali).length > 0);

  if (!hasAnyModule) {
    return (
      <Card className="border-border">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 text-muted-foreground">
            <AlertCircle className="h-5 w-5" />
            <p>Nessuna configurazione tecnica disponibile per questo lead.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <ModuleSection
        title="Modulo Elettrico"
        icon={Zap}
        data={moduloElettrico}
        colorClass="text-amber-600"
      />
      
      <ModuleSection
        title="Modulo Fotovoltaico"
        icon={Sun}
        data={moduloFotovoltaico}
        colorClass="text-yellow-600"
      />
      
      <ModuleSection
        title="Modulo Sicurezza"
        icon={Shield}
        data={moduloSicurezza}
        colorClass="text-red-600"
      />
    </div>
  );
};
