import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { SortableKanbanColumn } from "@/components/admin/SortableKanbanColumn";
import { LeadDetails } from "@/components/admin/LeadDetails";
import { AddColumnDialog } from "@/components/admin/AddColumnDialog";
import { leadStates, Lead, CustomColumn, convertDatabaseLeadToLead, counterColors } from "@/types/lead";
import { formatDateShort } from "@/lib/utils";
import { fetchLeads, updateLeadStatus } from "@/services/leadService";
import { Search, Filter, X as XIcon, Plus, RefreshCw, MoreHorizontal, ChevronDown, Eye, MapPin, Home, Euro, Calendar, Zap, Sun, Shield, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useIsMobile } from "@/hooks/use-mobile";
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
  const isMobile = useIsMobile();
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
  const [showMoreActions, setShowMoreActions] = useState(false);
  // Filters
  const [showFilters, setShowFilters] = useState(false);
  const [filterImpianti, setFilterImpianti] = useState<string[]>([]);
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [filterPriceMin, setFilterPriceMin] = useState("");
  const [filterPriceMax, setFilterPriceMax] = useState("");

  // Mobile-specific state
  const [mobileSelectedColumn, setMobileSelectedColumn] = useState<string>("nuovo");
  const [mobileColumnDropdownOpen, setMobileColumnDropdownOpen] = useState(false);

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
      const dbLeads = await fetchLeads();
      const convertedLeads = dbLeads.map(convertDatabaseLeadToLead);
      setLeads(convertedLeads);
      
      if (showRefreshToast) {
        toast.success("Dati aggiornati", {
          description: `Caricati ${convertedLeads.length} lead dal database`,
        });
      }
    } catch (error) {
      toast.error("Errore", {
        description: "Impossibile caricare i lead dal database",
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

  const activeFilterCount = [
    filterImpianti.length > 0,
    filterDateFrom !== "",
    filterDateTo !== "",
    filterPriceMin !== "",
    filterPriceMax !== "",
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setFilterImpianti([]);
    setFilterDateFrom("");
    setFilterDateTo("");
    setFilterPriceMin("");
    setFilterPriceMax("");
    setSearchTerm("");
  };

  const toggleImpianto = (imp: string) => {
    setFilterImpianti(prev =>
      prev.includes(imp) ? prev.filter(i => i !== imp) : [...prev, imp]
    );
  };

  const filteredLeads = leads.filter(lead => {
    // Text search (nome / cognome / email / città)
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        lead.nome.toLowerCase().includes(term) ||
        lead.cognome.toLowerCase().includes(term) ||
        lead.email.toLowerCase().includes(term) ||
        lead.citta.toLowerCase().includes(term);
      if (!matchesSearch) return false;
    }

    // Impianto configurato
    if (filterImpianti.length > 0) {
      const hasMatch = filterImpianti.some(imp => lead.moduliSelezionati.includes(imp));
      if (!hasMatch) return false;
    }

    // Data range
    if (filterDateFrom) {
      const leadDate = new Date(lead.dataRichiesta).toISOString().split('T')[0];
      if (leadDate < filterDateFrom) return false;
    }
    if (filterDateTo) {
      const leadDate = new Date(lead.dataRichiesta).toISOString().split('T')[0];
      if (leadDate > filterDateTo) return false;
    }

    // Fascia di prezzo
    if (filterPriceMin) {
      if (lead.stimaMax < Number(filterPriceMin)) return false;
    }
    if (filterPriceMax) {
      if (lead.stimaMin > Number(filterPriceMax)) return false;
    }

    return true;
  });

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

  // Get display label for a column
  const getColumnLabel = (colId: string) => {
    return customTitles[colId] 
      || leadStates[colId as keyof typeof leadStates]?.label 
      || customColumns.find(c => c.id === colId)?.label 
      || colId;
  };

  const handleViewDetails = (lead: Lead) => {
    setSelectedLead(lead);
  };

  const handleCloseDetails = () => {
    setSelectedLead(null);
  };

  // Move lead handler (used by LeadDetails on mobile)
  const handleMoveLead = async (leadId: string, targetColumnId: string) => {
    const leadToMove = leads.find(l => l.id === leadId);
    if (!leadToMove) return;

    const originalStatus = leadToMove.stato;
    if (originalStatus === targetColumnId) return;

    try {
      // Optimistic update
      setLeads(prev => prev.map(lead =>
        lead.id === leadId 
          ? { ...lead, stato: targetColumnId as keyof typeof leadStates, dataUltimoContatto: new Date().toISOString() }
          : lead
      ));

      await updateLeadStatus(leadId, targetColumnId);
      
      const displayName = getColumnLabel(targetColumnId);
      
      toast.success("✅ Lead spostato", {
        description: `${leadToMove.nome} ${leadToMove.cognome} spostato in "${displayName}"`,
      });

      // Update selected lead if it's the one we moved
      if (selectedLead?.id === leadId) {
        setSelectedLead(prev => prev ? { ...prev, stato: targetColumnId } : null);
      }

    } catch (error) {
      // Rollback
      setLeads(prev => prev.map(lead =>
        lead.id === leadId 
          ? { ...lead, stato: originalStatus as keyof typeof leadStates, dataUltimoContatto: leadToMove.dataUltimoContatto }
          : lead
      ));
      
      toast.error("❌ Errore", {
        description: "Impossibile spostare il lead",
      });
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const activeId = event.active.id as string;
    const isColumn = orderedColumns.some(col => col?.id === activeId);
    if (isColumn) {
      setActiveId(null);
    } else {
      setActiveId(activeId);
    }
    setDragOverColumn(null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over, active } = event;
    if (!over || !active) { setDragOverColumn(null); return; }

    const overId = over.id as string;
    const targetColumn = allColumns.find(col => col.id === overId);
    if (targetColumn) { setDragOverColumn(overId); return; }
    const overLead = leads.find(lead => lead.id === overId);
    if (overLead) { setDragOverColumn(overLead.stato); }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setDragOverColumn(null);
    setActiveId(null);
    if (!over || !active) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const isActiveColumn = orderedColumns.some(col => col?.id === activeId);
    const isOverColumn = orderedColumns.some(col => col?.id === overId);

    if (isActiveColumn && isOverColumn && activeId !== overId) {
      const oldIndex = columnOrder.indexOf(activeId);
      const newIndex = columnOrder.indexOf(overId);
      const newOrder = [...columnOrder];
      const [removed] = newOrder.splice(oldIndex, 1);
      newOrder.splice(newIndex, 0, removed);
      setColumnOrder(newOrder);
      return;
    }

    const activeLead = leads.find(lead => lead.id === activeId);
    if (!activeLead) return;

    const originalStatus = activeLead.stato;
    let targetColumn: string;
    const isDirectColumn = allColumns.some(col => col.id === overId);
    
    if (isDirectColumn) {
      targetColumn = overId;
    } else {
      const overLead = leads.find(lead => lead.id === overId);
      if (overLead) {
        targetColumn = overLead.stato;
      } else {
        return;
      }
    }

    if (originalStatus === targetColumn && !isDirectColumn) {
      const overLead = leads.find(lead => lead.id === overId);
      if (overLead) {
        const columnLeads = leadsByState[originalStatus];
        const activeIndex = columnLeads.findIndex(lead => lead.id === activeId);
        const overIndex = columnLeads.findIndex(lead => lead.id === overId);
        if (activeIndex !== overIndex) {
          const newOrder = arrayMove(columnLeads, activeIndex, overIndex);
          setLeadPositions(prev => ({
            ...prev,
            [originalStatus]: newOrder.map(lead => lead.id)
          }));
        }
      }
      return;
    }

    if (originalStatus !== targetColumn) {
      await handleMoveLead(activeId, targetColumn);
    }
  };

  const handleTitleChange = (stato: string, title: string) => {
    setCustomTitles(prev => ({ ...prev, [stato]: title }));
    toast.success("Titolo aggiornato", { description: `Titolo aggiornato a "${title}"` });
  };

  const handleAddColumn = (columnData: Omit<CustomColumn, 'id'>) => {
    const newColumn: CustomColumn = { ...columnData, id: `custom_${Date.now()}` };
    setCustomColumns(prev => [...prev, newColumn]);
    setColumnOrder(prev => [...prev, newColumn.id]);
    toast.success("Colonna aggiunta", { description: `"${columnData.label}" aggiunta` });
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
    setLeadPositions(prev => { const { [columnId]: _, ...rest } = prev; return rest; });
    toast.success("Colonna eliminata", {
      description: leadsToMove.length > 0 
        ? `Colonna eliminata. ${leadsToMove.length} lead spostati in "Nuovo"`
        : "Colonna eliminata",
    });
  };

  const activeLead = activeId ? leads.find(lead => lead.id === activeId) : null;

  if (authLoading || isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Caricamento lead...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!isAdmin) return null;

  // ── Mobile column leads
  const mobileLeads = leadsByState[mobileSelectedColumn] || [];
  const mobileColumnLabel = getColumnLabel(mobileSelectedColumn);
  const mobileColumnColor = counterColors[mobileSelectedColumn] 
    || customColumns.find(c => c.id === mobileSelectedColumn)?.color 
    || "bg-gray-500";

  // ── Available columns for move operation
  const availableColumnsForMove = allColumns.map(col => ({
    id: col.id,
    label: getColumnLabel(col.id),
  }));

  return (
    <AdminLayout>
      <div className="space-y-4 md:space-y-6 w-full pb-20 md:pb-0">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Gestione Lead</h1>
          <p className="text-sm md:text-base font-light text-gray-600">
            Visualizza e gestisci tutti i preventivi richiesti ({leads.length} totali)
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2 md:gap-3">
            <button 
              onClick={() => loadLeads(true)}
              disabled={isRefreshing}
              className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl px-3 md:px-4 py-2 font-medium text-sm transition-colors"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {!isMobile && "Aggiorna"}
            </button>

            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 border rounded-xl px-3 md:px-4 py-2 font-medium text-sm transition-colors relative ${
                showFilters || activeFilterCount > 0
                  ? 'bg-[#d8010c] border-[#d8010c] text-white hover:bg-[#b8000a]'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              {!isMobile && "Filtri"}
              {activeFilterCount > 0 && (
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  showFilters || activeFilterCount > 0
                    ? 'bg-white text-[#d8010c]'
                    : 'bg-[#d8010c] text-white'
                }`}>
                  {activeFilterCount}
                </span>
              )}
            </button>

            {isMobile ? (
              <div className="relative">
                <button 
                  onClick={() => setShowMoreActions(!showMoreActions)}
                  className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl px-3 py-2 font-medium text-sm transition-colors"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
                {showMoreActions && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowMoreActions(false)} />
                    <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden min-w-[180px]">
                      <button
                        onClick={() => { setIsAddColumnOpen(true); setShowMoreActions(false); }}
                        className="w-full text-left flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                        Aggiungi Colonna
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button 
                onClick={() => setIsAddColumnOpen(true)}
                className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl px-4 py-2 font-medium text-sm transition-colors"
              >
                <Plus className="h-4 w-4" />
                Aggiungi Colonna
              </button>
            )}
        </div>

        {/* ════════════════════════════════════════════════════
            FILTER PANEL
            ════════════════════════════════════════════════════ */}
        {showFilters && (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 md:p-5 space-y-5 animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <Filter className="h-4 w-4 text-[#d8010c]" />
                Filtri avanzati
              </h3>
              <div className="flex items-center gap-2">
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-[#d8010c] hover:text-[#b8000a] font-medium transition-colors flex items-center gap-1"
                  >
                    <XIcon className="h-3 w-3" />
                    Cancella tutto
                  </button>
                )}
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XIcon className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Mobile: stacked, Desktop: single row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[auto_1fr_1.2fr_1fr] gap-x-5 gap-y-4 items-end">
              {/* Impianto configurato */}
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">Impianto configurato</label>
                <div className="flex flex-col gap-1.5">
                  {[
                    { id: "elettrico", label: "Elettrico", icon: Zap },
                    { id: "fotovoltaico", label: "Fotovoltaico", icon: Sun },
                    { id: "sicurezza", label: "Sicurezza", icon: Shield },
                  ].map(imp => {
                    const isActive = filterImpianti.includes(imp.id);
                    const Icon = imp.icon;
                    return (
                      <button
                        key={imp.id}
                        onClick={() => toggleImpianto(imp.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border-2 transition-all duration-150 whitespace-nowrap ${
                          isActive
                            ? 'bg-[#d8010c]/10 border-[#d8010c] text-[#d8010c]'
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                        }`}
                      >
                        <Icon className={`h-4 w-4 flex-shrink-0 ${isActive ? 'text-[#d8010c]' : 'text-gray-400'}`} />
                        {imp.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Nome / Cognome */}
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">Nome / Cognome</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-3.5 w-3.5" />
                  <input
                    type="text"
                    placeholder="Cerca per nome..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg h-9 pl-9 pr-3 text-sm placeholder:text-gray-400 focus:border-[#d8010c] focus:ring-1 focus:ring-[#d8010c]/20 transition-colors outline-none"
                  />
                </div>
              </div>

              {/* Data richiesta */}
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">Data richiesta</label>
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={filterDateFrom}
                    onChange={(e) => setFilterDateFrom(e.target.value)}
                    title="Da"
                    className="flex-1 min-w-0 bg-gray-50 border border-gray-200 rounded-lg h-9 px-2.5 text-sm text-gray-700 focus:border-[#d8010c] focus:ring-1 focus:ring-[#d8010c]/20 transition-colors outline-none"
                  />
                  <span className="text-gray-300 text-xs flex-shrink-0">→</span>
                  <input
                    type="date"
                    value={filterDateTo}
                    onChange={(e) => setFilterDateTo(e.target.value)}
                    title="A"
                    className="flex-1 min-w-0 bg-gray-50 border border-gray-200 rounded-lg h-9 px-2.5 text-sm text-gray-700 focus:border-[#d8010c] focus:ring-1 focus:ring-[#d8010c]/20 transition-colors outline-none"
                  />
                </div>
              </div>

              {/* Fascia di prezzo */}
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">Fascia di prezzo (€)</label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1 min-w-0">
                    <Euro className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-3.5 w-3.5" />
                    <input
                      type="number"
                      placeholder="Min"
                      value={filterPriceMin}
                      onChange={(e) => setFilterPriceMin(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg h-9 pl-8 pr-2 text-sm placeholder:text-gray-400 focus:border-[#d8010c] focus:ring-1 focus:ring-[#d8010c]/20 transition-colors outline-none"
                    />
                  </div>
                  <span className="text-gray-300 text-xs flex-shrink-0">—</span>
                  <div className="relative flex-1 min-w-0">
                    <Euro className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-3.5 w-3.5" />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filterPriceMax}
                      onChange={(e) => setFilterPriceMax(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg h-9 pl-8 pr-2 text-sm placeholder:text-gray-400 focus:border-[#d8010c] focus:ring-1 focus:ring-[#d8010c]/20 transition-colors outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Active filter summary */}
            {activeFilterCount > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500 flex-shrink-0">Filtri attivi:</span>
                <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
                  {filterImpianti.map(imp => (
                    <span
                      key={imp}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-700"
                    >
                      {imp === 'elettrico' && <Zap className="h-3 w-3" />}
                      {imp === 'fotovoltaico' && <Sun className="h-3 w-3" />}
                      {imp === 'sicurezza' && <Shield className="h-3 w-3" />}
                      {imp.charAt(0).toUpperCase() + imp.slice(1)}
                      <button onClick={() => toggleImpianto(imp)} className="ml-0.5 hover:text-[#d8010c]">
                        <XIcon className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  {filterDateFrom && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-700">
                      <Calendar className="h-3 w-3 flex-shrink-0" /> Da: {filterDateFrom}
                      <button onClick={() => setFilterDateFrom("")} className="ml-0.5 hover:text-[#d8010c]">
                        <XIcon className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {filterDateTo && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-700">
                      <Calendar className="h-3 w-3 flex-shrink-0" /> A: {filterDateTo}
                      <button onClick={() => setFilterDateTo("")} className="ml-0.5 hover:text-[#d8010c]">
                        <XIcon className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {filterPriceMin && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-700">
                      <Euro className="h-3 w-3 flex-shrink-0" /> Min: €{Number(filterPriceMin).toLocaleString()}
                      <button onClick={() => setFilterPriceMin("")} className="ml-0.5 hover:text-[#d8010c]">
                        <XIcon className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {filterPriceMax && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-700">
                      <Euro className="h-3 w-3 flex-shrink-0" /> Max: €{Number(filterPriceMax).toLocaleString()}
                      <button onClick={() => setFilterPriceMax("")} className="ml-0.5 hover:text-[#d8010c]">
                        <XIcon className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">
                  {filteredLeads.length} / {leads.length} lead
                </span>
              </div>
            )}
          </div>
        )}

        {/* ════════════════════════════════════════════════════
            MOBILE VIEW: Column dropdown + full-width cards
            ════════════════════════════════════════════════════ */}
        {isMobile ? (
          <div className="space-y-4">
            {/* Column selector dropdown */}
            <div className="relative">
              <button
                onClick={() => setMobileColumnDropdownOpen(!mobileColumnDropdownOpen)}
                className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm transition-colors active:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-full flex-shrink-0 ${mobileColumnColor}`} />
                  <span className="font-semibold text-gray-900">{mobileColumnLabel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${mobileColumnColor}`}>
                    {mobileLeads.length}
                  </span>
                  <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${mobileColumnDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {mobileColumnDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setMobileColumnDropdownOpen(false)} />
                  <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden max-h-[60vh] overflow-y-auto">
                    {orderedColumns.map((col) => {
                      if (!col) return null;
                      const colLabel = getColumnLabel(col.id);
                      const colColor = counterColors[col.id] || (col.type === 'custom' ? col.column?.color : '') || "bg-gray-500";
                      const colLeadsCount = (leadsByState[col.id] || []).length;
                      const isSelected = col.id === mobileSelectedColumn;

                      return (
                        <button
                          key={col.id}
                          onClick={() => {
                            setMobileSelectedColumn(col.id);
                            setMobileColumnDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors ${
                            isSelected
                              ? 'bg-gray-50 font-semibold text-[#d8010c]'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${colColor}`} />
                            <span>{colLabel}</span>
                          </div>
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${colColor}`}>
                            {colLeadsCount}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Full-width cards list */}
            {mobileLeads.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <Search className="h-7 w-7 text-gray-300" />
                </div>
                <p className="text-sm font-medium">Nessun lead in "{mobileColumnLabel}"</p>
                <p className="text-xs mt-1 text-gray-300">I lead appariranno qui quando verranno assegnati a questa colonna</p>
              </div>
            ) : (
              <div className="space-y-3">
                {mobileLeads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => handleViewDetails(lead)}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 active:bg-gray-50 transition-colors cursor-pointer"
                  >
                    {/* Card header */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#d8010c] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {lead.nome.charAt(0)}{lead.cognome.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-base truncate">
                          {lead.nome} {lead.cognome}
                        </h3>
                        <p className="text-sm text-gray-500 flex items-center truncate">
                          <MapPin className="h-3 w-3 mr-1 text-gray-400 flex-shrink-0" />
                          {lead.citta}{lead.indirizzoDettagli?.cap ? `, ${lead.indirizzoDettagli.cap}` : ""}
                        </p>
                      </div>
                      <Eye className="h-5 w-5 text-gray-300 flex-shrink-0" />
                    </div>

                    {/* Card info */}
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <Home className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                        <span className="truncate">
                          {lead.tipologiaAbitazione === 'appartamento' ? 'Appart.' : 
                           lead.tipologiaAbitazione === 'casa indipendente' ? 'Casa' : 'Villa'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-gray-500 justify-center">
                        <span>{lead.superficie} mq</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm justify-end">
                        <Euro className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                        <span className="font-semibold text-[#d8010c] truncate">
                          €{lead.stimaMedia?.toLocaleString("it-IT") || "N/D"}
                        </span>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDateShort(lead.dataRichiesta)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* ════════════════════════════════════════════════════
             DESKTOP VIEW: Kanban with drag & drop
             ════════════════════════════════════════════════════ */
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
        )}

        <LeadDetails
          lead={selectedLead}
          isOpen={!!selectedLead}
          onClose={handleCloseDetails}
          onMoveLead={handleMoveLead}
          availableColumns={availableColumnsForMove}
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
