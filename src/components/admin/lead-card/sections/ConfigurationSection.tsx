import { Lead } from "@/types/lead";
import { AlertCircle } from "lucide-react";

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

// Labels per livello impianto
const livelloImpiantoLabels: Record<string, string> = {
  'livello_1': 'Livello 1',
  'livello_2': 'Livello 2',
  'livello_3': 'Livello 3',
  'livello1': 'Livello 1',
  'livello2': 'Livello 2',
  'livello3': 'Livello 3',
};

// Labels per tipo intervento elettrico
const tipoInterventoLabels: Record<string, string> = {
  'rifacimento_completo': 'rifacimento completo',
  'completa': 'rifacimento completo',
  'parziale': 'intervento parziale',
  'nuovo': 'nuovo impianto',
};

// Labels per tipo domotica
const tipoDomoticaLabels: Record<string, string> = {
  'cablata': 'domotica cablata',
  'wireless': 'domotica wireless',
  'knx': 'sistema KNX',
  'smart_home': 'smart home',
};

// Calcola kWp stimati basandosi sui consumi o sulla superficie
const calcolaKwpStimati = (data: Record<string, any>, consumiDaElettrodomestici: number): number | null => {
  const consumo = getValue(data, 'consumoEnergetico', 'spesa_mensile');
  if (consumo) {
    const consumoMensile = Array.isArray(consumo) ? consumo[0] : consumo;
    if (consumoMensile > 0) {
      const consumoAnnuoKwh = consumoMensile * 12 * 3.5;
      return Math.round((consumoAnnuoKwh / 1100) * 10) / 10;
    }
  }
  
  if (consumiDaElettrodomestici > 0) {
    return Math.round((consumiDaElettrodomestici / 1100) * 10) / 10;
  }
  
  const superficie = getValue(data, 'superficieEffettiva', 'mq_tetto_effettivi');
  if (superficie && Number(superficie) > 0) {
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

  const autoElettrica = data.nuoveVociConsumo?.auto_elettrica || data.consumo_aggiuntivo_stimato?.auto_elettrica;
  if (autoElettrica?.active || autoElettrica?.selected) {
    const km = autoElettrica.inputValue || autoElettrica.km_annui || 15000;
    const consumoAuto = Math.round(Number(km) * 0.2);
    totale += consumoAuto;
    dettagli.push(`auto elettrica (${Number(km).toLocaleString()} km/anno)`);
  }

  return { totale, dettagli };
};

// Componente Modulo Elettrico
const ElettricoSection = ({ data }: { data: Record<string, any> | null | undefined }) => {
  if (!data || Object.keys(data).length === 0) return null;

  const tipoIntervento = getValue(data, 'tipo_intervento', 'tipoRistrutturazione', 'tipo_ristrutturazione');
  const livelloImpianto = getValue(data, 'livello_impianto', 'tipoImpianto', 'tipo_nuovo_impianto_elettrico');
  const tipoDomotica = getValue(data, 'tipo_domotica', 'tipoDomotica');
  
  const domoticaData = data.domotica || {};
  const funzioniDomotiche = domoticaData.funzioni || data.funzioni_domotiche || {};
  const tipoDomoticaFromNested = domoticaData.tipo;
  
  const numTapparelle = getValue(data, 'numero_tapparelle_domotica') || 
                        (funzioniDomotiche.tapparelle?.quantita) || 
                        (funzioniDomotiche.tapparelle === true ? 1 : 0);
  const numPuntiLuce = getValue(data, 'punti_luce') || getValue(data, 'numero_punti_luce') || 0;
  const numPrese = getValue(data, 'prese') || getValue(data, 'numero_prese') || 0;

  const funzioniAttive: string[] = [];
  if (funzioniDomotiche && typeof funzioniDomotiche === 'object') {
    Object.entries(funzioniDomotiche).forEach(([key, val]: [string, any]) => {
      const isActive = val === true || val?.attivo === true || (typeof val === 'object' && val !== null);
      if (isActive) {
        const labels: Record<string, string> = {
          'luci': 'Controllo luci',
          'tapparelle': 'Tapparelle',
          'clima': 'Controllo clima',
          'sicurezza': 'Sicurezza',
          'videocitofono': 'Videocitofono',
        };
        if (labels[key]) funzioniAttive.push(labels[key]);
      }
    });
  }

  const finalTipoDomotica = tipoDomoticaFromNested || tipoDomotica;

  // Build badges
  const badges: { label: string; highlighted?: boolean }[] = [];
  if (livelloImpianto) badges.push({ label: livelloImpiantoLabels[livelloImpianto] || livelloImpianto, highlighted: true });
  if (finalTipoDomotica) badges.push({ label: tipoDomoticaLabels[finalTipoDomotica] || finalTipoDomotica, highlighted: true });
  if (numPuntiLuce > 0) badges.push({ label: `${numPuntiLuce} Punti luce` });
  if (numPrese > 0) badges.push({ label: `${numPrese} Prese` });
  if (numTapparelle > 0) badges.push({ label: `${numTapparelle} Tapparelle` });
  funzioniAttive.forEach(fn => badges.push({ label: fn }));

  return (
    <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-border/30">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Dettaglio Impianto Elettrico
        </h3>
      </div>
      
      <div className="px-5 py-5">
        <p className="text-sm text-foreground leading-relaxed mb-4">
          Stai realizzando un <strong>impianto elettrico</strong>, {tipoInterventoLabels[tipoIntervento] || tipoIntervento?.replace(/[-_]/g, ' ') || 'intervento'}
          {livelloImpianto && `, ${livelloImpiantoLabels[livelloImpianto] || livelloImpianto}`}
          {finalTipoDomotica && `, con ${tipoDomoticaLabels[finalTipoDomotica] || finalTipoDomotica}`}
          {numPuntiLuce > 0 && `, ${numPuntiLuce} punti luce`}
          {numPrese > 0 && `, ${numPrese} prese`}
          {numTapparelle > 0 && `, ${numTapparelle} tapparelle elettriche`}
          {funzioniAttive.length > 0 && `, ${funzioniAttive.slice(0, 2).join(', ').toLowerCase()}`}.
        </p>
        
        {badges.length > 0 && (
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
        )}
      </div>
    </div>
  );
};

// Componente Modulo Fotovoltaico
const FotovoltaicoSection = ({ data }: { data: Record<string, any> | null | undefined }) => {
  if (!data || Object.keys(data).length === 0) return null;

  const { totale: consumiTotali, dettagli: elettrodomestici } = calcolaConsumiElettrodomestici(data);
  const kwpStimati = calcolaKwpStimati(data, consumiTotali);
  
  const tipoIntervento = getValue(data, 'tipoInterventoFotovoltaico', 'tipo_intervento_fotovoltaico');
  const isAmpliamento = tipoIntervento === 'ampliamento';
  
  const superficieTetto = getValue(data, 'superficieEffettiva', 'mq_tetto_effettivi');
  const orientamento = getValue(data, 'orientamentoTetto', 'orientamento_falda');
  const batteria = getValue(data, 'batteriaAccumulo', 'batteria_accumulo_nuovo_impianto', 'batteria_accumulo_ampliamento');
  const obiettivo = getValue(data, 'obiettivoPrincipale', 'obiettivo_nuovo_impianto', 'obiettivoAmpliamento', 'obiettivo_ampliamento');
  const qualitaForniture = getValue(data, 'qualitaForniture', 'qualita_forniture');

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
      <div className="px-5 py-4 border-b border-border/30 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Dettaglio Impianto Fotovoltaico
        </h3>
        {isAmpliamento && (
          <span className="text-xs font-medium text-muted-foreground">Ampliamento</span>
        )}
      </div>
      
      <div className="px-5 py-5">
        <p className="text-sm text-foreground leading-relaxed mb-4">
          Stai realizzando un <strong>impianto fotovoltaico</strong>
          {isAmpliamento ? ', ampliamento dell\'esistente' : tipoIntervento === 'nuovo' ? ', nuovo' : ''}
          {kwpStimati && `, ${kwpStimati} kWp stimati`}
          {batteria === 'si' || batteria === true ? ', con batteria di accumulo' : ''}
          {obiettivo && `, per ${obiettivoLabels[obiettivo]?.toLowerCase() || obiettivo}`}.
        </p>
        
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

// Componente Modulo Sicurezza
const SicurezzaSection = ({ data }: { data: Record<string, any> | null | undefined }) => {
  if (!data || Object.keys(data).length === 0) return null;

  const tipoSistema = getValue(data, 'tipoSistemaSicurezza', 'tipo_sistema_sicurezza');
  const videosorveglianza = getValue(data, 'videosorveglianza');
  const antintrusione = getValue(data, 'antintrusione');
  const numeroZone = getValue(data, 'numeroZone', 'numero_zone');
  
  const badges: { label: string; highlighted?: boolean }[] = [];
  if (tipoSistema) badges.push({ label: tipoSistema, highlighted: true });
  if (videosorveglianza === true || videosorveglianza === 'si') badges.push({ label: 'Videosorveglianza' });
  if (antintrusione === true || antintrusione === 'si') badges.push({ label: 'Antintrusione' });
  if (numeroZone) badges.push({ label: `${numeroZone} Zone` });

  if (badges.length === 0) return null;

  return (
    <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-border/30">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Dettaglio Impianto Sicurezza
        </h3>
      </div>
      
      <div className="px-5 py-5">
        <p className="text-sm text-foreground leading-relaxed mb-4">
          Stai realizzando un <strong>impianto di sicurezza</strong>
          {tipoSistema && `, ${tipoSistema}`}
          {videosorveglianza && ', con videosorveglianza'}
          {antintrusione && ', con sistema antintrusione'}
          {numeroZone && `, ${numeroZone} zone`}.
        </p>
        
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
    </div>
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
      <div className="bg-card rounded-xl border border-border/50 shadow-sm p-6">
        <div className="flex items-center gap-3 text-muted-foreground">
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm">Nessuna configurazione tecnica disponibile per questo lead.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ElettricoSection data={moduloElettrico} />
      <FotovoltaicoSection data={moduloFotovoltaico} />
      <SicurezzaSection data={moduloSicurezza} />
    </div>
  );
};
