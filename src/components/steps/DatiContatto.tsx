import { FormData } from "../Configuratore";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { User, Phone, Mail, CircleDot, ChevronDown, Loader2, Home, MapPin, Layers, Building2, CheckCircle } from "lucide-react";
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

  const totalRooms = Object.values(formData.composizione).reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-5xl font-medium text-[#1c1c1c]">Dati di contatto</h1>
        <p className="text-lg md:text-xl text-[#1c1c1c] opacity-80">Inserisci i tuoi dati di contatto per procedere</p>
      </div>

      {/* Timeline migliorata e responsive */}
      <div className="flex justify-center mb-4 sm:mb-6 -mx-2 sm:mx-0">
        <div className="flex items-center w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl justify-between">
          {/* Punto 1: Info generali (completato) */}
          <div className="flex flex-col items-center relative">
            <div className="bg-[#d8010c] rounded-full p-1.5 sm:p-2 z-10">
              <CircleDot className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
            </div>
            <span className="text-[10px] sm:text-xs md:text-sm font-medium mt-1 sm:mt-2 text-center">Info generali</span>
          </div>
          
          {/* Linea di collegamento 1-2 */}
          <div className="h-[2px] flex-grow bg-[#fbe12e] mx-0.5 sm:mx-2 relative top-[8px] sm:top-[10px]"></div>
          
          {/* Punto 2: Dati di contatto (attivo) */}
          <div className="flex flex-col items-center relative">
            <div className="bg-[#fbe12e] rounded-full p-1.5 sm:p-2 z-10">
              <CircleDot className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-black" />
            </div>
            <span className="text-[10px] sm:text-xs md:text-sm font-medium mt-1 sm:mt-2 text-center">Dati contatto</span>
          </div>
          
          {/* Linea di collegamento 2-3 */}
          <div className="h-[2px] flex-grow bg-gray-300 mx-0.5 sm:mx-2 relative top-[8px] sm:top-[10px]"></div>
          
          {/* Punto 3: Stima dei costi (inattivo) */}
          <div className="flex flex-col items-center relative">
            <div className="bg-gray-200 rounded-full p-1.5 sm:p-2 z-10">
              <CircleDot className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-gray-400" />
            </div>
            <span className="text-[10px] sm:text-xs md:text-sm font-medium mt-1 sm:mt-2 text-center text-gray-500">Stima finale</span>
          </div>
        </div>
      </div>

      {/* Nuovo box di riepilogo abitazione completamente rifatto */}
      <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-3xl p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#d8010c] rounded-full p-2">
            <Home className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-[#1c1c1c]">La tua abitazione</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sezione Proprietà */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-5 w-5 text-[#d8010c]" />
                <h3 className="text-lg font-medium text-[#1c1c1c]">Proprietà</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tipologia</span>
                  <span className="font-medium capitalize bg-[#fbe12e] bg-opacity-30 px-3 py-1 rounded-full text-sm">
                    {formData.tipologiaAbitazione}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Superficie</span>
                  <span className="font-medium text-[#d8010c]">{formData.superficie} mq</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Piano</span>
                  <span className="font-medium capitalize">{formData.piano}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-[#d8010c]" />
                <h3 className="text-lg font-medium text-[#1c1c1c]">Posizione</h3>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-[#1c1c1c]">{formData.indirizzo}</p>
                <p className="text-gray-600">{formData.citta} {formData.cap}</p>
                <p className="text-gray-600">{formData.regione}</p>
              </div>
            </div>
          </div>

          {/* Sezione Composizione */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="h-5 w-5 text-[#d8010c]" />
                <h3 className="text-lg font-medium text-[#1c1c1c]">Composizione</h3>
                <span className="bg-[#d8010c] text-white text-xs px-2 py-1 rounded-full ml-auto">
                  {totalRooms} stanze
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(formData.composizione).map(([key, value]) => 
                  value > 0 && (
                    <div key={key} className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                      <span className="text-sm font-medium capitalize text-gray-700">
                        {key === 'cameraDoppia' ? 'Camera doppia' : 
                         key === 'cameraSingola' ? 'Camera singola' : key}
                      </span>
                      <div className="bg-[#fbe12e] text-[#1c1c1c] text-sm font-bold px-2 py-1 rounded-full min-w-[24px] text-center">
                        {value}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Indicatore di progresso */}
            <div className="bg-gradient-to-r from-[#d8010c] to-[#fbe12e] rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">Configurazione completa</h3>
                  <p className="text-sm opacity-90">Tutti i dati sono stati inseriti correttamente</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <CheckCircle className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
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
