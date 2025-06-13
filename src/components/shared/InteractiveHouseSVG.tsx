
import { useMemo } from "react";

type Props = {
  selectedFunctions: string[];
};

export const InteractiveHouseSVG = ({ selectedFunctions }: Props) => {
  const isSelected = (functionKey: string) => selectedFunctions.includes(functionKey);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <svg
        viewBox="0 0 500 400"
        className="w-full h-auto drop-shadow-2xl"
      >
        {/* Definitions for gradients and effects */}
        <defs>
          {/* Wall gradients for depth */}
          <linearGradient id="wallFront" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
          <linearGradient id="wallSide" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          
          {/* Floor gradients */}
          <linearGradient id="floorWood" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>
          
          {/* Roof gradient */}
          <linearGradient id="roofGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          
          {/* Glow effects for active elements */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="lightGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background and base */}
        <rect x="0" y="350" width="500" height="50" fill="#22c55e" opacity="0.2" />
        
        {/* House foundation */}
        <polygon points="80,320 420,320 420,340 80,340" fill="#78716c" />
        
        {/* Main house structure - 3D isometric style */}
        
        {/* Back walls */}
        <polygon points="100,120 380,120 380,320 100,320" fill="url(#wallFront)" stroke="#94a3b8" strokeWidth="2" />
        
        {/* Side wall (right side for depth) */}
        <polygon points="380,120 420,80 420,280 380,320" fill="url(#wallSide)" stroke="#94a3b8" strokeWidth="2" />
        
        {/* Roof */}
        <polygon points="90,120 240,40 390,80 380,120 100,120" fill="url(#roofGradient)" stroke="#334155" strokeWidth="2" />
        <polygon points="240,40 390,80 430,40 280,0" fill="#475569" stroke="#334155" strokeWidth="2" />
        
        {/* Floor divisions - creating 3 levels */}
        
        {/* Ground floor */}
        <rect x="105" y="250" width="270" height="65" fill="url(#floorWood)" />
        <polygon points="375,250 415,210 415,275 375,315" fill="#92400e" />
        
        {/* First floor */}
        <rect x="105" y="180" width="270" height="65" fill="url(#floorWood)" />
        <polygon points="375,180 415,140 415,205 375,245" fill="#92400e" />
        
        {/* Attic/Second floor */}
        <rect x="105" y="125" width="270" height="50" fill="url(#floorWood)" />
        <polygon points="375,125 415,85 415,135 375,175" fill="#92400e" />
        
        {/* Internal walls for room separation */}
        <line x1="240" y1="125" x2="240" y2="315" stroke="#cbd5e1" strokeWidth="2" />
        <line x1="240" y1="125" x2="280" y2="85" stroke="#cbd5e1" strokeWidth="2" />
        
        {/* Windows with realistic frames */}
        
        {/* Ground floor windows */}
        <g>
          <rect x="120" y="270" width="40" height="30" fill="#bfdbfe" stroke="#1e40af" strokeWidth="2" rx="2" />
          <line x1="140" y1="270" x2="140" y2="300" stroke="#1e40af" strokeWidth="1" />
          <line x1="120" y1="285" x2="160" y2="285" stroke="#1e40af" strokeWidth="1" />
          
          <rect x="320" y="270" width="40" height="30" fill="#bfdbfe" stroke="#1e40af" strokeWidth="2" rx="2" />
          <line x1="340" y1="270" x2="340" y2="300" stroke="#1e40af" strokeWidth="1" />
          <line x1="320" y1="285" x2="360" y2="285" stroke="#1e40af" strokeWidth="1" />
        </g>
        
        {/* First floor windows */}
        <g>
          <rect x="120" y="200" width="40" height="30" fill="#bfdbfe" stroke="#1e40af" strokeWidth="2" rx="2" />
          <rect x="320" y="200" width="40" height="30" fill="#bfdbfe" stroke="#1e40af" strokeWidth="2" rx="2" />
        </g>
        
        {/* Attic windows */}
        <g>
          <rect x="150" y="140" width="30" height="25" fill="#bfdbfe" stroke="#1e40af" strokeWidth="2" rx="2" />
          <rect x="290" y="140" width="30" height="25" fill="#bfdbfe" stroke="#1e40af" strokeWidth="2" rx="2" />
        </g>

        {/* TAPPARELLE - Motorized blinds that activate when selected */}
        <g className={`transition-all duration-500 ${isSelected('tapparelle') ? 'opacity-100' : 'opacity-60'}`}>
          {/* Ground floor blinds */}
          <rect x="115" y="265" width="50" height="40" 
                fill={isSelected('tapparelle') ? '#3b82f6' : '#d1d5db'} 
                opacity="0.8" stroke="#374151" strokeWidth="1" rx="2" />
          <g stroke={isSelected('tapparelle') ? '#1e40af' : '#6b7280'} strokeWidth="0.5">
            {Array.from({length: 8}, (_, i) => (
              <line key={i} x1="115" y1={270 + i * 4} x2="165" y2={270 + i * 4} />
            ))}
          </g>
          
          <rect x="315" y="265" width="50" height="40" 
                fill={isSelected('tapparelle') ? '#3b82f6' : '#d1d5db'} 
                opacity="0.8" stroke="#374151" strokeWidth="1" rx="2" />
          <g stroke={isSelected('tapparelle') ? '#1e40af' : '#6b7280'} strokeWidth="0.5">
            {Array.from({length: 8}, (_, i) => (
              <line key={i} x1="315" y1={270 + i * 4} x2="365" y2={270 + i * 4} />
            ))}
          </g>
        </g>

        {/* TENDE - Interior curtains */}
        <g className={`transition-all duration-500 ${isSelected('tende') ? 'opacity-100' : 'opacity-50'}`}>
          <path d="M125 275 Q135 270 145 275 Q155 270 165 275" 
                stroke={isSelected('tende') ? '#8b5cf6' : '#d1d5db'} 
                strokeWidth="4" fill="none" />
          <path d="M325 275 Q335 270 345 275 Q355 270 365 275" 
                stroke={isSelected('tende') ? '#8b5cf6' : '#d1d5db'} 
                strokeWidth="4" fill="none" />
        </g>

        {/* LUCI - Modern ceiling lights with realistic glow */}
        <g>
          {/* Ground floor lights */}
          <circle cx="170" cy="285" r="8" 
                  fill={isSelected('luci') ? '#fbbf24' : '#e5e7eb'} 
                  stroke="#374151" strokeWidth="1"
                  filter={isSelected('luci') ? "url(#lightGlow)" : ""} />
          {isSelected('luci') && (
            <circle cx="170" cy="285" r="25" fill="#fbbf24" opacity="0.2" className="animate-pulse" />
          )}
          
          <circle cx="310" cy="285" r="8" 
                  fill={isSelected('luci') ? '#fbbf24' : '#e5e7eb'} 
                  stroke="#374151" strokeWidth="1"
                  filter={isSelected('luci') ? "url(#lightGlow)" : ""} />
          {isSelected('luci') && (
            <circle cx="310" cy="285" r="25" fill="#fbbf24" opacity="0.2" className="animate-pulse" />
          )}
          
          {/* First floor lights */}
          <circle cx="170" cy="215" r="7" 
                  fill={isSelected('luci') ? '#fbbf24' : '#e5e7eb'} 
                  stroke="#374151" strokeWidth="1"
                  filter={isSelected('luci') ? "url(#lightGlow)" : ""} />
          <circle cx="310" cy="215" r="7" 
                  fill={isSelected('luci') ? '#fbbf24' : '#e5e7eb'} 
                  stroke="#374151" strokeWidth="1"
                  filter={isSelected('luci') ? "url(#lightGlow)" : ""} />
          
          {/* Attic light */}
          <circle cx="240" cy="150" r="6" 
                  fill={isSelected('luci') ? '#fbbf24' : '#e5e7eb'} 
                  stroke="#374151" strokeWidth="1"
                  filter={isSelected('luci') ? "url(#lightGlow)" : ""} />
        </g>

        {/* PORTA DI INGRESSO - Modern front door */}
        <g>
          <rect x="200" y="270" width="35" height="45" 
                fill="#92400e" stroke="#451a03" strokeWidth="2" rx="3" />
          <rect x="205" y="275" width="25" height="35" 
                fill="#a16207" stroke="#92400e" strokeWidth="1" rx="2" />
          <circle cx="225" cy="290" r="2" fill="#fbbf24" />
          
          {/* VIDEOCITOFONO - Modern intercom system */}
          <rect x="240" y="280" width="12" height="18" 
                fill={isSelected('videocitofono') ? '#ef4444' : '#6b7280'} 
                stroke="#374151" strokeWidth="1" rx="2"
                filter={isSelected('videocitofono') ? "url(#glow)" : ""} />
          <circle cx="246" cy="285" r="2" 
                  fill={isSelected('videocitofono') ? '#ffffff' : '#d1d5db'} />
          <rect x="242" y="291" width="8" height="4" 
                fill={isSelected('videocitofono') ? '#22c55e' : '#9ca3af'} rx="1" />
        </g>

        {/* AUDIO - High-end speakers */}
        <g>
          {/* Living room speakers */}
          <rect x="130" y="250" width="15" height="12" 
                fill={isSelected('audio') ? '#10b981' : '#d1d5db'} 
                stroke="#374151" strokeWidth="1" rx="3"
                filter={isSelected('audio') ? "url(#glow)" : ""} />
          <circle cx="137" cy="256" r="3" 
                  fill={isSelected('audio') ? '#ffffff' : '#9ca3af'} />
          <circle cx="137" cy="256" r="1.5" 
                  fill={isSelected('audio') ? '#10b981' : '#6b7280'} />
          
          {/* Kitchen speakers */}
          <rect x="330" y="250" width="15" height="12" 
                fill={isSelected('audio') ? '#10b981' : '#d1d5db'} 
                stroke="#374151" strokeWidth="1" rx="3"
                filter={isSelected('audio') ? "url(#glow)" : ""} />
          <circle cx="337" cy="256" r="3" 
                  fill={isSelected('audio') ? '#ffffff' : '#9ca3af'} />
          
          {/* Bedroom speakers */}
          <rect x="130" y="180" width="12" height="10" 
                fill={isSelected('audio') ? '#10b981' : '#d1d5db'} 
                stroke="#374151" strokeWidth="1" rx="2"
                filter={isSelected('audio') ? "url(#glow)" : ""} />
        </g>

        {/* CLIMA - Modern heating system */}
        <g>
          {/* Ground floor radiators */}
          <rect x="110" y="305" width="30" height="8" 
                fill={isSelected('clima') ? '#f97316' : '#d1d5db'} 
                stroke="#374151" strokeWidth="1" rx="2" />
          <g stroke={isSelected('clima') ? '#ea580c' : '#9ca3af'} strokeWidth="0.5">
            {Array.from({length: 6}, (_, i) => (
              <line key={i} x1={113 + i * 4} y1="305" x2={113 + i * 4} y2="313" />
            ))}
          </g>
          {isSelected('clima') && (
            <>
              <path d="M120 300 Q125 295 130 300" stroke="#f97316" strokeWidth="1.5" fill="none" opacity="0.8" className="animate-pulse" />
              <path d="M117 298 Q122 293 127 298" stroke="#f97316" strokeWidth="1" fill="none" opacity="0.6" className="animate-pulse" />
            </>
          )}
          
          <rect x="340" y="305" width="30" height="8" 
                fill={isSelected('clima') ? '#f97316' : '#d1d5db'} 
                stroke="#374151" strokeWidth="1" rx="2" />
          
          {/* First floor radiators */}
          <rect x="340" y="235" width="25" height="8" 
                fill={isSelected('clima') ? '#f97316' : '#d1d5db'} 
                stroke="#374151" strokeWidth="1" rx="2" />
        </g>

        {/* PRESE SMART - Smart appliances */}
        <g>
          {/* Modern smart fridge */}
          <rect x="290" y="265" width="20" height="35" 
                fill={isSelected('prese') ? '#ffffff' : '#e5e7eb'} 
                stroke={isSelected('prese') ? '#22c55e' : '#6b7280'} 
                strokeWidth={isSelected('prese') ? "2" : "1"} rx="3"
                filter={isSelected('prese') ? "url(#glow)" : ""} />
          <rect x="292" y="270" width="16" height="12" 
                fill={isSelected('prese') ? '#dbeafe' : '#f3f4f6'} rx="1" />
          <rect x="292" y="285" width="16" height="12" 
                fill={isSelected('prese') ? '#dbeafe' : '#f3f4f6'} rx="1" />
          <circle cx="305" cy="275" r="1.5" 
                  fill={isSelected('prese') ? '#22c55e' : '#9ca3af'} />
          {isSelected('prese') && (
            <circle cx="305" cy="275" r="3" fill="#22c55e" opacity="0.3" className="animate-pulse" />
          )}
          
          {/* Smart TV */}
          <rect x="250" y="195" width="25" height="15" 
                fill={isSelected('prese') ? '#1f2937' : '#9ca3af'} 
                stroke={isSelected('prese') ? '#22c55e' : '#6b7280'} 
                strokeWidth="1" rx="2" />
          {isSelected('prese') && (
            <rect x="252" y="197" width="21" height="11" fill="#3b82f6" opacity="0.5" rx="1" />
          )}
        </g>

        {/* SICUREZZA - Security cameras */}
        <g>
          {/* Front door camera */}
          <circle cx="195" cy="260" r="5" 
                  fill={isSelected('sicurezza') ? '#dc2626' : '#d1d5db'} 
                  stroke="#374151" strokeWidth="1"
                  filter={isSelected('sicurezza') ? "url(#glow)" : ""} />
          <circle cx="195" cy="260" r="2.5" 
                  fill={isSelected('sicurezza') ? '#ffffff' : '#9ca3af'} />
          {isSelected('sicurezza') && (
            <circle cx="195" cy="260" r="8" fill="#dc2626" opacity="0.2" className="animate-pulse" />
          )}
          
          {/* Corner security cameras */}
          <circle cx="380" cy="130" r="4" 
                  fill={isSelected('sicurezza') ? '#dc2626' : '#d1d5db'} 
                  stroke="#374151" strokeWidth="1"
                  filter={isSelected('sicurezza') ? "url(#glow)" : ""} />
          <circle cx="380" cy="130" r="2" 
                  fill={isSelected('sicurezza') ? '#ffffff' : '#9ca3af'} />
          
          <circle cx="110" cy="190" r="3" 
                  fill={isSelected('sicurezza') ? '#dc2626' : '#d1d5db'} 
                  stroke="#374151" strokeWidth="1"
                  filter={isSelected('sicurezza') ? "url(#glow)" : ""} />
        </g>

        {/* Room labels with better positioning */}
        <text x="170" y="245" fontSize="11" fill="#374151" textAnchor="middle" fontWeight="600">Soggiorno</text>
        <text x="310" y="245" fontSize="11" fill="#374151" textAnchor="middle" fontWeight="600">Cucina</text>
        <text x="170" y="175" fontSize="10" fill="#374151" textAnchor="middle" fontWeight="600">Camera</text>
        <text x="310" y="175" fontSize="10" fill="#374151" textAnchor="middle" fontWeight="600">Bagno</text>
        <text x="240" y="140" fontSize="9" fill="#374151" textAnchor="middle" fontWeight="600">Mansarda</text>

        {/* Smart home network visualization */}
        {selectedFunctions.length > 1 && (
          <g opacity="0.4">
            {/* Central hub */}
            <circle cx="240" cy="220" r="4" fill="#22c55e" className="animate-pulse" />
            
            {/* Connection lines */}
            <line x1="240" y1="220" x2="170" y2="285" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3,3" className="animate-pulse" />
            <line x1="240" y1="220" x2="310" y2="285" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3,3" className="animate-pulse" />
            <line x1="240" y1="220" x2="170" y2="215" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3,3" className="animate-pulse" />
            <line x1="240" y1="220" x2="310" y2="215" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3,3" className="animate-pulse" />
          </g>
        )}

        {/* Enhanced legend */}
        <g transform="translate(15, 15)">
          <rect x="0" y="0" width="140" height="95" fill="white" stroke="#e2e8f0" strokeWidth="1" rx="6" fillOpacity="0.98" />
          <text x="70" y="18" fontSize="12" fill="#374151" textAnchor="middle" fontWeight="700">Casa Intelligente</text>
          
          <circle cx="15" cy="30" r="4" fill="#22c55e" />
          <text x="25" y="35" fontSize="9" fill="#374151" fontWeight="500">Funzione attiva</text>
          
          <circle cx="15" cy="45" r="4" fill="#d1d5db" />
          <text x="25" y="50" fontSize="9" fill="#374151" fontWeight="500">Funzione disattivata</text>
          
          <line x1="15" y1="60" x2="25" y2="60" stroke="#22c55e" strokeWidth="2" strokeDasharray="2,2" />
          <text x="30" y="65" fontSize="8" fill="#6b7280">Rete domotica</text>
          
          <text x="15" y="80" fontSize="8" fill="#6b7280" fontWeight="500">Seleziona le funzioni per</text>
          <text x="15" y="90" fontSize="8" fill="#6b7280" fontWeight="500">vedere l'integrazione</text>
        </g>
      </svg>
    </div>
  );
};
