
import { FormData } from "@/types/FormData";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ChevronDown, User, Phone, Mail } from "lucide-react";

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

export const RiepilogoFinale = ({ formData, updateFormData, stima, onBack, onSubmit }: Props) => {
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
      onSubmit();
    }
  };

  // Formatta il prezzo con separatore migliaia
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Conta il totale delle stanze
  const totalRooms = Object.values(formData.composizione).reduce((acc: number, curr: number) => acc + curr, 0);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-5xl font-medium text-[#1c1c1c]">Riepilogo e Stima</h1>
        <p className="text-lg md:text-xl text-[#1c1c1c] opacity-80">Verifica i dati inseriti e richiedi un sopralluogo</p>
      </div>

      {/* Riepilogo dati abitazione */}
      <div className="bg-[#f4f4f4] p-6 rounded-2xl space-y-4">
        <h2 className="text-2xl font-medium text-[#1c1c1c]">Informazioni abitazione</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-[#1c1c1c] opacity-70">Tipologia</p>
            <p className="text-lg font-medium capitalize">{formData.tipologiaAbitazione}</p>
          </div>
          
          <div>
            <p className="text-sm text-[#1c1c1c] opacity-70">Superficie</p>
            <p className="text-lg font-medium">{formData.superficie} mq</p>
          </div>
          
          <div>
            <p className="text-sm text-[#1c1c1c] opacity-70">Indirizzo</p>
            <p className="text-lg font-medium">{formData.indirizzo}</p>
            <p className="text-md">{formData.citta}, {formData.cap}, {formData.regione}</p>
          </div>
          
          <div>
            <p className="text-sm text-[#1c1c1c] opacity-70">Piano</p>
            <p className="text-lg font-medium capitalize">{formData.piano}</p>
          </div>
          
          <div className="md:col-span-2">
            <p className="text-sm text-[#1c1c1c] opacity-70">Composizione ({totalRooms} stanze totali)</p>
            <div className="flex flex-wrap gap-4 mt-2">
              {Object.entries(formData.composizione).map(([key, value]) => 
                value > 0 && (
                  <div key={key} className="bg-white px-4 py-2 rounded-lg">
                    <span className="capitalize">{key}: </span>
                    <span className="font-medium">{value}</span>
                  </div>
                )
              )}
            </div>
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
            È una prima stima, per un preventivo preciso serve un sopralluogo
          </p>
        </div>
      </div>

      {/* Form di contatto */}
      <div className="space-y-6">
        <h2 className="text-2xl font-medium text-[#1c1c1c]">Inserisci i tuoi dati per richiedere un sopralluogo</h2>
        
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
        >
          Torna indietro
        </Button>
        
        <Button 
          onClick={handleSubmit}
          className="flex-1 p-6 text-lg bg-[#fbe12e] hover:bg-[#d8010c] text-[#1c1c1c] hover:text-white rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
        >
          Richiedi sopralluogo
          <ChevronDown className="h-5 w-5 transform rotate-[-90deg]" />
        </Button>
      </div>
    </div>
  );
};
