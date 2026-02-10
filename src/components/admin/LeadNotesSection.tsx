import { useState, useEffect, useRef } from "react";
import { MessageSquarePlus, MessageSquare, Send, Loader2, Trash2, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { fetchLeadNotes, addLeadNote, deleteLeadNote, LeadNote } from "@/services/leadService";
import { supabase } from "@/integrations/supabase/client";

interface LeadNotesSectionProps {
  leadId: string;
}

export const LeadNotesSection = ({ leadId }: LeadNotesSectionProps) => {
  const [notes, setNotes] = useState<LeadNote[]>([]);
  const [newNote, setNewNote] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    loadNotes();
    loadCurrentUser();
  }, [leadId]);

  const loadCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUserId(user?.id || null);
  };

  const loadNotes = async () => {
    setIsLoading(true);
    try {
      const data = await fetchLeadNotes(leadId);
      setNotes(data);
      // Auto-expand if there are already notes
      if (data.length > 0) {
        setIsExpanded(true);
      }
    } catch (err) {
      // silent fail on load
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    const trimmed = newNote.trim();
    if (!trimmed || isSending) return;

    setIsSending(true);
    try {
      const note = await addLeadNote(leadId, trimmed);
      setNotes((prev) => [note, ...prev]);
      setNewNote("");
      toast.success("Nota aggiunta");
    } catch (err: any) {
      toast.error(err.message || "Errore nell'aggiungere la nota");
    } finally {
      setIsSending(false);
    }
  };

  const handleDelete = async (noteId: string) => {
    setDeletingId(noteId);
    try {
      await deleteLeadNote(noteId);
      setNotes((prev) => prev.filter((n) => n.id !== noteId));
      toast.success("Nota eliminata");
    } catch (err: any) {
      toast.error(err.message || "Errore nell'eliminare la nota");
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const formatNoteDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getAuthorInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const hasNotes = !isLoading && notes.length > 0;

  // Collapsed state: clickable bar to expand
  if (!isExpanded && !isLoading) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-4 md:p-5 flex items-center justify-between hover:bg-gray-50 transition-colors group"
      >
        <span className="flex items-center gap-2 text-base md:text-lg font-bold text-gray-900">
          <MessageSquarePlus className="h-5 w-5 text-gray-700" />
          Aggiungi note e commenti
        </span>
        <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
      </button>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
      <h3 className="flex items-center gap-2 mb-3 md:mb-4 text-base md:text-lg font-bold text-gray-900">
        <MessageSquare className="h-5 w-5 text-gray-700" />
        {hasNotes ? "Note Interne" : "Aggiungi note e commenti"}
      </h3>

      {/* ── Input area ── */}
      <div className="flex gap-2 items-end mb-4">
        <textarea
          ref={textareaRef}
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Scrivi una nota..."
          rows={2}
          disabled={isSending}
          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 resize-none focus:border-[#d8010c] focus:ring-1 focus:ring-[#d8010c]/20 transition-colors outline-none disabled:opacity-50"
        />
        <button
          onClick={handleSubmit}
          disabled={!newNote.trim() || isSending}
          className={`flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center transition-all active:scale-95 ${
            newNote.trim() && !isSending
              ? "bg-[#d8010c] text-white hover:bg-[#b8000a] shadow-sm"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          {isSending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* ── Timeline ── */}
      {isLoading ? (
        <div className="flex items-center justify-center py-6">
          <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
        </div>
      ) : notes.length > 0 ? (
        <div className="border-l-2 border-gray-200 ml-2 space-y-0">
          {notes.map((note) => {
            const isOwn = currentUserId === note.user_id;
            const isConfirming = confirmDeleteId === note.id;
            const isDeleting = deletingId === note.id;

            return (
              <div key={note.id} className="relative pl-5 pb-4 last:pb-0 group">
                {/* Timeline dot */}
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-[#d8010c]" />

                {/* Note content */}
                <div className="bg-gray-50 rounded-xl p-3">
                  {/* Author & date header */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded-full bg-[#d8010c] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                      {getAuthorInitials(note.author_name)}
                    </div>
                    <span className="text-xs font-semibold text-gray-700 truncate">
                      {note.author_name}
                    </span>
                    <span className="text-[10px] md:text-xs text-gray-400 font-nums ml-auto flex-shrink-0">
                      {formatNoteDate(note.created_at)}
                    </span>

                    {/* Delete button — only for own notes */}
                    {isOwn && (
                      <div className="flex-shrink-0">
                        {isConfirming ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(note.id)}
                              disabled={isDeleting}
                              className="text-[10px] md:text-xs font-semibold text-white bg-[#d8010c] hover:bg-[#b8000a] rounded-lg px-2 py-0.5 transition-colors disabled:opacity-50"
                            >
                              {isDeleting ? "..." : "Elimina"}
                            </button>
                            <button
                              onClick={() => setConfirmDeleteId(null)}
                              disabled={isDeleting}
                              className="text-[10px] md:text-xs font-medium text-gray-500 hover:text-gray-700 rounded-lg px-1.5 py-0.5 transition-colors"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmDeleteId(note.id)}
                            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-[#d8010c] transition-all p-0.5 rounded"
                            title="Elimina nota"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Note text */}
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {note.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
