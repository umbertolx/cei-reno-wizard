import { Lead } from "@/types/lead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Sun, Shield, AlertCircle, Battery, Compass, Target, Ruler, Gauge } from "lucide-react";

interface ConfigurationSectionProps {
  lead: Lead;
}

// Helper per ottenere un valore da snake_case o camelCase
const getValue = (data: Record<string, any>, ...keys: string[]): any => {
  for (const key of keys) {
    if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
      return data[key];
    }
  }
  return null;
};

const orientamentoLabels: Record<string, string> = {
  'sud': 'Sud (ottimale)',
  'sud-est': 'Sud-Est',
  'sud-ovest': 'Sud-Ovest',
  'est': 'Est',
  'ovest': 'Ovest',
  'nord': 'Nord (sconsigliato)',
};

const obiettivoLabels: Record<string, string> = {
  'risparmio-bolletta': 'Risparmio in Bolletta',
  'indipendenza-energetica': 'Indipendenza Energetica',
  'valorizzazione-immobile': 'Valorizzazione Immobile',
};

// Calcola kWp stimati basandosi sui consumi o sulla superficie
const calcolaKwpStimati = (data: Record<string, any>, consumiDaElettrodomestici: number): number | null => {
  // Se ha il consumo energetico mensile in euro
  const consumo = getValue(data, 'consumoEnergetico', 'spesa_mensile');
  if (consumo) {
    const consumoMensile = Array.isArray(consumo) ? consumo[0] : consumo;
    if (consumoMensile > 0) {
      const consumoAnnuoKwh = consumoMensile * 12 * 3.5;
      return Math.round((consumoAnnuoKwh / 1100) * 10) / 10;
    }
  }
  
  // Usa i consumi calcolati dagli elettrodomestici
  if (consumiDaElettrodomestici > 0) {
    // Produzione media annua per kWp in Italia: ~1100 kWh
    return Math.round((consumiDaElettrodomestici / 1100) * 10) / 10;
  }
  
  // Stima basata sulla superficie del tetto
  const superficie = getValue(data, 'superficieEffettiva', 'mq_tetto_effettivi');
  if (superficie && Number(superficie) > 0) {
    // Circa 6-7 mq per kWp
    return Math.round((Number(superficie) / 6.5) * 10) / 10;
  }
  
  return null;
};

// Calcola consumi stimati dagli elettrodomestici
const calcolaConsumiElettrodomestici = (data: Record<string, any>): { totale: number; dettagli: string[] } => {
  const consumiBase: Record<string, number> = {
    'frigorifero': 350,
    'lavatrice': 200,
    'lavastoviglie': 250,
    'forno': 150,
    'microonde': 50,
    'router': 100,
    'asciugatrice': 400,
    'climatizzatori': 800,
    'boiler-elettrico': 1500,
    'boiler_elettrico': 1500,
    'piano-induzione': 500,
    'piano_induzione': 500,
    'pompa-calore': 2500,
    'pompa_calore': 2500,
  };

  let totale = 0;
  const dettagli: string[] = [];

  // Supporta sia camelCase che snake_case
  const consumiStandard = getValue(data, 'definizioneConsumiStandard', 'consumo_aggiuntivo_completo');
  
  if (consumiStandard && typeof consumiStandard === 'object') {
    Object.entries(consumiStandard).forEach(([key, val]: [string, any]) => {
      const isSelected = val === true || val?.selected === true;
      if (isSelected) {
        const consumo = consumiBase[key] || 0;
        totale += consumo;
        if (consumo > 0) {
          dettagli.push(key.replace(/[-_]/g, ' '));
        }
      }
    });
  }

  // Auto elettrica
  const autoElettrica = data.nuoveVociConsumo?.auto_elettrica || data.consumo_aggiuntivo_stimato?.auto_elettrica;
  if (autoElettrica?.active || autoElettrica?.selected) {
    const km = autoElettrica.inputValue || autoElettrica.km_annui || 15000;
    const consumoAuto = Math.round(Number(km) * 0.2);
    totale += consumoAuto;
    dettagli.push(`auto elettrica (${Number(km).toLocaleString()} km/anno)`);
  }

  return { totale, dettagli };
};

