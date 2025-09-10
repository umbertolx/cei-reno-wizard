
import { FormData } from "../Configuratore";
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

export const DatiContatto = ({ formData, updateFormData, onBack, onNext, isCalculatingEstimate = false }: Props) => {
  const { lead, isLoading: isLoadingLead } = useLatestLead(formData.contatti?.email);
  
  console.log("🔍 DatiContatto - Current lead from DB:", lead);
  console.log("📋 DatiContatto - Current formData:", formData);

  const validateForm = () => {
    if (!formData.contatti?.nome?.trim()) {
      toast({
        title: "Campo mancante",
        description: "Inserisci il tuo nome",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.contatti?.cognome?.trim()) {
      toast({
        title: "Campo mancante",
        description: "Inserisci il tuo cognome",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.contatti?.email?.trim() || !/^\S+@\S+\.\S+$/.test(formData.contatti.email)) {
      toast({
        title: "Email non valida",
        description: "Inserisci un indirizzo email valido",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.contatti?.telefono?.trim() || formData.contatti.telefono.length < 8) {
      toast({
        title: "Telefono non valido",
        description: "Inserisci un numero di telefono valido",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.contatti?.accettoTermini) {
      toast({
        title: "Termini e condizioni",
        description: "Devi accettare i termini e le condizioni per continuare",
        variant: "destructive",
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
      tipo_proprieta: formData.informazioniGenerali?.tipoProprieta,
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
          const tipoImpianto = elettrico.tipoImpianto === 'livello1' ? 'Base' : 
                              elettrico.tipoImpianto === 'livello2' ? 'Avanzato' : 
                              elettrico.tipoImpianto === 'livello3' ? 'Domotico' : elettrico.tipoImpianto;
          configurazioni.push(`Impianto ${tipoImpianto}`);
        }
        
        if (elettrico.tipoDomotica) {
          const domotica = elettrico.tipoDomotica === 'knx' ? 'KNX' : 
                          elettrico.tipoDomotica === 'wireless' ? 'BTicino Wireless' : elettrico.tipoDomotica;
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

    return { configurazioni, dataSource };
  };

  const { configurazioni, dataSource } = getConfigurationSummary();
  
  // Calculate total rooms from database or form data
  const composizione = dataSource.composizione || {};
  const totalRooms = Object.values(composizione).reduce((sum: number, count) => {
    const numericCount = Number(count) || 0;
    return sum + numericCount;
  }, 0 as number);

  return (
    <div className="space-y-8">
      <div className="space-y-2 md:space-y-3 mt-4">
        <h1 className="text-[24px] md:text-[36px] font-bold text-[#1c1c1c] leading-[1.05] text-left md:text-center p-1">
          Riepilogo e dati di contatto
        </h1>
      </div>


      {/* Box di riepilogo abitazione in stile CEI */}
      <div className="bg-[#f4f4f4] border border-gray-200 rounded-xl p-6">
        <div className="space-y-4">
          {/* Informazioni principali in formato semplice */}
          <div className="flex flex-wrap gap-6">
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
                {(dataSource.tipo_proprieta || formData.informazioniGenerali?.tipoProprieta || 'prima casa') === 'prima casa' ? 'Prima' : 'Seconda'}
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
                return numValue > 0 ? (
                  <span key={key} className="bg-[#fbe12e] text-[#1c1c1c] px-3 py-1 rounded-full text-sm font-medium">
                    {numValue} {key === 'cameraDoppia' ? 'cam. doppia' : 
                           key === 'cameraSingola' ? 'cam. singola' : key}
                  </span>
                ) : null;
              })}
            </div>
          </div>

          {/* Moduli configurati */}
          <div className="border-t border-gray-200 pt-4">
            <p className="text-gray-600 font-medium mb-3">Interventi configurati:</p>
            <div className="flex flex-wrap gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                (dataSource.moduli_selezionati?.includes('impianto-elettrico') || formData.moduliSelezionati?.includes('impianto-elettrico'))
                  ? 'bg-[#fbe12e] text-[#1c1c1c]' 
                  : 'bg-gray-100 text-gray-400'
              }`}>
                Impianto elettrico
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                (dataSource.moduli_selezionati?.includes('fotovoltaico') || formData.moduliSelezionati?.includes('fotovoltaico'))
                  ? 'bg-[#fbe12e] text-[#1c1c1c]' 
                  : 'bg-gray-100 text-gray-400'
              }`}>
                Impianto fotovoltaico
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                (dataSource.moduli_selezionati?.includes('sicurezza') || formData.moduliSelezionati?.includes('sicurezza'))
                  ? 'bg-[#fbe12e] text-[#1c1c1c]' 
                  : 'bg-gray-100 text-gray-400'
              }`}>
                Impianto di sicurezza
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                (dataSource.moduli_selezionati?.includes('termotecnico') || formData.moduliSelezionati?.includes('termotecnico'))
                  ? 'bg-[#fbe12e] text-[#1c1c1c]' 
                  : 'bg-gray-100 text-gray-400'
              }`}>
                Impianto termotecnico
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Form di contatto */}
      <div className="space-y-6">
        <h2 className="text-2xl font-medium text-[#1c1c1c]">Inserisci i tuoi dati per continuare</h2>
        
        {/* Aggiunto messaggio che indica la stima immediata */}
        <div className="bg-white border-2 border-[#fbe12e] p-4 rounded-xl text-center shadow-sm">
          <p className="text-md text-[#1c1c1c] font-medium">
            Completando questo form riceverai immediatamente una stima del costo della ristrutturazione
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2 text-[#d8010c]" />
              <Label htmlFor="nome" className="text-lg">Nome</Label>
            </div>
            <Input 
              id="nome"
              value={formData.contatti?.nome || ''}
              onChange={(e) => updateFormData({ 
                contatti: { ...formData.contatti, nome: e.target.value } 
              })}
              className="text-lg p-6 rounded-lg"
              placeholder="Il tuo nome"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2 text-[#d8010c]" />
              <Label htmlFor="cognome" className="text-lg">Cognome</Label>
            </div>
            <Input 
              id="cognome"
              value={formData.contatti?.cognome || ''}
              onChange={(e) => updateFormData({ 
                contatti: { ...formData.contatti, cognome: e.target.value } 
              })}
              className="text-lg p-6 rounded-lg"
              placeholder="Il tuo cognome"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-2 text-[#d8010c]" />
              <Label htmlFor="email" className="text-lg">Email</Label>
            </div>
            <Input 
              id="email"
              type="email"
              value={formData.contatti?.email || ''}
              onChange={(e) => updateFormData({ 
                contatti: { ...formData.contatti, email: e.target.value } 
              })}
              className="text-lg p-6 rounded-lg"
              placeholder="La tua email"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <Phone className="h-5 w-5 mr-2 text-[#d8010c]" />
              <Label htmlFor="telefono" className="text-lg">Telefono</Label>
            </div>
            <Input 
              id="telefono"
              type="tel"
              value={formData.contatti?.telefono || ''}
              onChange={(e) => updateFormData({ 
                contatti: { ...formData.contatti, telefono: e.target.value } 
              })}
              className="text-lg p-6 rounded-lg"
              placeholder="Il tuo numero di telefono"
            />
          </div>
        </div>
        
        <div className="flex items-start space-x-3 py-4">
          <Checkbox 
            id="termini" 
            checked={formData.contatti?.accettoTermini || false}
            onCheckedChange={(checked) => updateFormData({ 
              contatti: { ...formData.contatti, accettoTermini: checked === true } 
            })}
            className="mt-1"
          />
          <Label htmlFor="termini" className="text-md">
            Ho letto e accetto i <a href="#" className="text-[#d8010c] underline">termini e condizioni</a> e l'<a href="#" className="text-[#d8010c] underline">informativa privacy</a>
          </Label>
        </div>
      </div>

      {/* Pulsanti */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button 
          onClick={onBack}
          variant="outline"
          className="flex-1 p-6 text-lg border-[#1c1c1c] text-[#1c1c1c] hover:bg-[#f4f4f4] rounded-xl"
          disabled={isCalculatingEstimate}
        >
          Torna indietro
        </Button>
        
        <Button 
          onClick={handleSubmit}
          className="flex-1 p-6 text-lg bg-[#fbe12e] hover:bg-[#d8010c] text-[#1c1c1c] hover:text-white rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
          disabled={isCalculatingEstimate}
        >
          {isCalculatingEstimate ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Calcolo in corso...
            </>
          ) : (
            <>
              Continua
              <ChevronDown className="h-5 w-5 transform rotate-[-90deg]" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
