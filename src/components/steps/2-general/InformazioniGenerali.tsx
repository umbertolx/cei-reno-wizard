
import { useState, useEffect } from "react";
import { FormData } from "../../Configuratore";
import { StepLayout } from "../../templates";
import { toast } from "@/hooks/use-toast";
import { TipoAbitazione } from "./sub-components/TipoAbitazione";
import { SuperficieSlider } from "./sub-components/SuperficieSlider";
import { IndirizzoField } from "./sub-components/IndirizzoField";
import { SuddivisioneSpazi } from "./sub-components/SuddivisioneSpazi";
import { UtilizzoAbitazioneSelector } from "../5-final/sub-components/UtilizzoAbitazioneSelector";
import { NumeroPersoneSelector } from "./sub-components/NumeroPersoneSelector";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const InformazioniGenerali = ({ formData, updateFormData, onNext, onBack }: Props) => {
  // Pre-compila i dati se non sono già presenti nella nuova struttura
  useEffect(() => {
    if (!formData.informazioniGenerali?.tipologiaAbitazione) {
      updateFormData({
        informazioniGenerali: {
          tipologiaAbitazione: "appartamento",
          superficie: 85,
          indirizzo: "Via Roma 123",
          citta: "Milano",
          cap: "20100",
          regione: "Lombardia",
          piano: "2",
          utilizzoAbitazione: "prima casa",
          numeroPersone: 2,
          composizione: {
            cucina: 1,
            cameraDoppia: 1,
            cameraSingola: 1,
            soggiorno: 1,
            bagno: 2,
            altro: 0
          }
        }
      });
    }
  }, [formData.informazioniGenerali, updateFormData]);

  const info = formData.informazioniGenerali || {
    tipologiaAbitazione: "",
    superficie: 0,
    indirizzo: "",
    citta: "",
    cap: "",
    regione: "",
    piano: "",
    utilizzoAbitazione: "prima casa",
    numeroPersone: 2,
    composizione: {
      cucina: 0,
      cameraDoppia: 0,
      cameraSingola: 0,
      bagno: 0,
      soggiorno: 0,
      altro: 0
    }
  };

  const totalRooms = Object.values(info.composizione).reduce((sum, count) => sum + count, 0);
  
  // Silent validation for button state (no toasts)
  const isFormValid = () => {
    if (!info.tipologiaAbitazione) return false;
    if (!info.superficie || info.superficie <= 0) return false;
    if (!info.indirizzo) return false;
    if (!info.utilizzoAbitazione) return false;
    if (!info.numeroPersone || info.numeroPersone < 1) return false;
    
    const { cucina, cameraDoppia, cameraSingola, soggiorno, bagno } = info.composizione;
    if (cucina + cameraDoppia + cameraSingola + soggiorno + bagno === 0) return false;
    
    return true;
  };

  // Validation with toast messages for submit
  const validateFormWithToasts = () => {
    if (!info.tipologiaAbitazione) {
      toast({
        title: "Attenzione",
        description: "Seleziona la tipologia di abitazione",
        variant: "destructive",
      });
      return false;
    }
    
    if (!info.superficie || info.superficie <= 0) {
      toast({
        title: "Attenzione",
        description: "Inserisci una superficie valida",
        variant: "destructive",
      });
      return false;
    }
    
    if (!info.indirizzo) {
      toast({
        title: "Attenzione",
        description: "Inserisci l'indirizzo completo",
        variant: "destructive",
      });
      return false;
    }

    if (!info.utilizzoAbitazione) {
      toast({
        title: "Attenzione",
        description: "Seleziona il tipo di proprietà",
        variant: "destructive",
      });
      return false;
    }

    if (!info.numeroPersone || info.numeroPersone < 1) {
      toast({
        title: "Attenzione",
        description: "Inserisci il numero di persone che vivono nell'abitazione",
        variant: "destructive",
      });
      return false;
    }
    
    const { cucina, cameraDoppia, cameraSingola, soggiorno, bagno } = info.composizione;
    if (cucina + cameraDoppia + cameraSingola + soggiorno + bagno === 0) {
      toast({
        title: "Attenzione",
        description: "Inserisci almeno una stanza nella suddivisione degli spazi",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const selectLocation = (location: string) => {
    const [indirizzo, citta, cap, regione] = location.split(", ");
    updateFormData({
      informazioniGenerali: {
        ...info,
        indirizzo: location,
        citta,
        cap,
        regione
      }
    });
  };
  
  const handleSubmit = () => {
    if (validateFormWithToasts()) {
      onNext();
    }
  };

  const handleChangeComposizione = (tipo: keyof typeof info.composizione, value: number) => {
    updateFormData({
      informazioniGenerali: {
        ...info,
        composizione: {
          ...info.composizione,
          [tipo]: value
        }
      }
    });
  };

  return (
    <StepLayout
      badge="Impianti Civili"
      title="Informazioni generali"
      description="Inizia la configurazione inserendo le caratteristiche dell'immobile"
      onNext={handleSubmit}
      onBack={onBack}
      isNextDisabled={!isFormValid()}
    >
      <div className="space-y-6">
        {/* Tipo Abitazione */}
        <div>
          <h2 className="text-xl font-medium text-[#1c1c1c] mb-4">
            Tipo di abitazione
          </h2>
          <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
            <TipoAbitazione
              value={info.tipologiaAbitazione}
              onChange={(type) => updateFormData({
                informazioniGenerali: { ...info, tipologiaAbitazione: type }
              })}
            />
          </div>
        </div>

        {/* Superficie */}
        <div>
          <h2 className="text-xl font-medium text-[#1c1c1c] mb-4">
            Superficie abitazione (mq)
          </h2>
          <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
            <SuperficieSlider
              value={info.superficie}
              onChange={(value) => updateFormData({
                informazioniGenerali: { ...info, superficie: value }
              })}
            />
          </div>
        </div>

        {/* Indirizzo */}
        <div>
          <h2 className="text-xl font-medium text-[#1c1c1c] mb-4">
            Indirizzo immobile
          </h2>
          <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
            <IndirizzoField
              value={info.indirizzo}
              onChange={(value) => updateFormData({
                informazioniGenerali: { ...info, indirizzo: value }
              })}
              onSelectLocation={selectLocation}
            />
          </div>
        </div>

        {/* Utilizzo Abitazione */}
        <div>
          <h2 className="text-xl font-medium text-[#1c1c1c] mb-4">
            Utilizzo abitazione
          </h2>
          <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
            <UtilizzoAbitazioneSelector
              value={info.utilizzoAbitazione}
              onChange={(value) => updateFormData({
                informazioniGenerali: { ...info, utilizzoAbitazione: value }
              })}
            />
          </div>
        </div>

        {/* Numero Persone */}
        <div>
          <h2 className="text-xl font-medium text-[#1c1c1c] mb-4">
            Numero di persone
          </h2>
          <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
            <NumeroPersoneSelector
              value={info.numeroPersone}
              onChange={(value) => updateFormData({
                informazioniGenerali: { ...info, numeroPersone: value }
              })}
            />
          </div>
        </div>

        {/* Suddivisione Spazi */}
        <div>
          <h2 className="text-xl font-medium text-[#1c1c1c] mb-4">
            Suddivisione spazi ({totalRooms} {totalRooms === 1 ? 'stanza' : 'stanze'})
          </h2>
          <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
            <SuddivisioneSpazi
              composizione={info.composizione}
              onChangeStanza={handleChangeComposizione}
              totalRooms={totalRooms}
            />
          </div>
        </div>
      </div>
    </StepLayout>
  );
};
