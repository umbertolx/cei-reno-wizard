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

  // Fields to exclude from badge display (too technical or not relevant)
  const excludedFields = [
    'datiGenerali',
    'ambientiModificheVecchioImpianto',
    'consumo_aggiuntivo_completo',
    'funzioni_knx',
    'funzioni_bticino',
    'numero_moduli_knx',
    'configurazione_knx',
    'configurazione_bticino'
  ];

  // Helper function to get readable labels
  const getLabel = (key: string, value: any): { icon: any; label: string } | null => {
    if (value === null || value === undefined || value === '') return null;
    if (excludedFields.includes(key)) return null;

    // Handle boolean values (skip false values)
    if (typeof value === 'boolean') {
      if (!value) return null;
    }

    // Mapping for tipo_ristrutturazione (snake_case)
    if (key === 'tipo_ristrutturazione') {
      const ristruttuazioneMap: Record<string, { icon: any; label: string }> = {
        'Completa': { icon: Home, label: 'Ristrutturazione Completa' },
        'Nuova costruzione': { icon: Home, label: 'Nuova Costruzione' },
        'Intervento parziale': { icon: Home, label: 'Intervento Parziale' },
      };
      return ristruttuazioneMap[value] || null;
    }

    // Mapping for tipoRistrutturazione (camelCase)
    if (key === 'tipoRistrutturazione') {
      const ristruttuazioneMap: Record<string, { icon: any; label: string }> = {
        'completa': { icon: Home, label: 'Ristrutturazione Completa' },
        'nuova': { icon: Home, label: 'Nuova Costruzione' },
        'parziale': { icon: Home, label: 'Intervento Parziale' },
      };
      return ristruttuazioneMap[value] || null;
    }

    // Mapping for tipo_nuovo_impianto_elettrico (snake_case)
    if (key === 'tipo_nuovo_impianto_elettrico') {
      const impiantoMap: Record<string, { icon: any; label: string }> = {
        'Livello 1': { icon: Zap, label: 'Livello 1 - Standard' },
        'Livello 2': { icon: Zap, label: 'Livello 2 - Avanzato' },
        'Livello 3': { icon: Zap, label: 'Livello 3 - Domotico' },
      };
      return impiantoMap[value] || null;
    }

    // Mapping for tipoImpianto (camelCase)
    if (key === 'tipoImpianto') {
      const impiantoMap: Record<string, { icon: any; label: string }> = {
        'livello1': { icon: Zap, label: 'Livello 1 - Standard' },
        'livello2': { icon: Zap, label: 'Livello 2 - Avanzato' },
        'livello3': { icon: Zap, label: 'Livello 3 - Domotico' },
      };
      return impiantoMap[value] || null;
    }

    // Mapping for tipo_domotica (snake_case)
    if (key === 'tipo_domotica') {
      const domoticaMap: Record<string, { icon: any; label: string }> = {
        'cablata': { icon: Cable, label: 'Domotica Cablata (KNX)' },
        'wireless': { icon: Wifi, label: 'Domotica Wireless (BTicino)' },
      };
      return domoticaMap[value] || null;
    }

    // Mapping for tipoDomotica (camelCase)
    if (key === 'tipoDomotica') {
      const domoticaMap: Record<string, { icon: any; label: string }> = {
        'cablata': { icon: Cable, label: 'Domotica Cablata (KNX)' },
        'wireless': { icon: Wifi, label: 'Domotica Wireless (BTicino)' },
      };
      return domoticaMap[value] || null;
    }

    // Mapping for impianto_elettrico_obsoleto
    if (key === 'impianto_elettrico_obsoleto') {
      return value ? { icon: Settings, label: 'Impianto Obsoleto da Sostituire' } : null;
    }

    // Mapping for elettrificare_tapparelle (snake_case)
    if (key === 'elettrificare_tapparelle' && value === 'Si') {
      return { icon: DoorOpen, label: 'Tapparelle Elettriche' };
    }

    // Mapping for elettrificareTapparelle (camelCase)
    if (key === 'elettrificareTapparelle' && value === 'si') {
      return { icon: DoorOpen, label: 'Tapparelle Elettriche' };
    }

    // Mapping for tipo_intervento_fotovoltaico (snake_case)
    if (key === 'tipo_intervento_fotovoltaico') {
      const interventoMap: Record<string, { icon: any; label: string }> = {
        'nuovo': { icon: Sun, label: 'Nuovo Impianto Fotovoltaico' },
        'ampliamento': { icon: Sun, label: 'Ampliamento Impianto Esistente' },
      };
      return interventoMap[value] || null;
    }

    // Mapping for tipoInterventoFotovoltaico (camelCase)
    if (key === 'tipoInterventoFotovoltaico') {
      const interventoMap: Record<string, { icon: any; label: string }> = {
        'nuovo': { icon: Sun, label: 'Nuovo Impianto Fotovoltaico' },
        'ampliamento': { icon: Sun, label: 'Ampliamento Impianto Esistente' },
      };
      return interventoMap[value] || null;
    }

    // Mapping for batteria_accumulo (snake_case)
    if (key === 'batteria_accumulo_nuovo_impianto' || key === 'batteria_accumulo_ampliamento') {
      const batteriaMap: Record<string, { icon: any; label: string }> = {
        'si': { icon: Battery, label: 'Con Batteria di Accumulo' },
        'no': { icon: Battery, label: 'Senza Batteria' },
      };
      return batteriaMap[value] || null;
    }

    // Mapping for batteriaAccumulo (camelCase)
    if (key === 'batteriaAccumulo') {
      const batteriaMap: Record<string, { icon: any; label: string }> = {
        'si': { icon: Battery, label: 'Con Batteria di Accumulo' },
        'no': { icon: Battery, label: 'Senza Batteria' },
      };
      return batteriaMap[value] || null;
    }

    // Mapping for qualita_forniture (snake_case)
    if (key === 'qualita_forniture') {
      const qualitaMap: Record<string, { icon: any; label: string }> = {
        'standard': { icon: Shield, label: 'Forniture Standard' },
        'premium': { icon: Shield, label: 'Forniture Premium' },
      };
      return qualitaMap[value] || null;
    }

    // Mapping for qualitaForniture (camelCase)
    if (key === 'qualitaForniture') {
      const qualitaMap: Record<string, { icon: any; label: string }> = {
        'standard': { icon: Shield, label: 'Forniture Standard' },
        'premium': { icon: Shield, label: 'Forniture Premium' },
      };
      return qualitaMap[value] || null;
    }

    // Mapping for obiettivo (snake_case)
    if (key === 'obiettivo_nuovo_impianto' || key === 'obiettivo_ampliamento') {
      const obiettivoMap: Record<string, { icon: any; label: string }> = {
        'indipendenza-energetica': { icon: ChevronRight, label: 'Obiettivo: Indipendenza Energetica' },
        'risparmio-bolletta': { icon: ChevronRight, label: 'Obiettivo: Risparmio in Bolletta' },
        'valorizzazione-immobile': { icon: ChevronRight, label: 'Obiettivo: Valorizzazione Immobile' },
      };
      return obiettivoMap[value] || null;
    }

    // Mapping for obiettivoPrincipale and obiettivoAmpliamento (camelCase)
    if (key === 'obiettivoPrincipale' || key === 'obiettivoAmpliamento') {
      const obiettivoMap: Record<string, { icon: any; label: string }> = {
        'indipendenza-energetica': { icon: ChevronRight, label: 'Obiettivo: Indipendenza Energetica' },
        'risparmio-bolletta': { icon: ChevronRight, label: 'Obiettivo: Risparmio in Bolletta' },
        'valorizzazione-immobile': { icon: ChevronRight, label: 'Obiettivo: Valorizzazione Immobile' },
      };
      return obiettivoMap[value] || null;
    }

    return null;
  };

  // Extract badges from module data
  const extractBadges = (moduleData: any): Array<{ icon: any; label: string }> => {
    if (!moduleData || typeof moduleData !== 'object') return [];
    
    const badges: Array<{ icon: any; label: string }> = [];

    Object.entries(moduleData).forEach(([key, value]) => {
      // Skip null/undefined/empty
      if (value === null || value === undefined || value === '') return;

      // Handle nested objects (like funzioni_knx, funzioni_bticino)
      if (typeof value === 'object' && !Array.isArray(value)) {
        // Skip if it's a nested object in the excluded list
        if (excludedFields.includes(key)) return;
        
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          // Check for boolean true or objects with active: true
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
