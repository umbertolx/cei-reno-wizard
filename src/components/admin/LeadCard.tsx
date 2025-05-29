
import { Lead, leadStates, moduliDisponibili } from "@/data/mockLeads";
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

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`hover:shadow-lg transition-all duration-200 ${
        isDragging ? 'shadow-2xl ring-2 ring-blue-500 bg-white rotate-3' : 'hover:shadow-md'
      }`}
    >
      {/* Card content without drag listeners */}
      <CardContent className="p-4">
        {/* Header with drag handle */}
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
        </div>

        {/* Dettagli immobile */}
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

        {/* Contatti */}
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

        {/* Moduli completati */}
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

        {/* Actions - Outside drag listeners */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleViewDetails}
          className="w-full"
          type="button"
        >
          Visualizza dettagli
        </Button>
      </CardContent>
    </Card>
  );
};
