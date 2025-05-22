
import { FormData } from "../../Configuratore";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type TipoAbitazioneProps = {
  value: string;
  onChange: (value: string) => void;
};

export const TipoAbitazione = ({ value, onChange }: TipoAbitazioneProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="relative">
          {/* Pink background circle positioned slightly to the top-left */}
          <div className="absolute -top-1 -left-1 w-[75px] h-[75px] rounded-full bg-[rgba(216,121,122,0.2)]"></div>
          {/* House icon */}
          <div className="relative z-10 w-[75px] h-[75px] flex items-center justify-center">
            <img 
              src="/lovable-uploads/c7408342-e29b-40fb-a65e-1c92eca62469.png" 
              alt="House icon" 
              className="w-14 h-14"
            />
          </div>
        </div>
        <div className="ml-4">
          <h2 className="text-xl md:text-2xl font-medium text-[#1c1c1c]">Che tipo di immobile stai ristrutturando?</h2>
          <p className="text-base text-[#1c1c1c] opacity-80">Seleziona il tipo di abitazione per cui vuoi progettare l'impianto elettrico</p>
        </div>
      </div>
      
      <RadioGroup 
        value={value} 
        onValueChange={onChange}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className={`flex flex-col items-start space-y-2 border rounded-lg p-4 cursor-pointer hover:bg-[#fbe12e] hover:text-black transition-colors flex-1 ${value === 'appartamento' ? 'bg-[#d8010c] text-white border-[#d8010c]' : ''}`}>
          <div className="flex items-center space-x-2 w-full">
            <RadioGroupItem 
              value="appartamento" 
              id="appartamento" 
              className={`${value === 'appartamento' ? 'text-white border-white' : ''} hover:bg-[#fbe12e]:text-black`} 
            />
            <Label 
              htmlFor="appartamento" 
              className={`cursor-pointer text-lg font-bold ${value === 'appartamento' ? 'text-white' : ''} hover:bg-[#fbe12e]:text-black`}
            >
              Appartamento
            </Label>
          </div>
          <p className={`pl-6 text-sm ${value === 'appartamento' ? 'text-white' : 'text-gray-600'} hover:bg-[#fbe12e]:text-black`}>
            Condomini, residence, attici
          </p>
        </div>
        <div className={`flex flex-col items-start space-y-2 border rounded-lg p-4 cursor-pointer hover:bg-[#fbe12e] hover:text-black transition-colors flex-1 ${value === 'casa indipendente' ? 'bg-[#d8010c] text-white border-[#d8010c]' : ''}`}>
          <div className="flex items-center space-x-2 w-full">
            <RadioGroupItem 
              value="casa indipendente" 
              id="casa" 
              className={`${value === 'casa indipendente' ? 'text-white border-white' : ''} hover:bg-[#fbe12e]:text-black`} 
            />
            <Label 
              htmlFor="casa" 
              className={`cursor-pointer text-lg font-bold ${value === 'casa indipendente' ? 'text-white' : ''} hover:bg-[#fbe12e]:text-black`}
            >
              Casa indipendente
            </Label>
          </div>
          <p className={`pl-6 text-sm ${value === 'casa indipendente' ? 'text-white' : 'text-gray-600'} hover:bg-[#fbe12e]:text-black`}>
            Ville, villette a schiera
          </p>
        </div>
      </RadioGroup>
    </div>
  );
};
