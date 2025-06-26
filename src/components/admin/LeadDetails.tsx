
import { Lead, leadStates } from "@/data/mockLeads";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Mail, Calendar, Euro, User, Building } from "lucide-react";

interface LeadDetailsProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

export const LeadDetails = ({ lead, isOpen, onClose }: LeadDetailsProps) => {
  console.log("=== LeadDetails Render Start ===");
  console.log("LeadDetails render - lead:", lead?.id, lead?.nome, lead?.cognome);
  console.log("LeadDetails render - isOpen:", isOpen);
  console.log("LeadDetails render - lead is null?", lead === null);
  console.log("LeadDetails render - lead is undefined?", lead === undefined);
  console.log("=== LeadDetails Render End ===");
  
  if (!lead) {
    console.log("LeadDetails: No lead provided, returning null");
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTotalRooms = () => {
    const { cucina, cameraDoppia, cameraSingola, bagno, soggiorno } = lead.composizione;
    return cucina + cameraDoppia + cameraSingola + bagno + soggiorno;
  };

  const stimaMedia = lead.stimaMin && lead.stimaMax ? Math.round((lead.stimaMin + lead.stimaMax) / 2) : 0;

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

  const renderConfigurationChoice = (key: string, value: any) => {
    const getConfigurationLabel = (key: string, value: any) => {
      switch (key) {
        case 'tipoImpianto':
          switch (value) {
            case 'livello1': return 'Livello 1 - Standard Minimo';
            case 'livello2': return 'Livello 2 - Impianto Avanzato';
            case 'livello3': return 'Livello 3 - Domotico e Smart Home';
            default: return value;
          }
        case 'tipoRistrutturazione':
          switch (value) {
            case 'completa': return 'Ristrutturazione Completa';
            case 'parziale': return 'Intervento Parziale';
            case 'nuova': return 'Nuova Costruzione';
            default: return value;
          }
        case 'elettrificareTapparelle':
          return value === 'si' ? 'Sì, elettrificare le tapparelle' : 'No';
        case 'tipoDomotica':
          switch (value) {
            case 'knx': return 'Sistema KNX (Cablato)';
            case 'bticino': return 'BTicino Wireless';
            default: return value;
          }
        case 'numeroTapparelle':
          return `${value} tapparelle`;
        default:
          return String(value);
      }
    };

    const getFieldLabel = (key: string) => {
      switch (key) {
        case 'tipoImpianto': return 'Tipo di Impianto';
        case 'tipoRistrutturazione': return 'Tipo di Ristrutturazione';
        case 'elettrificareTapparelle': return 'Elettrificare Tapparelle';
        case 'tipoDomotica': return 'Sistema Domotico';
        case 'numeroTapparelle': return 'Numero Tapparelle';
        default: return key;
      }
    };

    return (
      <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100">
        <div className="font-medium text-gray-900">{getFieldLabel(key)}</div>
        <div className="col-span-2 text-gray-700">{getConfigurationLabel(key, value)}</div>
      </div>
    );
  };

  console.log("LeadDetails: About to render dialog with isOpen:", isOpen);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6 border-b">
          <DialogTitle className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {lead.nome.charAt(0)}{lead.cognome.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{lead.nome} {lead.cognome}</h2>
              <div className="flex items-center space-x-4">
                <Badge className={`${leadStates[lead.stato].color} text-white`}>
                  {leadStates[lead.stato].label}
                </Badge>
                <span className="text-sm text-gray-500">ID: {lead.id}</span>
                <span className="text-sm text-gray-600">Richiesta: {formatDate(lead.dataRichiesta)}</span>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 1. Informazioni di Contatto */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Informazioni di Contatto
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-900">{lead.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-900">{lead.telefono}</span>
              </div>
              <div className="flex items-center space-x-3 md:col-span-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="text-gray-900">{lead.indirizzo}</div>
                  <div className="text-gray-600 text-sm">{lead.citta}, {lead.cap} ({lead.regione})</div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* 2. Dettagli Immobile */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Building className="h-5 w-5 mr-2" />
              Dettagli Immobile
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{lead.superficie}</div>
                <div className="text-sm text-gray-600">mq totali</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{getTotalRooms()}</div>
                <div className="text-sm text-gray-600">stanze totali</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 capitalize">{lead.tipologiaAbitazione}</div>
                <div className="text-sm text-gray-600">tipologia</div>
              </div>
            </div>

            {/* Composizione Stanze */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Composizione Stanze</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-xl font-bold text-gray-900">{lead.composizione.cucina}</div>
                  <div className="text-xs text-gray-600">Cucina</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-xl font-bold text-gray-900">{lead.composizione.cameraDoppia}</div>
                  <div className="text-xs text-gray-600">Camera Doppia</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-xl font-bold text-gray-900">{lead.composizione.cameraSingola}</div>
                  <div className="text-xs text-gray-600">Camera Singola</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-xl font-bold text-gray-900">{lead.composizione.bagno}</div>
                  <div className="text-xs text-gray-600">Bagno</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-xl font-bold text-gray-900">{lead.composizione.soggiorno}</div>
                  <div className="text-xs text-gray-600">Soggiorno</div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* 3. Configurazione Tecnica */}
          {configurazione && Object.keys(configurazione).length > 0 && (
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Configurazione Richiesta</h3>
              
              <div className="space-y-1">
                {Object.entries(configurazione).map(([key, value]) => {
                  if (key === 'knxConfig' && typeof value === 'object' && value !== null) {
                    return null;
                  }
                  return (
                    <div key={key}>
                      {renderConfigurationChoice(key, value)}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <Separator />

          {/* 4. Analisi Economica */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Euro className="h-5 w-5 mr-2" />
              Analisi Economica
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 border rounded-lg">
                <div className="text-sm font-medium text-green-800 mb-1">Preventivo Minimo</div>
                <div className="text-2xl font-bold text-green-900">€{lead.stimaMin?.toLocaleString()}</div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 border rounded-lg">
                <div className="text-sm font-medium text-blue-800 mb-1">Preventivo Massimo</div>
                <div className="text-2xl font-bold text-blue-900">€{lead.stimaMax?.toLocaleString()}</div>
              </div>
              
              <div className="text-center p-4 bg-gray-50 border rounded-lg">
                <div className="text-sm font-medium text-gray-800 mb-1">Valore Medio</div>
                <div className="text-2xl font-bold text-gray-900">€{stimaMedia?.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* 5. Note del Cliente */}
          {lead.note && (
            <>
              <Separator />
              <div className="bg-white border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Note del Cliente</h3>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-gray-800">{lead.note}</p>
                </div>
              </div>
            </>
          )}

          {/* 6. Cronologia Contatti */}
          <Separator />
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Cronologia Contatti
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Richiesta inviata</span>
                <span className="text-gray-600 text-sm">{formatDate(lead.dataRichiesta)}</span>
              </div>
              {lead.dataUltimoContatto && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700">Ultimo contatto</span>
                  <span className="text-gray-600 text-sm">{formatDate(lead.dataUltimoContatto)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
