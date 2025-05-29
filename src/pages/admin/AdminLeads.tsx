
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { KanbanColumn } from "@/components/admin/KanbanColumn";
import { LeadDetails } from "@/components/admin/LeadDetails";
import { AddColumnDialog } from "@/components/admin/AddColumnDialog";
import { mockLeads, leadStates, Lead, CustomColumn } from "@/data/mockLeads";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { 
  DndContext, 
  DragEndEvent, 
  DragOverlay, 
  DragStartEvent,
  closestCorners,
  DragOverEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { LeadCard } from "@/components/admin/LeadCard";
import { arrayMove } from "@dnd-kit/sortable";

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [customTitles, setCustomTitles] = useState<Record<string, string>>({});
  const [customColumns, setCustomColumns] = useState<CustomColumn[]>([]);
  const [isAddColumnOpen, setIsAddColumnOpen] = useState(false);
  const [leadPositions, setLeadPositions] = useState<Record<string, string[]>>({});

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  // Filtra i lead in base al termine di ricerca
  const filteredLeads = leads.filter(lead => 
    lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.cognome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.citta.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Combina stati predefiniti e colonne personalizzate
  const allColumns = [
    ...Object.keys(leadStates).map(state => ({ id: state, type: 'default' as const })),
    ...customColumns.map(col => ({ id: col.id, type: 'custom' as const, column: col }))
  ];

  // Raggruppa i lead per stato mantenendo l'ordine personalizzato
  const leadsByState = allColumns.reduce((acc, col) => {
    const columnLeads = filteredLeads.filter(lead => lead.stato === col.id);
    const positions = leadPositions[col.id] || [];
    
    // Ordina i lead secondo le posizioni salvate
    const orderedLeads = [...columnLeads].sort((a, b) => {
      const posA = positions.indexOf(a.id);
      const posB = positions.indexOf(b.id);
      if (posA === -1 && posB === -1) return 0;
      if (posA === -1) return 1;
      if (posB === -1) return -1;
      return posA - posB;
    });
    
    acc[col.id] = orderedLeads;
    return acc;
  }, {} as Record<string, Lead[]>);

  const handleViewDetails = (lead: Lead) => {
    console.log("AdminLeads: handleViewDetails called with lead:", lead);
    console.log("AdminLeads: Setting selected lead:", lead.id);
    setSelectedLead(lead);
    console.log("AdminLeads: selectedLead state should be updated");
  };

  const handleCloseDetails = () => {
    console.log("AdminLeads: Closing lead details");
    setSelectedLead(null);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId !== overId) {
      const activeLead = leads.find(lead => lead.id === activeId);
      if (!activeLead) return;

      const overLead = leads.find(lead => lead.id === overId);
      const targetColumn = overLead ? overLead.stato : overId;

      if (activeLead.stato !== targetColumn) {
        setLeads(prev => prev.map(lead =>
          lead.id === activeId 
            ? { ...lead, stato: targetColumn as keyof typeof leadStates, dataUltimoContatto: new Date().toISOString() }
            : lead
        ));
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveId(null);
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeLead = leads.find(lead => lead.id === activeId);
    if (!activeLead) {
      setActiveId(null);
      return;
    }

    const overLead = leads.find(lead => lead.id === overId);
    const targetColumn = overLead ? overLead.stato : overId;

    if (activeLead.stato !== targetColumn) {
      const columnInfo = leadStates[targetColumn as keyof typeof leadStates] || 
                        customColumns.find(col => col.id === targetColumn);
      const displayName = customTitles[targetColumn] || columnInfo?.label || targetColumn;
      
      toast({
        title: "Lead aggiornato",
        description: `${activeLead.nome} ${activeLead.cognome} è stato spostato in "${displayName}"`,
      });
    }

    if (overLead && activeLead.stato === overLead.stato) {
      const columnLeads = leadsByState[activeLead.stato];
      const activeIndex = columnLeads.findIndex(lead => lead.id === activeId);
      const overIndex = columnLeads.findIndex(lead => lead.id === overId);

      if (activeIndex !== overIndex) {
        const newOrder = arrayMove(columnLeads, activeIndex, overIndex);
        setLeadPositions(prev => ({
          ...prev,
          [activeLead.stato]: newOrder.map(lead => lead.id)
        }));
      }
    } else {
      setLeadPositions(prev => ({
        ...prev,
        [targetColumn]: [...(prev[targetColumn] || []).filter(id => id !== activeId), activeId]
      }));
    }

    setActiveId(null);
  };

  const handleTitleChange = (stato: string, title: string) => {
    setCustomTitles(prev => ({
      ...prev,
      [stato]: title
    }));
    toast({
      title: "Titolo aggiornato",
      description: `Il titolo della colonna è stato aggiornato a "${title}"`,
    });
  };

  const handleAddColumn = (columnData: Omit<CustomColumn, 'id'>) => {
    const newColumn: CustomColumn = {
      ...columnData,
      id: `custom_${Date.now()}`
    };
    setCustomColumns(prev => [...prev, newColumn]);
    toast({
      title: "Colonna aggiunta",
      description: `La colonna "${columnData.label}" è stata aggiunta con successo`,
    });
  };

  const handleDeleteColumn = (columnId: string) => {
    const leadsToMove = leads.filter(lead => lead.stato === columnId);
    if (leadsToMove.length > 0) {
      setLeads(prev => prev.map(lead =>
        lead.stato === columnId 
          ? { ...lead, stato: 'nuovo', dataUltimoContatto: new Date().toISOString() }
          : lead
      ));
    }

    setCustomColumns(prev => prev.filter(col => col.id !== columnId));
    setLeadPositions(prev => {
      const { [columnId]: removed, ...rest } = prev;
      return rest;
    });
    
    toast({
      title: "Colonna eliminata",
      description: leadsToMove.length > 0 
        ? `Colonna eliminata. ${leadsToMove.length} lead spostati in "Nuovo"`
        : "Colonna eliminata",
    });
  };

  const handleExport = () => {
    toast({
      title: "Export completato",
      description: "I dati sono stati esportati in formato CSV",
    });
  };

  const activeLead = activeId ? leads.find(lead => lead.id === activeId) : null;

  console.log("AdminLeads render - selectedLead:", selectedLead);
  console.log("AdminLeads render - isOpen:", !!selectedLead);

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
              <Button variant="outline" size="sm" onClick={() => setIsAddColumnOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Aggiungi Colonna
              </Button>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart} 
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 overflow-x-auto pb-4">
            {allColumns.map((col) => (
              <KanbanColumn
                key={col.id}
                stato={col.id}
                leads={leadsByState[col.id] || []}
                onViewDetails={handleViewDetails}
                customTitle={customTitles[col.id]}
                onTitleChange={handleTitleChange}
                customColumn={col.type === 'custom' ? col.column : undefined}
                onDeleteColumn={handleDeleteColumn}
                isDefaultColumn={col.type === 'default'}
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
          onClose={handleCloseDetails}
        />

        {/* Dialog Aggiungi Colonna */}
        <AddColumnDialog
          isOpen={isAddColumnOpen}
          onClose={() => setIsAddColumnOpen(false)}
          onAdd={handleAddColumn}
          existingColumns={customColumns}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminLeads;
