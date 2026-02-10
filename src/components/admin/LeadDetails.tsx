import { useState } from "react";
import { Lead, leadStates } from "@/types/lead";
import { X, MapPin, Phone, Mail, Calendar, Euro, UserCircle, Building2, Zap, ArrowRightLeft, ChevronDown, Check } from "lucide-react";
import { ConfigurationSection } from "./lead-card/sections/ConfigurationSection";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatDateTime, getInitials } from "@/lib/utils";

interface ColumnOption {
  id: string;
  label: string;
}

interface LeadDetailsProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onMoveLead?: (leadId: string, targetColumnId: string) => Promise<void>;
  availableColumns?: ColumnOption[];
}

export const LeadDetails = ({ lead, isOpen, onClose, onMoveLead, availableColumns }: LeadDetailsProps) => {
  const isMobile = useIsMobile();
  const [showMovePanel, setShowMovePanel] = useState(false);
  const [selectedTargetColumn, setSelectedTargetColumn] = useState<string | null>(null);
  const [isMoving, setIsMoving] = useState(false);

  if (!lead || !isOpen) {
    return null;
  }

  const getTotalRooms = () => {
    const c = lead.composizione;
    return (c.cucine || 0) + (c.camere_doppie || 0) + (c.camere_singole || 0) + (c.bagni || 0) + (c.soggiorni || 0) + (c.altro || 0);
  };

  const stimaMedia = lead.stimaMin && lead.stimaMax ? Math.round((lead.stimaMin + lead.stimaMax) / 2) : 0;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(lead.email);
      toast.success("Email copiata negli appunti");
    } catch (err) {
      toast.error("Errore nella copia dell'email");
    }
  };

  const stateInfo = leadStates[lead.stato as keyof typeof leadStates];

  const handleMoveConfirm = async () => {
    if (!selectedTargetColumn || !onMoveLead) return;
    setIsMoving(true);
    try {
      await onMoveLead(lead.id, selectedTargetColumn);
      setShowMovePanel(false);
      setSelectedTargetColumn(null);
    } catch (error) {
      // Error handled in parent
    } finally {
      setIsMoving(false);
    }
  };

  const handleCloseMovePanel = () => {
    setShowMovePanel(false);
    setSelectedTargetColumn(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Content */}
      <div className="relative bg-white w-full md:max-w-4xl md:mx-4 rounded-t-2xl md:rounded-2xl shadow-xl overflow-y-auto max-h-[95vh] max-h-[95dvh] md:max-h-[90vh] md:max-h-[90dvh] safe-area-bottom">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 z-10 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white border border-gray-200 hover:bg-gray-50 shadow-sm flex items-center justify-center transition-colors"
        >
          <X className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
        </button>

        {/* Mobile drag handle */}
        <div className="md:hidden flex justify-center pt-2 pb-0">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* ═══════════════════ HEADER ═══════════════════ */}
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-[#d8010c] text-white font-bold text-base md:text-lg flex items-center justify-center flex-shrink-0">
              {getInitials(lead.nome, lead.cognome)}
            </div>
            <div className="flex-1 min-w-0 pr-10 md:pr-12">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 truncate">{lead.nome} {lead.cognome}</h2>
              <div className="flex items-center gap-2 md:gap-3 mt-1 flex-wrap">
                {stateInfo && (
                  <span className="bg-orange-100 text-orange-800 rounded-full px-3 py-1 text-xs font-semibold">
                    {stateInfo.label}
                  </span>
                )}
                <span className="text-xs text-gray-400 font-mono hidden md:inline">ID: {lead.id.substring(0, 8)}...</span>
                <span className="text-xs md:text-sm text-gray-500">Richiesta: <span className="font-nums">{formatDateTime(lead.dataRichiesta)}</span></span>
              </div>
            </div>
          </div>

          {/* Mobile "Sposta" button */}
          {isMobile && onMoveLead && availableColumns && (
            <button
              onClick={() => setShowMovePanel(true)}
              className="mt-3 w-full flex items-center justify-center gap-2 bg-[#d8010c] hover:bg-[#b8000a] text-white rounded-xl py-2.5 text-sm font-semibold shadow-sm active:scale-[0.98] transition-all"
            >
              <ArrowRightLeft className="h-4 w-4" />
              Sposta Lead
            </button>
          )}
        </div>

        {/* ═══════════════════ MOVE PANEL (Mobile) ═══════════════════ */}
        {showMovePanel && isMobile && onMoveLead && availableColumns && (
          <div className="fixed inset-0 z-[60] flex items-end justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={handleCloseMovePanel} />
            <div className="relative bg-white w-full rounded-t-2xl shadow-xl max-h-[75vh] max-h-[75dvh] flex flex-col">
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 bg-gray-300 rounded-full" />
              </div>
              <div className="px-4 py-3 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Sposta Lead</h3>
                <p className="text-sm text-gray-500 mt-0.5">
                  Seleziona la colonna di destinazione per <span className="font-medium text-gray-700">{lead.nome} {lead.cognome}</span>
                </p>
              </div>
              <div className="flex-1 overflow-y-auto px-2 py-2">
                {availableColumns.map((col) => {
                  const isCurrentColumn = col.id === lead.stato;
                  const isSelected = col.id === selectedTargetColumn;
                  return (
                    <button
                      key={col.id}
                      onClick={() => !isCurrentColumn && setSelectedTargetColumn(col.id)}
                      disabled={isCurrentColumn}
                      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl mb-1 transition-colors ${
                        isCurrentColumn
                          ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                          : isSelected
                            ? 'bg-[#d8010c]/10 border-2 border-[#d8010c] text-[#d8010c] font-semibold'
                            : 'bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          leadStates[col.id as keyof typeof leadStates]?.color || 'bg-gray-400'
                        }`} />
                        <span className="text-sm">{col.label}</span>
                        {isCurrentColumn && (
                          <span className="text-[10px] bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full font-medium">
                            Attuale
                          </span>
                        )}
                      </div>
                      {isSelected && (
                        <Check className="h-5 w-5 text-[#d8010c]" />
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="px-4 py-4 border-t border-gray-100 flex gap-3 pb-safe">
                <button
                  onClick={handleCloseMovePanel}
                  className="flex-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl py-3 text-sm font-semibold transition-colors"
                >
                  Annulla
                </button>
                <button
                  onClick={handleMoveConfirm}
                  disabled={!selectedTargetColumn || isMoving}
                  className={`flex-1 rounded-xl py-3 text-sm font-semibold transition-all active:scale-[0.98] ${
                    selectedTargetColumn && !isMoving
                      ? 'bg-[#d8010c] text-white hover:bg-[#b8000a]'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isMoving ? 'Spostamento...' : 'Conferma Spostamento'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════ SECTIONS ═══════════════════ */}
        <div className="space-y-4 md:space-y-6 p-4 md:p-6">

          {/* ── Informazioni di Contatto ── */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
            <h3 className="flex items-center gap-2 mb-3 md:mb-4 text-base md:text-lg font-bold text-gray-900">
              <UserCircle className="h-5 w-5 text-gray-700" />
              Informazioni di Contatto
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span 
                  onClick={copyEmail}
                  className="text-sm text-gray-900 cursor-pointer hover:text-[#d8010c] transition-colors truncate"
                >
                  {lead.email}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <a href={`tel:${lead.telefono}`} className="text-sm text-gray-900 hover:text-[#d8010c] transition-colors font-nums">
                  {lead.telefono}
                </a>
              </div>
              <div className="flex items-center gap-2 md:col-span-2">
                <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-sm text-gray-900 truncate">{lead.indirizzo}</div>
                  <div className="text-sm text-gray-500 truncate">
                    {lead.citta}{lead.indirizzoDettagli?.cap ? `, ${lead.indirizzoDettagli.cap}` : ""} ({lead.regione})
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Dettagli Immobile ── */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
            <h3 className="flex items-center gap-2 mb-3 md:mb-4 text-base md:text-lg font-bold text-gray-900">
              <Building2 className="h-5 w-5 text-gray-700" />
              Dettagli Immobile
            </h3>
            
            {/* 3 stat cards */}
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              <div className="bg-gray-50 rounded-xl p-3 md:p-4 text-center">
                <div className="text-xl md:text-2xl font-bold text-gray-900 font-nums">{lead.superficie}</div>
                <div className="text-[10px] md:text-xs text-gray-500">mq totali</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 md:p-4 text-center">
                <div className="text-xl md:text-2xl font-bold text-gray-900 font-nums">{getTotalRooms()}</div>
                <div className="text-[10px] md:text-xs text-gray-500">stanze totali</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 md:p-4 text-center">
                <div className="text-sm md:text-2xl font-bold text-gray-900 capitalize leading-tight">
                  {lead.tipologiaAbitazione}
                </div>
                <div className="text-[10px] md:text-xs text-gray-500">tipologia</div>
              </div>
            </div>

            {/* Composizione Stanze */}
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Composizione Stanze</h4>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {[
                  { key: "soggiorni", label: "Soggiorno" },
                  { key: "cucine", label: "Cucina" },
                  { key: "camere_doppie", label: "Cam. Doppia" },
                  { key: "camere_singole", label: "Cam. Singola" },
                  { key: "bagni", label: "Bagno" },
                  { key: "altro", label: "Altro" },
                ].map(({ key, label }) => (
                  <div key={key} className="bg-gray-50 rounded-xl p-2 md:p-3 text-center">
                    <div className="text-base md:text-lg font-bold text-gray-900 font-nums">
                      {(lead.composizione as any)[key] || 0}
                    </div>
                    <div className="text-[10px] md:text-xs text-gray-500">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Configurazione Tecnica ── */}
          <ConfigurationSection lead={lead} />

          {/* ── Analisi Economica ── */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
            <h3 className="flex items-center gap-2 mb-3 md:mb-4 text-base md:text-lg font-bold text-gray-900">
              <Euro className="h-5 w-5 text-gray-700" />
              Analisi Economica
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              <div className="border-2 border-green-200 bg-green-50/30 rounded-2xl p-4 md:p-5 text-center">
                <span className="inline-block bg-green-600 text-white rounded-full px-3 py-1 text-xs font-bold mb-2">Range Cliente</span>
                <div className="text-xs md:text-sm text-gray-600">Preventivo Minimo</div>
                <div className="text-xl md:text-2xl font-bold text-green-600 mt-1 font-nums">€{lead.stimaMin?.toLocaleString("it-IT")}</div>
              </div>
              
              <div className="border-2 border-blue-200 bg-blue-50/30 rounded-2xl p-4 md:p-5 text-center">
                <span className="inline-block bg-blue-600 text-white rounded-full px-3 py-1 text-xs font-bold mb-2">Stima Ricasa</span>
                <div className="text-xs md:text-sm text-gray-600">Valore Medio</div>
                <div className="text-xl md:text-2xl font-bold text-blue-600 mt-1 font-nums">€{stimaMedia?.toLocaleString("it-IT")}</div>
              </div>
              
              <div className="border-2 border-green-200 bg-green-50/30 rounded-2xl p-4 md:p-5 text-center">
                <span className="inline-block bg-green-600 text-white rounded-full px-3 py-1 text-xs font-bold mb-2">Range Cliente</span>
                <div className="text-xs md:text-sm text-gray-600">Preventivo Massimo</div>
                <div className="text-xl md:text-2xl font-bold text-green-600 mt-1 font-nums">€{lead.stimaMax?.toLocaleString("it-IT")}</div>
              </div>
            </div>
          </div>

          {/* ── Note del Cliente ── */}
          {lead.note && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">Note del Cliente</h3>
              <div className="bg-[#F9FBFF] border-l-4 border-[#d8010c] p-3 md:p-4 rounded-xl">
                <p className="text-sm text-gray-700 italic leading-relaxed">
                  "{lead.note}"
                </p>
              </div>
            </div>
          )}

          {/* ── Cronologia Contatti ── */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
            <h3 className="flex items-center gap-2 mb-3 md:mb-4 text-base md:text-lg font-bold text-gray-900">
              <Calendar className="h-5 w-5 text-gray-700" />
              Cronologia Contatti
            </h3>
            <div className="border-l-2 border-gray-200 ml-2">
              <div className="flex items-center justify-between py-3 pl-4 relative">
                <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#d8010c]" />
                <span className="text-sm text-gray-700">Richiesta inviata</span>
                  <span className="text-xs md:text-sm text-gray-500 font-nums">{formatDateTime(lead.dataRichiesta)}</span>
              </div>
              {lead.dataUltimoContatto && (
                <div className="flex items-center justify-between py-3 pl-4 relative">
                  <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-400" />
                  <span className="text-sm text-gray-700">Ultimo contatto</span>
                  <span className="text-xs md:text-sm text-gray-500 font-nums">{formatDateTime(lead.dataUltimoContatto)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
