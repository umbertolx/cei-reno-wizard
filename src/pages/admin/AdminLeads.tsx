import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { KanbanColumn } from "@/components/admin/KanbanColumn";
import { LeadDetails } from "@/components/admin/LeadDetails";
import { mockLeads, leadStates, Lead } from "@/data/mockLeads";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { LeadCard } from "@/components/admin/LeadCard";

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [customTitles, setCustomTitles] = useState<Record<string, string>>({});

  // Filtra i lead in base al termine di ricerca
  const filteredLeads = leads.filter(lead => 
    lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.cognome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.citta.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Raggruppa i lead per stato
  const leadsByState = Object.keys(leadStates).reduce((acc, state) => {
    acc[state as keyof typeof leadStates] = filteredLeads.filter(lead => lead.stato === state);
    return acc;
  }, {} as Record<keyof typeof leadStates, Lead[]>);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const leadId = active.id as string;
    const newState = over.id as keyof typeof leadStates;

    // Trova il lead e aggiorna il suo stato
    const leadToUpdate = leads.find(lead => lead.id === leadId);
    if (leadToUpdate && leadToUpdate.stato !== newState) {
      const updatedLeads = leads.map(lead =>
        lead.id === leadId 
          ? { ...lead, stato: newState, dataUltimoContatto: new Date().toISOString() }
          : lead
      );
      
      setLeads(updatedLeads);
      toast({
        title: "Lead aggiornato",
        description: `${leadToUpdate.nome} ${leadToUpdate.cognome} è stato spostato in "${customTitles[newState] || leadStates[newState].label}"`,
      });
    }

    setActiveId(null);
  };

  const handleTitleChange = (stato: keyof typeof leadStates, title: string) => {
    setCustomTitles(prev => ({
      ...prev,
      [stato]: title
    }));
    toast({
      title: "Titolo aggiornato",
      description: `Il titolo della colonna è stato aggiornato a "${title}"`,
    });
  };

  const handleExport = () => {
    // Simula export CSV
    toast({
      title: "Export completato",
      description: "I dati sono stati esportati in formato CSV",
    });
  };

  const activeLead = activeId ? leads.find(lead => lead.id === activeId) : null;

  return (
    <AdminLayout>
      <div className="space-y-6 w-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestione Lead</h1>
            <p className="text-gray-600">Visualizza e gestisci tutti i preventivi richiesti</p>
          </div>
        </div>

        {/* Filtri e Ricerca */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cerca per nome, email o città..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtri
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Esporta CSV
              </Button>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {Object.entries(leadStates).map(([state]) => (
              <KanbanColumn
                key={state}
                stato={state as keyof typeof leadStates}
                leads={leadsByState[state as keyof typeof leadStates]}
                onViewDetails={setSelectedLead}
                customTitle={customTitles[state]}
                onTitleChange={handleTitleChange}
              />
            ))}
          </div>
          
          <DragOverlay>
            {activeLead ? (
              <LeadCard 
                lead={activeLead} 
                onViewDetails={() => {}} 
              />
            ) : null}
          </DragOverlay>
        </DndContext>

        {/* Modal Dettagli Lead */}
        <LeadDetails
          lead={selectedLead}
          isOpen={!!selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminLeads;
