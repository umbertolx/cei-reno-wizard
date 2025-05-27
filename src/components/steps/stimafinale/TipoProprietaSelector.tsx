
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type TipoProprietaSelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

export const TipoProprietaSelector = ({ value, onChange }: TipoProprietaSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-[100px] h-[100px] flex-shrink-0 flex items-center justify-center">
          <img 
            src="/lovable-uploads/c7408342-e29b-40fb-a65e-1c92eca62469.png" 
            alt="House icon" 
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-medium text-[#1c1c1c]">Che tipo di proprietà è?</h2>
          <p className="text-base text-[#1c1c1c] opacity-80">Seleziona se si tratta della tua abitazione principale o di un'altra proprietà</p>
        </div>
      </div>
      
      <RadioGroup 
        value={value} 
        onValueChange={onChange}
        className="flex flex-col sm:flex-row gap-5"
      >
        <div className={`flex flex-col items-start space-y-2 border rounded-lg p-5 cursor-pointer hover:bg-[#fbe12e] hover:text-black transition-colors flex-1 ${value === 'prima casa' ? 'bg-[#d8010c] text-white border-[#d8010c]' : ''}`}>
          <div className="flex items-center space-x-3 w-full">
            <RadioGroupItem 
              value="prima casa" 
              id="prima-casa" 
              className={`${value === 'prima casa' ? 'text-white border-white' : ''} hover:bg-[#fbe12e]:text-black`} 
            />
            <Label 
              htmlFor="prima-casa" 
              className={`cursor-pointer text-lg font-bold ${value === 'prima casa' ? 'text-white' : ''} hover:bg-[#fbe12e]:text-black`}
            >
              Prima Casa
            </Label>
          </div>
          <p className={`pl-7 text-sm ${value === 'prima casa' ? 'text-white' : 'text-gray-600'} hover:bg-[#fbe12e]:text-black`}>
            Abitazione principale, residenza
          </p>
        </div>
        <div className={`flex flex-col items-start space-y-2 border rounded-lg p-5 cursor-pointer hover:bg-[#fbe12e] hover:text-black transition-colors flex-1 ${value === 'seconda casa' ? 'bg-[#d8010c] text-white border-[#d8010c]' : ''}`}>
          <div className="flex items-center space-x-3 w-full">
            <RadioGroupItem 
              value="seconda casa" 
              id="seconda-casa" 
              className={`${value === 'seconda casa' ? 'text-white border-white' : ''} hover:bg-[#fbe12e]:text-black`} 
            />
            <Label 
              htmlFor="seconda-casa" 
              className={`cursor-pointer text-lg font-bold ${value === 'seconda casa' ? 'text-white' : ''} hover:bg-[#fbe12e]:text-black`}
            >
              Seconda Casa
            </Label>
          </div>
          <p className={`pl-7 text-sm ${value === 'seconda casa' ? 'text-white' : 'text-gray-600'} hover:bg-[#fbe12e]:text-black`}>
            Altri immobili, case vacanza
          </p>
        </div>
      </RadioGroup>
    </div>
  );
};
