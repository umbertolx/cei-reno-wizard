
import { FormData } from "../../Configuratore";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type TipoAbitazioneProps = {
  value: string;
  onChange: (value: string) => void;
};

export const TipoAbitazione = ({ value, onChange }: TipoAbitazioneProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <div className="w-[80px] h-[80px] flex-shrink-0 flex items-center justify-center">
          <img 
            src="/lovable-uploads/c7408342-e29b-40fb-a65e-1c92eca62469.png" 
            alt="House icon" 
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-medium text-[#1c1c1c]">Che tipo di immobile stai ristrutturando?</h2>
          <p className="text-base text-[#1c1c1c] opacity-80">Seleziona il tipo di abitazione per cui vuoi progettare l'impianto elettrico</p>
        </div>
      </div>
      
      <RadioGroup 
        value={value} 
        onValueChange={onChange}
        className="flex flex-col sm:flex-row gap-5"
      >
        <div className={`flex flex-col items-start space-y-2 border rounded-lg p-5 cursor-pointer hover:bg-[#fbe12e] hover:text-black transition-colors flex-1 ${value === 'appartamento' ? 'bg-[#d8010c] text-white border-[#d8010c]' : ''}`}>
          <div className="flex items-center space-x-3 w-full">
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
          <p className={`pl-7 text-sm ${value === 'appartamento' ? 'text-white' : 'text-gray-600'} hover:bg-[#fbe12e]:text-black`}>
            Condomini, residence, attici
          </p>
        </div>
        <div className={`flex flex-col items-start space-y-2 border rounded-lg p-5 cursor-pointer hover:bg-[#fbe12e] hover:text-black transition-colors flex-1 ${value === 'casa indipendente' ? 'bg-[#d8010c] text-white border-[#d8010c]' : ''}`}>
          <div className="flex items-center space-x-3 w-full">
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
          <p className={`pl-7 text-sm ${value === 'casa indipendente' ? 'text-white' : 'text-gray-600'} hover:bg-[#fbe12e]:text-black`}>
            Ville, villette a schiera
          </p>
        </div>
      </RadioGroup>
    </div>
  );
};
