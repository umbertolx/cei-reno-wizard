import { useState, useEffect } from "react";
import { FormData } from "../../Configuratore";
import { StickyNavigationBar } from "../../shared/StickyNavigationBar";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Check } from "lucide-react";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const SelezioneAmbienti = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [ambientiSelezionati, setAmbientiSelezionati] = useState<string[]>(
    formData.ambientiSelezionati || []
  );

  // Genera la lista degli ambienti dalla composizione
  const generaAmbienti = (): string[] => {
    const ambienti: string[] = [];
    const composizione = formData.informazioniGenerali?.composizione || formData.composizione || {
      soggiorno: 0,
      cucina: 0,
      cameraDoppia: 0,
      cameraSingola: 0,
      bagno: 0,
      altro: 0
    };

    if (composizione.soggiorno > 0) {
      for (let i = 1; i <= composizione.soggiorno; i++) {
        ambienti.push(composizione.soggiorno === 1 ? "Soggiorno" : `Soggiorno ${i}`);
      }
    }

    if (composizione.cucina > 0) {
      ambienti.push("Cucina");
    }

    if (composizione.cameraDoppia > 0) {
      for (let i = 1; i <= composizione.cameraDoppia; i++) {
        ambienti.push(composizione.cameraDoppia === 1 ? "Camera matrimoniale" : `Camera matrimoniale ${i}`);
      }
    }

    if (composizione.cameraSingola > 0) {
      for (let i = 1; i <= composizione.cameraSingola; i++) {
        ambienti.push(composizione.cameraSingola === 1 ? "Camera singola" : `Camera singola ${i}`);
      }
    }

    if (composizione.bagno > 0) {
      for (let i = 1; i <= composizione.bagno; i++) {
        ambienti.push(composizione.bagno === 1 ? "Bagno" : `Bagno ${i}`);
      }
    }

    if (composizione.altro > 0) {
      for (let i = 1; i <= composizione.altro; i++) {
        ambienti.push(composizione.altro === 1 ? "Altro ambiente" : `Altro ambiente ${i}`);
      }
    }

    return ambienti;
  };

  const ambientiDisponibili = generaAmbienti();
  const tuttiSelezionati = ambientiSelezionati.length === ambientiDisponibili.length;

  const handleAmbienteToggle = (ambiente: string) => {
    setAmbientiSelezionati(prev => {
      if (prev.includes(ambiente)) {
        return prev.filter(a => a !== ambiente);
      } else {
        return [...prev, ambiente];
      }
    });
  };

  const handleSelezionaTutti = () => {
    if (tuttiSelezionati) {
      setAmbientiSelezionati([]);
    } else {
      setAmbientiSelezionati([...ambientiDisponibili]);
    }
  };

  const handleNext = () => {
    if (ambientiSelezionati.length === 0) {
      toast({
        title: "Attenzione",
        description: "Seleziona almeno un ambiente per continuare",
        variant: "destructive",
      });
      return;
    }

    updateFormData({ ambientiSelezionati });
    onNext();
  };

  // Aggiorna i dati quando cambiano le selezioni
  useEffect(() => {
    updateFormData({ ambientiSelezionati });
  }, [ambientiSelezionati, updateFormData]);

  return (
    <>
      <div className="space-y-6">
        {/* Badge */}
        <div className="flex justify-center">
          <div className="bg-[#d8010c] text-white px-3 py-1.5 md:px-6 md:py-3 rounded-full text-sm font-medium">
            Impianto elettrico
          </div>
        </div>

        {/* Contenuto principale */}
        <div className="max-w-4xl md:mx-auto space-y-6 md:space-y-8 mt-8 md:mt-16">
          <div className="space-y-4 md:space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4 px-3 md:px-0">
              <div className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] flex-shrink-0 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/417ced15-f2dc-47e1-8b8c-d0faf5b9717e.png" 
                  alt="Rooms selection icon" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-medium text-[#1c1c1c]">Seleziona gli ambienti</h2>
                <p className="text-base text-[#1c1c1c] opacity-80">
                  In quali stanze vuoi intervenire con i lavori elettrici?
                </p>
              </div>
              {ambientiSelezionati.length > 0 && (
                <div className="text-xs md:text-sm font-medium px-2 py-1 md:px-3 md:py-1.5 rounded-lg border bg-[#d8010c]/5 text-[#d8010c] border-[#d8010c]/20">
                  {`${ambientiSelezionati.length} di ${ambientiDisponibili.length}`}
                </div>
              )}
            </div>

            {/* Bottone Seleziona tutti */}
            <div className="px-3 md:px-0">
              <Button
                variant="outline"
                onClick={handleSelezionaTutti}
                className="border-[#d8010c] text-[#d8010c] hover:bg-[#d8010c]/5"
              >
                {tuttiSelezionati ? "Deseleziona tutti" : "Seleziona tutti"}
              </Button>
            </div>

            {/* Grid degli ambienti - usando lo stesso stile di QuestionWithOptions */}
            <div className="px-3 md:px-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ambientiDisponibili.map((ambiente) => {
                  const isSelected = ambientiSelezionati.includes(ambiente);
                  
                  return (
                    <div
                      key={ambiente}
                      onClick={() => handleAmbienteToggle(ambiente)}
                      className={`
                        rounded-xl transition-all duration-300 border cursor-pointer p-4
                        ${isSelected 
                          ? 'bg-[#d8010c]/5 border-[#d8010c] text-[#1c1c1c] shadow-sm' 
                          : 'bg-white border-gray-200 hover:border-[#d8010c] hover:shadow-sm'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-base text-[#1c1c1c]">
                            {ambiente}
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 bg-[#d8010c] rounded-full flex items-center justify-center ml-3">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <StickyNavigationBar
        onBack={onBack}
        onNext={handleNext}
        isNextDisabled={ambientiSelezionati.length === 0}
      />
    </>
  );
};
