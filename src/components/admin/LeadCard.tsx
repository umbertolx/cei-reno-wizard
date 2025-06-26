
import { Lead, leadStates, moduliDisponibili } from "@/data/mockLeads";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Home, Calendar, Euro, ChevronDown, Settings, Zap, Shield, Eye } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

interface LeadCardProps {
  lead: Lead;
  onViewDetails: () => void;
}

export const LeadCard = ({ lead, onViewDetails }: LeadCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
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
    console.log("LeadCard: Button clicked - preventing default and stopping propagation");
    console.log("LeadCard: View details clicked for lead:", lead.id);
    console.log("LeadCard: onViewDetails function:", onViewDetails);
    onViewDetails();
  };

  const toggleExpansion = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  // Parse configurazione tecnica se disponibile
  const parseConfigurazioneTecnica = () => {
    try {
      return typeof lead.configurazioneTecnica === 'string' 
        ? JSON.parse(lead.configurazioneTecnica) 
        : lead.configurazioneTecnica || {};
    } catch {
      return {};
    }
  };

  // Parse stima dettagli se disponibile
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
      } ${isExpanded ? 'min-h-[600px]' : ''}`}
    >
      <CardContent className="p-4">
        {/* Header con drag handle */}
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
          {/* Toggle espansione */}
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
        </div>

        {/* Dettagli immobile - sempre visibili */}
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

        {/* Sezione espandibile */}
        {isExpanded && (
          <div className="space-y-4 border-t pt-4 animate-fade-in">
            {/* Configurazione Tecnica */}
            {Object.keys(configurazione).length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm flex items-center text-gray-800">
                  <Settings className="h-4 w-4 mr-1" />
                  Configurazione Tecnica
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {configurazione.tipoImpianto && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Tipo Impianto:</span>
                      <Badge variant="secondary" className="text-xs">
                        {configurazione.tipoImpianto}
                      </Badge>
                    </div>
                  )}
                  {configurazione.ristrutturazione && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Ristrutturazione:</span>
                      <Badge variant="secondary" className="text-xs">
                        {configurazione.ristrutturazione}
                      </Badge>
                    </div>
                  )}
                  {configurazione.tipoDomotica && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 flex items-center">
                        <Zap className="h-3 w-3 mr-1" />
                        Domotica:
                      </span>
                      <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                        {configurazione.tipoDomotica}
                      </Badge>
                    </div>
                  )}
                  {configurazione.tapparelleElettriche && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 flex items-center">
                        <Shield className="h-3 w-3 mr-1" />
                        Tapparelle:
                      </span>
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                        {configurazione.tapparelleElettriche === true ? 'Sì' : 'No'}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Breakdown Stima Dettagliata */}
            {Object.keys(stimaDettagli).length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm flex items-center text-gray-800">
                  <Euro className="h-4 w-4 mr-1" />
                  Dettaglio Costi
                </h4>
                <div className="space-y-1">
                  {stimaDettagli.prezzoBase && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Prezzo Base:</span>
                      <span className="font-medium">€{stimaDettagli.prezzoBase.toLocaleString()}</span>
                    </div>
                  )}
                  {stimaDettagli.costoStanze && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Costo Stanze:</span>
                      <span className="font-medium">€{stimaDettagli.costoStanze.toLocaleString()}</span>
                    </div>
                  )}
                  {stimaDettagli.costoSuperficie && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Costo Superficie:</span>
                      <span className="font-medium">€{stimaDettagli.costoSuperficie.toLocaleString()}</span>
                    </div>
                  )}
                  {stimaDettagli.funzioniSpeciali && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Funzioni Speciali:</span>
                      <span className="font-medium">€{stimaDettagli.funzioniSpeciali.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Composizione Stanze Dettagliata */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm flex items-center text-gray-800">
                <Home className="h-4 w-4 mr-1" />
                Composizione Stanze
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(lead.composizione).map(([stanza, numero]) => (
                  numero > 0 && (
                    <div key={stanza} className="flex items-center justify-between">
                      <span className="text-gray-600 capitalize">
                        {stanza === 'cameraDoppia' ? 'Camera Doppia' : 
                         stanza === 'cameraSingola' ? 'Camera Singola' : 
                         stanza}:
                      </span>
                      <span className="font-medium">{numero}</span>
                    </div>
                  )
                ))}
              </div>
            </div>

            {/* Timeline e Info Aggiuntive */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm flex items-center text-gray-800">
                <Calendar className="h-4 w-4 mr-1" />
                Timeline
              </h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Ultimo Contatto:</span>
                  <span className="font-medium">
                    {lead.dataUltimoContatto ? formatDate(lead.dataUltimoContatto) : 'Mai'}
                  </span>
                </div>
                {lead.sopralluogoRichiesto && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Sopralluogo:</span>
                    <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800">
                      Richiesto
                    </Badge>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tipo Proprietà:</span>
                  <span className="font-medium capitalize">{lead.tipoProprietà}</span>
                </div>
              </div>
            </div>

            {/* Note se presenti */}
            {lead.note && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-gray-800">Note</h4>
                <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                  {lead.note}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Contatti - sempre visibili quando non espanso */}
        {!isExpanded && (
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
        )}

        {/* Moduli completati - sempre visibili quando non espanso */}
        {!isExpanded && (
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
        )}

        {/* Actions */}
        <div className="flex gap-2">
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
