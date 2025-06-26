
import { Lead, leadStates, moduliDisponibili } from "@/data/mockLeads";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Home, Calendar, Euro, ChevronDown, Settings, Zap, Shield, Eye, Wrench, Calculator, Clock, Wifi, Building } from "lucide-react";
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
          <div className="space-y-4 border-t pt-4 animate-fade-in">
            {/* Contatti */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm flex items-center text-gray-800">
                <Phone className="h-4 w-4 mr-2" />
                Contatti
              </h4>
              <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                <p className="text-sm flex items-center text-blue-600">
                  <Mail className="h-3 w-3 mr-2" />
                  {lead.email}
                </p>
                <p className="text-sm flex items-center text-green-600">
                  <Phone className="h-3 w-3 mr-2" />
                  {lead.telefono}
                </p>
              </div>
            </div>

            {/* Configurazione Domotica */}
            {configurazione.tipoDomotica && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm flex items-center text-gray-800">
                  <Zap className="h-4 w-4 mr-2" />
                  {configurazione.tipoDomotica === 'knx' ? 'Sistema KNX (Filare)' : 'Sistema Wireless (BTicino)'}
                </h4>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center space-x-2 mb-3">
                    {configurazione.tipoDomotica === 'knx' ? (
                      <Shield className="h-5 w-5 text-blue-600" />
                    ) : (
                      <Wifi className="h-5 w-5 text-purple-600" />
                    )}
                    <Badge className={`${configurazione.tipoDomotica === 'knx' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'} font-medium`}>
                      {configurazione.tipoDomotica === 'knx' ? 'KNX Professional' : 'BTicino Wireless'}
                    </Badge>
                  </div>
                  
                  {/* Funzionalità Selezionate */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-700">Funzionalità Configurate:</p>
                    <div className="grid grid-cols-1 gap-2">
                      {/* Controllo Luci */}
                      {((configurazione.knxConfig?.luci?.enabled) || (configurazione.bTicinoConfig?.luci?.enabled)) && (
                        <div className="flex items-center text-xs bg-white/80 rounded p-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                          <span>Controllo Luci</span>
                          {configurazione.knxConfig?.luci?.advancedOption === 'avanzato' && (
                            <Badge variant="outline" className="ml-2 text-xs">KNX + DALI</Badge>
                          )}
                        </div>
                      )}
                      
                      {/* Tapparelle */}
                      {((configurazione.knxConfig?.tapparelle?.enabled) || (configurazione.bTicinoConfig?.tapparelle?.enabled)) && (
                        <div className="flex items-center text-xs bg-white/80 rounded p-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                          <span>Controllo Tapparelle ({configurazione.numeroTapparelle || 'N/A'})</span>
                        </div>
                      )}
                      
                      {/* Clima */}
                      {((configurazione.knxConfig?.clima?.enabled) || (configurazione.bTicinoConfig?.clima?.enabled)) && (
                        <div className="flex items-center text-xs bg-white/80 rounded p-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                          <span>Controllo Clima</span>
                          {configurazione.knxConfig?.clima?.advancedOption === 'clima_vmc' && (
                            <Badge variant="outline" className="ml-2 text-xs">+ VMC</Badge>
                          )}
                        </div>
                      )}
                      
                      {/* Audio */}
                      {((configurazione.knxConfig?.audio?.enabled) || (configurazione.bTicinoConfig?.audio?.enabled)) && (
                        <div className="flex items-center text-xs bg-white/80 rounded p-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                          <span>Sistema Audio</span>
                          {configurazione.knxConfig?.audio?.advancedOption === 'impianto_completo' && (
                            <Badge variant="outline" className="ml-2 text-xs">Diffusione</Badge>
                          )}
                        </div>
                      )}
                      
                      {/* Videocitofono */}
                      {((configurazione.knxConfig?.videocitofono?.enabled) || (configurazione.bTicinoConfig?.videocitofono?.enabled)) && (
                        <div className="flex items-center text-xs bg-white/80 rounded p-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                          <span>Videocitofono Smart</span>
                        </div>
                      )}
                      
                      {/* Sicurezza */}
                      {((configurazione.knxConfig?.sicurezza?.enabled) || (configurazione.bTicinoConfig?.sicurezza?.enabled)) && (
                        <div className="flex items-center text-xs bg-white/80 rounded p-2">
                          <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                          <span>Sistema Sicurezza</span>
                        </div>
                      )}
                      
                      {/* Supervisor/App */}
                      {((configurazione.knxConfig?.supervisor?.enabled) || (configurazione.bTicinoConfig?.supervisor?.enabled)) && (
                        <div className="flex items-center text-xs bg-white/80 rounded p-2">
                          <div className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></div>
                          <span>{configurazione.tipoDomotica === 'knx' ? 'Supervisor KNX' : 'App MyHome'}</span>
                        </div>
                      )}
                      
                      {/* Prese */}
                      {((configurazione.knxConfig?.prese?.enabled) || (configurazione.bTicinoConfig?.prese?.enabled)) && (
                        <div className="flex items-center text-xs bg-white/80 rounded p-2">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></div>
                          <span>Prese Intelligenti</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tipo Ristrutturazione */}
            {configurazione.tipoRistrutturazione && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm flex items-center text-gray-800">
                  <Wrench className="h-4 w-4 mr-2" />
                  Tipo di Intervento
                </h4>
                <div className="bg-gray-50 rounded-lg p-3">
                  <Badge className={`${
                    configurazione.tipoRistrutturazione === 'completa' ? 'bg-red-100 text-red-800' :
                    configurazione.tipoRistrutturazione === 'nuova' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {configurazione.tipoRistrutturazione === 'completa' ? 'Ristrutturazione Completa' :
                     configurazione.tipoRistrutturazione === 'nuova' ? 'Nuova Costruzione' : 'Intervento Parziale'}
                  </Badge>
                  {configurazione.tipoImpianto && (
                    <div className="mt-2">
                      <span className="text-xs text-gray-600">Livello Impianto: </span>
                      <Badge variant="outline" className="text-xs">
                        {configurazione.tipoImpianto === 'livello1' ? 'Livello 1 - Base' :
                         configurazione.tipoImpianto === 'livello2' ? 'Livello 2 - Intermedio' :
                         'Livello 3 - Avanzato'}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Dettagli Immobile */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm flex items-center text-gray-800">
                <Building className="h-4 w-4 mr-2" />
                Dettagli Immobile
              </h4>
              <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                  <div>
                    <span className="text-gray-600">Tipo:</span>
                    <span className="ml-2 font-medium capitalize">{lead.tipologiaAbitazione}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Superficie:</span>
                    <span className="ml-2 font-medium">{lead.superficie} mq</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Piano:</span>
                    <span className="ml-2 font-medium">{lead.piano || 'Non specificato'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Proprietà:</span>
                    <span className="ml-2 font-medium capitalize">{lead.tipoProprietà}</span>
                  </div>
                </div>
                
                {/* Composizione Stanze */}
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <p className="text-xs font-medium text-gray-700 mb-1">Composizione:</p>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(lead.composizione).map(([stanza, numero]) => (
                      numero > 0 && (
                        <Badge key={stanza} variant="outline" className="text-xs px-2 py-0.5">
                          {stanza === 'cameraDoppia' ? 'Cam. Doppia' : 
                           stanza === 'cameraSingola' ? 'Cam. Singola' : 
                           stanza === 'bagno' ? 'Bagni' :
                           stanza === 'soggiorno' ? 'Soggiorno' :
                           stanza === 'cucina' ? 'Cucina' :
                           stanza}: {numero}
                        </Badge>
                      )
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Analisi Costi */}
            {stimaDettagli.breakdown && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm flex items-center text-gray-800">
                  <Calculator className="h-4 w-4 mr-2" />
                  Analisi Costi
                </h4>
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <div className="space-y-2">
                    {stimaDettagli.breakdown.basePrice && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">Prezzo Base Sistema:</span>
                        <span className="font-medium text-blue-600">€{stimaDettagli.breakdown.basePrice.toLocaleString()}</span>
                      </div>
                    )}
                    {stimaDettagli.breakdown.roomsCost !== undefined && stimaDettagli.breakdown.roomsCost > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">Costo per Ambienti:</span>
                        <span className="font-medium text-green-600">€{stimaDettagli.breakdown.roomsCost.toLocaleString()}</span>
                      </div>
                    )}
                    {stimaDettagli.breakdown.surfaceCost && stimaDettagli.breakdown.surfaceCost > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">Costo Superficie:</span>
                        <span className="font-medium text-purple-600">€{stimaDettagli.breakdown.surfaceCost.toLocaleString()}</span>
                      </div>
                    )}
                    {stimaDettagli.breakdown.specialFeaturesCost && stimaDettagli.breakdown.specialFeaturesCost > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">Funzioni Aggiuntive:</span>
                        <span className="font-medium text-orange-600">€{stimaDettagli.breakdown.specialFeaturesCost.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="border-t border-green-300 pt-2 mt-3">
                      <div className="flex items-center justify-between text-sm font-semibold">
                        <span className="text-gray-800">Range Finale:</span>
                        <span className="text-[#d8010c]">€{lead.stimaMin.toLocaleString()} - €{lead.stimaMax.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Timeline e Info Commerciali */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm flex items-center text-gray-800">
                <Clock className="h-4 w-4 mr-2" />
                Info Commerciali
              </h4>
              <div className="bg-yellow-50 rounded-lg p-3 space-y-2 text-xs border border-yellow-200">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Data Richiesta:</span>
                  <span className="font-medium">{formatDate(lead.dataRichiesta)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Ultimo Contatto:</span>
                  <span className="font-medium">
                    {lead.dataUltimoContatto ? formatDate(lead.dataUltimoContatto) : 'Mai'}
                  </span>
                </div>
                {lead.sopralluogoRichiesto && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Sopralluogo:</span>
                    <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800">
                      Richiesto
                    </Badge>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Moduli Completati:</span>
                  <span className="font-medium">{lead.moduliCompletati.length} / 12</span>
                </div>
                
                {/* Moduli Completati */}
                <div className="border-t border-yellow-300 pt-2 mt-2">
                  <p className="text-xs font-medium text-gray-700 mb-1">Moduli Completati:</p>
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
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-gray-800">Note Cliente</h4>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r">
                  <p className="text-xs text-gray-700">{lead.note}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewDetails}
            className="flex-1"
            type="button"
          >
            <Eye className="h-4 w-4 mr-1" />
            Dettagli
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
