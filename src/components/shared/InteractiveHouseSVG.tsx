
import { useMemo } from "react";

type Props = {
  selectedFunctions: string[];
};

export const InteractiveHouseSVG = ({ selectedFunctions }: Props) => {
  const isSelected = (functionKey: string) => selectedFunctions.includes(functionKey);

  return (
    <div className="w-full max-w-lg mx-auto">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-auto border-2 border-gray-300 rounded-xl bg-gradient-to-b from-blue-50 to-green-50 shadow-lg"
      >
        {/* Definitions for gradients and patterns */}
        <defs>
          <linearGradient id="wallGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
          <linearGradient id="roofGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="floorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          
          {/* Glow effect for active elements */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Ground */}
        <rect x="0" y="270" width="400" height="30" fill="#22c55e" opacity="0.3" />

        {/* House structure - cross section view */}
        
        {/* Foundation */}
        <rect x="50" y="260" width="300" height="10" fill="#78716c" />
        
        {/* Main walls */}
        <rect x="60" y="120" width="280" height="140" fill="url(#wallGradient)" stroke="#94a3b8" strokeWidth="2" />
        
        {/* Roof */}
        <polygon points="40,120 200,40 360,120" fill="url(#roofGradient)" stroke="#334155" strokeWidth="2" />
        
        {/* Internal room divisions */}
        <line x1="200" y1="120" x2="200" y2="260" stroke="#cbd5e1" strokeWidth="2" />
        <line x1="60" y1="190" x2="340" y2="190" stroke="#cbd5e1" strokeWidth="2" />
        
        {/* Floor */}
        <rect x="65" y="255" width="270" height="5" fill="url(#floorGradient)" />
        <rect x="65" y="185" width="270" height="5" fill="url(#floorGradient)" />

        {/* Windows with frames */}
        {/* Living room window */}
        <rect x="80" y="140" width="50" height="35" fill="#bfdbfe" stroke="#1e40af" strokeWidth="2" />
        <line x1="105" y1="140" x2="105" y2="175" stroke="#1e40af" strokeWidth="1" />
        <line x1="80" y1="157.5" x2="130" y2="157.5" stroke="#1e40af" strokeWidth="1" />
        
        {/* Kitchen window */}
        <rect x="270" y="140" width="50" height="35" fill="#bfdbfe" stroke="#1e40af" strokeWidth="2" />
        <line x1="295" y1="140" x2="295" y2="175" stroke="#1e40af" strokeWidth="1" />
        <line x1="270" y1="157.5" x2="320" y2="157.5" stroke="#1e40af" strokeWidth="1" />

        {/* Bedroom windows (upper floor) */}
        <rect x="80" y="210" width="50" height="30" fill="#bfdbfe" stroke="#1e40af" strokeWidth="2" />
        <rect x="270" y="210" width="50" height="30" fill="#bfdbfe" stroke="#1e40af" strokeWidth="2" />

        {/* TAPPARELLE - Window blinds that change color when selected */}
        <g className={`transition-all duration-500 ${isSelected('tapparelle') ? 'opacity-100' : 'opacity-40'}`}>
          <rect x="75" y="135" width="60" height="45" 
                fill={isSelected('tapparelle') ? '#3b82f6' : '#d1d5db'} 
                opacity="0.8" stroke="#374151" strokeWidth="1" />
          <g stroke={isSelected('tapparelle') ? '#1e40af' : '#6b7280'} strokeWidth="0.5">
            <line x1="75" y1="140" x2="135" y2="140" />
            <line x1="75" y1="145" x2="135" y2="145" />
            <line x1="75" y1="150" x2="135" y2="150" />
            <line x1="75" y1="155" x2="135" y2="155" />
            <line x1="75" y1="160" x2="135" y2="160" />
            <line x1="75" y1="165" x2="135" y2="165" />
            <line x1="75" y1="170" x2="135" y2="170" />
            <line x1="75" y1="175" x2="135" y2="175" />
          </g>
          
          <rect x="265" y="135" width="60" height="45" 
                fill={isSelected('tapparelle') ? '#3b82f6' : '#d1d5db'} 
                opacity="0.8" stroke="#374151" strokeWidth="1" />
          <g stroke={isSelected('tapparelle') ? '#1e40af' : '#6b7280'} strokeWidth="0.5">
            <line x1="265" y1="140" x2="325" y2="140" />
            <line x1="265" y1="145" x2="325" y2="145" />
            <line x1="265" y1="150" x2="325" y2="150" />
            <line x1="265" y1="155" x2="325" y2="155" />
            <line x1="265" y1="160" x2="325" y2="160" />
            <line x1="265" y1="165" x2="325" y2="165" />
            <line x1="265" y1="170" x2="325" y2="170" />
            <line x1="265" y1="175" x2="325" y2="175" />
          </g>
        </g>

        {/* TENDE - Interior curtains */}
        <g className={`transition-all duration-500 ${isSelected('tende') ? 'opacity-100' : 'opacity-40'}`}>
          <path d="M85 145 Q95 140 105 145 Q115 140 125 145" 
                stroke={isSelected('tende') ? '#8b5cf6' : '#d1d5db'} 
                strokeWidth="3" fill="none" />
          <path d="M275 145 Q285 140 295 145 Q305 140 315 145" 
                stroke={isSelected('tende') ? '#8b5cf6' : '#d1d5db'} 
                strokeWidth="3" fill="none" />
        </g>

        {/* LUCI - Ceiling lights that glow when selected */}
        <g className={`transition-all duration-500`}>
          {/* Living room light */}
          <circle cx="130" cy="160" r="8" 
                  fill={isSelected('luci') ? '#fbbf24' : '#d1d5db'} 
                  stroke="#374151" strokeWidth="1"
                  filter={isSelected('luci') ? "url(#glow)" : ""} />
          {isSelected('luci') && (
            <circle cx="130" cy="160" r="15" fill="#fbbf24" opacity="0.3" className="animate-pulse" />
          )}
          
          {/* Kitchen light */}
          <circle cx="270" cy="160" r="8" 
                  fill={isSelected('luci') ? '#fbbf24' : '#d1d5db'} 
                  stroke="#374151" strokeWidth="1"
                  filter={isSelected('luci') ? "url(#glow)" : ""} />
          {isSelected('luci') && (
            <circle cx="270" cy="160" r="15" fill="#fbbf24" opacity="0.3" className="animate-pulse" />
          )}
          
          {/* Bedroom lights */}
          <circle cx="130" cy="230" r="6" 
                  fill={isSelected('luci') ? '#fbbf24' : '#d1d5db'} 
                  stroke="#374151" strokeWidth="1"
                  filter={isSelected('luci') ? "url(#glow)" : ""} />
          <circle cx="270" cy="230" r="6" 
                  fill={isSelected('luci') ? '#fbbf24' : '#d1d5db'} 
                  stroke="#374151" strokeWidth="1"
                  filter={isSelected('luci') ? "url(#glow)" : ""} />
        </g>

        {/* PORTA DI INGRESSO - Front door with intercom */}
        <g>
          <rect x="180" y="210" width="40" height="50" 
                fill="#92400e" stroke="#451a03" strokeWidth="2" rx="2" />
          <circle cx="210" cy="230" r="2" fill="#fbbf24" />
          
          {/* VIDEOCITOFONO - Intercom system */}
          <rect x="225" y="220" width="8" height="12" 
                fill={isSelected('videocitofono') ? '#ef4444' : '#6b7280'} 
                stroke="#374151" strokeWidth="1" rx="1"
                filter={isSelected('videocitofono') ? "url(#glow)" : ""} />
          <circle cx="229" cy="224" r="1.5" 
                  fill={isSelected('videocitofono') ? '#ffffff' : '#d1d5db'} />
        </g>

        {/* AUDIO - Speakers in different rooms */}
        <g className={`transition-all duration-500`}>
          {/* Living room speakers */}
          <rect x="110" y="145" width="12" height="8" 
                fill={isSelected('audio') ? '#10b981' : '#d1d5db'} 
                stroke="#374151" strokeWidth="1" rx="2"
                filter={isSelected('audio') ? "url(#glow)" : ""} />
          <circle cx="116" cy="149" r="2" 
                  fill={isSelected('audio') ? '#ffffff' : '#9ca3af'} />
          
          {/* Kitchen speakers */}
          <rect x="290" y="145" width="12" height="8" 
                fill={isSelected('audio') ? '#10b981' : '#d1d5db'} 
                stroke="#374151" strokeWidth="1" rx="2"
                filter={isSelected('audio') ? "url(#glow)" : ""} />
          <circle cx="296" cy="149" r="2" 
                  fill={isSelected('audio') ? '#ffffff' : '#9ca3af'} />
        </g>

        {/* CLIMA - Heating radiators */}
        <g className={`transition-all duration-500`}>
          {/* Living room radiator */}
          <rect x="75" y="175" width="25" height="10" 
                fill={isSelected('clima') ? '#f97316' : '#d1d5db'} 
                stroke="#374151" strokeWidth="1" />
          <g stroke={isSelected('clima') ? '#ea580c' : '#9ca3af'} strokeWidth="0.5">
            <line x1="78" y1="175" x2="78" y2="185" />
            <line x1="82" y1="175" x2="82" y2="185" />
            <line x1="86" y1="175" x2="86" y2="185" />
            <line x1="90" y1="175" x2="90" y2="185" />
            <line x1="94" y1="175" x2="94" y2="185" />
            <line x1="98" y1="175" x2="98" y2="185" />
          </g>
          {isSelected('clima') && (
            <>
              <path d="M85 170 Q90 165 95 170" stroke="#f97316" strokeWidth="1" fill="none" opacity="0.7" />
              <path d="M82 168 Q87 163 92 168" stroke="#f97316" strokeWidth="1" fill="none" opacity="0.5" />
              <path d="M88 172 Q93 167 98 172" stroke="#f97316" strokeWidth="1" fill="none" opacity="0.6" />
            </>
          )}
          
          {/* Kitchen radiator */}
          <rect x="300" y="175" width="25" height="10" 
                fill={isSelected('clima') ? '#f97316' : '#d1d5db'} 
                stroke="#374151" strokeWidth="1" />
          <g stroke={isSelected('clima') ? '#ea580c' : '#9ca3af'} strokeWidth="0.5">
            <line x1="303" y1="175" x2="303" y2="185" />
            <line x1="307" y1="175" x2="307" y2="185" />
            <line x1="311" y1="175" x2="311" y2="185" />
            <line x1="315" y1="175" x2="315" y2="185" />
            <line x1="319" y1="175" x2="319" y2="185" />
            <line x1="323" y1="175" x2="323" y2="185" />
          </g>
        </g>

        {/* PRESE SMART - Smart fridge and appliances */}
        <g className={`transition-all duration-500`}>
          {/* Kitchen fridge */}
          <rect x="250" y="190" width="15" height="25" 
                fill={isSelected('prese') ? '#ffffff' : '#e5e7eb'} 
                stroke={isSelected('prese') ? '#22c55e' : '#6b7280'} 
                strokeWidth={isSelected('prese') ? "2" : "1"}
                filter={isSelected('prese') ? "url(#glow)" : ""} />
          <rect x="252" y="192" width="11" height="8" 
                fill={isSelected('prese') ? '#dbeafe' : '#f3f4f6'} />
          <rect x="252" y="205" width="11" height="8" 
                fill={isSelected('prese') ? '#dbeafe' : '#f3f4f6'} />
          <circle cx="262" cy="196" r="1" 
                  fill={isSelected('prese') ? '#22c55e' : '#9ca3af'} />
        </g>

        {/* SICUREZZA - Security cameras */}
        <g className={`transition-all duration-500`}>
          {/* Front door camera */}
          <circle cx="190" cy="200" r="4" 
                  fill={isSelected('sicurezza') ? '#dc2626' : '#d1d5db'} 
                  stroke="#374151" strokeWidth="1"
                  filter={isSelected('sicurezza') ? "url(#glow)" : ""} />
          <circle cx="190" cy="200" r="2" 
                  fill={isSelected('sicurezza') ? '#ffffff' : '#9ca3af'} />
          
          {/* Corner security camera */}
          <circle cx="340" cy="130" r="3" 
                  fill={isSelected('sicurezza') ? '#dc2626' : '#d1d5db'} 
                  stroke="#374151" strokeWidth="1"
                  filter={isSelected('sicurezza') ? "url(#glow)" : ""} />
          <circle cx="340" cy="130" r="1.5" 
                  fill={isSelected('sicurezza') ? '#ffffff' : '#9ca3af'} />
        </g>

        {/* Room labels */}
        <text x="130" y="135" fontSize="10" fill="#374151" textAnchor="middle" fontWeight="500">Soggiorno</text>
        <text x="270" y="135" fontSize="10" fill="#374151" textAnchor="middle" fontWeight="500">Cucina</text>
        <text x="130" y="250" fontSize="9" fill="#374151" textAnchor="middle" fontWeight="500">Camera 1</text>
        <text x="270" y="250" fontSize="9" fill="#374151" textAnchor="middle" fontWeight="500">Camera 2</text>

        {/* Smart home connections visualization */}
        {selectedFunctions.length > 1 && (
          <g opacity="0.3">
            <line x1="200" y1="160" x2="130" y2="160" stroke="#22c55e" strokeWidth="1" strokeDasharray="2,2" className="animate-pulse" />
            <line x1="200" y1="160" x2="270" y2="160" stroke="#22c55e" strokeWidth="1" strokeDasharray="2,2" className="animate-pulse" />
            <line x1="200" y1="160" x2="200" y2="230" stroke="#22c55e" strokeWidth="1" strokeDasharray="2,2" className="animate-pulse" />
          </g>
        )}

        {/* Legend */}
        <g transform="translate(10, 10)">
          <rect x="0" y="0" width="120" height="80" fill="white" stroke="#e2e8f0" strokeWidth="1" rx="4" fillOpacity="0.95" />
          <text x="60" y="15" fontSize="10" fill="#374151" textAnchor="middle" fontWeight="600">Casa Smart</text>
          
          <circle cx="10" cy="25" r="3" fill="#22c55e" />
          <text x="18" y="29" fontSize="8" fill="#374151">Attivo</text>
          
          <circle cx="10" cy="38" r="3" fill="#d1d5db" />
          <text x="18" y="42" fontSize="8" fill="#374151">Inattivo</text>
          
          <text x="10" y="55" fontSize="7" fill="#6b7280">Visualizza come ogni</text>
          <text x="10" y="64" fontSize="7" fill="#6b7280">funzione si integra</text>
          <text x="10" y="73" fontSize="7" fill="#6b7280">nella tua casa</text>
        </g>
      </svg>
    </div>
  );
};
