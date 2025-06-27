
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle } from "lucide-react";

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

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Elimina Colonna
          </DialogTitle>
          <DialogDescription className="text-left">
            Stai per eliminare la colonna <strong>"{columnName}"</strong>.
            {leadCount > 0 && (
              <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-yellow-800 text-sm">
                  ⚠️ Attenzione: Ci sono <strong>{leadCount} lead</strong> in questa colonna.
                  Verranno spostati automaticamente in "Nuovo".
                </p>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Per confermare, digita <span className="font-mono bg-gray-100 px-1 py-0.5 rounded">DELETE</span>:
            </label>
            <Input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Digita DELETE per confermare"
              className="mt-1"
              autoFocus
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose}>
            Annulla
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleConfirm}
            disabled={!isConfirmValid}
          >
            Elimina Colonna
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