// Componente Modulo Fotovoltaico dettagliato
const FotovoltaicoSection = ({ data }: { data: Record<string, any> | null | undefined }) => {
  if (!data || Object.keys(data).length === 0) return null;

  const { totale: consumiTotali, dettagli: elettrodomestici } = calcolaConsumiElettrodomestici(data);
  const kwpStimati = calcolaKwpStimati(data, consumiTotali);
  
  // Supporta sia camelCase che snake_case
  const tipoIntervento = getValue(data, 'tipoInterventoFotovoltaico', 'tipo_intervento_fotovoltaico');
  const isAmpliamento = tipoIntervento === 'ampliamento';
  
  const superficieTetto = getValue(data, 'superficieEffettiva', 'mq_tetto_effettivi');
  const orientamento = getValue(data, 'orientamentoTetto', 'orientamento_falda');
  const batteria = getValue(data, 'batteriaAccumulo', 'batteria_accumulo_nuovo_impianto', 'batteria_accumulo_ampliamento');
  const obiettivo = getValue(data, 'obiettivoPrincipale', 'obiettivo_nuovo_impianto', 'obiettivoAmpliamento', 'obiettivo_ampliamento');
  const tipoFalda = getValue(data, 'tipoFalda', 'tipologia_falda');
  const zoneOmbra = getValue(data, 'zoneOmbra', 'zone_ombra');
  const potenzaEsistente = getValue(data, 'potenzaImpianto', 'potenza_impianto');
  const annoInstallazione = getValue(data, 'annoInstallazione', 'anno_installazione');
  const qualitaForniture = getValue(data, 'qualitaForniture', 'qualita_forniture');
  const percentualeCopertura = getValue(data, 'percentualeCopertura', 'percentuale_copertura', 'distribuzione_consumi');

  // Build description text like reference
  const descriptionParts: string[] = [];
  if (tipoIntervento === 'nuovo') descriptionParts.push('nuovo impianto');
  if (isAmpliamento) descriptionParts.push('ampliamento impianto esistente');
  if (kwpStimati) descriptionParts.push(`${kwpStimati} kWp stimati`);
  if (batteria === 'si' || batteria === true) descriptionParts.push('con batteria di accumulo');
  if (orientamento) descriptionParts.push(`orientamento ${orientamentoLabels[orientamento] || orientamento}`);
  if (obiettivo) descriptionParts.push(`obiettivo ${obiettivoLabels[obiettivo]?.toLowerCase() || obiettivo}`);

  // Badge items
  const badges: { label: string; highlighted?: boolean }[] = [];
  if (kwpStimati) badges.push({ label: `${kwpStimati} kWp`, highlighted: true });
  if (superficieTetto) badges.push({ label: `${superficieTetto} mq tetto` });
  if (orientamento) badges.push({ label: orientamentoLabels[orientamento] || orientamento, highlighted: true });
  if (batteria === 'si' || batteria === true) badges.push({ label: 'Batteria' });
  if (qualitaForniture) badges.push({ label: `Qualità ${qualitaForniture}` });
  if (consumiTotali > 0) badges.push({ label: `~${consumiTotali.toLocaleString()} kWh/anno` });

  return (
    <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border/30 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Modulo Fotovoltaico
        </h3>
        {isAmpliamento && (
          <span className="text-xs font-medium text-muted-foreground">Ampliamento</span>
        )}
      </div>
      
      {/* Description + Badges like reference */}
      <div className="px-5 py-5">
        <p className="text-sm text-foreground leading-relaxed mb-4">
          Stai realizzando un <strong>impianto fotovoltaico</strong>
          {isAmpliamento ? ', ampliamento dell\'esistente' : tipoIntervento === 'nuovo' ? ', nuovo' : ''}
          {kwpStimati && `, ${kwpStimati} kWp stimati`}
          {batteria === 'si' || batteria === true ? ', con batteria di accumulo' : ''}
          {obiettivo && `, per ${obiettivoLabels[obiettivo]?.toLowerCase() || obiettivo}`}.
        </p>
        
        {/* Badge pills */}
        <div className="flex flex-wrap gap-2">
          {badges.map((badge, i) => (
            <span 
              key={i} 
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium
                ${badge.highlighted 
                  ? 'bg-primary/10 text-primary border border-primary/20' 
                  : 'bg-muted text-foreground border border-border'
                }`}
            >
              {badge.label}
            </span>
          ))}
        </div>
      </div>

      {/* Elettrodomestici inclusi */}
      {elettrodomestici.length > 0 && (
        <div className="px-5 py-4 border-t border-border/30 bg-muted/20">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Elettrodomestici considerati
          </p>
          <div className="flex flex-wrap gap-1.5">
            {elettrodomestici.map((item, i) => (
              <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-muted text-foreground border border-border capitalize">
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Mapping etichette per campi generici sicurezza
const fieldLabels: Record<string, string> = {
  tipoSistemaSicurezza: 'Tipo Sistema',
  tipo_sistema_sicurezza: 'Tipo Sistema',
  numeroZone: 'Numero Zone',
  numero_zone: 'Numero Zone',
  videosorveglianza: 'Videosorveglianza',
  antintrusione: 'Antintrusione',
  sensori_perimetrali: 'Sensori Perimetrali',
  sirena_esterna: 'Sirena Esterna',
  nebbiogeno: 'Nebbiogeno',
};

// Componente generico per modulo sicurezza
const GenericModuleSection = ({ 
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
  if (!data || Object.keys(data).length === 0) return null;

  const excludedFields = ['id', 'created_at', 'updated_at', 'lead_id'];
  
  const entries = Object.entries(data).filter(([key, value]) => {
    if (excludedFields.includes(key)) return false;
    if (value === null || value === undefined || value === '') return false;
    if (typeof value === 'object' && Object.keys(value).length === 0) return false;
    return true;
  });

  if (entries.length === 0) return null;

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return 'N/D';
    if (typeof value === 'boolean') return value ? 'Sì' : 'No';
    if (Array.isArray(value)) return value.join(', ');
    if (typeof value === 'string') {
      if (value === 'si' || value === 'sì') return 'Sì';
      if (value === 'no') return 'No';
      return value.charAt(0).toUpperCase() + value.slice(1).replace(/[-_]/g, ' ');
    }
    return String(value);
  };

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className={`flex items-center gap-2 text-lg ${colorClass}`}>
          <Icon className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {entries.map(([key, value]) => {
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
              return null; // Skip nested objects in generic view
            }
            
            return (
              <div key={key} className="flex justify-between items-center p-2 bg-muted/30 rounded">
                <span className="text-sm text-muted-foreground">
                  {fieldLabels[key] || key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim()}
                </span>
                <span className="font-medium text-foreground text-sm">{formatValue(value)}</span>
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
      <ElettricoSection data={moduloElettrico} />
      
      <FotovoltaicoSection data={moduloFotovoltaico} />
      
      <GenericModuleSection
        title="Modulo Sicurezza"
        icon={Shield}
        data={moduloSicurezza}
        colorClass="text-destructive"
      />
    </div>
  );
};
