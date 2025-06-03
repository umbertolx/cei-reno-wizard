
type IndirizzoFieldProps = {
  value: string;
  onChange: (value: string) => void;
  onSelectLocation: (location: string) => void;
};

export const IndirizzoField = ({ value, onChange, onSelectLocation }: IndirizzoFieldProps) => {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center gap-4 px-3 md:px-0">
        <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] flex-shrink-0 flex items-center justify-center">
          <img 
            src="/lovable-uploads/14822282-293b-4be9-93a5-cbc34e07f6c6.png" 
            alt="Location map icon" 
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h2 className="text-lg md:text-2xl font-medium text-[#1c1c1c]">Indirizzo immobile</h2>
          <p className="text-sm md:text-base text-[#1c1c1c] opacity-70 hidden md:block">Inserisci il tuo indirizzo completo</p>
        </div>
      </div>
      
      <div className="p-4 rounded-xl transition-all duration-300 border cursor-pointer bg-white border-gray-200 hover:border-[#d8010c] hover:shadow-sm">
        <div className="flex items-center justify-between">
          <div className="text-left flex-1 min-w-0">
            <input
              type="text"
              placeholder="Via, numero civico, città"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full font-semibold text-base text-[#1c1c1c] bg-transparent border-0 outline-none placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
