
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { availableColors, CustomColumn } from "@/data/mockLeads";

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

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Aggiungi Nuova Colonna</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="column-label">Nome Colonna</Label>
            <Input
              id="column-label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Inserisci nome colonna..."
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>
          
          <div>
            <Label>Colore</Label>
            <div className="grid grid-cols-6 gap-2 mt-2">
              {availableColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full ${color} ${
                    selectedColor === color ? 'ring-2 ring-gray-400 ring-offset-2' : ''
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={handleClose}>
              Annulla
            </Button>
            <Button onClick={handleSubmit} disabled={!label.trim()}>
              Aggiungi
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
