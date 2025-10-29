import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

type Props = {
  onNext: () => void;
};

export const WelcomeIntro = ({ onNext }: Props) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  const tipiImpianto = ["elettrico", "fotovoltaico", "di sicurezza", "termotecnico"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentWordIndex(prev => (prev + 1) % tipiImpianto.length);
        setIsVisible(true);
      }, 500);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  const exampleProject = {
    title: "Esempio di progetto",
    minPrice: 13450,
    maxPrice: 19330,
    deductionText: "Fino a €8.195 Bonus Casa (1ª)",
    features: [
      { label: "Appartamento", column: "left" as const },
      { label: "83 mq", column: "left" as const },
      { label: "Torino", column: "left" as const },
      { label: "4 locali + 2 bagni", column: "left" as const },
      { label: "Impianto elettrico", column: "right" as const },
      { label: "Domotica KNX", column: "right" as const },
      { label: "Impianto di sicurezza", column: "right" as const }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl space-y-8">
        {/* Badge */}
        <div className="flex justify-center">
          <div className="bg-[#d8010c] text-white px-6 py-3 rounded-full text-sm font-medium">
            Impianti Civili
          </div>
        </div>

        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-[40px] md:text-[48px] font-bold text-[#1c1c1c] leading-[1.05] text-center">
            Progetta il tuo impianto
            <br />
            <span className={`text-[#d8010c] transition-all duration-700 ease-in-out transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
            }`}>
              {tipiImpianto[currentWordIndex]}
            </span>
          </h1>
          
          <p className="text-base text-gray-600 max-w-2xl mx-auto text-center leading-relaxed">
            Configura, esplora le opzioni ed ottieni un budget su misura, gratis ed online.
          </p>
        </div>

        {/* Example Project */}
        <div className="max-w-3xl mx-auto">
          {/* Example badge */}
          <div className="flex justify-center mb-2">
            <div className="inline-flex items-center gap-1.5 bg-white text-[#1c1c1c] px-3 py-1.5 rounded-full text-sm font-medium border-2 border-black">
              <Sparkles className="h-3 w-3" />
              {exampleProject.title}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden hover:border-[#fbe12e] hover:border-[3px] transition-all duration-300">
            <div className="p-6">
              {/* Header section */}
              <div className="text-center mb-4">
                <div className="text-xs text-gray-500 mb-1 font-medium">
                  Budget stimato per questo progetto
                </div>
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  €{exampleProject.minPrice.toLocaleString()} - €{exampleProject.maxPrice.toLocaleString()}
                </div>
                
                <div className="text-base text-green-700 font-semibold mb-3">
                  {exampleProject.deductionText}
                </div>
              </div>

              {/* Project features */}
              <div className="border-t border-gray-200 pt-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {/* Left column */}
                  <div className="space-y-2">
                    {exampleProject.features
                      .filter(feature => !feature.column || feature.column === 'left')
                      .map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="h-2.5 w-2.5 text-green-600" />
                          </div>
                          <span className="text-sm text-gray-700">{feature.label}</span>
                        </div>
                      ))}
                  </div>
                  
                  {/* Right column */}
                  <div className="space-y-2">
                    {exampleProject.features
                      .filter(feature => feature.column === 'right')
                      .map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="h-2.5 w-2.5 text-green-600" />
                          </div>
                          <span className="text-sm text-gray-700">{feature.label}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center pt-4">
          <Button 
            onClick={onNext}
            className="
              px-8 py-6
              text-lg 
              bg-[#d8010c] hover:bg-[#b8000a]
              text-white 
              rounded-xl 
              flex items-center gap-2
              transition-all duration-300 
              shadow-sm hover:shadow-md
            "
          >
            <span>Inizia ora</span>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
