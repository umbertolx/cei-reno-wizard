
import { Lead, leadStates, moduliDisponibili } from "@/data/mockLeads";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Mail, Home, Calendar, Euro, User, Building } from "lucide-react";

interface LeadDetailsProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

export const LeadDetails = ({ lead, isOpen, onClose }: LeadDetailsProps) => {
  if (!lead) return null;

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#d8010c] rounded-full flex items-center justify-center text-white font-medium">
              {lead.nome.charAt(0)}{lead.cognome.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{lead.nome} {lead.cognome}</h2>
              <div className="flex items-center space-x-2">
                <span className={`inline-block px-3 py-1 rounded-full text-white text-sm ${leadStates[lead.stato].color}`}>
                  {leadStates[lead.stato].label}
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-600">ID: {lead.id}</span>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Dati Personali */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <User className="h-5 w-5 mr-2" />
              Dati Personali
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>{lead.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{lead.telefono}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>Richiesta: {formatDate(lead.dataRichiesta)}</span>
              </div>
              {lead.dataUltimoContatto && (
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>Ultimo contatto: {formatDate(lead.dataUltimoContatto)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Dettagli Immobile */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Building className="h-5 w-5 mr-2" />
              Dettagli Immobile
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Tipologia:</span>
                <span className="font-medium">
                  {lead.tipologiaAbitazione === 'appartamento' ? 'Appartamento' : 'Casa indipendente'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Superficie:</span>
                <span className="font-medium">{lead.superficie} mq</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Piano:</span>
                <span className="font-medium">{lead.piano}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Totale stanze:</span>
                <span className="font-medium">{getTotalRooms()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Tipo proprietà:</span>
                <span className="font-medium">{lead.tipoProprietà}</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Indirizzo */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Indirizzo
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium">{lead.indirizzo}</p>
            <p className="text-gray-600">{lead.citta}, {lead.cap} ({lead.regione})</p>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Composizione Stanze */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Home className="h-5 w-5 mr-2" />
            Composizione Stanze
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-[#d8010c]">{lead.composizione.cucina}</div>
              <div className="text-sm text-gray-600">Cucina</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-[#d8010c]">{lead.composizione.cameraDoppia}</div>
              <div className="text-sm text-gray-600">Camera Doppia</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-[#d8010c]">{lead.composizione.cameraSingola}</div>
              <div className="text-sm text-gray-600">Camera Singola</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-[#d8010c]">{lead.composizione.bagno}</div>
              <div className="text-sm text-gray-600">Bagno</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-[#d8010c]">{lead.composizione.soggiorno}</div>
              <div className="text-sm text-gray-600">Soggiorno</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-[#d8010c]">{lead.composizione.altro}</div>
              <div className="text-sm text-gray-600">Altro</div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Stima e Moduli */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Euro className="h-5 w-5 mr-2" />
            Stima e Moduli Completati
          </h3>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-700">
                €{lead.stimaMin.toLocaleString()} - €{lead.stimaMax.toLocaleString()}
              </div>
              <div className="text-green-600">Stima preventivo</div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Moduli completati:</h4>
            <div className="flex flex-wrap gap-2">
              {lead.moduliCompletati.map((modulo, index) => {
                const moduloInfo = moduliDisponibili[modulo as keyof typeof moduliDisponibili];
                return (
                  <Badge key={index} variant="secondary" className={`text-sm ${moduloInfo?.color || 'bg-gray-100 text-gray-800'}`}>
                    {moduloInfo?.label || modulo}
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>

        {lead.note && (
          <>
            <Separator className="my-6" />
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Note</h3>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-yellow-800">{lead.note}</p>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
