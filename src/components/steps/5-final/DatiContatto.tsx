import { FormData } from "../../Configuratore";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { User, Phone, Mail, CircleDot, ChevronDown, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useLatestLead } from "@/hooks/useLatestLead";
type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onBack: () => void;
  onNext: () => void;
  isCalculatingEstimate?: boolean;
};
export const DatiContatto = ({
  formData,
  updateFormData,
  onBack,
  onNext,
  isCalculatingEstimate = false
}: Props) => {
  const [accettoDisclaimer, setAccettoDisclaimer] = useState(false);
  
  const {
    lead,
    isLoading: isLoadingLead
  } = useLatestLead(formData.contatti?.email);
  console.log("🔍 DatiContatto - Current lead from DB:", lead);
  console.log("📋 DatiContatto - Current formData:", formData);
  const validateForm = () => {
    if (!formData.contatti?.nome?.trim()) {
      toast({
        title: "Campo mancante",
        description: "Inserisci il tuo nome",
        variant: "destructive"
      });
      return false;
    }
    if (!formData.contatti?.cognome?.trim()) {
      toast({
        title: "Campo mancante",
        description: "Inserisci il tuo cognome",
        variant: "destructive"
      });
      return false;
    }
    if (!formData.contatti?.email?.trim() || !/^\S+@\S+\.\S+$/.test(formData.contatti.email)) {
      toast({
        title: "Email non valida",
        description: "Inserisci un indirizzo email valido",
        variant: "destructive"
      });
      return false;
    }
    if (!formData.contatti?.telefono?.trim() || formData.contatti.telefono.length < 8) {
      toast({
        title: "Telefono non valido",
        description: "Inserisci un numero di telefono valido",
        variant: "destructive"
      });
      return false;
    }
    if (!formData.contatti?.accettoTermini) {
      toast({
        title: "Termini e condizioni",
        description: "Devi accettare i termini e le condizioni per continuare",
        variant: "destructive"
      });
      return false;
    }
    if (!accettoDisclaimer) {
      toast({
        title: "Disclaimer richiesto",
        description: "Devi confermare di aver compreso il carattere indicativo della stima",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };
  const handleSubmit = () => {
    if (validateForm()) {
      onNext();
    }
  };
  const getConfigurationSummary = () => {
    // Use database data if available, fallback to form data
    const dataSource = lead || {
      tipologia_abitazione: formData.tipologiaAbitazione || formData.informazioniGenerali?.tipologiaAbitazione,
      superficie: formData.superficie || formData.informazioniGenerali?.superficie,
      indirizzo: formData.indirizzo || formData.informazioniGenerali?.indirizzo,
      citta: formData.citta || formData.informazioniGenerali?.citta,
      numero_persone: formData.informazioniGenerali?.numeroPersone,
      utilizzoabitazione: formData.informazioniGenerali?.utilizzoAbitazione,
      composizione: formData.composizione || formData.informazioniGenerali?.composizione,
      moduli_selezionati: formData.moduliSelezionati,
      modulo_elettrico: formData.moduloElettrico,
      modulo_fotovoltaico: formData.moduloFotovoltaico
    };
    console.log("📊 Using data source for summary:", dataSource);
    const configurazioni = [];

    // Check electrical module
    if (dataSource.moduli_selezionati?.includes('impianto-elettrico') || dataSource.modulo_elettrico) {
      const elettrico = dataSource.modulo_elettrico;
      if (elettrico?.tipoRistrutturazione) {
        configurazioni.push(`Ristrutturazione ${elettrico.tipoRistrutturazione}`);
        if (elettrico.tipoImpianto) {
          const tipoImpianto = elettrico.tipoImpianto === 'livello1' ? 'Base' : elettrico.tipoImpianto === 'livello2' ? 'Avanzato' : elettrico.tipoImpianto === 'livello3' ? 'Domotico' : elettrico.tipoImpianto;
          configurazioni.push(`Impianto ${tipoImpianto}`);
        }
        if (elettrico.tipoDomotica) {
          const domotica = elettrico.tipoDomotica === 'knx' ? 'KNX' : elettrico.tipoDomotica === 'wireless' ? 'BTicino Wireless' : elettrico.tipoDomotica;
          configurazioni.push(`Domotica ${domotica}`);
        }
      }
    }

    // Check photovoltaic module
    if (dataSource.moduli_selezionati?.includes('fotovoltaico') || dataSource.modulo_fotovoltaico) {
      const fotovoltaico = dataSource.modulo_fotovoltaico;
      if (fotovoltaico?.tipoInterventoFotovoltaico) {
        configurazioni.push(`Fotovoltaico ${fotovoltaico.tipoInterventoFotovoltaico}`);
        if (fotovoltaico.batteriaAccumulo === 'si') {
          configurazioni.push('Con batteria di accumulo');
        }
      }
    }
    return {
      configurazioni,
      dataSource
    };
  };
  const {
    configurazioni,
    dataSource
  } = getConfigurationSummary();

  // Calculate total rooms from database or form data
  const composizione = dataSource.composizione || {};
  const totalRooms = Object.values(composizione).reduce((sum: number, count) => {
    const numericCount = Number(count) || 0;
    return sum + numericCount;
  }, 0 as number);
  return <div className="space-y-8">
      {/* Badge */}
      <div className="flex justify-center px-3 md:px-0 mb-8">
        <div className="bg-[#d8010c] text-white px-3 py-1.5 md:px-6 md:py-3 rounded-full text-sm font-medium">
          Impianti civili
        </div>
      </div>

      {/* Form di contatto header */}
      <div className="space-y-3">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#1c1c1c] leading-tight">
          Compila i dati e termina la configurazione
        </h1>
        <div className="w-full h-px bg-gray-200"></div>
        <p className="text-sm md:text-base text-[#1c1c1c] opacity-75 mt-3">
          <strong>Inserisci i tuoi dati di contatto per ricevere la stima personalizzata.</strong> I nostri algoritmi analizzeranno le specifiche del tuo progetto e i dati di mercato per generare una valutazione accurata e immediata.
        </p>
      </div>

      {/* Form di contatto */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="nome" className="text-lg">Nome</Label>
            <Input id="nome" value={formData.contatti?.nome || ''} onChange={e => updateFormData({
            contatti: {
              ...formData.contatti,
              nome: e.target.value
            }
          })} className="text-lg p-6 rounded-lg" placeholder="Il tuo nome" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cognome" className="text-lg">Cognome</Label>
            <Input id="cognome" value={formData.contatti?.cognome || ''} onChange={e => updateFormData({
            contatti: {
              ...formData.contatti,
              cognome: e.target.value
            }
          })} className="text-lg p-6 rounded-lg" placeholder="Il tuo cognome" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-lg">Email</Label>
            <Input id="email" type="email" value={formData.contatti?.email || ''} onChange={e => updateFormData({
            contatti: {
              ...formData.contatti,
              email: e.target.value
            }
          })} className="text-lg p-6 rounded-lg" placeholder="La tua email" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="telefono" className="text-lg">Telefono</Label>
            <Input id="telefono" type="tel" value={formData.contatti?.telefono || ''} onChange={e => updateFormData({
            contatti: {
              ...formData.contatti,
              telefono: e.target.value
            }
          })} className="text-lg p-6 rounded-lg" placeholder="Il tuo numero di telefono" />
          </div>
        </div>
        
        </div>

      {/* Titolo sezione riepilogo */}
      <div className="space-y-3">
        <h1 className="text-xl md:text-2xl font-semibold text-[#1c1c1c] leading-tight">
          Riepilogo
        </h1>
        <div className="w-full h-px bg-gray-200"></div>
        <p className="text-sm md:text-base text-[#1c1c1c] opacity-75 mt-3">
          Verifica i dettagli della tua configurazione prima di procedere
        </p>
      </div>

      {/* Box di riepilogo abitazione in stile CEI */}
      <div className="bg-white border-2 border-dashed border-red-500 rounded-xl p-6">
        <div className="space-y-4">
          {/* Informazioni principali in formato semplice */}
          <div className="flex flex-wrap gap-6 text-base">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Tipologia:</span>
              <span className="font-medium text-[#1c1c1c] capitalize">{dataSource.tipologia_abitazione || 'Non specificato'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Superficie:</span>
              <span className="font-medium text-[#d8010c]">{dataSource.superficie || 0} mq</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Persone:</span>
              <span className="font-medium text-[#1c1c1c]">{dataSource.numero_persone || formData.informazioniGenerali?.numeroPersone || 2}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Proprietà:</span>
              <span className="font-medium text-[#1c1c1c] capitalize">
                {(dataSource.utilizzoabitazione || formData.informazioniGenerali?.utilizzoAbitazione || 'prima casa') === 'prima casa' ? 'Prima' : 'Seconda'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Stanze totali:</span>
              <span className="font-medium text-[#1c1c1c]">{String(totalRooms)}</span>
            </div>
          </div>

          {/* Indirizzo */}
          <div className="space-y-1">
            <div>
              <p className="text-[#1c1c1c] font-medium">
                {dataSource.indirizzo || formData.informazioniGenerali?.indirizzo || 'Non specificato'}
              </p>
              <p className="text-gray-600 text-sm">
                {dataSource.citta || formData.informazioniGenerali?.citta} {formData.informazioniGenerali?.cap}, {formData.informazioniGenerali?.regione}
              </p>
            </div>
          </div>

          {/* Composizione stanze */}
          <div>
            <p className="text-gray-600 mb-2">Composizione ({String(totalRooms)} stanze totali):</p>
            <div className="flex flex-wrap gap-3">
              {composizione && Object.entries(composizione).map(([key, value]) => {
              const numValue = Number(value);
              return numValue > 0 ? <span key={key} className="bg-white text-black border-2 border-black px-4 py-2 rounded-full text-sm font-medium">
                    {numValue} {key === 'cameraDoppia' ? 'cam. doppia' : key === 'cameraSingola' ? 'cam. singola' : key}
                  </span> : null;
            })}
            </div>
          </div>

          {/* Moduli configurati */}
          <div className="border-t border-gray-200 pt-4">
            <p className="text-gray-600 font-medium mb-3">Interventi configurati:</p>
            <div className="flex flex-wrap gap-3">
              <span className={`rounded-full text-sm font-medium ${dataSource.moduli_selezionati?.includes('impianto-elettrico') || formData.moduliSelezionati?.includes('impianto-elettrico') ? 'bg-black text-white px-4 py-2' : 'bg-white text-black border-2 border-black px-4 py-2'}`}>
                Impianto elettrico
              </span>
              <span className={`rounded-full text-sm font-medium ${dataSource.moduli_selezionati?.includes('fotovoltaico') || formData.moduliSelezionati?.includes('fotovoltaico') ? 'bg-black text-white px-4 py-2' : 'bg-white text-black border-2 border-black px-4 py-2'}`}>
                Impianto fotovoltaico
              </span>
              <span className={`rounded-full text-sm font-medium ${dataSource.moduli_selezionati?.includes('sicurezza') || formData.moduliSelezionati?.includes('sicurezza') ? 'bg-black text-white px-4 py-2' : 'bg-white text-black border-2 border-black px-4 py-2'}`}>
                Impianto di sicurezza
              </span>
              <span className={`rounded-full text-sm font-medium ${dataSource.moduli_selezionati?.includes('termotecnico') || formData.moduliSelezionati?.includes('termotecnico') ? 'bg-black text-white px-4 py-2' : 'bg-white text-black border-2 border-black px-4 py-2'}`}>
                Impianto termotecnico
              </span>
            </div>
          </div>

          {/* Dettagli configurazione */}
          <div className="border-t border-gray-200 pt-4">
            <p className="text-gray-600 font-medium mb-3">Dettagli configurazione:</p>
            <div className="space-y-4">
              {/* Modulo Impianto Elettrico */}
              {(dataSource.moduli_selezionati?.includes('impianto-elettrico') || dataSource.modulo_elettrico || formData.moduliSelezionati?.includes('impianto-elettrico')) && <div className="space-y-2">
                  <h4 className="text-base font-medium text-[#d8010c]">Impianto Elettrico</h4>
                  <div className="flex flex-wrap gap-2">
                    {(dataSource.modulo_elettrico?.tipoRistrutturazione || formData.moduloElettrico?.tipoRistrutturazione) && <span className="bg-white text-black border-2 border-black px-4 py-2 rounded-full text-sm font-medium">
                        Ristrutturazione {(dataSource.modulo_elettrico?.tipoRistrutturazione || formData.moduloElettrico?.tipoRistrutturazione) === 'completa' ? 'completa' : 'parziale'}
                      </span>}
                    
                    {(dataSource.modulo_elettrico?.impiantoVecchio || formData.moduloElettrico?.impiantoVecchio) && <span className="bg-white text-black border-2 border-black px-4 py-2 rounded-full text-sm font-medium">
                        {(dataSource.modulo_elettrico?.impiantoVecchio || formData.moduloElettrico?.impiantoVecchio) === 'si' ? 'Impianto da aggiornare' : 'Impianto certificato'}
                      </span>}
                    
                    {(dataSource.modulo_elettrico?.tipoImpianto || formData.moduloElettrico?.tipoImpianto) && <span className="bg-white text-black border-2 border-black px-4 py-2 rounded-full text-sm font-medium">
                        {(() => {
                    const tipo = dataSource.modulo_elettrico?.tipoImpianto || formData.moduloElettrico?.tipoImpianto;
                    return tipo === 'livello1' ? 'Livello 1 - Standard' : tipo === 'livello2' ? 'Livello 2 - Avanzato' : tipo === 'livello3' ? 'Livello 3 - Domotico' : tipo;
                  })()}
                      </span>}
                    
                    {(dataSource.modulo_elettrico?.tipoDomotica || formData.moduloElettrico?.tipoDomotica) && <span className="bg-white text-black border-2 border-black px-4 py-2 rounded-full text-sm font-medium">
                        Sistema {(dataSource.modulo_elettrico?.tipoDomotica || formData.moduloElettrico?.tipoDomotica) === 'knx' ? 'KNX' : 'BTicino Wireless'}
                      </span>}
                    
                    {/* Interventi elettrici specifici */}
                    {(dataSource.modulo_elettrico?.interventiElettrici || formData.moduloElettrico?.interventiElettrici || formData.interventiElettrici) && Object.entries(dataSource.modulo_elettrico?.interventiElettrici || formData.moduloElettrico?.interventiElettrici || formData.interventiElettrici || {}).filter(([_, config]: [string, any]) => config?.selected).map(([key, config]: [string, any]) => <span key={key} className="bg-white text-black border-2 border-black px-4 py-2 rounded-full text-sm font-medium">
                           {key === 'sostituzionePuntiLuce' ? 'Sostituzione punti luce' : key === 'aggiuntaPrese' ? 'Aggiunta prese' : key === 'impianti230V' ? 'Impianti 230V' : key === 'impiantiSpeciali' ? 'Impianti speciali' : key} {config.quantity ? `(${config.quantity})` : ''}
                         </span>)}
                    
                    {/* Tapparelle elettriche */}
                    {(dataSource.modulo_elettrico?.elettrificareTapparelle || formData.moduloElettrico?.elettrificareTapparelle || formData.elettrificareTapparelle) === 'si' && <span className="bg-white text-black border-2 border-black px-4 py-2 rounded-full text-sm font-medium">
                        {dataSource.modulo_elettrico?.numeroTapparelle || formData.moduloElettrico?.numeroTapparelle || formData.numeroTapparelle || 0} tapparelle elettriche
                      </span>}
                    
                    {/* Configurazioni KNX specifiche */}
                    {formData.knxConfig?.luci?.active && <span className="bg-white text-black border-2 border-black px-4 py-2 rounded-full text-sm font-medium">
                        KNX Luci {formData.knxConfig.luci.option === 'avanzato' ? 'avanzate' : 'base'}
                      </span>}
                    
                    {formData.knxConfig?.clima?.active && <span className="bg-white text-black border-2 border-black px-4 py-2 rounded-full text-sm font-medium">
                        KNX Clima {formData.knxConfig.clima.option === 'clima_vmc' ? 'con VMC' : formData.knxConfig.clima.option === 'clima_semplice' ? 'semplice' : formData.knxConfig.clima.option}
                      </span>}
                    
                    {formData.knxConfig?.tapparelle?.active && <span className="bg-white text-black border-2 border-black px-4 py-2 rounded-full text-sm font-medium">
                        KNX Tapparelle {formData.knxConfig.tapparelle.option}
                      </span>}
                    
                    {formData.knxConfig?.sicurezza?.active && <span className="bg-white text-black border-2 border-black px-4 py-2 rounded-full text-sm font-medium">
                        KNX Sicurezza {formData.knxConfig.sicurezza.option}
                      </span>}
                    
                    {formData.knxConfig?.irrigazione?.active && <span className="bg-white text-black border-2 border-black px-4 py-2 rounded-full text-sm font-medium">
                        KNX Irrigazione {formData.knxConfig.irrigazione.option}
                      </span>}
                    
                    {formData.knxConfig?.audio?.active && <span className="bg-white text-black border-2 border-black px-4 py-2 rounded-full text-sm font-medium">
                        KNX Audio {formData.knxConfig.audio.option}
                      </span>}
                    
                    {/* Configurazioni BTicino specifiche */}
                    {formData.bTicinoConfig && Object.entries(formData.bTicinoConfig).filter(([_, config]: [string, any]) => config?.active).map(([key, config]: [string, any]) => <span key={key} className="bg-white text-black border-2 border-black px-4 py-2 rounded-full text-sm font-medium">
                        BTicino {key.charAt(0).toUpperCase() + key.slice(1)} {config.option || ''}
                      </span>)}
                  </div>
                  
                  {(dataSource.modulo_elettrico?.ambientiSelezionati || formData.moduloElettrico?.ambientiSelezionati) && <div className="pl-2">
                      <span className="text-xs text-gray-600">Ambienti: </span>
                      <span className="text-xs text-[#1c1c1c]">
                        {(dataSource.modulo_elettrico?.ambientiSelezionati || formData.moduloElettrico?.ambientiSelezionati)?.join(', ')}
                      </span>
                    </div>}
                </div>}

              {/* Modulo Fotovoltaico */}
              {(dataSource.moduli_selezionati?.includes('fotovoltaico') || dataSource.modulo_fotovoltaico || formData.moduliSelezionati?.includes('fotovoltaico')) && <div className="space-y-2">
                  <h4 className="text-base font-medium text-[#d8010c]">Impianto Fotovoltaico</h4>
                  <div className="flex flex-wrap gap-2">
                    {(dataSource.modulo_fotovoltaico?.tipoInterventoFotovoltaico || formData.moduloFotovoltaico?.tipoInterventoFotovoltaico) && <span className="bg-white text-black border-2 border-black px-4 py-2 rounded-full text-sm font-medium">
                        {(dataSource.modulo_fotovoltaico?.tipoInterventoFotovoltaico || formData.moduloFotovoltaico?.tipoInterventoFotovoltaico) === 'nuovo' ? 'Nuovo impianto' : 'Ampliamento'}
                      </span>}
                    
                    {(dataSource.modulo_fotovoltaico?.tipoFalda || formData.moduloFotovoltaico?.tipoFalda) && <span className="bg-white text-black border-2 border-black px-4 py-2 rounded-full text-sm font-medium capitalize">
                        Tetto {dataSource.modulo_fotovoltaico?.tipoFalda || formData.moduloFotovoltaico?.tipoFalda}
                      </span>}
                    
                    {(dataSource.modulo_fotovoltaico?.orientamentoTetto || formData.moduloFotovoltaico?.orientamentoTetto) && <span className="bg-white text-black border-2 border-black px-4 py-2 rounded-full text-sm font-medium capitalize">
                        Orientamento {dataSource.modulo_fotovoltaico?.orientamentoTetto || formData.moduloFotovoltaico?.orientamentoTetto}
                      </span>}
                    
                    {(dataSource.modulo_fotovoltaico?.batteriaAccumulo || formData.moduloFotovoltaico?.batteriaAccumulo) === 'si' && <span className="bg-white text-black border-2 border-black px-4 py-2 rounded-full text-sm font-medium">
                        Con batteria di accumulo
                      </span>}
                    
                    {(dataSource.modulo_fotovoltaico?.superficieDisponibile || formData.moduloFotovoltaico?.superficieDisponibile) && <span className="bg-white text-black border-2 border-black px-4 py-2 rounded-full text-sm font-medium">
                        {dataSource.modulo_fotovoltaico?.superficieDisponibile || formData.moduloFotovoltaico?.superficieDisponibile} mq disponibili
                      </span>}
                    
                    {(dataSource.modulo_fotovoltaico?.obiettivoPrincipale || formData.moduloFotovoltaico?.obiettivoPrincipale) && <span className="bg-white text-black border-2 border-black px-4 py-2 rounded-full text-sm font-medium">
                        {(() => {
                    const obiettivo = dataSource.modulo_fotovoltaico?.obiettivoPrincipale || formData.moduloFotovoltaico?.obiettivoPrincipale;
                    return obiettivo === 'autoconsumo' ? 'Focus autoconsumo' : obiettivo === 'risparmio' ? 'Focus risparmio' : obiettivo === 'sostenibilita' ? 'Focus sostenibilità' : obiettivo;
                  })()}
                      </span>}
                  </div>
                </div>}

              {/* Altri moduli selezionati ma non ancora configurati */}
              {(dataSource.moduli_selezionati?.includes('sicurezza') || formData.moduliSelezionati?.includes('sicurezza')) && <div className="space-y-2">
                  <h4 className="text-base font-medium text-[#d8010c]">Impianto di Sicurezza</h4>
                  <span className="text-xs text-gray-600">Modulo selezionato - Configurazione in corso</span>
                </div>}

              {(dataSource.moduli_selezionati?.includes('termotecnico') || formData.moduliSelezionati?.includes('termotecnico')) && <div className="space-y-2">
                  <h4 className="text-base font-medium text-[#d8010c]">Impianto Termotecnico</h4>
                  <span className="text-xs text-gray-600">Modulo selezionato - Configurazione in corso</span>
                </div>}
            </div>
          </div>
        </div>
      </div>
      

      {/* Termini e condizioni e pulsanti */}
      <div className="space-y-2">
        <div className="flex items-start space-x-4 py-1">
          <Checkbox id="disclaimer" checked={accettoDisclaimer} onCheckedChange={checked => setAccettoDisclaimer(checked === true)} className="mt-1 h-5 w-5" />
          <Label htmlFor="disclaimer" className="text-md">
            Dichiaro di aver compreso che la stima è indicativa e non costituisce un preventivo vincolante
          </Label>
        </div>
        
        <div className="flex items-start space-x-4 py-1">
          <Checkbox id="termini" checked={formData.contatti?.accettoTermini || false} onCheckedChange={checked => updateFormData({
          contatti: {
            ...formData.contatti,
            accettoTermini: checked === true
          }
        })} className="mt-1 h-5 w-5" />
          <Label htmlFor="termini" className="text-md">
            Ho letto e accetto i <a href="#" className="text-[#d8010c] underline">termini e condizioni</a> e l'<a href="#" className="text-[#d8010c] underline">informativa privacy</a>
          </Label>
        </div>

        {/* Linea separatrice */}
        <div className="w-full h-px bg-gray-200 my-6"></div>
        
        {/* Pulsanti */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={onBack} variant="outline" className="flex-1 p-6 text-lg border-[#1c1c1c] text-[#1c1c1c] hover:bg-[#f4f4f4] rounded-xl" disabled={isCalculatingEstimate}>
            Torna indietro
          </Button>
          
          <Button onClick={handleSubmit} className="flex-1 p-6 text-lg bg-[#fbe12e] hover:bg-[#d8010c] text-[#1c1c1c] hover:text-white rounded-xl flex items-center justify-center gap-2 transition-all duration-300" disabled={isCalculatingEstimate}>
            {isCalculatingEstimate ? <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Calcolo in corso...
              </> : <>
                Calcola ora!
                <ChevronDown className="h-5 w-5 transform rotate-[-90deg]" />
              </>}
          </Button>
        </div>
      </div>
    </div>;
};