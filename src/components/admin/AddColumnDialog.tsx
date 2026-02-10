
import { useState } from "react";
import { availableColors, CustomColumn } from "@/types/lead";
import { X } from "lucide-react";

interface AddColumnDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (column: Omit<CustomColumn, 'id'>) => void;
  existingColumns: CustomColumn[];
}

export const AddColumnDialog = ({ isOpen, onClose, onAdd, existingColumns }: AddColumnDialogProps) => {
  const [label, setLabel] = useState("");
  const [selectedColor, setSelectedColor] = useState(availableColors[0]);

  const handleSubmit = () => {
    if (label.trim()) {
      onAdd({
        label: label.trim(),
        color: selectedColor,
        order: Math.max(...existingColumns.map(c => c.order), 0) + 1
      });
      setLabel("");
      setSelectedColor(availableColors[0]);
      onClose();
    }
  };

  const handleClose = () => {
    setLabel("");
    setSelectedColor(availableColors[0]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white border border-gray-200 hover:bg-[#F9FBFF] flex items-center justify-center transition-colors"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>

        <h2 className="text-lg font-bold text-gray-900 mb-6">Aggiungi Nuova Colonna</h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="column-label" className="block text-sm font-semibold text-gray-900 mb-1.5">
              Nome Colonna
            </label>
            <input
              id="column-label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Inserisci nome colonna..."
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              className="w-full bg-white border border-gray-200 rounded-xl h-10 px-4 text-sm placeholder:text-gray-400 focus:border-[#d8010c] focus:ring-1 focus:ring-[#d8010c]/20 transition-colors outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Colore</label>
            <div className="grid grid-cols-6 gap-2">
              {availableColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full ${color} transition-all ${
                    selectedColor === color ? 'ring-2 ring-gray-400 ring-offset-2 scale-110' : 'hover:scale-105'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={handleClose}
              className="bg-white border border-gray-300 text-gray-700 hover:bg-[#F9FBFF] rounded-xl px-4 py-2 font-medium text-sm transition-colors"
            >
              Annulla
            </button>
            <button
              onClick={handleSubmit}
              disabled={!label.trim()}
              className="bg-[#d8010c] hover:bg-[#b8000a] text-white font-semibold rounded-xl px-6 py-2.5 shadow-sm hover:shadow-md transition-all active:scale-[0.98] text-sm disabled:bg-[#f5b7b1] disabled:cursor-not-allowed"
            >
              Aggiungi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
