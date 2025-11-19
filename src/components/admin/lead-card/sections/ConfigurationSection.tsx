import { Lead } from "@/data/mockLeads";
import { Zap, Sun, Home, Lightbulb, Settings, Wifi, Cable, Battery, Shield, Camera, DoorOpen, Wind, Droplet, Tv, Music, ChevronRight } from "lucide-react";
import { ConfigBadge } from "@/components/shared/ConfigBadge";
import { ModuleBadge } from "@/components/shared/ModuleBadge";

interface ConfigurationSectionProps {
  lead: Lead;
}

export const ConfigurationSection = ({ lead }: ConfigurationSectionProps) => {
  const moduloElettrico = lead.moduloElettrico;
  const moduloFotovoltaico = lead.moduloFotovoltaico;

  const hasElettrico = moduloElettrico && Object.keys(moduloElettrico).length > 0;
  const hasFotovoltaico = moduloFotovoltaico && Object.keys(moduloFotovoltaico).length > 0;

  if (!hasElettrico && !hasFotovoltaico) {
    return (
      <div className="bg-card rounded-lg p-6 border">
        <div className="flex items-center mb-4">
          <Settings className="h-5 w-5 text-muted-foreground mr-2" />
          <h4 className="font-semibold text-foreground">Configurazione Non Disponibile</h4>
        </div>
        <p className="text-muted-foreground">Nessuna configurazione tecnica specificata per questo lead.</p>
      </div>
    );
  }

  // Helper function to get readable labels
  const getLabel = (key: string, value: any): { icon: any; label: string } | null => {
    if (value === null || value === undefined) return null;

    // Handle boolean values
    if (typeof value === 'boolean') {
      if (!value) return null;
    }

    // Mapping configuration
    const labelMap: Record<string, { icon: any; label: string }> = {
      // Tipo ristrutturazione
      'tipo_ristrutturazione_completa': { icon: Home, label: 'Ristrutturazione Completa' },
      'tipo_ristrutturazione_nuova': { icon: Home, label: 'Nuova Costruzione' },
      'tipo_ristrutturazione_parziale': { icon: Home, label: 'Intervento Parziale' },
      
      // Tipo impianto elettrico
      'tipo_nuovo_impianto_elettrico_livello1': { icon: Zap, label: 'Livello 1 - Standard' },
      'tipo_nuovo_impianto_elettrico_livello2': { icon: Zap, label: 'Livello 2 - Avanzato' },
      'tipo_nuovo_impianto_elettrico_livello3': { icon: Zap, label: 'Livello 3 - Domotico' },
      
      // Età impianto
      'impianto_vecchio_true': { icon: Settings, label: 'Impianto Datato' },
      'impianto_vecchio_false': { icon: Settings, label: 'Impianto Recente' },
      
      // Tipo domotica
      'tipo_domotica_cablata': { icon: Cable, label: 'Domotica Cablata (KNX)' },
      'tipo_domotica_wireless': { icon: Wifi, label: 'Domotica Wireless (BTicino)' },
      
      // Tipo fotovoltaico
      'tipo_intervento_fotovoltaico_nuovo': { icon: Sun, label: 'Nuovo Impianto' },
      'tipo_intervento_fotovoltaico_ampliamento': { icon: Sun, label: 'Ampliamento' },
      
      // Batteria
      'batteria_accumulo_si': { icon: Battery, label: 'Con Batteria' },
      'batteria_accumulo_no': { icon: Battery, label: 'Senza Batteria' },
      
      // Qualità forniture
      'qualita_forniture_standard': { icon: Shield, label: 'Forniture Standard' },
      'qualita_forniture_premium': { icon: Shield, label: 'Forniture Premium' },
      
      // Tapparelle elettriche
      'tapparelle_elettriche_true': { icon: DoorOpen, label: 'Tapparelle Elettriche' },
    };

    // Try to find exact match
    const exactKey = `${key}_${value}`;
    if (labelMap[exactKey]) {
      return labelMap[exactKey];
    }

    // Try key only
    if (labelMap[key]) {
      return labelMap[key];
    }

    // Handle numeric values
    if (typeof value === 'number') {
      return { icon: ChevronRight, label: `${key}: ${value}` };
    }

    // Handle string values
    if (typeof value === 'string' && value) {
      return { icon: ChevronRight, label: value };
    }

    return null;
  };

  // Extract badges from module data
  const extractBadges = (moduleData: any): Array<{ icon: any; label: string }> => {
    if (!moduleData || typeof moduleData !== 'object') return [];
    
    const badges: Array<{ icon: any; label: string }> = [];

    Object.entries(moduleData).forEach(([key, value]) => {
      // Skip null/undefined
      if (value === null || value === undefined) return;

      // Handle nested objects (like funzioni_knx, funzioni_bticino)
      if (typeof value === 'object' && !Array.isArray(value)) {
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          if (nestedValue === true || (typeof nestedValue === 'object' && (nestedValue as any)?.active === true)) {
            const badge = getBadgeForFeature(nestedKey);
            if (badge) badges.push(badge);
          }
        });
        return;
      }

      // Handle simple values
      const badge = getLabel(key, value);
      if (badge) badges.push(badge);
    });

    return badges;
  };

  // Get badge for specific features
  const getBadgeForFeature = (featureKey: string): { icon: any; label: string } | null => {
    const featureMap: Record<string, { icon: any; label: string }> = {
      'illuminazione': { icon: Lightbulb, label: 'Illuminazione' },
      'clima': { icon: Wind, label: 'Climatizzazione' },
      'sicurezza': { icon: Shield, label: 'Sicurezza' },
      'videocitofono': { icon: Camera, label: 'Videocitofono' },
      'irrigazione': { icon: Droplet, label: 'Irrigazione' },
      'multimedia': { icon: Tv, label: 'Multimedia' },
      'diffusione_sonora': { icon: Music, label: 'Audio Multiroom' },
      'automazione_tende': { icon: DoorOpen, label: 'Automazione Tende' },
    };

    return featureMap[featureKey] || null;
  };

  const elettricoBadges = extractBadges(moduloElettrico);
  const fotovoltaicoBadges = extractBadges(moduloFotovoltaico);

  return (
    <div className="bg-card rounded-lg p-6 border">
      <div className="flex items-center mb-6">
        <Zap className="h-5 w-5 text-primary mr-2" />
        <h4 className="font-semibold text-foreground">Configurazione Richiesta</h4>
      </div>

      <div className="space-y-6">
        {/* Modulo Elettrico */}
        {hasElettrico && elettricoBadges.length > 0 && (
          <div>
            <div className="mb-3">
              <ModuleBadge>🔌 MODULO ELETTRICO</ModuleBadge>
            </div>
            <div className="flex flex-wrap gap-2">
              {elettricoBadges.map((badge, index) => (
                <ConfigBadge 
                  key={`elettrico-${index}`}
                  icon={badge.icon}
                  label={badge.label}
                />
              ))}
            </div>
          </div>
        )}

        {/* Modulo Fotovoltaico */}
        {hasFotovoltaico && fotovoltaicoBadges.length > 0 && (
          <div>
            <div className="mb-3">
              <ModuleBadge>☀️ MODULO FOTOVOLTAICO</ModuleBadge>
            </div>
            <div className="flex flex-wrap gap-2">
              {fotovoltaicoBadges.map((badge, index) => (
                <ConfigBadge 
                  key={`fotovoltaico-${index}`}
                  icon={badge.icon}
                  label={badge.label}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
