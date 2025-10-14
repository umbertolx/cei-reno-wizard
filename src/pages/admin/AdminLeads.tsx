import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { SortableKanbanColumn } from "@/components/admin/SortableKanbanColumn";
import { LeadDetails } from "@/components/admin/LeadDetails";
import { AddColumnDialog } from "@/components/admin/AddColumnDialog";
import { leadStates, Lead, CustomColumn, convertDatabaseLeadToLead } from "@/data/mockLeads";
import { fetchLeads, updateLeadStatus } from "@/services/leadService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, Plus, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { 
  DndContext, 
  DragEndEvent, 
  DragStartEvent,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverEvent
} from "@dnd-kit/core";
import { LeadCard } from "@/components/admin/LeadCard";
import { 
  SortableContext, 
  arrayMove, 
  horizontalListSortingStrategy 
} from "@dnd-kit/sortable";

const AdminLeads = () => {
  const { isAdmin, isLoading: authLoading } = useAdminAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [customTitles, setCustomTitles] = useState<Record<string, string>>({});
  const [customColumns, setCustomColumns] = useState<CustomColumn[]>([]);
  const [isAddColumnOpen, setIsAddColumnOpen] = useState(false);
  const [leadPositions, setLeadPositions] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [columnOrder, setColumnOrder] = useState<string[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const loadLeads = async (showRefreshToast = false) => {
    try {
      setIsRefreshing(true);
      console.log("🔄 Loading leads from database...");
      
      const dbLeads = await fetchLeads();
      const convertedLeads = dbLeads.map(convertDatabaseLeadToLead);
      
      console.log("✅ Loaded leads:", convertedLeads.length, "leads");
      console.log("📊 Lead states distribution:", convertedLeads.reduce((acc, lead) => {
        acc[lead.stato] = (acc[lead.stato] || 0) + 1;
        return acc;
      }, {} as Record<string, number>));
      
      setLeads(convertedLeads);
      
      if (showRefreshToast) {
        toast({
          title: "Dati aggiornati",
          description: `Caricati ${convertedLeads.length} lead dal database`,
        });
      }
    } catch (error) {
      console.error("❌ Error loading leads:", error);
      toast({
        title: "Errore",
        description: "Impossibile caricare i lead dal database",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  // Initialize column order when data loads
  useEffect(() => {
    if (columnOrder.length === 0 && (Object.keys(leadStates).length > 0 || customColumns.length > 0)) {
      const defaultOrder = [
        ...Object.keys(leadStates),
        ...customColumns.map(col => col.id)
      ];
      setColumnOrder(defaultOrder);
    }
  }, [customColumns, columnOrder.length]);

  const filteredLeads = leads.filter(lead => 
    lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.cognome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.citta.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const allColumns = [
    ...Object.keys(leadStates).map(state => ({ id: state, type: 'default' as const })),
    ...customColumns.map(col => ({ id: col.id, type: 'custom' as const, column: col }))
  ];

  const leadsByState = allColumns.reduce((acc, col) => {
    const columnLeads = filteredLeads.filter(lead => lead.stato === col.id);
    const positions = leadPositions[col.id] || [];
    
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

  const orderedColumns = columnOrder.length > 0 
    ? columnOrder.map(id => {
        const defaultCol = Object.keys(leadStates).find(state => state === id);
        const customCol = customColumns.find(col => col.id === id);
        
        if (defaultCol) {
          return { id: defaultCol, type: 'default' as const };
        } else if (customCol) {
          return { id: customCol.id, type: 'custom' as const, column: customCol };
        }
        return null;
      }).filter(Boolean)
    : allColumns;

  const handleViewDetails = (lead: Lead) => {
    console.log("AdminLeads: handleViewDetails called with lead:", lead.id, lead.nome, lead.cognome);
    setSelectedLead(lead);
  };

  const handleCloseDetails = () => {
    console.log("AdminLeads: Closing lead details");
    setSelectedLead(null);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const activeId = event.active.id as string;
    console.log("🎯 Drag started:", activeId);
    
    // Check if dragging a column or a lead
    const isColumn = orderedColumns.some(col => col?.id === activeId);
    
    if (isColumn) {
      console.log("🎯 Dragging column:", activeId);
      setActiveId(null); // Don't show lead overlay for columns
    } else {
      console.log("🎯 Dragging lead:", activeId);
      setActiveId(activeId);
    }
    
    setDragOverColumn(null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over, active } = event;
    
    if (!over || !active) {
      setDragOverColumn(null);
      return;
    }

    const overId = over.id as string;
    const activeId = active.id as string;
    
    console.log("🎯 Drag over event:", { overId, activeId });

    // Check if we're over a column
    const targetColumn = allColumns.find(col => col.id === overId);
    if (targetColumn) {
      setDragOverColumn(overId);
      console.log("🎯 Dragging over column:", overId);
      return;
    }

    // Check if we're over a lead card
    const overLead = leads.find(lead => lead.id === overId);
    if (overLead) {
      setDragOverColumn(overLead.stato);
      console.log("🎯 Dragging over lead in column:", overLead.stato);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    console.log("🎯 Drag end event:", { active: active?.id, over: over?.id });
    
    setDragOverColumn(null);
    setActiveId(null);
    
    if (!over || !active) {
      console.log("🚫 Drag ended without valid target");
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    // Check if reordering columns
    const isActiveColumn = orderedColumns.some(col => col?.id === activeId);
    const isOverColumn = orderedColumns.some(col => col?.id === overId);

    if (isActiveColumn && isOverColumn && activeId !== overId) {
      console.log("🔄 Reordering columns:", activeId, "→", overId);
      
      const oldIndex = columnOrder.indexOf(activeId);
      const newIndex = columnOrder.indexOf(overId);
      
      const newOrder = [...columnOrder];
      const [removed] = newOrder.splice(oldIndex, 1);
      newOrder.splice(newIndex, 0, removed);
      
      setColumnOrder(newOrder);
      return;
    }

    // Handle lead drag (existing logic)
    const activeLead = leads.find(lead => lead.id === activeId);
    if (!activeLead) {
      console.log("❌ Active lead not found:", activeId);
      return;
    }

    const originalStatus = activeLead.stato;
    console.log("🔄 Status change attempt:", originalStatus, "→", overId);

    // Determine target column
    let targetColumn: string;
    
    // First check if overId is directly a column
    const isDirectColumn = allColumns.some(col => col.id === overId);
    
    if (isDirectColumn) {
      targetColumn = overId;
      console.log("📍 Dropped directly on column:", targetColumn);
    } else {
      // Check if dropped on another lead
      const overLead = leads.find(lead => lead.id === overId);
      if (overLead) {
        targetColumn = overLead.stato;
        console.log("📍 Dropped on lead, target column:", targetColumn);
      } else {
        console.log("❌ Could not determine target column for:", overId);
        return;
      }
    }

    console.log("🔄 Status change attempt:", originalStatus, "→", targetColumn);

    // If same column, handle reordering
    if (originalStatus === targetColumn && !isDirectColumn) {
      const overLead = leads.find(lead => lead.id === overId);
      if (overLead) {
        const columnLeads = leadsByState[originalStatus];
        const activeIndex = columnLeads.findIndex(lead => lead.id === activeId);
        const overIndex = columnLeads.findIndex(lead => lead.id === overId);

        if (activeIndex !== overIndex) {
          console.log("📝 Reordering within column");
          const newOrder = arrayMove(columnLeads, activeIndex, overIndex);
          setLeadPositions(prev => ({
            ...prev,
            [originalStatus]: newOrder.map(lead => lead.id)
          }));
        }
      }
      return;
    }

    // Different column - update status
    if (originalStatus !== targetColumn) {
      try {
        console.log("💾 Updating lead status:", activeId, "to", targetColumn);
        
        // Update UI optimistically
        setLeads(prev => prev.map(lead =>
          lead.id === activeId 
            ? { ...lead, stato: targetColumn as keyof typeof leadStates, dataUltimoContatto: new Date().toISOString() }
            : lead
        ));

        // Update database
        await updateLeadStatus(activeId, targetColumn);
        console.log("✅ Database update successful");
        
        const columnInfo = leadStates[targetColumn as keyof typeof leadStates] || 
                          customColumns.find(col => col.id === targetColumn);
        const displayName = customTitles[targetColumn] || columnInfo?.label || targetColumn;
        
        toast({
          title: "✅ Lead aggiornato",
          description: `${activeLead.nome} ${activeLead.cognome} è stato spostato in "${displayName}"`,
        });

        // Update position for moved lead
        setLeadPositions(prev => ({
          ...prev,
          [targetColumn]: [...(prev[targetColumn] || []).filter(id => id !== activeId), activeId]
        }));

      } catch (error) {
        console.error("💥 Database update failed:", error);
        
        // Rollback optimistic update
        setLeads(prev => prev.map(lead =>
          lead.id === activeId 
            ? { ...lead, stato: originalStatus as keyof typeof leadStates, dataUltimoContatto: activeLead.dataUltimoContatto }
            : lead
        ));
        
        toast({
          title: "❌ Errore",
          description: "Impossibile aggiornare lo stato del lead",
          variant: "destructive",
        });
      }
    }
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
    setColumnOrder(prev => [...prev, newColumn.id]);
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
    setColumnOrder(prev => prev.filter(id => id !== columnId));
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
    const csvContent = leads.map(lead => 
      `${lead.nome},${lead.cognome},${lead.email},${lead.telefono},${lead.citta},${lead.stimaMax},${lead.stato}`
    ).join('\n');
    
    const blob = new Blob([`Nome,Cognome,Email,Telefono,Città,Stima Max,Stato\n${csvContent}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    toast({
      title: "Export completato",
      description: "I dati sono stati esportati in formato CSV",
    });
  };

  const activeLead = activeId ? leads.find(lead => lead.id === activeId) : null;

  if (authLoading || isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Caricamento lead...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!isAdmin) {
    return null; // useAdminAuth will redirect
  }

  return (
    <AdminLayout>
      <div className="space-y-6 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestione Lead</h1>
            <p className="text-gray-600">
              Visualizza e gestisci tutti i preventivi richiesti ({leads.length} totali)
            </p>
          </div>
        </div>

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
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => loadLeads(true)}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Aggiorna
              </Button>
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

        <DndContext 
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 overflow-x-auto pb-4">
            <SortableContext
              items={columnOrder}
              strategy={horizontalListSortingStrategy}
            >
              {orderedColumns.map((col) => {
                if (!col) return null;
                
                return (
                  <SortableKanbanColumn
                    key={col.id}
                    stato={col.id}
                    leads={leadsByState[col.id] || []}
                    onViewDetails={handleViewDetails}
                    customTitle={customTitles[col.id]}
                    onTitleChange={handleTitleChange}
                    customColumn={col.type === 'custom' ? col.column : undefined}
                    onDeleteColumn={handleDeleteColumn}
                    isDefaultColumn={col.type === 'default'}
                    isDraggedOver={dragOverColumn === col.id}
                  />
                );
              })}
            </SortableContext>
          </div>
          
          <DragOverlay>
            {activeLead ? (
              <div className="transform rotate-3 scale-105">
                <LeadCard 
                  lead={activeLead} 
                  onViewDetails={() => {}} 
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>

        <LeadDetails
          lead={selectedLead}
          isOpen={!!selectedLead}
          onClose={handleCloseDetails}
        />

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
