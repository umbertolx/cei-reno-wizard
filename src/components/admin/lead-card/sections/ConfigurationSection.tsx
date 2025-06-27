
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

  // Helper functions for type checking with correct database structure
  const hasActiveProperty = (obj: any): obj is { active: boolean } => {
    return obj && typeof obj === 'object' && typeof obj.active === 'boolean';
  };

  const hasOptionProperty = (obj: any): obj is { option: any } => {
    return obj && typeof obj === 'object' && 'option' in obj;
  };

  const hasInputValueProperty = (obj: any): obj is { inputValue: any } => {
    return obj && typeof obj === 'object' && 'inputValue' in obj;
  };

  const hasMultipleInputsProperty = (obj: any): obj is { multipleInputs: any } => {
    return obj && typeof obj === 'object' && 'multipleInputs' in obj;
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

  console.log("ConfigurationSection - Full configuration data:", configurazione);

  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200 shadow-sm">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-purple-500 rounded-lg mr-3">
          <Zap className="h-6 w-6 text-white" />
        </div>
        <h4 className="font-bold text-xl text-purple-900">Configurazione Completa Richiesta</h4>
      </div>

      {/* Tipo di sistema domotico */}
      {configurazione.tipoDomotica && (
        <div className="mb-6 p-5 bg-white/80 backdrop-blur-sm rounded-xl border-l-4 border-purple-400">
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
        </div>
      )}

      {/* Tipo di ristrutturazione */}
      {configurazione.tipoRistrutturazione && (
        <div className="mb-6 p-4 bg-white/80 backdrop-blur-sm rounded-lg">
          <div className="text-xs font-bold text-purple-600 uppercase tracking-wide mb-3">Tipo di Intervento</div>
          <Badge className={`text-base px-4 py-2 ${
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

      {/* Tipo impianto elettrico */}
      {configurazione.tipoImpianto && (
        <div className="mb-6 p-4 bg-white/80 backdrop-blur-sm rounded-lg">
          <div className="text-xs font-bold text-purple-600 uppercase tracking-wide mb-3">Livello Impianto Elettrico</div>
          <Badge className={`text-base px-4 py-2 ${
            configurazione.tipoImpianto === 'livello3' ? 'bg-green-100 text-green-800' :
            configurazione.tipoImpianto === 'livello2' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {configurazione.tipoImpianto === 'livello1' ? '⚡ Livello 1 - Standard Minimo' :
             configurazione.tipoImpianto === 'livello2' ? '🔧 Livello 2 - Impianto Avanzato' : 
             configurazione.tipoImpianto === 'livello3' ? '🏠 Livello 3 - Domotico Smart Home' :
             configurazione.tipoImpianto}
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

      {/* Elettrificare tapparelle */}
      {configurazione.elettrificareTapparelle && (
        <div className="mb-6 p-4 bg-white/80 backdrop-blur-sm rounded-lg">
          <div className="text-xs font-bold text-purple-600 uppercase tracking-wide mb-3">Elettrificare Tapparelle</div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-blue-600 bg-blue-50 px-4 py-2 rounded-lg">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="font-bold">Sì, elettrificare le tapparelle</span>
            </div>
            {configurazione.numeroTapparelle && (
              <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {configurazione.numeroTapparelle} tapparelle
              </span>
            )}
          </div>
        </div>
      )}

      {/* Ambienti selezionati */}
      {configurazione.ambientiSelezionati && configurazione.ambientiSelezionati.length > 0 && (
        <div className="mb-6 p-4 bg-white/80 backdrop-blur-sm rounded-lg">
          <div className="text-xs font-bold text-purple-600 uppercase tracking-wide mb-3">Ambienti da Domotizzare</div>
          <div className="flex flex-wrap gap-2">
            {configurazione.ambientiSelezionati.map((ambiente: string, index: number) => (
              <Badge key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1">
                {ambiente === 'soggiorno' ? '🛋️ Soggiorno' :
                 ambiente === 'cucina' ? '🍳 Cucina' :
                 ambiente === 'camera_matrimoniale' ? '🛏️ Camera Matrimoniale' :
                 ambiente === 'camera_singola' ? '🛏️ Camera Singola' :
                 ambiente === 'bagno' ? '🚿 Bagno' :
                 ambiente === 'studio' ? '📚 Studio' :
                 ambiente === 'corridoio' ? '🚪 Corridoio' :
                 ambiente === 'balcone' ? '🌿 Balcone/Terrazzo' :
                 ambiente}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Funzionalità KNX/BTicino richieste */}
      {(configurazione.knxConfig || configurazione.bTicinoConfig) && (
        <div className="bg-white/80 backdrop-blur-sm p-5 rounded-lg border border-purple-100">
          <div className="text-xs font-bold text-purple-600 uppercase tracking-wide mb-4">Funzionalità Domotiche Richieste</div>
          <div className="space-y-3">
            {(() => {
              const config = configurazione.tipoDomotica === 'knx' ? configurazione.knxConfig : configurazione.bTicinoConfig;
              if (!config) return null;

              console.log("Rendering config features:", config);

              return Object.entries(config).map(([key, value]) => {
                console.log(`Processing feature ${key}:`, value);
                
                if (hasActiveProperty(value) && value.active) {
                  const getFeatureIcon = (key: string) => {
                    switch (key) {
                      case 'luci': return '💡';
                      case 'tapparelle': return '🪟';
                      case 'tende': return '🏠';
                      case 'clima': return '🌡️';
                      case 'audio': return '🎵';
                      case 'videocitofono': return '📹';
                      case 'sicurezza': return '🔒';
                      case 'supervisor': return '📱';
                      case 'prese': return '🔌';
                      default: return '⚙️';
                    }
                  };

                  const getFeatureName = (key: string) => {
                    switch (key) {
                      case 'luci': return 'Controllo Luci';
                      case 'tapparelle': return 'Tapparelle Motorizzate';
                      case 'tende': return 'Tende Motorizzate';
                      case 'clima': return 'Controllo Clima';
                      case 'audio': return 'Sistema Audio';
                      case 'videocitofono': return 'Videocitofono Smart';
                      case 'sicurezza': return 'Sistema Sicurezza';
                      case 'supervisor': return 'Controllo Centralizzato';
                      case 'prese': return 'Prese Intelligenti';
                      default: return key;
                    }
                  };

                  const getOptionDisplay = (key: string, option: any) => {
                    switch (key) {
                      case 'audio':
                        return option === 'solo_controllo' ? 'Solo Controllo' : 
                               option === 'audio_diffuso' ? 'Audio Diffuso' : option;
                      case 'luci':
                        return option === 'base' ? 'Controllo Base' :
                               option === 'avanzato' ? 'Controllo Avanzato' :
                               option === 'smart' ? 'Controllo Smart' : option;
                      case 'clima':
                        return option === 'termostato' ? 'Solo Termostato' :
                               option === 'completo' ? 'Controllo Completo' : option;
                      default:
                        return option;
                    }
                  };

                  return (
                    <div key={key} className="flex items-center justify-between py-3 px-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span className="font-bold text-gray-900">
                          {getFeatureIcon(key)} {getFeatureName(key)}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {hasOptionProperty(value) && value.option && (
                          <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                            {getOptionDisplay(key, value.option)}
                          </span>
                        )}
                        {hasInputValueProperty(value) && value.inputValue && (
                          <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                            {value.inputValue} {key === 'tapparelle' ? 'unità' : key === 'tende' ? 'unità' : ''}
                          </span>
                        )}
                        {hasMultipleInputsProperty(value) && value.multipleInputs && (
                          <div className="flex gap-1">
                            {Object.entries(value.multipleInputs).map(([inputKey, inputValue]: [string, any]) => (
                              <span key={inputKey} className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                {inputKey}: {inputValue}
                              </span>
                            ))}
                          </div>
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
              if (hasActiveProperty(value) && value.active) {
                const getInterventoIcon = (key: string) => {
                  switch (key) {
                    case 'tapparelleElettriche': return '⚡';
                    case 'puntiLuce': return '💡';
                    case 'modificareTracce': return '🔧';
                    case 'sostituirePreseInterruttori': return '🔌';
                    case 'comandiSmart': return '📱';
                    default: return '⚙️';
                  }
                };

                const getInterventoName = (key: string) => {
                  switch (key) {
                    case 'tapparelleElettriche': return 'Elettrificare Tapparelle';
                    case 'puntiLuce': return 'Nuovi Punti Luce';
                    case 'modificareTracce': return 'Modificare Tracce';
                    case 'sostituirePreseInterruttori': return 'Sostituire Prese/Interruttori';
                    case 'comandiSmart': return 'Comandi Smart';
                    default: return key;
                  }
                };

                return (
                  <div key={key} className="flex items-center justify-between py-3 px-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-blue-500 mr-3" />
                      <span className="font-bold text-gray-900">
                        {getInterventoIcon(key)} {getInterventoName(key)}
                      </span>
                    </div>
                    {hasInputValueProperty(value) && value.inputValue && (
                      <div className="text-sm text-gray-600">
                        <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                          {value.inputValue} {key === 'tapparelleElettriche' ? 'tapparelle' : key === 'puntiLuce' ? 'punti luce' : ''}
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
