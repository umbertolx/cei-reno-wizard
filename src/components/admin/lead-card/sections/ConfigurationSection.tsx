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
      <div className="bg-white rounded-lg p-6 border">
        <div className="flex items-center mb-4">
          <Settings className="h-5 w-5 text-gray-500 mr-2" />
          <h4 className="font-semibold text-gray-900">Configurazione Non Disponibile</h4>
        </div>
        <p className="text-gray-600">Nessuna configurazione tecnica specificata per questo lead.</p>
      </div>
    );
  }

  console.log("ConfigurationSection - Full configuration data:", configurazione);

  return (
    <div className="bg-white rounded-lg p-6 border">
      <div className="flex items-center mb-6">
        <Zap className="h-5 w-5 text-blue-600 mr-2" />
        <h4 className="font-semibold text-gray-900">Configurazione Richiesta</h4>
      </div>

      {/* Tipo di sistema domotico */}
      {configurazione.tipoDomotica && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium text-gray-700 mb-2">Sistema Domotico</div>
          <div className="text-lg font-semibold text-gray-900">
            {configurazione.tipoDomotica === 'knx' ? (
              <>🔌 Sistema KNX (Filare)</>
            ) : (
              <>📡 Sistema Wireless BTicino</>
            )}
          </div>
        </div>
      )}

      {/* Tipo di ristrutturazione */}
      {configurazione.tipoRistrutturazione && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium text-gray-700 mb-2">Tipo di Intervento</div>
          <Badge variant="outline" className="text-sm">
            {configurazione.tipoRistrutturazione === 'completa' ? '🏗️ Ristrutturazione Completa' :
             configurazione.tipoRistrutturazione === 'nuova' ? '🏠 Nuova Costruzione' : 
             configurazione.tipoRistrutturazione === 'parziale' ? '🔧 Intervento Parziale' :
             configurazione.tipoRistrutturazione}
          </Badge>
        </div>
      )}

      {/* Tipo impianto elettrico */}
      {configurazione.tipoImpianto && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium text-gray-700 mb-2">Livello Impianto Elettrico</div>
          <Badge variant="outline" className="text-sm">
            {configurazione.tipoImpianto === 'livello1' ? '⚡ Livello 1 - Standard Minimo' :
             configurazione.tipoImpianto === 'livello2' ? '🔧 Livello 2 - Impianto Avanzato' : 
             configurazione.tipoImpianto === 'livello3' ? '🏠 Livello 3 - Domotico Smart Home' :
             configurazione.tipoImpianto}
          </Badge>
        </div>
      )}

      {/* Età impianto */}
      {configurazione.impiantoVecchio !== undefined && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium text-gray-700 mb-2">Età Impianto Elettrico</div>
          <div className="flex items-center">
            {configurazione.impiantoVecchio ? (
              <div className="flex items-center text-orange-600">
                <X className="h-4 w-4 mr-2" />
                <span>Impianto vecchio (da rifare)</span>
              </div>
            ) : (
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span>Impianto recente (a norma)</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Elettrificare tapparelle */}
      {configurazione.elettrificareTapparelle && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium text-gray-700 mb-2">Elettrificare Tapparelle</div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-blue-600">
              <CheckCircle className="h-4 w-4 mr-2" />
              <span>Sì, elettrificare le tapparelle</span>
            </div>
            {configurazione.numeroTapparelle && (
              <Badge variant="outline" className="text-xs">
                {configurazione.numeroTapparelle} tapparelle
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Ambienti selezionati */}
      {configurazione.ambientiSelezionati && configurazione.ambientiSelezionati.length > 0 && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium text-gray-700 mb-2">Ambienti da Domotizzare</div>
          <div className="flex flex-wrap gap-2">
            {configurazione.ambientiSelezionati.map((ambiente: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
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
        <div className="p-4 bg-gray-50 rounded-lg mb-6">
          <div className="text-sm font-medium text-gray-700 mb-3">Funzionalità Domotiche Richieste</div>
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
                    <div key={key} className="flex items-center justify-between py-2 px-3 border rounded">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm font-medium">
                          {getFeatureIcon(key)} {getFeatureName(key)}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {hasOptionProperty(value) && value.option && (
                          <Badge variant="outline" className="text-xs">
                            {getOptionDisplay(key, value.option)}
                          </Badge>
                        )}
                        {hasInputValueProperty(value) && value.inputValue && (
                          <Badge variant="outline" className="text-xs">
                            {value.inputValue} {key === 'tapparelle' ? 'unità' : key === 'tende' ? 'unità' : ''}
                          </Badge>
                        )}
                        {hasMultipleInputsProperty(value) && value.multipleInputs && (
                          <div className="flex gap-1">
                            {Object.entries(value.multipleInputs).map(([inputKey, inputValue]: [string, any]) => (
                              <Badge key={inputKey} variant="outline" className="text-xs">
                                {inputKey}: {inputValue}
                              </Badge>
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
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium text-gray-700 mb-3">Interventi Elettrici Richiesti</div>
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
                  <div key={key} className="flex items-center justify-between py-2 px-3 border rounded">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-sm font-medium">
                        {getInterventoIcon(key)} {getInterventoName(key)}
                      </span>
                    </div>
                    {hasInputValueProperty(value) && value.inputValue && (
                      <Badge variant="outline" className="text-xs">
                        {value.inputValue} {key === 'tapparelleElettriche' ? 'tapparelle' : key === 'puntiLuce' ? 'punti luce' : ''}
                      </Badge>
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
