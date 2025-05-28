
import { Lead, leadStates } from "@/data/mockLeads";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Home, Calendar, Euro, Eye, ChevronRight } from "lucide-react";
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
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  const getInitials = (nome: string, cognome: string) => {
    return `${nome.charAt(0)}${cognome.charAt(0)}`.toUpperCase();
  };

  const getPriorityColor = () => {
    const days = Math.floor((new Date().getTime() - new Date(lead.dataRichiesta).getTime()) / (1000 * 60 * 60 * 24));
    if (days <= 1) return "bg-green-500";
    if (days <= 3) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`group cursor-grab hover:cursor-grabbing transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 shadow-md ${
        isDragging 
          ? 'shadow-2xl ring-4 ring-blue-500/20 scale-105 rotate-2 z-50' 
          : 'hover:shadow-lg'
      }`}
    >
      <CardContent className="p-0 overflow-hidden">
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-4 text-white relative overflow-hidden">
          <div className="relative z-10 flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {getInitials(lead.nome, lead.cognome)}
                </div>
                <div className={`absolute -top-1 -right-1 w-4 h-4 ${getPriorityColor()} rounded-full border-2 border-white`}></div>
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">
                  {lead.nome} {lead.cognome}
                </h3>
                <p className="text-white/80 text-sm flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {lead.citta}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white/60 text-xs">{formatDate(lead.dataRichiesta)}</div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-4 translate-x-4"></div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Proprietà principale */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Home className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {lead.tipologiaAbitazione === 'appartamento' ? 'Appartamento' : 'Casa indipendente'}
                  </p>
                  <p className="text-sm text-gray-600">{lead.superficie} mq • Piano {lead.piano}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stima valore */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Euro className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Stima preventivo</p>
                  <p className="font-bold text-green-700">
                    €{lead.stimaMin.toLocaleString()} - €{lead.stimaMax.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contatti */}
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="h-3 w-3 mr-2 text-gray-400" />
              <span className="truncate">{lead.email}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="h-3 w-3 mr-2 text-gray-400" />
              <span>{lead.telefono}</span>
            </div>
          </div>

          {/* Bonus (max 2 + indicatore) */}
          <div className="flex flex-wrap gap-1">
            {lead.bonusApplicabili.slice(0, 2).map((bonus, index) => (
              <Badge key={index} variant="secondary" className="text-xs bg-purple-100 text-purple-700 border-purple-200">
                {bonus}
              </Badge>
            ))}
            {lead.bonusApplicabili.length > 2 && (
              <Badge variant="outline" className="text-xs border-dashed">
                +{lead.bonusApplicabili.length - 2} altri
              </Badge>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 pb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }}
            className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300"
          >
            <Eye className="h-4 w-4 mr-2" />
            Visualizza dettagli
            <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
