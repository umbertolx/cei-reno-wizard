import { FormData } from "../Configuratore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, CircleDot, Calendar, Clock, Info } from "lucide-react";
import { useState } from "react";
import { TipoProprietaSelector } from "./stimafinale/TipoProprietaSelector";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  stima: {
    min: number;
    max: number;
  };
  onBack: () => void;
  onSubmit: () => void;
};

export const StimaFinale = ({ formData, updateFormData, stima, onBack, onSubmit }: Props) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  // Formatta il prezzo con separatore migliaia
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Calcola le detrazioni
  const stimaMedia = Math.round((stima.min + stima.max) / 2);
  const detrazionePrimaCasa50 = Math.round(stimaMedia * 0.5);
  const detrazioneSecondaCasa36 = Math.round(stimaMedia * 0.36);

  const toggleAccordion = (value: string) => {
    setOpenAccordion(openAccordion === value ? null : value);
  };

  const isPrimaCasa = formData.tipoProprietà === 'prima casa';

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-5xl font-medium text-[#1c1c1c]">Stima finale</h1>
        <p className="text-lg md:text-xl text-[#1c1c1c] opacity-80">Ecco il costo stimato della tua ristrutturazione</p>
      </div>

      {/* Timeline migliorata e responsive */}
      <div className="flex justify-center mb-4 sm:mb-6 -mx-2 sm:mx-0">
        <div className="flex items-center w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl justify-between">
          {/* Punto 1: Info generali (completato) */}
          <div className="flex flex-col items-center relative">
            <div className="bg-[#d8010c] rounded-full w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center z-10">
              <CircleDot className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
            </div>
            <span className="text-[10px] sm:text-xs md:text-sm font-medium mt-1 sm:mt-2 text-center">Info generali</span>
          </div>
          
          {/* Linea di collegamento 1-2 */}
          <div className="h-[2px] flex-grow bg-[#d8010c] mx-0.5 sm:mx-2 relative top-[8px] sm:top-[10px]"></div>
          
          {/* Punto 2: Dati di contatto (completato) */}
          <div className="flex flex-col items-center relative">
            <div className="bg-[#d8010c] rounded-full w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center z-10">
              <CircleDot className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
            </div>
            <span className="text-[10px] sm:text-xs md:text-sm font-medium mt-1 sm:mt-2 text-center">Dati contatto</span>
          </div>
          
          {/* Linea di collegamento 2-3 */}
          <div className="h-[2px] flex-grow bg-[#fbe12e] mx-0.5 sm:mx-2 relative top-[8px] sm:top-[10px]"></div>
          
          {/* Punto 3: Stima finale (attivo) */}
          <div className="flex flex-col items-center relative">
            <div className="bg-[#fbe12e] rounded-full w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center z-10">
              <CircleDot className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-black" />
            </div>
            <span className="text-[10px] sm:text-xs md:text-sm font-medium mt-1 sm:mt-2 text-center">Stima finale</span>
          </div>
        </div>
      </div>

      {/* Stima dei costi */}
      <div className="bg-[#fbe12e] p-6 rounded-2xl space-y-4">
        <h2 className="text-2xl font-medium text-[#1c1c1c]">La tua stima</h2>
        
        <div className="text-center py-6">
          <span className="text-xl">da </span>
          <span className="text-3xl md:text-5xl font-bold">€ {formatPrice(stima.min)}</span>
          <span className="text-xl"> a </span>
          <span className="text-3xl md:text-5xl font-bold">€ {formatPrice(stima.max)}</span>
        </div>
        
        <div className="bg-white bg-opacity-50 p-4 rounded-lg text-center">
          <p className="text-lg text-[#1c1c1c]">
            È una stima calcolata in tempo reale. Per un budget preciso richiedi un sopralluogo.
          </p>
        </div>
      </div>

      {/* Selezione tipo proprietà */}
      <TipoProprietaSelector 
        value={formData.tipoProprietà || "prima casa"}
        onChange={(value) => updateFormData({ tipoProprietà: value })}
      />

      {/* Box Bonus e Detrazioni Fiscali */}
      <div className="bg-[#f4f4f4] p-6 rounded-2xl space-y-6">
        <h2 className="text-2xl font-medium text-[#1c1c1c]">Bonus e Detrazioni Fiscali</h2>
        
        <div className="space-y-4">
          {/* Bonus Ristrutturazione */}
          <Collapsible open={openAccordion === "bonus-ristrutturazione"} onOpenChange={() => toggleAccordion("bonus-ristrutturazione")}>
            <CollapsibleTrigger className="w-full bg-white p-4 rounded-lg border border-gray-200 hover:border-[#d8010c] transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-medium text-[#1c1c1c]">
                    Bonus Ristrutturazione - {isPrimaCasa ? 'Prima Casa' : 'Seconda Casa'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      Fino a € {formatPrice(isPrimaCasa ? detrazionePrimaCasa50 : detrazioneSecondaCasa36)}
                    </div>
                    <div className="text-sm text-[#1c1c1c]">detrazione fiscale IRPEF</div>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-[#1c1c1c] transition-transform ${openAccordion === "bonus-ristrutturazione" ? "rotate-180" : ""}`} />
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-white rounded-lg mt-2 border border-gray-200 overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
              <div className="p-4 space-y-3">
                <p className="text-[#1c1c1c]">
                  <strong>Descrizione:</strong> Detrazione del {isPrimaCasa ? '50%' : '36%'} su molti lavori edili in immobili residenziali {isPrimaCasa ? 'utilizzati come abitazione principale' : 'non utilizzati come abitazione principale'}.
                </p>
                <div className="space-y-2">
                  <p className="text-[#1c1c1c]"><strong>Regole:</strong></p>
                  <ul className="list-disc list-inside space-y-1 text-[#1c1c1c] ml-4">
                    <li>{isPrimaCasa ? '50% per abitazione principale' : '36% per altri immobili'}</li>
                    <li>Detrazione in 10 anni</li>
                    <li>Massimale di spesa: {isPrimaCasa ? '96.000 €' : '48.000 €'}</li>
                    <li>Si applica in automatico con bonifico e fattura corretti</li>
                    <li>Include: bagni, impianti, pavimenti, infissi</li>
                  </ul>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Ecobonus */}
          <Collapsible open={openAccordion === "ecobonus"} onOpenChange={() => toggleAccordion("ecobonus")}>
            <CollapsibleTrigger className="w-full bg-white p-4 rounded-lg border border-gray-200 hover:border-[#d8010c] transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-medium text-[#1c1c1c]">
                    Ecobonus 2025 - {isPrimaCasa ? 'Prima Casa' : 'Seconda Casa'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      Fino a € {formatPrice(isPrimaCasa ? detrazionePrimaCasa50 : detrazioneSecondaCasa36)}
                    </div>
                    <div className="text-sm text-[#1c1c1c]">detrazione fiscale IRPEF</div>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-[#1c1c1c] transition-transform ${openAccordion === "ecobonus" ? "rotate-180" : ""}`} />
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-white rounded-lg mt-2 border border-gray-200 overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
              <div className="p-4 space-y-3">
                <p className="text-[#1c1c1c]">
                  <strong>Descrizione:</strong> Detrazione del {isPrimaCasa ? '50%' : '36%'} per lavori di efficientamento energetico, cumulabile con il Bonus Casa.
                </p>
                <div className="space-y-2">
                  <p className="text-[#1c1c1c]"><strong>Interventi ammessi:</strong></p>
                  <ul className="list-disc list-inside space-y-1 text-[#1c1c1c] ml-4">
                    <li>Infissi e serramenti</li>
                    <li>Schermature solari</li>
                    <li>Pompe di calore</li>
                    <li>Caldaie non a combustibili fossili</li>
                    <li>Impianti elettrici: solo domotica</li>
                  </ul>
                  <p className="text-[#1c1c1c]"><strong>Requisiti obbligatori:</strong></p>
                  <ul className="list-disc list-inside space-y-1 text-[#1c1c1c] ml-4">
                    <li>Certificazione energetica APE prima e dopo i lavori</li>
                    <li>Miglioramento di almeno 2 classi energetiche</li>
                    <li>Asseverazione di un tecnico abilitato</li>
                  </ul>
                  <p className="text-[#1c1c1c]"><strong>Regole:</strong></p>
                  <ul className="list-disc list-inside space-y-1 text-[#1c1c1c] ml-4">
                    <li>{isPrimaCasa ? '50% per abitazione principale' : '36% per altri immobili'}</li>
                    <li>Valido solo su edifici esistenti</li>
                    <li>Detrazione in 10 anni</li>
                    <li>Cumulabile con il Bonus Ristrutturazione (massimali separati)</li>
                  </ul>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* IVA agevolata 10% */}
          <Collapsible open={openAccordion === "iva-agevolata"} onOpenChange={() => toggleAccordion("iva-agevolata")}>
            <CollapsibleTrigger className="w-full bg-white p-4 rounded-lg border border-gray-200 hover:border-[#d8010c] transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-medium text-[#1c1c1c]">IVA agevolata 10%</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-[#1c1c1c] transition-transform ${openAccordion === "iva-agevolata" ? "rotate-180" : ""}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-white rounded-lg mt-2 border border-gray-200 overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
              <div className="p-4 space-y-3">
                <p className="text-[#1c1c1c]">
                  <strong>Descrizione:</strong> Per i lavori eseguiti da impresa con fornitura di materiali e manodopera, l'IVA scende al 10%.
                </p>
                <div className="space-y-2">
                  <p className="text-[#1c1c1c]"><strong>Regole:</strong></p>
                  <ul className="list-disc list-inside space-y-1 text-[#1c1c1c] ml-4">
                    <li>Non si applica su acquisti diretti del cliente</li>
                    <li>Non si applica interamente su beni "significativi" (es. caldaie, infissi)</li>
                    <li>È già considerata nella stima</li>
                  </ul>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Frase finale sempre visibile */}
        <div className="bg-white bg-opacity-60 p-4 rounded-lg border-l-4 border-[#d8010c]">
          <p className="text-sm text-[#1c1c1c] flex items-start gap-2">
            <Info className="h-4 w-4 text-[#d8010c] mt-0.5 flex-shrink-0" />
            <span>Le detrazioni sono indicative e soggette a verifica fiscale. Parlane con il tuo commercialista per conferma.</span>
          </p>
        </div>
      </div>

      {/* Richiesta sopralluogo */}
      <div className="space-y-6">
        <h2 className="text-2xl font-medium text-[#1c1c1c]">Richiedi un sopralluogo gratuito</h2>
        <p className="text-base text-[#1c1c1c] opacity-80">
          Per un budget dettagliato, richiedi un sopralluogo. Inserisci la data e l'orario che preferisci.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-[#d8010c]" />
              <Label htmlFor="dataSopralluogo" className="text-lg">Data preferita</Label>
            </div>
            <Input 
              id="dataSopralluogo"
              type="date"
              value={formData.dataRichiestaSopralluogo || ""}
              onChange={(e) => updateFormData({ dataRichiestaSopralluogo: e.target.value })}
              className="text-lg p-6 rounded-lg"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-[#d8010c]" />
              <Label htmlFor="orarioSopralluogo" className="text-lg">Orario preferito</Label>
            </div>
            <Input 
              id="orarioSopralluogo"
              type="time"
              value={formData.orarioSopralluogo || ""}
              onChange={(e) => updateFormData({ orarioSopralluogo: e.target.value })}
              className="text-lg p-6 rounded-lg"
            />
          </div>
          
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="note" className="text-lg">Note aggiuntive (opzionale)</Label>
            <Textarea 
              id="note"
              value={formData.note || ""}
              onChange={(e) => updateFormData({ note: e.target.value })}
              className="text-lg p-6 rounded-lg min-h-[120px]"
              placeholder="Inserisci eventuali note o richieste particolari..."
            />
          </div>
        </div>
      </div>

      {/* Pulsanti */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button 
          onClick={onBack}
          variant="outline"
          className="flex-1 p-6 text-lg border-[#1c1c1c] text-[#1c1c1c] hover:bg-[#f4f4f4] rounded-xl"
        >
          Torna indietro
        </Button>
        
        <Button 
          onClick={onSubmit}
          className="flex-1 p-6 text-lg bg-[#fbe12e] hover:bg-[#d8010c] text-[#1c1c1c] hover:text-white rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
        >
          Richiedi sopralluogo
          <ChevronDown className="h-5 w-5 transform rotate-[-90deg]" />
        </Button>
      </div>
    </div>
  );
};
