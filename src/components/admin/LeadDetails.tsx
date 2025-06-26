
import { Lead, leadStates, moduliDisponibili } from "@/data/mockLeads";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Mail, Home, Calendar, Euro, User, Building, FileText, Settings, Clock, CheckCircle, Zap, Wrench } from "lucide-react";

interface LeadDetailsProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

export const LeadDetails = ({ lead, isOpen, onClose }: LeadDetailsProps) => {
  console.log("LeadDetails render - lead:", lead);
  console.log("LeadDetails render - isOpen:", isOpen);
  
  if (!lead) {
    console.log("LeadDetails: No lead provided");
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
    const { cucina, cameraDoppia, cameraSingola, bagno, soggiorno, altro } = lead.composizione;
    return cucina + cameraDoppia + cameraSingola + bagno + soggiorno + altro;
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
    const choices: Record<string, { label: string; description?: string; icon: string }> = {
      tipoImpianto: {
        livello1: { label: "Livello 1 - Standard Minimo", description: "Impianto base con punti luce e prese essenziali", icon: "⚡" },
        livello2: { label: "Livello 2 - Impianto Avanzato", description: "Più punti luce, prese dati e TV", icon: "🔌" },
        livello3: { label: "Livello 3 - Domotico e Smart Home", description: "Controllo smart completo", icon: "🏠" }
      },
      tipoRistrutturazione: {
        completa: { label: "Ristrutturazione Completa", description: "Rifacimento totale dell'impianto", icon: "🏗️" },
        parziale: { label: "Intervento Parziale", description: "Modifiche mirate", icon: "🔧" },
        nuova: { label: "Nuova Costruzione", description: "Impianto ex-novo", icon: "🏠" }
      },
      elettrificareTapparelle: {
        si: { label: "Sì", description: "Elettrificazione delle tapparelle", icon: "🪟" },
        no: { label: "No", description: "Nessuna elettrificazione", icon: "❌" }
      },
      tipoDomotica: {
        knx: { label: "Sistema KNX", description: "Sistema domotico cablato professionale", icon: "🔌" },
        bticino: { label: "BTicino Wireless", description: "Sistema wireless facile da installare", icon: "📡" }
      },
      impiantoVecchio: {
        true: { label: "Impianto Vecchio", description: "Da rifare completamente", icon: "⚠️" },
        false: { label: "Impianto Recente", description: "A norma, modifiche minime", icon: "✅" }
      }
    };

    if (choices[key] && choices[key][value]) {
      const choice = choices[key][value];
      return (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{choice.icon}</span>
            <div>
              <div className="font-semibold text-gray-900">{choice.label}</div>
              {choice.description && (
                <div className="text-sm text-gray-600">{choice.description}</div>
              )}
            </div>
          </div>
        </div>
      );
    }

    // Per valori numerici o altri tipi
    if (typeof value === 'number') {
      const labels: Record<string, string> = {
        numeroTapparelle: "Numero Tapparelle da Elettrificare"
      };
      
      return (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🔢</span>
            <div>
              <div className="font-semibold text-gray-900">{labels[key] || key}</div>
              <div className="text-sm text-gray-600">{value} unità</div>
            </div>
          </div>
          <div className="text-xl font-bold text-blue-600">{value}</div>
        </div>
      );
    }

    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6 border-b">
          <DialogTitle className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-xl border-2 border-blue-200">
              {lead.nome.charAt(0)}{lead.cognome.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{lead.nome} {lead.cognome}</h2>
              <div className="flex items-center space-x-4">
                <Badge className={`${leadStates[lead.stato].color} text-white px-3 py-1`}>
                  {leadStates[lead.stato].label}
                </Badge>
                <span className="text-sm text-gray-500">ID: {lead.id}</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-600">Richiesta: {formatDate(lead.dataRichiesta)}</span>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          {/* Sezione Contatti e Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Dati di Contatto */}
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Informazioni di Contatto
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-900">{lead.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-900">{lead.telefono}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <div>
                    <div className="text-gray-900 font-medium">{lead.indirizzo}</div>
                    <div className="text-gray-600 text-sm">{lead.citta}, {lead.cap} ({lead.regione})</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-green-600" />
                Timeline
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Data Richiesta</div>
                    <div className="text-sm text-gray-600">{formatDate(lead.dataRichiesta)}</div>
                  </div>
                </div>
                {lead.dataUltimoContatto && (
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Ultimo Contatto</div>
                      <div className="text-sm text-gray-600">{formatDate(lead.dataUltimoContatto)}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Dettagli Immobile */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Building className="h-5 w-5 mr-2 text-purple-600" />
              Dettagli Immobile
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg border">
                <div className="text-2xl font-bold text-gray-900">{lead.superficie}</div>
                <div className="text-sm text-gray-600">mq totali</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg border">
                <div className="text-2xl font-bold text-gray-900">{getTotalRooms()}</div>
                <div className="text-sm text-gray-600">stanze totali</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg border">
                <div className="text-2xl font-bold text-gray-900 capitalize">{lead.piano}</div>
                <div className="text-sm text-gray-600">piano</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg border">
                <div className="text-2xl font-bold text-gray-900 capitalize">
                  {lead.tipologiaAbitazione === 'appartamento' ? 'Appartamento' : 'Casa'}
                </div>
                <div className="text-sm text-gray-600">tipologia</div>
              </div>
            </div>

            {/* Composizione Dettagliata */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Composizione Stanze</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-xl font-bold text-gray-900">{lead.composizione.altro}</div>
                  <div className="text-xs text-gray-600">Altro</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Tipo Proprietà:</span>
                <span className="font-medium text-gray-900 capitalize">{lead.tipoProprietà}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Analisi Economica */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Euro className="h-5 w-5 mr-2 text-green-600" />
              Analisi Economica
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-sm font-medium text-green-800 mb-2">Preventivo Minimo</div>
                <div className="text-3xl font-bold text-green-900">€{lead.stimaMin?.toLocaleString()}</div>
                <div className="text-sm text-green-700 mt-1">Configurazione base</div>
              </div>
              
              <div className="text-center p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm font-medium text-blue-800 mb-2">Preventivo Massimo</div>
                <div className="text-3xl font-bold text-blue-900">€{lead.stimaMax?.toLocaleString()}</div>
                <div className="text-sm text-blue-700 mt-1">Configurazione completa</div>
              </div>
              
              <div className="text-center p-6 bg-gray-50 border rounded-lg">
                <div className="text-sm font-medium text-gray-800 mb-2">Valore Medio</div>
                <div className="text-3xl font-bold text-gray-900">€{stimaMedia?.toLocaleString()}</div>
                <div className="text-sm text-gray-700 mt-1">Stima realistica</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Configurazione Tecnica */}
          {configurazione && Object.keys(configurazione).length > 0 && (
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Settings className="h-5 w-5 mr-2 text-orange-600" />
                Configurazione Richiesta
              </h3>
              
              <div className="space-y-4">
                {Object.entries(configurazione).map(([key, value]) => {
                  const rendered = renderConfigurationChoice(key, value);
                  if (rendered) {
                    return <div key={key}>{rendered}</div>;
                  }
                  return null;
                })}
              </div>
            </div>
          )}

          {/* Moduli Completati */}
          {lead.moduliCompletati && lead.moduliCompletati.length > 0 && (
            <>
              <Separator />
              <div className="bg-white border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-purple-600" />
                  Moduli Completati
                </h3>
                <div className="flex flex-wrap gap-2">
                  {lead.moduliCompletati.map((modulo, index) => {
                    const moduloInfo = moduliDisponibili[modulo as keyof typeof moduliDisponibili];
                    return (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {moduloInfo?.label || modulo}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* Note del Cliente */}
          {lead.note && (
            <>
              <Separator />
              <div className="bg-white border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-yellow-600" />
                  Note del Cliente
                </h3>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-gray-800 leading-relaxed">{lead.note}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
