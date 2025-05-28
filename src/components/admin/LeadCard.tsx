
import { Lead, leadStates } from "@/data/mockLeads";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Home, Calendar, Euro } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface LeadCardProps {
  lead: Lead;
  onViewDetails: () => void;
}

export const LeadCard = ({ lead, onViewDetails }: LeadCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lead.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
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

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`mb-3 cursor-grab hover:shadow-md transition-shadow ${
        isDragging ? 'shadow-lg ring-2 ring-blue-500' : ''
      }`}
    >
      <CardContent className="p-4">
        {/* Header con avatar e nome */}
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-[#d8010c] rounded-full flex items-center justify-center text-white font-medium text-sm">
            {getInitials(lead.nome, lead.cognome)}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">
              {lead.nome} {lead.cognome}
            </h3>
            <p className="text-sm text-gray-600 flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {lead.citta}, {lead.cap}
            </p>
          </div>
        </div>

        {/* Dettagli immobile */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center text-gray-600">
              <Home className="h-3 w-3 mr-1" />
              {lead.tipologiaAbitazione === 'appartamento' ? 'Appartamento' : 'Casa indipendente'}
            </span>
            <span className="font-medium">{lead.superficie} mq</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center text-gray-600">
              <Euro className="h-3 w-3 mr-1" />
              Stima
            </span>
            <span className="font-medium text-green-600">
              €{lead.stimaMin.toLocaleString()} - €{lead.stimaMax.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center text-gray-600">
              <Calendar className="h-3 w-3 mr-1" />
              Richiesta
            </span>
            <span className="text-gray-600">
              {formatDate(lead.dataRichiesta)}
            </span>
          </div>
        </div>

        {/* Contatti */}
        <div className="space-y-1 mb-3">
          <p className="text-xs text-gray-600 flex items-center">
            <Mail className="h-3 w-3 mr-1" />
            {lead.email}
          </p>
          <p className="text-xs text-gray-600 flex items-center">
            <Phone className="h-3 w-3 mr-1" />
            {lead.telefono}
          </p>
        </div>

        {/* Bonus applicabili */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {lead.bonusApplicabili.slice(0, 2).map((bonus, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {bonus}
              </Badge>
            ))}
            {lead.bonusApplicabili.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{lead.bonusApplicabili.length - 2}
              </Badge>
            )}
          </div>
        </div>

        {/* Azioni */}
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails();
          }}
          className="w-full"
        >
          Visualizza dettagli
        </Button>
      </CardContent>
    </Card>
  );
};
