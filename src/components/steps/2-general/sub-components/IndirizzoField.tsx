
type IndirizzoFieldProps = {
  value: string;
  onChange: (value: string) => void;
  onSelectLocation: (location: string) => void;
};

export const IndirizzoField = ({ value, onChange, onSelectLocation }: IndirizzoFieldProps) => {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header con nuovo stile */}
      <div className="px-3 md:px-0">
        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#1c1c1c] leading-tight">
            Indirizzo immobile
          </h1>
          <div className="w-full h-px bg-gray-200"></div>
          <p className="text-sm md:text-base text-[#1c1c1c] opacity-75 mt-3">
            Inserisci il tuo indirizzo completo
          </p>
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
