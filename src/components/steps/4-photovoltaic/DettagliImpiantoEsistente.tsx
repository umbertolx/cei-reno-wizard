import { FormData } from "../../Configuratore";
import { StepLayout } from "../../templates";
import { InfoBox, InfoBoxType } from "../../shared/InfoBox";
import { Separator } from "../../ui/separator";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useState } from "react";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const DettagliImpiantoEsistente = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const potenzaImpianto = formData.moduloFotovoltaico?.potenzaImpianto || "";
  const annoInstallazione = formData.moduloFotovoltaico?.annoInstallazione || "";
  const hasBatteria = formData.moduloFotovoltaico?.hasBatteria || "";
  
  const [openInfoBox, setOpenInfoBox] = useState<string | null>(null);

  const handleFieldChange = (fieldId: string, value: any) => {
    if (fieldId === 'potenzaImpianto') {
      updateFormData({ 
        moduloFotovoltaico: { 
          ...formData.moduloFotovoltaico, 
          potenzaImpianto: value 
        } 
      });
    } else if (fieldId === 'annoInstallazione') {
      updateFormData({ 
        moduloFotovoltaico: { 
          ...formData.moduloFotovoltaico, 
          annoInstallazione: value 
        } 
      });
    } else if (fieldId === 'hasBatteria') {
      updateFormData({ 
        moduloFotovoltaico: { 
          ...formData.moduloFotovoltaico, 
          hasBatteria: value 
        } 
      });
    }
  };

  const validateForm = () => {
    return !!(potenzaImpianto && annoInstallazione && hasBatteria);
  };

  const infoBoxes: Record<string, InfoBoxType> = {
    potenza: {
      title: "Perché la potenza è importante?",
      content: "Conoscere la potenza attuale ci permette di calcolare l'ampliamento ottimale e verificare la compatibilità con l'inverter esistente."
    },
    anno: {
      title: "Perché l'anno è importante?", 
      content: "L'età dell'impianto influenza la tecnologia disponibile e gli incentivi applicabili per l'ampliamento."
    },
    batteria: {
      title: "Perché la batteria è importante?",
      content: "Se hai già una batteria, possiamo ottimizzare l'ampliamento per massimizzare l'autoconsumo. Senza batteria, potremmo consigliarti di aggiungerne una."
    }
  };

  return (
    <StepLayout
      badge="Ampliamento fotovoltaico"
      title="Dettagli dell'impianto esistente"
      description="Forniscimi alcune informazioni sul tuo impianto attuale"
      onNext={onNext}
      onBack={onBack}
      isNextDisabled={!validateForm()}
    >
      <div className="space-y-8">
        {/* Potenza impianto */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Potenza impianto
          </h2>
          
          <InfoBox
            {...infoBoxes.potenza}
            isOpen={openInfoBox === 'potenza'}
            onToggle={(isOpen) => setOpenInfoBox(isOpen ? 'potenza' : null)}
          />
          
          <div className="space-y-3">
            <Label htmlFor="potenzaImpianto" className="text-base font-medium text-muted-foreground">
              Inserisci la potenza in kWp (per esempio: 3.0)
            </Label>
            <Input
              id="potenzaImpianto"
              type="number"
              step="0.1"
              min="0"
              max="50"
              value={potenzaImpianto || ""}
              onChange={(e) => handleFieldChange('potenzaImpianto', e.target.value)}
              placeholder="Es. 3.0"
              className="text-base h-12"
            />
          </div>
        </div>

        <Separator className="my-8" />

        {/* Anno di installazione */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Anno di installazione
          </h2>
          
          <InfoBox
            {...infoBoxes.anno}
            isOpen={openInfoBox === 'anno'}
            onToggle={(isOpen) => setOpenInfoBox(isOpen ? 'anno' : null)}
          />
          
          <div className="grid gap-3">
            {[
              { id: "prima-2015", label: "Prima del 2015" },
              { id: "2015-2020", label: "Tra il 2015 e il 2020" },
              { id: "dopo-2020", label: "Dopo il 2020" }
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => handleFieldChange('annoInstallazione', option.id)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                  annoInstallazione === option.id
                    ? 'bg-primary/5 border-primary text-foreground shadow-sm'
                    : 'bg-card border-border hover:border-primary hover:shadow-sm'
                }`}
              >
                <div className="font-semibold">{option.label}</div>
              </button>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        {/* Batteria di accumulo */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Batteria di accumulo esistente
          </h2>
          
          <InfoBox
            {...infoBoxes.batteria}
            isOpen={openInfoBox === 'batteria'}
            onToggle={(isOpen) => setOpenInfoBox(isOpen ? 'batteria' : null)}
          />
          
          <div className="grid gap-3">
            {[
              { id: "si", label: "Sì, ho già una batteria" },
              { id: "no", label: "No, non ho una batteria" }
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => handleFieldChange('hasBatteria', option.id)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                  hasBatteria === option.id
                    ? 'bg-primary/5 border-primary text-foreground shadow-sm'
                    : 'bg-card border-border hover:border-primary hover:shadow-sm'
                }`}
              >
                <div className="font-semibold">{option.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </StepLayout>
  );
};