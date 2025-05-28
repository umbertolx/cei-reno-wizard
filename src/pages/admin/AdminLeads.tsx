
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { KanbanColumn } from "@/components/admin/KanbanColumn";
import { LeadDetails } from "@/components/admin/LeadDetails";
import { mockLeads, leadStates, Lead } from "@/data/mockLeads";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, BarChart3, TrendingUp, Users, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { LeadCard } from "@/components/admin/LeadCard";

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);

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
        description: `${leadToUpdate.nome} ${leadToUpdate.cognome} è stato spostato in "${leadStates[newState].label}"`,
      });
    }

    setActiveId(null);
  };

  const handleExport = () => {
    toast({
      title: "Export completato",
      description: "I dati sono stati esportati in formato CSV",
    });
  };

  const activeLead = activeId ? leads.find(lead => lead.id === activeId) : null;

  // Calcola statistiche
  const totalLeads = leads.length;
  const todayLeads = leads.filter(lead => {
    const today = new Date().toDateString();
    return new Date(lead.dataRichiesta).toDateString() === today;
  }).length;

  const totalValue = leads.reduce((sum, lead) => sum + ((lead.stimaMin + lead.stimaMax) / 2), 0);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header con gradiente */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-2xl p-8 text-white">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Gestione Lead</h1>
                <p className="text-blue-100 text-lg">Dashboard CRM per la gestione dei preventivi</p>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">{totalLeads}</div>
                  <div className="text-blue-200 text-sm">Lead Totali</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{todayLeads}</div>
                  <div className="text-blue-200 text-sm">Oggi</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">€{Math.round(totalValue / 1000)}k</div>
                  <div className="text-blue-200 text-sm">Valore Totale</div>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
        </div>

        {/* Filtri e Ricerca con design moderno */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Cerca per nome, email o città..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="lg" className="border-gray-200 hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-2" />
                Filtri Avanzati
              </Button>
              <Button variant="outline" size="lg" onClick={handleExport} className="border-gray-200 hover:bg-gray-50">
                <Download className="h-4 w-4 mr-2" />
                Esporta
              </Button>
            </div>
          </div>
        </div>

        {/* Statistiche veloci con icone e colori */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(leadStates).map(([state, info]) => {
            const count = leadsByState[state as keyof typeof leadStates].length;
            const percentage = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0;
            
            return (
              <div key={state} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl text-white font-bold text-xl mb-3 ${info.color}`}>
                    {count}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{info.label}</h3>
                  <p className="text-sm text-gray-500">{percentage}% del totale</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Kanban Board con miglioramenti */}
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="flex gap-6 overflow-x-auto pb-6">
            {Object.entries(leadStates).map(([state]) => (
              <KanbanColumn
                key={state}
                stato={state as keyof typeof leadStates}
                leads={leadsByState[state as keyof typeof leadStates]}
                onViewDetails={setSelectedLead}
              />
            ))}
          </div>
          
          <DragOverlay>
            {activeLead ? (
              <div className="transform rotate-6 scale-105">
                <LeadCard 
                  lead={activeLead} 
                  onViewDetails={() => {}} 
                />
              </div>
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
