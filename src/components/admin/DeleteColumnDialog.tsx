
import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

interface DeleteColumnDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  columnName: string;
  leadCount: number;
}

export const DeleteColumnDialog = ({
  isOpen,
  onClose,
  onConfirm,
  columnName,
  leadCount
}: DeleteColumnDialogProps) => {
  const [confirmText, setConfirmText] = useState("");
  const isConfirmValid = confirmText === "DELETE";

  const handleConfirm = () => {
    if (isConfirmValid) {
      onConfirm();
      setConfirmText("");
      onClose();
    }
  };

  const handleClose = () => {
    setConfirmText("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center transition-colors"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <h2 className="text-lg font-bold text-red-600">Elimina Colonna</h2>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          Stai per eliminare la colonna <strong>"{columnName}"</strong>.
        </p>

        {leadCount > 0 && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl mb-4">
            <p className="text-amber-800 text-sm">
              ⚠️ Attenzione: Ci sono <strong className="font-nums">{leadCount} lead</strong> in questa colonna.
              Verranno spostati automaticamente in "Nuovo".
            </p>
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">
              Per confermare, digita <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded-xl text-xs">DELETE</span>:
            </label>
            <input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Digita DELETE per confermare"
              className="w-full bg-white border border-gray-200 rounded-xl h-10 px-4 text-sm placeholder:text-gray-400 focus:border-[#d8010c] focus:ring-1 focus:ring-[#d8010c]/20 transition-colors outline-none"
              autoFocus
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleClose}
            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl px-4 py-2 font-medium text-sm transition-colors"
          >
            Annulla
          </button>
          <button
            onClick={handleConfirm}
            disabled={!isConfirmValid}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl px-6 py-2.5 shadow-sm hover:shadow-md transition-all active:scale-[0.98] text-sm disabled:bg-red-200 disabled:cursor-not-allowed"
          >
            Elimina Colonna
          </button>
        </div>
      </div>
    </div>
  );
};
