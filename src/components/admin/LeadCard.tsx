
import { Lead, leadStates, moduliDisponibili } from "@/data/mockLeads";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Home, Calendar, Euro, ChevronDown, Settings, Zap, Shield, Eye, Wrench, Calculator, Clock, Wifi, Building, CheckCircle } from "lucide-react";
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

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`hover:shadow-lg transition-all duration-300 ${
        isDragging ? 'shadow-2xl ring-2 ring-blue-500 bg-white rotate-3' : 'hover:shadow-md'
      }`}
    >
      <CardContent className="p-4">
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

        {/* Info di base sempre visibili */}
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
              Stima
            </span>
            <span className="font-medium text-green-600 text-xs">
              €{lead.stimaMin.toLocaleString()} - €{lead.stimaMax.toLocaleString()}
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

        {/* Contatti e Moduli - sempre visibili quando non espanso */}
        {!isExpanded && (
          <>
            <div className="space-y-1 mb-3">
              <p className="text-xs text-gray-600 flex items-center truncate">
                <Mail className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="truncate">{lead.email}</span>
              </p>
              <p className="text-xs text-gray-600 flex items-center">
                <Phone className="h-3 w-3 mr-1" />
                {lead.telefono}
              </p>
            </div>

            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {lead.moduliCompletati.slice(0, 2).map((modulo) => (
                  <Badge 
                    key={modulo} 
                    variant="secondary" 
                    className={`text-xs ${moduliDisponibili[modulo as keyof typeof moduliDisponibili]?.color}`}
                  >
                    {moduliDisponibili[modulo as keyof typeof moduliDisponibili]?.label}
                  </Badge>
                ))}
                {lead.moduliCompletati.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{lead.moduliCompletati.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          </>
        )}

        {/* Sezione espansa con tutti i dettagli */}
        {isExpanded && (
          <div className="space-y-6 border-t pt-4 animate-fade-in">
            {/* Contatti */}
            <div className="space-y-3">
              <h4 className="font-semibold text-base text-[#d8010c] border-b border-gray-200 pb-2">
                📞 Informazioni di Contatto
              </h4>
              <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-3 text-blue-600" />
                  <span className="font-medium text-blue-800">{lead.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-3 text-green-600" />
                  <span className="font-medium text-green-800">{lead.telefono}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-3 text-gray-600" />
                  <span className="text-gray-700">{lead.indirizzo}, {lead.citta} {lead.cap}</span>
                </div>
              </div>
            </div>

            {/* Tipo di Intervento */}
            {configurazione.tipoRistrutturazione && (
              <div className="space-y-3">
                <h4 className="font-semibold text-base text-[#d8010c] border-b border-gray-200 pb-2">
                  🏗️ Tipo di Intervento
                </h4>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Wrench className="h-5 w-5 mr-2 text-yellow-600" />
                    <Badge className={`${
                      configurazione.tipoRistrutturazione === 'completa' ? 'bg-red-100 text-red-800' :
                      configurazione.tipoRistrutturazione === 'nuova' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    } text-sm px-3 py-1`}>
                      {configurazione.tipoRistrutturazione === 'completa' ? '🔧 Ristrutturazione Completa' :
                       configurazione.tipoRistrutturazione === 'nuova' ? '🏠 Nuova Costruzione' : '⚡ Intervento Parziale'}
                    </Badge>
                  </div>
                  
                  {configurazione.tipoImpianto && (
                    <div className="mt-3 p-3 bg-white rounded border">
                      <span className="text-sm font-medium text-gray-700">Livello Impianto Richiesto: </span>
                      <Badge variant="outline" className="ml-2">
                        {configurazione.tipoImpianto === 'livello1' ? '⭐ Livello 1 - Base' :
                         configurazione.tipoImpianto === 'livello2' ? '⭐⭐ Livello 2 - Intermedio' :
                         '⭐⭐⭐ Livello 3 - Avanzato'}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Sistema Domotico Scelto */}
            {configurazione.tipoDomotica && (
              <div className="space-y-3">
                <h4 className="font-semibold text-base text-[#d8010c] border-b border-gray-200 pb-2">
                  🏠 Sistema Domotico Selezionato
                </h4>
                <div className={`rounded-lg p-4 border-2 ${
                  configurazione.tipoDomotica === 'knx' ? 'bg-blue-50 border-blue-200' : 'bg-purple-50 border-purple-200'
                }`}>
                  <div className="flex items-center mb-4">
                    {configurazione.tipoDomotica === 'knx' ? (
                      <Shield className="h-6 w-6 mr-3 text-blue-600" />
                    ) : (
                      <Wifi className="h-6 w-6 mr-3 text-purple-600" />
                    )}
                    <div>
                      <h5 className="text-lg font-semibold text-gray-800">
                        {configurazione.tipoDomotica === 'knx' ? '🔌 Sistema KNX (Filare)' : '📡 Sistema Wireless (BTicino)'}
                      </h5>
                      <p className="text-sm text-gray-600">
                        {configurazione.tipoDomotica === 'knx' ? 
                          'Sistema professionale con cablaggio dedicato per massima affidabilità' : 
                          'Sistema wireless per installazione rapida senza opere murarie'}
                      </p>
                    </div>
                  </div>

                  {/* Funzionalità Selezionate */}
                  <div className="space-y-3">
                    <h6 className="font-medium text-gray-800 text-sm">✅ Funzionalità Configurate:</h6>
                    <div className="grid grid-cols-1 gap-3">
                      
                      {/* Controllo Luci */}
                      {((configurazione.knxConfig?.luci?.enabled) || (configurazione.bTicinoConfig?.luci?.enabled)) && (
                        <div className="bg-white rounded-lg p-3 border-l-4 border-yellow-400">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                              <span className="font-medium text-gray-800">💡 Controllo Luci</span>
                            </div>
                            {configurazione.knxConfig?.luci?.advancedOption === 'avanzato' && (
                              <Badge className="bg-blue-100 text-blue-800 text-xs">KNX + DALI</Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mt-1 ml-6">
                            {configurazione.knxConfig?.luci?.advancedOption === 'avanzato' ? 
                              'Controllo avanzato con precisione individuale per ogni punto luce' :
                              'Controllo standard di accensione, spegnimento e dimmerazione'}
                          </p>
                        </div>
                      )}
                      
                      {/* Tapparelle */}
                      {((configurazione.knxConfig?.tapparelle?.enabled) || (configurazione.bTicinoConfig?.tapparelle?.enabled)) && (
                        <div className="bg-white rounded-lg p-3 border-l-4 border-blue-400">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
                              <span className="font-medium text-gray-800">🪟 Controllo Tapparelle</span>
                            </div>
                            {(configurazione.numeroTapparelle || configurazione.knxConfig?.tapparelle?.value || configurazione.bTicinoConfig?.tapparelle?.value) && (
                              <Badge variant="outline" className="text-xs">
                                {configurazione.numeroTapparelle || configurazione.knxConfig?.tapparelle?.value || configurazione.bTicinoConfig?.tapparelle?.value} tapparelle
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mt-1 ml-6">
                            Gestione automatica con programmazione orari e scenari coordinati
                          </p>
                        </div>
                      )}

                      {/* Tende */}
                      {((configurazione.knxConfig?.tende?.enabled) || (configurazione.bTicinoConfig?.tende?.enabled)) && (
                        <div className="bg-white rounded-lg p-3 border-l-4 border-cyan-400">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-cyan-400 rounded-full mr-3"></div>
                              <span className="font-medium text-gray-800">🏠 Controllo Tende</span>
                            </div>
                            <div className="flex gap-1">
                              {(configurazione.knxConfig?.tende?.tendeInterne || configurazione.bTicinoConfig?.tende?.tendeInterne) && (
                                <Badge variant="outline" className="text-xs">
                                  {configurazione.knxConfig?.tende?.tendeInterne || configurazione.bTicinoConfig?.tende?.tendeInterne} interne
                                </Badge>
                              )}
                              {(configurazione.knxConfig?.tende?.tendeEsterne || configurazione.bTicinoConfig?.tende?.tendeEsterne) && (
                                <Badge variant="outline" className="text-xs">
                                  {configurazione.knxConfig?.tende?.tendeEsterne || configurazione.bTicinoConfig?.tende?.tendeEsterne} esterne
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 mt-1 ml-6">
                            Controllo automatico tende interne ed esterne motorizzate
                          </p>
                        </div>
                      )}
                      
                      {/* Clima */}
                      {((configurazione.knxConfig?.clima?.enabled) || (configurazione.bTicinoConfig?.clima?.enabled)) && (
                        <div className="bg-white rounded-lg p-3 border-l-4 border-green-400">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                              <span className="font-medium text-gray-800">🌡️ Controllo Clima</span>
                            </div>
                            {configurazione.knxConfig?.clima?.advancedOption === 'clima_vmc' && (
                              <Badge className="bg-green-100 text-green-800 text-xs">+ VMC</Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mt-1 ml-6">
                            {configurazione.knxConfig?.clima?.advancedOption === 'clima_vmc' ? 
                              'Gestione temperatura e qualità aria con VMC' :
                              'Controllo temperatura tramite sensori intelligenti'}
                          </p>
                        </div>
                      )}
                      
                      {/* Audio */}
                      {((configurazione.knxConfig?.audio?.enabled) || (configurazione.bTicinoConfig?.audio?.enabled)) && (
                        <div className="bg-white rounded-lg p-3 border-l-4 border-purple-400">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-purple-400 rounded-full mr-3"></div>
                              <span className="font-medium text-gray-800">🎵 Sistema Audio</span>
                            </div>
                            {configurazione.knxConfig?.audio?.advancedOption === 'impianto_completo' && (
                              <Badge className="bg-purple-100 text-purple-800 text-xs">Diffusione Completa</Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mt-1 ml-6">
                            {configurazione.knxConfig?.audio?.advancedOption === 'impianto_completo' ? 
                              'Sistema completo con impianto audio diffuso professionale' :
                              'Controllo del sistema audio esistente'}
                          </p>
                        </div>
                      )}
                      
                      {/* Videocitofono */}
                      {((configurazione.knxConfig?.videocitofono?.enabled) || (configurazione.bTicinoConfig?.videocitofono?.enabled)) && (
                        <div className="bg-white rounded-lg p-3 border-l-4 border-red-400">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-red-400 rounded-full mr-3"></div>
                            <span className="font-medium text-gray-800">📹 Videocitofono Smart</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1 ml-6">
                            Risposta da smartphone e integrazione con scenari domotici
                          </p>
                        </div>
                      )}
                      
                      {/* Sicurezza */}
                      {((configurazione.knxConfig?.sicurezza?.enabled) || (configurazione.bTicinoConfig?.sicurezza?.enabled)) && (
                        <div className="bg-white rounded-lg p-3 border-l-4 border-orange-400">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-orange-400 rounded-full mr-3"></div>
                            <span className="font-medium text-gray-800">🔒 Sistema Sicurezza</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1 ml-6">
                            Predisposizione per sensori e telecamere di sicurezza
                          </p>
                        </div>
                      )}
                      
                      {/* Supervisor/App */}
                      {((configurazione.knxConfig?.supervisor?.enabled) || (configurazione.bTicinoConfig?.supervisor?.enabled)) && (
                        <div className="bg-white rounded-lg p-3 border-l-4 border-indigo-400">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-indigo-400 rounded-full mr-3"></div>
                            <span className="font-medium text-gray-800">
                              📱 {configurazione.tipoDomotica === 'knx' ? 'Supervisor KNX' : 'App MyHome'}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1 ml-6">
                            Controllo centralizzato da app e pannello touch
                          </p>
                        </div>
                      )}
                      
                      {/* Prese */}
                      {((configurazione.knxConfig?.prese?.enabled) || (configurazione.bTicinoConfig?.prese?.enabled)) && (
                        <div className="bg-white rounded-lg p-3 border-l-4 border-cyan-400">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-cyan-400 rounded-full mr-3"></div>
                            <span className="font-medium text-gray-800">🔌 Prese Intelligenti</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1 ml-6">
                            Controllo remoto elettrodomestici e monitoraggio consumi
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Dettagli Immobile */}
            <div className="space-y-3">
              <h4 className="font-semibold text-base text-[#d8010c] border-b border-gray-200 pb-2">
                🏡 Dettagli Immobile
              </h4>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white p-3 rounded">
                    <span className="text-gray-600 block text-xs">Tipologia:</span>
                    <span className="font-medium capitalize text-gray-800">
                      {lead.tipologiaAbitazione === 'appartamento' ? '🏢 Appartamento' :
                       lead.tipologiaAbitazione === 'casa indipendente' ? '🏠 Casa Indipendente' : '🏘️ Villa'}
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <span className="text-gray-600 block text-xs">Superficie:</span>
                    <span className="font-medium text-gray-800">{lead.superficie} mq</span>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <span className="text-gray-600 block text-xs">Piano:</span>
                    <span className="font-medium text-gray-800">{lead.piano || 'Non specificato'}</span>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <span className="text-gray-600 block text-xs">Proprietà:</span>
                    <span className="font-medium capitalize text-gray-800">
                      {lead.tipoProprietà === 'prima casa' ? '🏠 Prima Casa' : 
                       lead.tipoProprietà === 'seconda casa' ? '🏖️ Seconda Casa' : '💼 Investimento'}
                    </span>
                  </div>
                </div>
                
                {/* Composizione Stanze */}
                <div className="border-t border-gray-200 pt-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">🛏️ Composizione Ambienti:</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(lead.composizione).map(([stanza, numero]) => (
                      numero > 0 && (
                        <Badge key={stanza} className="bg-blue-100 text-blue-800 text-xs px-3 py-1">
                          {stanza === 'cameraDoppia' ? `🛏️ Cam. Doppia: ${numero}` : 
                           stanza === 'cameraSingola' ? `🛏️ Cam. Singola: ${numero}` : 
                           stanza === 'bagno' ? `🚿 Bagni: ${numero}` :
                           stanza === 'soggiorno' ? `🛋️ Soggiorno: ${numero}` :
                           stanza === 'cucina' ? `🍳 Cucina: ${numero}` :
                           stanza === 'altro' ? `📦 Altro: ${numero}` :
                           `${stanza}: ${numero}`}
                        </Badge>
                      )
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Analisi Costi */}
            {stimaDettagli.breakdown && (
              <div className="space-y-3">
                <h4 className="font-semibold text-base text-[#d8010c] border-b border-gray-200 pb-2">
                  💰 Analisi Costi Dettagliata
                </h4>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="space-y-3">
                    {stimaDettagli.breakdown.basePrice && (
                      <div className="flex items-center justify-between p-2 bg-white rounded">
                        <span className="text-sm text-gray-700 flex items-center">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                          Prezzo Base Sistema:
                        </span>
                        <span className="font-semibold text-blue-600">€{stimaDettagli.breakdown.basePrice.toLocaleString()}</span>
                      </div>
                    )}
                    {stimaDettagli.breakdown.roomsCost !== undefined && stimaDettagli.breakdown.roomsCost > 0 && (
                      <div className="flex items-center justify-between p-2 bg-white rounded">
                        <span className="text-sm text-gray-700 flex items-center">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                          Costo Ambienti:
                        </span>
                        <span className="font-semibold text-green-600">€{stimaDettagli.breakdown.roomsCost.toLocaleString()}</span>
                      </div>
                    )}
                    {stimaDettagli.breakdown.surfaceCost && stimaDettagli.breakdown.surfaceCost > 0 && (
                      <div className="flex items-center justify-between p-2 bg-white rounded">
                        <span className="text-sm text-gray-700 flex items-center">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                          Costo Superficie:
                        </span>
                        <span className="font-semibold text-purple-600">€{stimaDettagli.breakdown.surfaceCost.toLocaleString()}</span>
                      </div>
                    )}
                    {stimaDettagli.breakdown.specialFeaturesCost && stimaDettagli.breakdown.specialFeaturesCost > 0 && (
                      <div className="flex items-center justify-between p-2 bg-white rounded">
                        <span className="text-sm text-gray-700 flex items-center">
                          <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                          Funzioni Aggiuntive:
                        </span>
                        <span className="font-semibold text-orange-600">€{stimaDettagli.breakdown.specialFeaturesCost.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="border-t border-green-300 pt-3 mt-3">
                      <div className="flex items-center justify-between p-3 bg-[#d8010c] text-white rounded-lg">
                        <span className="font-semibold">💎 Range Finale:</span>
                        <span className="text-lg font-bold">€{lead.stimaMin.toLocaleString()} - €{lead.stimaMax.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Timeline e Info Commerciali */}
            <div className="space-y-3">
              <h4 className="font-semibold text-base text-[#d8010c] border-b border-gray-200 pb-2">
                📈 Informazioni Commerciali
              </h4>
              <div className="bg-yellow-50 rounded-lg p-4 space-y-3 border border-yellow-200">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-white p-3 rounded">
                    <span className="text-gray-600 block text-xs">Data Richiesta:</span>
                    <span className="font-medium text-gray-800">{formatDate(lead.dataRichiesta)}</span>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <span className="text-gray-600 block text-xs">Ultimo Contatto:</span>
                    <span className="font-medium text-gray-800">
                      {lead.dataUltimoContatto ? formatDate(lead.dataUltimoContatto) : 'Mai contattato'}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded">
                  <span className="text-sm text-gray-700">Completamento Configurazione:</span>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-800 mr-2">{lead.moduliCompletati.length} / 12 moduli</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(lead.moduliCompletati.length / 12) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {lead.sopralluogoRichiesto && (
                  <div className="flex items-center justify-between p-3 bg-orange-100 rounded border border-orange-200">
                    <span className="text-sm font-medium text-orange-800">🔍 Sopralluogo Richiesto</span>
                    <Badge className="bg-orange-200 text-orange-800">ALTA PRIORITÀ</Badge>
                  </div>
                )}
                
                {/* Moduli Completati */}
                <div className="border-t border-yellow-300 pt-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">✅ Moduli Completati:</p>
                  <div className="flex flex-wrap gap-1">
                    {lead.moduliCompletati.map((modulo) => (
                      <Badge 
                        key={modulo} 
                        variant="secondary" 
                        className={`text-xs ${moduliDisponibili[modulo as keyof typeof moduliDisponibili]?.color}`}
                      >
                        {moduliDisponibili[modulo as keyof typeof moduliDisponibili]?.label}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Note se presenti */}
            {lead.note && (
              <div className="space-y-3">
                <h4 className="font-semibold text-base text-[#d8010c] border-b border-gray-200 pb-2">
                  📝 Note del Cliente
                </h4>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700 italic">"{lead.note}"</p>
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
