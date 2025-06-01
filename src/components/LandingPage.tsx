
import { Button } from "@/components/ui/button";
import { Phone, ArrowDown } from "lucide-react";

type Props = {
  onStartConfigurator: () => void;
};

export const LandingPage = ({ onStartConfigurator }: Props) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo CEI */}
            <div className="flex items-center">
              <div className="border-2 border-[#d8010c] text-[#d8010c] px-3 py-2 font-bold text-xl">
                CEI
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-[#d8010c] font-medium border-b-2 border-[#d8010c] pb-1">Home</a>
              <a href="#" className="text-gray-700 hover:text-[#d8010c] font-medium">Azienda</a>
              <a href="#" className="text-gray-700 hover:text-[#d8010c] font-medium flex items-center">
                Soluzioni
                <ArrowDown className="ml-1 h-4 w-4" />
              </a>
              <a href="#" className="text-gray-700 hover:text-[#d8010c] font-medium">Pronto Intervento</a>
              <a href="#" className="text-gray-700 hover:text-[#d8010c] font-medium">Contatti</a>
            </nav>
            
            {/* CTA Button */}
            <Button className="bg-[#fbe12e] hover:bg-[#e6c929] text-black px-6 py-2 rounded-lg font-medium transition-all duration-300 flex items-center">
              Richiedi Una Consulenza
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>

            {/* Mobile menu button */}
            <button className="md:hidden">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Left side - Image */}
          <div className="relative">
            <img 
              src="/lovable-uploads/9f0d9b9e-b383-49c3-bbec-05639b0bbd4b.png" 
              alt="Interno moderno con vista giardino" 
              className="w-full h-[500px] object-cover rounded-2xl"
            />
          </div>

          {/* Right side - Content */}
          <div className="bg-[#d8010c] text-white p-8 lg:p-12 rounded-2xl relative overflow-hidden flex flex-col justify-between min-h-[500px]">
            {/* Background shape */}
            <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-b from-red-600 to-transparent opacity-30 rounded-t-2xl"></div>
            
            <div className="relative z-10">
              {/* Logo CEI bianco */}
              <div className="inline-block border-2 border-white px-4 py-2 mb-8">
                <span className="text-2xl font-bold">CEI</span>
              </div>

              {/* Titolo principale */}
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Costruzioni Elettriche Ed<br />
                Energie Rinnovabili
              </h1>

              {/* Sottotitolo */}
              <p className="text-xl mb-8 opacity-90">
                Il tuo partner per impianti civili e industriali.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  onClick={onStartConfigurator}
                  className="bg-[#fbe12e] hover:bg-[#e6c929] text-black px-8 py-4 rounded-lg font-medium text-lg flex items-center justify-center transition-all duration-300"
                >
                  Richiedi Un Preventivo
                  <ArrowDown className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline"
                  className="bg-white text-[#d8010c] border-white hover:bg-gray-100 px-8 py-4 rounded-lg font-medium text-lg flex items-center justify-center transition-all duration-300"
                >
                  Servizi CEI
                  <ArrowDown className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Contact info - Fixed at bottom */}
            <div className="relative z-10 mt-auto">
              <div className="flex items-center text-lg">
                <Phone className="h-5 w-5 mr-3" />
                <span>Chiamaci : +39 0124 617 218</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
