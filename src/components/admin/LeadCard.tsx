
import { Lead, leadStates, moduliDisponibili } from "@/data/mockLeads";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Home, Calendar, Euro, ChevronDown, Eye, User, Building2, Zap, Settings2, Calculator, Clock } from "lucide-react";
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

  // Calculate average price from min and max
  const stimaMedia = lead.stimaMin && lead.stimaMax ? Math.round((lead.stimaMin + lead.stimaMax) / 2) : 0;

  // Funzione per ottenere le funzionalità selezionate
  const getSelectedFeatures = () => {
    const features = [];
    const config = configurazione.tipoDomotica === 'knx' ? configurazione.knxConfig : configurazione.bTicinoConfig;
    
    if (!config) return features;

    if (config.luci?.enabled) {
      features.push({
        name: 'Controllo Luci',
        icon: '💡',
        details: config.luci.advancedOption === 'avanzato' ? 'Sistema avanzato con DALI' : 'Controllo standard'
      });
    }

    if (config.tapparelle?.enabled) {
      features.push({
        name: 'Tapparelle Motorizzate',
        icon: '🪟',
        details: `${config.tapparelle.value || configurazione.numeroTapparelle || 0} tapparelle`
      });
    }

    if (config.tende?.enabled) {
      const interne = config.tende.tendeInterne || 0;
      const esterne = config.tende.tendeEsterne || 0;
      features.push({
        name: 'Tende Motorizzate',
        icon: '🏠',
        details: `${interne} interne, ${esterne} esterne`
      });
    }

    if (config.clima?.enabled) {
      features.push({
        name: 'Controllo Clima',
        icon: '🌡️',
        details: config.clima.advancedOption === 'clima_vmc' ? 'Con VMC integrata' : 'Controllo temperatura'
      });
    }

    if (config.audio?.enabled) {
      features.push({
        name: 'Sistema Audio',
        icon: '🎵',
        details: config.audio.advancedOption === 'impianto_completo' ? 'Diffusione completa' : 'Controllo audio'
      });
    }

    if (config.videocitofono?.enabled) {
      features.push({
        name: 'Videocitofono Smart',
        icon: '📹',
        details: 'Risposta da smartphone'
      });
    }

    if (config.sicurezza?.enabled) {
      features.push({
        name: 'Sistema Sicurezza',
        icon: '🔒',
        details: 'Sensori e telecamere'
      });
    }

    if (config.supervisor?.enabled) {
      features.push({
        name: configurazione.tipoDomotica === 'knx' ? 'Supervisor KNX' : 'App MyHome',
        icon: '📱',
        details: 'Controllo centralizzato'
      });
    }

    if (config.prese?.enabled) {
      features.push({
        name: 'Prese Intelligenti',
        icon: '🔌',
        details: 'Controllo remoto elettrodomestici'
      });
    }

    return features;
  };

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

        {/* Sezione espansa - tutti i dettagli */}
        {isExpanded && (
          <div className="space-y-6 border-t pt-4">
            
            {/* 1. ANAGRAFICA E CONTATTI */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <User className="h-5 w-5 text-blue-600 mr-2" />
                <h4 className="font-semibold text-lg text-blue-800">Anagrafica e Contatti</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <span className="font-medium text-gray-700 w-20">Nome:</span>
                    <span className="text-gray-900">{lead.nome} {lead.cognome}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-blue-600 underline">{lead.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-gray-900 font-medium">{lead.telefono}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start text-sm">
                    <MapPin className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                    <div>
                      <div className="text-gray-900">{lead.indirizzo}</div>
                      <div className="text-gray-600">{lead.citta} {lead.cap}</div>
                      <div className="text-gray-500">{lead.regione}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. DETTAGLI IMMOBILE */}
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Building2 className="h-5 w-5 text-green-600 mr-2" />
                <h4 className="font-semibold text-lg text-green-800">Dettagli Immobile</h4>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl mb-1">🏠</div>
                  <div className="text-xs text-gray-600">Tipologia</div>
                  <div className="font-medium text-sm capitalize">{lead.tipologiaAbitazione}</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl mb-1">📐</div>
                  <div className="text-xs text-gray-600">Superficie</div>
                  <div className="font-medium text-sm">{lead.superficie} mq</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl mb-1">🏢</div>
                  <div className="text-xs text-gray-600">Piano</div>
                  <div className="font-medium text-sm">{lead.piano || 'N/D'}</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl mb-1">🏷️</div>
                  <div className="text-xs text-gray-600">Proprietà</div>
                  <div className="font-medium text-sm capitalize">{lead.tipoProprietà}</div>
                </div>
              </div>
              
              {/* Composizione ambienti */}
              <div className="mt-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Composizione Ambienti:</div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(lead.composizione).map(([stanza, numero]) => (
                    numero > 0 && (
                      <Badge key={stanza} variant="secondary" className="text-xs">
                        {stanza === 'cameraDoppia' ? `Camere Doppie: ${numero}` : 
                         stanza === 'cameraSingola' ? `Camere Singole: ${numero}` : 
                         stanza === 'bagno' ? `Bagni: ${numero}` :
                         stanza === 'soggiorno' ? `Soggiorni: ${numero}` :
                         stanza === 'cucina' ? `Cucine: ${numero}` :
                         stanza === 'altro' ? `Altri: ${numero}` :
                         `${stanza}: ${numero}`}
                      </Badge>
                    )
                  ))}
                </div>
              </div>
            </div>

            {/* 3. CONFIGURAZIONE DOMOTICA */}
            {configurazione.tipoDomotica && (
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Zap className="h-5 w-5 text-purple-600 mr-2" />
                  <h4 className="font-semibold text-lg text-purple-800">Sistema Domotico</h4>
                </div>
                
                {/* Tipo di sistema */}
                <div className="mb-4 p-3 bg-white rounded-lg border-l-4 border-purple-400">
                  <div className="flex items-center mb-2">
                    <div className="text-2xl mr-3">
                      {configurazione.tipoDomotica === 'knx' ? '🔌' : '📡'}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        {configurazione.tipoDomotica === 'knx' ? 'Sistema KNX (Filare)' : 'Sistema Wireless BTicino'}
                      </div>
                      <div className="text-sm text-gray-600">
                        {configurazione.tipoDomotica === 'knx' ? 
                          'Sistema professionale cablato per massima affidabilità' : 
                          'Sistema wireless per installazione rapida'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Funzionalità selezionate */}
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-3">Funzionalità Richieste:</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {getSelectedFeatures().map((feature, index) => (
                      <div key={index} className="bg-white p-3 rounded-lg border border-purple-200">
                        <div className="flex items-center mb-1">
                          <span className="text-lg mr-2">{feature.icon}</span>
                          <span className="font-medium text-gray-800">{feature.name}</span>
                        </div>
                        <div className="text-xs text-gray-600 ml-7">{feature.details}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tipo di intervento */}
                {configurazione.tipoRistrutturazione && (
                  <div className="mt-4 p-3 bg-white rounded-lg">
                    <div className="text-sm font-medium text-gray-700 mb-1">Tipo di Intervento:</div>
                    <Badge className={`${
                      configurazione.tipoRistrutturazione === 'completa' ? 'bg-red-100 text-red-800' :
                      configurazione.tipoRistrutturazione === 'nuova' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {configurazione.tipoRistrutturazione === 'completa' ? 'Ristrutturazione Completa' :
                       configurazione.tipoRistrutturazione === 'nuova' ? 'Nuova Costruzione' : 'Intervento Parziale'}
                    </Badge>
                  </div>
                )}
              </div>
            )}

            {/* 4. ANALISI ECONOMICA */}
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Calculator className="h-5 w-5 text-yellow-600 mr-2" />
                <h4 className="font-semibold text-lg text-yellow-800">Analisi Economica</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-4 bg-white rounded-lg border">
                  <div className="text-sm text-gray-600 mb-1">Preventivo Minimo</div>
                  <div className="text-xl font-bold text-green-600">€{lead.stimaMin?.toLocaleString()}</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <div className="text-sm text-gray-600 mb-1">Preventivo Massimo</div>
                  <div className="text-xl font-bold text-blue-600">€{lead.stimaMax?.toLocaleString()}</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <div className="text-sm text-gray-600 mb-1">Valore Medio</div>
                  <div className="text-xl font-bold text-gray-700">€{stimaMedia?.toLocaleString()}</div>
                </div>
              </div>

              {/* Dettaglio costi se disponibile */}
              {stimaDettagli.breakdown && (
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-sm font-medium text-gray-700 mb-2">Dettaglio Costi:</div>
                  <div className="space-y-2">
                    {stimaDettagli.breakdown.basePrice && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Prezzo Base Sistema:</span>
                        <span className="font-medium">€{stimaDettagli.breakdown.basePrice.toLocaleString()}</span>
                      </div>
                    )}
                    {stimaDettagli.breakdown.roomsCost && stimaDettagli.breakdown.roomsCost > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Costo Ambienti:</span>
                        <span className="font-medium">€{stimaDettagli.breakdown.roomsCost.toLocaleString()}</span>
                      </div>
                    )}
                    {stimaDettagli.breakdown.specialFeaturesCost && stimaDettagli.breakdown.specialFeaturesCost > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Funzioni Speciali:</span>
                        <span className="font-medium">€{stimaDettagli.breakdown.specialFeaturesCost.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 5. INFORMAZIONI COMMERCIALI */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Clock className="h-5 w-5 text-gray-600 mr-2" />
                <h4 className="font-semibold text-lg text-gray-800">Informazioni Commerciali</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">Data Richiesta</div>
                    <div className="font-medium">{formatDate(lead.dataRichiesta)}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">Ultimo Contatto</div>
                    <div className="font-medium">
                      {lead.dataUltimoContatto ? formatDate(lead.dataUltimoContatto) : 'Mai contattato'}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">Moduli Completati</div>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">{lead.moduliCompletati?.length || 0}/12</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${((lead.moduliCompletati?.length || 0) / 12) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  {lead.sopralluogoRichiesto && (
                    <div className="bg-orange-100 border border-orange-300 p-3 rounded-lg">
                      <div className="flex items-center text-orange-800">
                        <div className="text-xl mr-2">🔍</div>
                        <span className="font-medium">Sopralluogo Richiesto</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Moduli completati */}
              {lead.moduliCompletati && lead.moduliCompletati.length > 0 && (
                <div className="mt-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Moduli Completati:</div>
                  <div className="flex flex-wrap gap-1">
                    {lead.moduliCompletati.map((modulo) => (
                      <Badge 
                        key={modulo} 
                        variant="outline" 
                        className="text-xs"
                      >
                        {moduliDisponibili[modulo as keyof typeof moduliDisponibili]?.label || modulo}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 6. NOTE DEL CLIENTE */}
            {lead.note && (
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                <div className="flex items-center mb-2">
                  <div className="text-xl mr-2">💬</div>
                  <h4 className="font-semibold text-amber-800">Note del Cliente</h4>
                </div>
                <p className="text-gray-700 italic">"{lead.note}"</p>
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
