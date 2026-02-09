import { Lead } from "@/types/lead";
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

// Componente Modulo Fotovoltaico dettagliato
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
  const tipoFalda = getValue(data, 'tipoFalda', 'tipologia_falda');
  const zoneOmbra = getValue(data, 'zoneOmbra', 'zone_ombra');
  const potenzaEsistente = getValue(data, 'potenzaImpianto', 'potenza_impianto');
  const annoInstallazione = getValue(data, 'annoInstallazione', 'anno_installazione');
  const qualitaForniture = getValue(data, 'qualitaForniture', 'qualita_forniture');
  const percentualeCopertura = getValue(data, 'percentualeCopertura', 'percentuale_copertura', 'distribuzione_consumi');

  return (
    <div className="bg-white rounded-xl md:rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
      <h3 className="flex items-center gap-2 text-base md:text-lg font-bold text-yellow-600 mb-3 md:mb-4">
        <Sun className="h-5 w-5" />
        <span className="truncate">Modulo Fotovoltaico</span>
        {isAmpliamento && (
          <span className="bg-gray-100 text-gray-800 rounded-full px-2.5 md:px-3 py-0.5 md:py-1 text-xs font-medium ml-auto flex-shrink-0">Ampliamento</span>
        )}
        {tipoIntervento === 'nuovo' && (
          <span className="bg-gray-100 text-gray-800 rounded-full px-2.5 md:px-3 py-0.5 md:py-1 text-xs font-medium ml-auto flex-shrink-0">Nuovo</span>
        )}
      </h3>
      <div className="space-y-3 md:space-y-4">
        {/* Dati tecnici principali */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          {kwpStimati && (
            <div className="text-center p-2.5 md:p-3 bg-yellow-50 rounded-xl border border-yellow-200">
              <Gauge className="h-4 w-4 md:h-5 md:w-5 text-yellow-600 mx-auto mb-1" />
              <p className="text-xl md:text-2xl font-bold text-yellow-700">{kwpStimati}</p>
              <p className="text-[10px] md:text-xs text-gray-500">kWp Stimati</p>
            </div>
          )}
          
          {superficieTetto && (
            <div className="text-center p-2.5 md:p-3 bg-gray-50 rounded-xl">
              <Ruler className="h-4 w-4 md:h-5 md:w-5 text-gray-400 mx-auto mb-1" />
              <p className="text-xl md:text-2xl font-bold text-gray-900">{superficieTetto}</p>
              <p className="text-[10px] md:text-xs text-gray-500">mq Tetto</p>
            </div>
          )}
          
          {orientamento && (
            <div className="text-center p-2.5 md:p-3 bg-gray-50 rounded-xl">
              <Compass className="h-4 w-4 md:h-5 md:w-5 text-gray-400 mx-auto mb-1" />
              <p className="text-sm md:text-lg font-bold text-gray-900 capitalize leading-tight">
                {orientamentoLabels[orientamento] || orientamento.replace(/-/g, ' ')}
              </p>
              <p className="text-[10px] md:text-xs text-gray-500">Orientamento</p>
            </div>
          )}
          
          {batteria && (
            <div className="text-center p-2.5 md:p-3 bg-gray-50 rounded-xl">
              <Battery className="h-4 w-4 md:h-5 md:w-5 text-gray-400 mx-auto mb-1" />
              <p className="text-sm md:text-lg font-bold text-gray-900">
                {batteria === 'si' || batteria === true ? 'Sì' : 'No'}
              </p>
              <p className="text-[10px] md:text-xs text-gray-500">Batteria</p>
            </div>
          )}
        </div>

        {/* Obiettivo */}
        {obiettivo && (
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
            <Target className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <span className="text-xs md:text-sm text-gray-500">Obiettivo:</span>
            <span className="font-medium text-gray-900 text-xs md:text-sm truncate">
              {obiettivoLabels[obiettivo] || obiettivo.replace(/-/g, ' ')}
            </span>
          </div>
        )}

        {/* Consumi stimati */}
        {consumiTotali > 0 && (
          <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-xs md:text-sm font-medium text-blue-700 mb-2">
              Consumo Annuo Stimato: ~{consumiTotali.toLocaleString()} kWh
            </p>
            <div className="flex flex-wrap gap-1 md:gap-1.5">
              {elettrodomestici.map((item, i) => (
                <span key={i} className="bg-blue-100 text-blue-800 rounded-full px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs font-medium capitalize">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Percentuale copertura */}
        {percentualeCopertura && (
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <span className="text-xs md:text-sm text-gray-500">Copertura Desiderata</span>
            <span className="font-semibold text-gray-900 text-sm">{percentualeCopertura}%</span>
          </div>
        )}

        {/* Qualità forniture */}
        {qualitaForniture && (
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <span className="text-xs md:text-sm text-gray-500">Qualità Forniture</span>
            <span className={`rounded-full px-2.5 md:px-3 py-0.5 md:py-1 text-xs font-semibold capitalize ${
              qualitaForniture === 'premium' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {qualitaForniture}
            </span>
          </div>
        )}

        {/* Altri dettagli */}
        <div className="grid grid-cols-2 gap-2">
          {tipoFalda && (
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded-xl">
              <span className="text-[10px] md:text-xs text-gray-500">Tipo Falda</span>
              <span className="text-xs md:text-sm font-medium text-gray-900 capitalize">{tipoFalda}</span>
            </div>
          )}
          {zoneOmbra && (
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded-xl">
              <span className="text-[10px] md:text-xs text-gray-500">Zone Ombra</span>
              <span className="text-xs md:text-sm font-medium text-gray-900 capitalize">{zoneOmbra}</span>
            </div>
          )}
          {potenzaEsistente && (
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded-xl">
              <span className="text-[10px] md:text-xs text-gray-500">Imp. Esistente</span>
              <span className="text-xs md:text-sm font-medium text-gray-900">{potenzaEsistente} kWp</span>
            </div>
          )}
          {annoInstallazione && (
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded-xl">
              <span className="text-[10px] md:text-xs text-gray-500">Anno Install.</span>
              <span className="text-xs md:text-sm font-medium text-gray-900">{annoInstallazione}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Labels per livello impianto
const livelloImpiantoLabels: Record<string, string> = {
  'livello_1': 'Livello 1 - Base',
  'livello_2': 'Livello 2 - Standard',
  'livello_3': 'Livello 3 - Domotico',
  'livello1': 'Livello 1 - Base',
  'livello2': 'Livello 2 - Standard',
  'livello3': 'Livello 3 - Domotico',
  'Livello 1': 'Livello 1 - Base',
  'Livello 2': 'Livello 2 - Standard',
  'Livello 3': 'Livello 3 - Domotico',
};

// Labels per tipo intervento elettrico
const tipoInterventoLabels: Record<string, string> = {
  'rifacimento_completo': 'Rifacimento Completo',
  'Rifacimento completo': 'Rifacimento Completo',
  'completa': 'Rifacimento Completo',
  'parziale': 'Intervento Parziale',
  'Intervento parziale': 'Intervento Parziale',
  'nuovo': 'Nuovo Impianto',
};

// Labels per tipo domotica
const tipoDomoticaLabels: Record<string, string> = {
  'cablata': 'Domotica Cablata',
  'wireless': 'Domotica Wireless',
  'knx': 'Sistema KNX',
  'smart_home': 'Smart Home',
};

// Labels per funzioni domotiche
const funzioniDomoticheLabels: Record<string, string> = {
  'luci': 'Controllo Luci',
  'tapparelle': 'Tapparelle Motorizzate',
  'clima': 'Controllo Clima',
  'hvac': 'HVAC',
  'audio': 'Sistema Audio',
  'sicurezza': 'Sicurezza Integrata',
  'videocitofono': 'Videocitofono',
  'prese_smart': 'Prese Smart',
  'tende': 'Tende Motorizzate',
  'supervisor': 'Supervisore Centrale',
  'luci_dali': 'Luci DALI',
};

// Componente Modulo Elettrico dettagliato
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
  const numTende = getValue(data, 'numero_tende_domotica') || 
                   (funzioniDomotiche.tende?.quantita) || 
                   (funzioniDomotiche.tende === true ? 1 : 0);

  const funzioniAttive: string[] = [];
  if (funzioniDomotiche && typeof funzioniDomotiche === 'object') {
    Object.entries(funzioniDomotiche).forEach(([key, val]: [string, any]) => {
      const isActive = val === true || val?.attivo === true || (typeof val === 'object' && val !== null);
      if (isActive && funzioniDomoticheLabels[key]) {
        let label = funzioniDomoticheLabels[key];
        if (key === 'tapparelle' && numTapparelle > 0) {
          label += ` (${numTapparelle})`;
        }
        if (key === 'tende' && numTende > 0) {
          label += ` (${numTende})`;
        }
        funzioniAttive.push(label);
      }
    });
  }

  const finalTipoDomotica = tipoDomoticaFromNested || tipoDomotica;

  return (
    <div className="bg-white rounded-xl md:rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
      <h3 className="flex items-center gap-2 text-base md:text-lg font-bold text-[#d8010c] mb-3 md:mb-4">
        <Zap className="h-5 w-5" />
        Modulo Elettrico
      </h3>
      <div className="space-y-3 md:space-y-4">
        {/* Dati principali */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {tipoIntervento && (
            <div className="bg-gray-50 rounded-xl p-3 md:p-4">
              <p className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wide">Tipo Intervento</p>
              <p className="text-sm md:text-base font-semibold text-gray-900 mt-1">
                {tipoInterventoLabels[tipoIntervento] || tipoIntervento.replace(/[-_]/g, ' ')}
              </p>
            </div>
          )}
          
          {livelloImpianto && (
            <div className="bg-gray-50 rounded-xl p-3 md:p-4">
              <p className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wide">Livello Impianto</p>
              <p className="text-sm md:text-base font-semibold text-gray-900 mt-1">
                {livelloImpiantoLabels[livelloImpianto] || livelloImpianto}
              </p>
            </div>
          )}
          
          {finalTipoDomotica && (
            <div className="bg-gray-50 rounded-xl p-3 md:p-4">
              <p className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wide">Tipo Domotica</p>
              <p className="text-sm md:text-base font-semibold text-gray-900 mt-1">
                {tipoDomoticaLabels[finalTipoDomotica] || finalTipoDomotica}
              </p>
            </div>
          )}
        </div>

        {/* Funzioni Domotiche */}
        {funzioniAttive.length > 0 && (
          <div>
            <p className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wide mt-3 md:mt-4 mb-2">Funzioni Domotiche Richieste</p>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {funzioniAttive.map((fn, i) => (
                <span key={i} className="bg-gray-100 text-gray-800 rounded-full px-2.5 md:px-3 py-1 md:py-1.5 text-xs font-medium">
                  {fn}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Statistiche aggiuntive */}
        {(numTapparelle > 0 || numTende > 0) && !funzioniAttive.some(f => f.includes('Tapparelle') || f.includes('Tende')) && (
          <div className="grid grid-cols-2 gap-2">
            {numTapparelle > 0 && (
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-xl">
                <span className="text-[10px] md:text-xs text-gray-500">Tapparelle</span>
                <span className="text-xs md:text-sm font-medium text-gray-900">{numTapparelle}</span>
              </div>
            )}
            {numTende > 0 && (
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-xl">
                <span className="text-[10px] md:text-xs text-gray-500">Tende</span>
                <span className="text-xs md:text-sm font-medium text-gray-900">{numTende}</span>
              </div>
            )}
          </div>
        )}
      </div>
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
    <div className="bg-white rounded-xl md:rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
      <h3 className={`flex items-center gap-2 text-base md:text-lg font-bold mb-3 md:mb-4 ${colorClass}`}>
        <Icon className="h-5 w-5" />
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {entries.map(([key, value]) => {
          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            return null;
          }
          
          return (
            <div key={key} className="flex justify-between items-center p-2.5 md:p-3 bg-gray-50 rounded-xl">
              <span className="text-xs md:text-sm text-gray-500 truncate mr-2">
                {fieldLabels[key] || key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim()}
              </span>
              <span className="font-medium text-gray-900 text-xs md:text-sm flex-shrink-0">{formatValue(value)}</span>
            </div>
          );
        })}
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
      <div className="bg-white rounded-xl md:rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
        <div className="flex items-center gap-3 text-gray-500">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm">Nessuna configurazione tecnica disponibile per questo lead.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 md:space-y-4">
      <ElettricoSection data={moduloElettrico} />
      
      <FotovoltaicoSection data={moduloFotovoltaico} />
      
      <GenericModuleSection
        title="Modulo Sicurezza"
        icon={Shield}
        data={moduloSicurezza}
        colorClass="text-red-600"
      />
    </div>
  );
};
