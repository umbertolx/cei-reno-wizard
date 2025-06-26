
import { Lead } from "@/data/mockLeads";
import { Zap, CheckCircle, X, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ConfigurationSectionProps {
  lead: Lead;
}

export const ConfigurationSection = ({ lead }: ConfigurationSectionProps) => {
  const parseConfigurazioneTecnica = () => {
    try {
      return typeof lead.configurazioneTecnica === 'string' 
        ? JSON.parse(lead.configurazioneTecnica) 
        : lead.configurazioneTecnica || {};
    } catch {
      return {};
    }
  };

  const configurazione = parseConfigurazioneTecnica();

  // Helper functions for type checking
  const hasEnabledProperty = (obj: any): obj is { enabled: boolean } => {
    return obj && typeof obj === 'object' && typeof obj.enabled === 'boolean';
  };

  const hasValueProperty = (obj: any): obj is { value: any } => {
    return obj && typeof obj === 'object' && 'value' in obj;
  };

  const hasAdvancedOptionProperty = (obj: any): obj is { advancedOption: string } => {
    return obj && typeof obj === 'object' && typeof obj.advancedOption === 'string';
  };

  if (!configurazione || Object.keys(configurazione).length === 0) {
    return (
      <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-200">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-gray-400 rounded-lg mr-3">
            <Settings className="h-6 w-6 text-white" />
          </div>
          <h4 className="font-bold text-xl text-gray-700">Configurazione Non Disponibile</h4>
        </div>
        <p className="text-gray-600">Nessuna configurazione tecnica specificata per questo lead.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200 shadow-sm">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-purple-500 rounded-lg mr-3">
          <Zap className="h-6 w-6 text-white" />
        </div>
        <h4 className="font-bold text-xl text-purple-900">Configurazione Richiesta</h4>
      </div>

      {/* Tipo di sistema domotico */}
      {configurazione.tipoDomotica && (
        <div className="mb-6 p-5 bg-white/80 backdrop-blur-sm rounded-xl border-l-4 border-purple-400 hover:shadow-md transition-shadow">
          <div className="text-xs font-bold text-purple-600 uppercase tracking-wide mb-2">Sistema Domotico Scelto</div>
          <div className="text-2xl font-bold text-purple-800 mb-3 flex items-center">
            {configurazione.tipoDomotica === 'knx' ? (
              <>
                <span className="mr-3">🔌</span>
                Sistema KNX (Filare)
              </>
            ) : (
              <>
                <span className="mr-3">📡</span>
                Sistema Wireless BTicino
              </>
            )}
          </div>
          <div className="text-sm text-purple-700 bg-purple-50 p-3 rounded-lg">
            {configurazione.tipoDomotica === 'knx' ? 
              'Sistema professionale cablato per massima affidabilità e prestazioni' : 
              'Sistema wireless per installazione rapida senza opere murarie'}
          </div>
        </div>
      )}

      {/* Tipo di ristrutturazione */}
      {configurazione.tipoRistrutturazione && (
        <div className="mb-6 p-4 bg-white/80 backdrop-blur-sm rounded-lg">
          <div className="text-xs font-bold text-purple-600 uppercase tracking-wide mb-3">Tipo di Intervento</div>
          <Badge className={`text-base px-4 py-2 ${
            configurazione.tipoRistrutturazione === 'completa' ? 'bg-red-100 text-red-800 hover:bg-red-200' :
            configurazione.tipoRistrutturazione === 'nuova' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
            configurazione.tipoRistrutturazione === 'parziale' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' :
            'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}>
            {configurazione.tipoRistrutturazione === 'completa' ? '🏗️ Ristrutturazione Completa' :
             configurazione.tipoRistrutturazione === 'nuova' ? '🏠 Nuova Costruzione' : 
             configurazione.tipoRistrutturazione === 'parziale' ? '🔧 Intervento Parziale' :
             configurazione.tipoRistrutturazione}
          </Badge>
        </div>
      )}

      {/* Età impianto */}
      {configurazione.impiantoVecchio !== undefined && (
        <div className="mb-6 p-4 bg-white/80 backdrop-blur-sm rounded-lg">
          <div className="text-xs font-bold text-purple-600 uppercase tracking-wide mb-3">Età Impianto Elettrico</div>
          <div className="flex items-center p-3 rounded-lg border-2">
            {configurazione.impiantoVecchio ? (
              <div className="flex items-center text-orange-600 bg-orange-50 px-4 py-2 rounded-lg">
                <X className="h-5 w-5 mr-2" />
                <span className="font-bold">Impianto vecchio (da rifare)</span>
              </div>
            ) : (
              <div className="flex items-center text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="font-bold">Impianto recente (a norma)</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Funzionalità richieste */}
      {(configurazione.knxConfig || configurazione.bTicinoConfig) && (
        <div className="bg-white/80 backdrop-blur-sm p-5 rounded-lg border border-purple-100">
          <div className="text-xs font-bold text-purple-600 uppercase tracking-wide mb-4">Funzionalità Richieste</div>
          <div className="space-y-3">
            {(() => {
              const config = configurazione.tipoDomotica === 'knx' ? configurazione.knxConfig : configurazione.bTicinoConfig;
              if (!config) return null;

              return Object.entries(config).map(([key, value]) => {
                if (hasEnabledProperty(value) && value.enabled) {
                  return (
                    <div key={key} className="flex items-center justify-between py-3 px-4 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span className="font-bold text-gray-900">
                          {key === 'luci' ? '💡 Controllo Luci' :
                           key === 'tapparelle' ? '🪟 Tapparelle Motorizzate' :
                           key === 'tende' ? '🏠 Tende Motorizzate' :
                           key === 'clima' ? '🌡️ Controllo Clima' :
                           key === 'audio' ? '🎵 Sistema Audio' :
                           key === 'videocitofono' ? '📹 Videocitofono Smart' :
                           key === 'sicurezza' ? '🔒 Sistema Sicurezza' :
                           key === 'supervisor' ? '📱 Controllo Centralizzato' :
                           key === 'prese' ? '🔌 Prese Intelligenti' :
                           key}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {hasAdvancedOptionProperty(value) && value.advancedOption && (
                          <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                            {value.advancedOption}
                          </span>
                        )}
                        {hasValueProperty(value) && value.value && (
                          <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                            {value.value}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                }
                return null;
              });
            })()}
          </div>
        </div>
      )}

      {/* Interventi elettrici */}
      {configurazione.interventiElettrici && Object.keys(configurazione.interventiElettrici).length > 0 && (
        <div className="mt-6 bg-white/80 backdrop-blur-sm p-5 rounded-lg border border-purple-100">
          <div className="text-xs font-bold text-purple-600 uppercase tracking-wide mb-4">Interventi Elettrici Richiesti</div>
          <div className="space-y-3">
            {Object.entries(configurazione.interventiElettrici).map(([key, value]) => {
              if (hasEnabledProperty(value) && value.enabled) {
                return (
                  <div key={key} className="flex items-center justify-between py-3 px-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-blue-500 mr-3" />
                      <span className="font-bold text-gray-900">
                        {key === 'tapparelleElettriche' ? '⚡ Elettrificare Tapparelle' :
                         key === 'puntiLuce' ? '💡 Nuovi Punti Luce' :
                         key === 'modificareTracce' ? '🔧 Modificare Tracce' :
                         key === 'sostituirePreseInterruttori' ? '🔌 Sostituire Prese/Interruttori' :
                         key === 'comandiSmart' ? '📱 Comandi Smart' :
                         key}
                      </span>
                    </div>
                    {hasValueProperty(value) && value.value && (
                      <div className="text-sm text-gray-600">
                        <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                          {value.value} {key === 'tapparelleElettriche' ? 'tapparelle' : key === 'puntiLuce' ? 'punti luce' : ''}
                        </span>
                      </div>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};
