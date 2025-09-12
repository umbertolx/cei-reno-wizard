
import { FormData } from "../Configuratore";
import { SummaryStepLayout } from "../templates";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { User, Phone, Mail } from "lucide-react";

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
  // Helper per creare l'oggetto contatti con defaults
  const getContatti = () => ({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    accettoTermini: false,
    tipoProprietà: "prima casa",
    ...formData.contatti
  });

  const updateContatti = (updates: Partial<typeof formData.contatti>) => {
    updateFormData({
      contatti: {
        ...getContatti(),
        ...updates
      }
    });
  };

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
      onSubmit();
    }
  };

  // Conta il totale delle stanze
  const totalRooms = Object.values(formData.informazioniGenerali?.composizione || {}).reduce((acc, curr) => acc + curr, 0);

  // Prepare estimate data
  const estimate = {
    min: stima.min,
    max: stima.max,
    currency: "€",
    subtitle: "La tua stima"
  };

  // Prepare summary cards
  const summaryCards = [
    {
      id: 'abitazione',
      title: 'Informazioni abitazione',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-[#1c1c1c] opacity-70">Tipologia</p>
            <p className="text-lg font-medium capitalize">{formData.informazioniGenerali?.tipologiaAbitazione}</p>
          </div>
          
          <div>
            <p className="text-sm text-[#1c1c1c] opacity-70">Superficie</p>
            <p className="text-lg font-medium">{formData.informazioniGenerali?.superficie} mq</p>
          </div>
          
          <div>
            <p className="text-sm text-[#1c1c1c] opacity-70">Indirizzo</p>
            <p className="text-lg font-medium">{formData.informazioniGenerali?.indirizzo}</p>
            <p className="text-md">{formData.informazioniGenerali?.citta}, {formData.informazioniGenerali?.cap}, {formData.informazioniGenerali?.regione}</p>
          </div>
          
          <div>
            <p className="text-sm text-[#1c1c1c] opacity-70">Piano</p>
            <p className="text-lg font-medium capitalize">{formData.informazioniGenerali?.piano}</p>
          </div>

          <div>
            <p className="text-sm text-[#1c1c1c] opacity-70">Tipo proprietà</p>
            <p className="text-lg font-medium capitalize">{formData.informazioniGenerali?.utilizzoAbitazione}</p>
          </div>

          <div>
            <p className="text-sm text-[#1c1c1c] opacity-70">Persone nell'abitazione</p>
            <p className="text-lg font-medium">{formData.informazioniGenerali?.numeroPersone}</p>
          </div>
          
          <div className="md:col-span-2">
            <p className="text-sm text-[#1c1c1c] opacity-70">Composizione ({totalRooms} stanze totali)</p>
            <div className="flex flex-wrap gap-4 mt-2">
              {Object.entries(formData.informazioniGenerali?.composizione || {}).map(([key, value]) => 
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
      )
    },
    {
      id: 'contatti',
      title: 'Inserisci i tuoi dati per richiedere un sopralluogo',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2 text-[#d8010c]" />
                <Label htmlFor="nome" className="text-lg">Nome</Label>
              </div>
              <Input 
                id="nome"
                value={formData.contatti?.nome || ''}
                onChange={(e) => updateContatti({ nome: e.target.value })}
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
                onChange={(e) => updateContatti({ cognome: e.target.value })}
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
                onChange={(e) => updateContatti({ email: e.target.value })}
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
                onChange={(e) => updateContatti({ telefono: e.target.value })}
                className="text-lg p-6 rounded-lg"
                placeholder="Il tuo numero di telefono"
              />
            </div>
          </div>
          
          <div className="flex items-start space-x-3 py-4">
            <Checkbox 
              id="termini" 
              checked={formData.contatti?.accettoTermini || false}
              onCheckedChange={(checked) => updateContatti({ accettoTermini: checked === true })}
              className="mt-1"
            />
            <Label htmlFor="termini" className="text-md">
              Ho letto e accetto i <a href="#" className="text-[#d8010c] underline">termini e condizioni</a> e l'<a href="#" className="text-[#d8010c] underline">informativa privacy</a>
            </Label>
          </div>
        </div>
      )
    }
  ];

  const additionalContent = (
    <div className="bg-white bg-opacity-50 p-4 rounded-lg text-center">
      <p className="text-lg text-[#1c1c1c]">
        È una prima stima, per un preventivo preciso serve un sopralluogo
      </p>
    </div>
  );

  return (
    <SummaryStepLayout
      title="Riepilogo e Stima"
      description="Verifica i dati inseriti e richiedi un sopralluogo"
      estimate={estimate}
      summaryCards={summaryCards}
      additionalContent={additionalContent}
      onBack={onBack}
      onNext={handleSubmit}
      nextButtonText="Richiedi sopralluogo"
      backButtonText="Torna indietro"
    />
  );
};
