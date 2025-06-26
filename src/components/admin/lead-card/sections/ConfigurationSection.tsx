
import { Lead } from "@/data/mockLeads";
import { Zap, CheckCircle, X } from "lucide-react";
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
    return null;
  }

  return (
    <div className="bg-purple-50 rounded-lg p-4">
      <div className="flex items-center mb-4">
        <Zap className="h-5 w-5 text-purple-600 mr-2" />
        <h4 className="font-bold text-lg text-purple-800">Configurazione Richiesta</h4>
      </div>

      {/* Tipo di sistema domotico */}
      {configurazione.tipoDomotica && (
        <div className="mb-4 p-4 bg-white rounded-lg border-l-4 border-purple-400">
          <div className="text-xs font-medium text-gray-500 mb-1">SISTEMA DOMOTICO SCELTO</div>
          <div className="text-xl font-bold text-purple-800 mb-2">
            {configurazione.tipoDomotica === 'knx' ? '🔌 Sistema KNX (Filare)' : '📡 Sistema Wireless BTicino'}
          </div>
          <div className="text-sm text-gray-600">
            {configurazione.tipoDomotica === 'knx' ? 
              'Sistema professionale cablato per massima affidabilità e prestazioni' : 
              'Sistema wireless per installazione rapida senza opere murarie'}
          </div>
        </div>
      )}

      {/* Tipo di ristrutturazione */}
      {configurazione.tipoRistrutturazione && (
        <div className="mb-4 p-3 bg-white rounded-lg">
          <div className="text-xs font-medium text-gray-500 mb-1">TIPO DI INTERVENTO</div>
          <Badge className={`text-sm ${
            configurazione.tipoRistrutturazione === 'completa' ? 'bg-red-100 text-red-800' :
            configurazione.tipoRistrutturazione === 'nuova' ? 'bg-green-100 text-green-800' :
            configurazione.tipoRistrutturazione === 'parziale' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
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
        <div className="mb-4 p-3 bg-white rounded-lg">
          <div className="text-xs font-medium text-gray-500 mb-1">ETÀ IMPIANTO ELETTRICO</div>
          <div className="flex items-center">
            {configurazione.impiantoVecchio ? (
              <div className="flex items-center text-orange-600">
                <X className="h-4 w-4 mr-1" />
                <span className="font-medium">Impianto vecchio (da rifare)</span>
              </div>
            ) : (
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span className="font-medium">Impianto recente (a norma)</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Funzionalità richieste */}
      {(configurazione.knxConfig || configurazione.bTicinoConfig) && (
        <div className="bg-white p-4 rounded-lg">
          <div className="text-xs font-medium text-gray-500 mb-3">FUNZIONALITÀ RICHIESTE</div>
          <div className="space-y-3">
            {(() => {
              const config = configurazione.tipoDomotica === 'knx' ? configurazione.knxConfig : configurazione.bTicinoConfig;
              if (!config) return null;

              return Object.entries(config).map(([key, value]) => {
                if (hasEnabledProperty(value) && value.enabled) {
                  return (
                    <div key={key} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="font-medium text-gray-900">
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
                      <div className="text-sm text-gray-600">
                        {hasAdvancedOptionProperty(value) && value.advancedOption && (
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                            {value.advancedOption}
                          </span>
                        )}
                        {hasValueProperty(value) && value.value && (
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs ml-1">
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
        <div className="mt-4 bg-white p-4 rounded-lg">
          <div className="text-xs font-medium text-gray-500 mb-3">INTERVENTI ELETTRICI RICHIESTI</div>
          <div className="space-y-2">
            {Object.entries(configurazione.interventiElettrici).map(([key, value]) => {
              if (hasEnabledProperty(value) && value.enabled) {
                return (
                  <div key={key} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="font-medium text-gray-900">
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
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
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
