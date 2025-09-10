
import { FormData } from "../Configuratore";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { User, Phone, Mail, CircleDot, ChevronDown, Loader2, Home, MapPin, Settings } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onBack: () => void;
  onNext: () => void;
  isCalculatingEstimate?: boolean;
};

export const DatiContatto = ({ formData, updateFormData, onBack, onNext, isCalculatingEstimate = false }: Props) => {
  const validateForm = () => {
    if (!formData.nome.trim()) {
      toast({
        title: "Campo mancante",
        description: "Inserisci il tuo nome",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.cognome.trim()) {
      toast({
        title: "Campo mancante",
        description: "Inserisci il tuo cognome",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast({
        title: "Email non valida",
        description: "Inserisci un indirizzo email valido",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.telefono.trim() || formData.telefono.length < 8) {
      toast({
        title: "Telefono non valido",
        description: "Inserisci un numero di telefono valido",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.accettoTermini) {
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

  const totalRooms = formData.composizione ? Object.values(formData.composizione).reduce((acc, curr) => acc + curr, 0) : 0;

  // Funzione per generare il riassunto della configurazione
  const getConfigurationSummary = () => {
    const config = [];
    
    if (formData.moduloElettrico?.tipoRistrutturazione) {
      config.push(`Ristrutturazione ${formData.moduloElettrico.tipoRistrutturazione}`);
    }
    
    if (formData.moduloElettrico?.tipoImpianto) {
      const tipoImpianto = formData.moduloElettrico.tipoImpianto === 'livello1' ? 'Base' : 
                          formData.moduloElettrico.tipoImpianto === 'livello2' ? 'Avanzato' : 
                          formData.moduloElettrico.tipoImpianto === 'livello3' ? 'Domotico' : formData.moduloElettrico.tipoImpianto;
      config.push(`Impianto ${tipoImpianto}`);
    }
    
    if (formData.moduloElettrico?.tipoDomotica) {
      const domotica = formData.moduloElettrico.tipoDomotica === 'knx' ? 'KNX' : 
                      formData.moduloElettrico.tipoDomotica === 'wireless' ? 'BTicino Wireless' : formData.moduloElettrico.tipoDomotica;
      config.push(`Domotica ${domotica}`);
    }
    
    if (formData.elettrificareTapparelle === 'si' && formData.numeroTapparelle) {
      config.push(`${formData.numeroTapparelle} tapparelle elettrificate`);
    }
    
    // Aggiungi features KNX se presenti
    if (formData.knxConfig && Object.keys(formData.knxConfig).length > 0) {
      const knxFeatures = Object.keys(formData.knxConfig);
      if (knxFeatures.includes('luci')) config.push('Controllo luci intelligente');
      if (knxFeatures.includes('clima')) config.push('Controllo clima');
      if (knxFeatures.includes('sicurezza')) config.push('Predisposizione sicurezza');
    }
    
    // Aggiungi features BTicino se presenti
    if (formData.bTicinoConfig && Object.keys(formData.bTicinoConfig).length > 0) {
      const bTicinoFeatures = Object.keys(formData.bTicinoConfig);
      if (bTicinoFeatures.includes('luci')) config.push('Controllo luci wireless');
      if (bTicinoFeatures.includes('clima')) config.push('Controllo clima wireless');
    }
    
    return config;
  };

  const configSummary = getConfigurationSummary();

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-5xl font-medium text-[#1c1c1c]">Dati di contatto</h1>
        <p className="text-lg md:text-xl text-[#1c1c1c] opacity-80">Inserisci i tuoi dati di contatto per procedere</p>
      </div>


      {/* Box di riepilogo abitazione in stile CEI */}
      <div className="bg-[#f4f4f4] border border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Home className="h-6 w-6 text-[#d8010c]" />
          <h2 className="text-xl font-medium text-[#1c1c1c]">Riepilogo della tua abitazione</h2>
        </div>
        
        <div className="space-y-4">
          {/* Informazioni principali in formato semplice */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Tipologia:</span>
              <span className="font-medium text-[#1c1c1c] capitalize">{formData.tipologiaAbitazione || 'Non specificato'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Superficie:</span>
              <span className="font-medium text-[#d8010c]">{formData.superficie || 0} mq</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Persone:</span>
              <span className="font-medium text-[#1c1c1c]">{formData.informazioniGenerali?.numeroPersone || 2}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Proprietà:</span>
              <span className="font-medium text-[#1c1c1c] capitalize">{formData.informazioniGenerali?.tipoProprieta || 'prima casa'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Stanze totali:</span>
              <span className="font-medium text-[#1c1c1c]">{totalRooms}</span>
            </div>
          </div>

          {/* Indirizzo */}
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-[#d8010c] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[#1c1c1c] font-medium">{formData.indirizzo}</p>
              <p className="text-gray-600 text-sm">{formData.citta} {formData.cap}, {formData.regione}</p>
            </div>
          </div>

          {/* Composizione stanze */}
          <div>
            <p className="text-gray-600 mb-2">Composizione ({totalRooms} stanze totali):</p>
            <div className="flex flex-wrap gap-3">
              {formData.composizione && Object.entries(formData.composizione).map(([key, value]) => 
                value > 0 && (
                  <span key={key} className="bg-[#fbe12e] text-[#1c1c1c] px-3 py-1 rounded-full text-sm font-medium">
                    {value} {key === 'cameraDoppia' ? 'cam. doppia' : 
                           key === 'cameraSingola' ? 'cam. singola' : key}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Riassunto configurazione */}
          {configSummary.length > 0 && (
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="h-4 w-4 text-[#d8010c]" />
                <p className="text-gray-600 font-medium">Configurazione scelta:</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {configSummary.map((item, index) => (
                  <span key={index} className="bg-white border border-gray-200 text-[#1c1c1c] px-3 py-1 rounded-full text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Form di contatto */}
      <div className="space-y-6">
        <h2 className="text-2xl font-medium text-[#1c1c1c]">Inserisci i tuoi dati per continuare</h2>
        
        {/* Aggiunto messaggio che indica la stima immediata */}
        <div className="bg-[#fbe12e] bg-opacity-40 p-4 rounded-lg text-center">
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
              value={formData.nome}
              onChange={(e) => updateFormData({ nome: e.target.value })}
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
              value={formData.cognome}
              onChange={(e) => updateFormData({ cognome: e.target.value })}
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
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
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
              value={formData.telefono}
              onChange={(e) => updateFormData({ telefono: e.target.value })}
              className="text-lg p-6 rounded-lg"
              placeholder="Il tuo numero di telefono"
            />
          </div>
        </div>
        
        <div className="flex items-start space-x-3 py-4">
          <Checkbox 
            id="termini" 
            checked={formData.accettoTermini}
            onCheckedChange={(checked) => updateFormData({ accettoTermini: checked === true })}
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
