
import { Lead, leadStates, moduliDisponibili } from "@/data/mockLeads";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Home, Calendar, Euro, ChevronDown, Eye, User, Building2, Zap, Settings2, Calculator, Clock, CheckCircle, X } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState, useEffect } from "react";

interface LeadCardProps {
  lead: Lead;
  onViewDetails: () => void;
  forceExpanded?: boolean;
}

export const LeadCard = ({ lead, onViewDetails, forceExpanded = false }: LeadCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    if (forceExpanded !== undefined) {
      setIsExpanded(forceExpanded);
    }
  }, [forceExpanded]);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: lead.id,
    data: {
      type: 'lead',
      lead
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getInitials = (nome: string, cognome: string) => {
    return `${nome.charAt(0)}${cognome.charAt(0)}`.toUpperCase();
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onViewDetails();
  };

  const toggleExpansion = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (forceExpanded === undefined) {
      setIsExpanded(!isExpanded);
    }
  };

  const parseConfigurazioneTecnica = () => {
    try {
      return typeof lead.configurazioneTecnica === 'string' 
        ? JSON.parse(lead.configurazioneTecnica) 
        : lead.configurazioneTecnica || {};
    } catch {
      return {};
    }
  };

  const parseStimaDettagli = () => {
    try {
      return typeof lead.stimaDettagli === 'string' 
        ? JSON.parse(lead.stimaDettagli) 
        : lead.stimaDettagli || {};
    } catch {
      return {};
    }
  };

  const configurazione = parseConfigurazioneTecnica();
  const stimaDettagli = parseStimaDettagli();

  // Helper function to check if an object has the expected structure
  const hasEnabledProperty = (obj: any): obj is { enabled: boolean } => {
    return obj && typeof obj === 'object' && typeof obj.enabled === 'boolean';
  };

  const hasValueProperty = (obj: any): obj is { value: any } => {
    return obj && typeof obj === 'object' && 'value' in obj;
  };

  const hasAdvancedOptionProperty = (obj: any): obj is { advancedOption: string } => {
    return obj && typeof obj === 'object' && typeof obj.advancedOption === 'string';
  };

  // Calculate average price from min and max
  const stimaMedia = lead.stimaMin && lead.stimaMax ? Math.round((lead.stimaMin + lead.stimaMax) / 2) : 0;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`hover:shadow-lg transition-all duration-300 ${
        isDragging ? 'shadow-2xl ring-2 ring-blue-500 bg-white rotate-3' : 'hover:shadow-md'
      }`}
    >
      <CardContent className="p-4">
        {/* Header della card - sempre visibile */}
        <div 
          {...attributes}
          {...listeners}
          className="flex items-center space-x-3 mb-3 cursor-grab"
        >
          <div className="w-10 h-10 bg-[#d8010c] rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
            {getInitials(lead.nome, lead.cognome)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">
              {lead.nome} {lead.cognome}
            </h3>
            <p className="text-sm text-gray-600 flex items-center truncate">
              <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
              {lead.citta}, {lead.cap}
            </p>
          </div>
          {forceExpanded === undefined && (
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleExpansion}
              className="p-1 h-8 w-8"
            >
              <ChevronDown 
                className={`h-4 w-4 transition-transform duration-200 ${
                  isExpanded ? 'rotate-180' : ''
                }`} 
              />
            </Button>
          )}
        </div>

        {/* Informazioni base - sempre visibili */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center text-gray-600">
              <Home className="h-3 w-3 mr-1" />
              {lead.tipologiaAbitazione === 'appartamento' ? 'Appartamento' : 
               lead.tipologiaAbitazione === 'casa indipendente' ? 'Casa indipendente' : 'Villa'}
            </span>
            <span className="font-medium">{lead.superficie} mq</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center text-gray-600">
              <Euro className="h-3 w-3 mr-1" />
              Preventivo
            </span>
            <span className="font-medium text-green-600 text-xs">
              €{lead.stimaMin?.toLocaleString()} - €{lead.stimaMax?.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center text-gray-600">
              <Calendar className="h-3 w-3 mr-1" />
              Richiesta
            </span>
            <span className="text-gray-600 text-xs">
              {formatDate(lead.dataRichiesta)}
            </span>
          </div>
        </div>

        {/* Sezione espansa - completamente ridisegnata */}
        {isExpanded && (
          <div className="space-y-6 border-t pt-4">
            
            {/* 1. DATI PERSONALI DEL CLIENTE */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center mb-4">
                <User className="h-5 w-5 text-blue-600 mr-2" />
                <h4 className="font-bold text-lg text-blue-800">Dati Personali</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-1">NOME COMPLETO</div>
                    <div className="text-lg font-semibold text-gray-900">{lead.nome} {lead.cognome}</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-1">EMAIL</div>
                    <div className="text-blue-600 underline">{lead.email}</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-1">TELEFONO</div>
                    <div className="font-semibold text-gray-900">{lead.telefono}</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-1">INDIRIZZO COMPLETO</div>
                    <div className="text-gray-900">{lead.indirizzo}</div>
                    <div className="text-gray-600">{lead.citta} ({lead.cap})</div>
                    <div className="text-gray-500">{lead.regione}</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-1">DATA RICHIESTA</div>
                    <div className="text-gray-900">{formatDate(lead.dataRichiesta)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. DATI IMMOBILE */}
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center mb-4">
                <Building2 className="h-5 w-5 text-green-600 mr-2" />
                <h4 className="font-bold text-lg text-green-800">Dati Immobile</h4>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-white p-3 rounded-lg text-center">
                  <div className="text-xs font-medium text-gray-500 mb-1">TIPOLOGIA</div>
                  <div className="font-semibold text-gray-900 capitalize">{lead.tipologiaAbitazione.replace('_', ' ')}</div>
                </div>
                <div className="bg-white p-3 rounded-lg text-center">
                  <div className="text-xs font-medium text-gray-500 mb-1">SUPERFICIE</div>
                  <div className="font-semibold text-gray-900">{lead.superficie} mq</div>
                </div>
                <div className="bg-white p-3 rounded-lg text-center">
                  <div className="text-xs font-medium text-gray-500 mb-1">PIANO</div>
                  <div className="font-semibold text-gray-900">{lead.piano || 'N/D'}</div>
                </div>
                <div className="bg-white p-3 rounded-lg text-center">
                  <div className="text-xs font-medium text-gray-500 mb-1">PROPRIETÀ</div>
                  <div className="font-semibold text-gray-900 capitalize">{lead.tipoProprietà}</div>
                </div>
              </div>
              
              {/* Composizione dettagliata */}
              <div className="bg-white p-3 rounded-lg">
                <div className="text-xs font-medium text-gray-500 mb-2">COMPOSIZIONE AMBIENTI</div>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {Object.entries(lead.composizione).map(([stanza, numero]) => (
                    numero > 0 && (
                      <div key={stanza} className="text-center">
                        <div className="text-lg font-bold text-gray-900">{numero}</div>
                        <div className="text-xs text-gray-600">
                          {stanza === 'cameraDoppia' ? 'Cam. Doppie' : 
                           stanza === 'cameraSingola' ? 'Cam. Singole' : 
                           stanza === 'bagno' ? 'Bagni' :
                           stanza === 'soggiorno' ? 'Soggiorni' :
                           stanza === 'cucina' ? 'Cucine' :
                           stanza === 'altro' ? 'Altri' : stanza}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>

            {/* 3. RICHIESTE E CONFIGURAZIONE DOMOTICA */}
            {configurazione && Object.keys(configurazione).length > 0 && (
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
            )}

            {/* 4. ANALISI ECONOMICA */}
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex items-center mb-4">
                <Calculator className="h-5 w-5 text-yellow-600 mr-2" />
                <h4 className="font-bold text-lg text-yellow-800">Analisi Economica</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border-l-4 border-green-400">
                  <div className="text-xs font-medium text-gray-500 mb-1">PREVENTIVO MINIMO</div>
                  <div className="text-2xl font-bold text-green-600">€{lead.stimaMin?.toLocaleString()}</div>
                </div>
                <div className="bg-white p-4 rounded-lg border-l-4 border-blue-400">
                  <div className="text-xs font-medium text-gray-500 mb-1">PREVENTIVO MASSIMO</div>
                  <div className="text-2xl font-bold text-blue-600">€{lead.stimaMax?.toLocaleString()}</div>
                </div>
                <div className="bg-white p-4 rounded-lg border-l-4 border-gray-400">
                  <div className="text-xs font-medium text-gray-500 mb-1">VALORE MEDIO</div>
                  <div className="text-2xl font-bold text-gray-700">€{stimaMedia?.toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* 5. INFO COMMERCIALI */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-4">
                <Clock className="h-5 w-5 text-gray-600 mr-2" />
                <h4 className="font-bold text-lg text-gray-800">Info Commerciali</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-xs font-medium text-gray-500 mb-1">ULTIMO CONTATTO</div>
                  <div className="font-medium text-gray-900">
                    {lead.dataUltimoContatto ? formatDate(lead.dataUltimoContatto) : 'Mai contattato'}
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-xs font-medium text-gray-500 mb-1">MODULI COMPLETATI</div>
                  <div className="flex items-center">
                    <span className="font-bold text-gray-900 mr-2">{lead.moduliCompletati?.length || 0}/12</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${((lead.moduliCompletati?.length || 0) / 12) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {lead.sopralluogoRichiesto && (
                <div className="mt-4 bg-orange-100 border border-orange-300 p-3 rounded-lg">
                  <div className="flex items-center text-orange-800">
                    <div className="text-xl mr-2">🔍</div>
                    <span className="font-bold">SOPRALLUOGO RICHIESTO</span>
                  </div>
                </div>
              )}
            </div>

            {/* 6. NOTE DEL CLIENTE */}
            {lead.note && (
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                <div className="flex items-center mb-2">
                  <div className="text-xl mr-2">💬</div>
                  <h4 className="font-bold text-amber-800">Note del Cliente</h4>
                </div>
                <div className="bg-white p-3 rounded italic text-gray-700">
                  "{lead.note}"
                </div>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewDetails}
            className="flex-1"
            type="button"
          >
            <Eye className="h-4 w-4 mr-1" />
            Dettagli Completi
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
