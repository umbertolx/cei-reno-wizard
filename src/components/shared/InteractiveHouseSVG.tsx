
import { useMemo } from "react";

type Props = {
  selectedFunctions: string[];
};

export const InteractiveHouseSVG = ({ selectedFunctions }: Props) => {
  const isSelected = (functionKey: string) => selectedFunctions.includes(functionKey);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <svg
        viewBox="0 0 800 600"
        className="w-full h-auto drop-shadow-2xl"
      >
        {/* Definitions for realistic gradients and effects */}
        <defs>
          {/* Modern wall gradient */}
          <linearGradient id="wallGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="50%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
          
          {/* Luxury floor */}
          <linearGradient id="floorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#92400e" />
            <stop offset="50%" stopColor="#a16207" />
            <stop offset="100%" stopColor="#78716c" />
          </linearGradient>
          
          {/* Window glass with reflection */}
          <linearGradient id="windowGlass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dbeafe" />
            <stop offset="30%" stopColor="#bfdbfe" />
            <stop offset="70%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          
          {/* Premium light glow */}
          <filter id="lightGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Warm ambient light */}
          <filter id="warmGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="15" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Drop shadow */}
          <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="3" dy="6" stdDeviation="4" floodColor="#000000" floodOpacity="0.15"/>
          </filter>
          
          {/* Wood texture */}
          <pattern id="woodTexture" patternUnits="userSpaceOnUse" width="30" height="6">
            <rect width="30" height="6" fill="#92400e"/>
            <line x1="0" y1="3" x2="30" y2="3" stroke="#78716c" strokeWidth="0.8"/>
            <line x1="0" y1="1" x2="30" y2="1" stroke="#a16207" strokeWidth="0.3"/>
            <line x1="0" y1="5" x2="30" y2="5" stroke="#a16207" strokeWidth="0.3"/>
          </pattern>
        </defs>

        {/* Room structure - Modern living room */}
        
        {/* Back wall */}
        <rect x="50" y="50" width="700" height="400" fill="url(#wallGradient)" stroke="#cbd5e1" strokeWidth="2" />
        
        {/* Floor with wood pattern */}
        <rect x="50" y="450" width="700" height="100" fill="url(#woodTexture)" stroke="#78716c" strokeWidth="2" />
        
        {/* Left wall (partial view) */}
        <polygon points="50,50 50,550 80,520 80,80" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
        
        {/* Right wall (partial view) */}
        <polygon points="750,50 750,550 720,520 720,80" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
        
        {/* Ceiling */}
        <polygon points="50,50 750,50 720,80 80,80" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />

        {/* Large panoramic window */}
        <rect x="150" y="80" width="500" height="250" fill="url(#windowGlass)" stroke="#374151" strokeWidth="4" rx="8" filter="url(#dropShadow)" />
        
        {/* Window frame details */}
        <rect x="155" y="85" width="490" height="240" fill="none" stroke="#374151" strokeWidth="2" rx="4" />
        <line x1="400" y1="80" x2="400" y2="330" stroke="#374151" strokeWidth="3" />
        <line x1="150" y1="205" x2="650" y2="205" stroke="#374151" strokeWidth="3" />
        
        {/* Window view - subtle landscape */}
        <rect x="160" y="90" width="480" height="230" fill="#87ceeb" opacity="0.3" rx="4" />
        <circle cx="600" cy="130" r="25" fill="#fbbf24" opacity="0.6" />
        <polygon points="160,280 300,200 450,240 650,180 650,320 160,320" fill="#22c55e" opacity="0.4" />

        {/* TAPPARELLE - Motorized blinds */}
        <g className={`transition-all duration-500 ${isSelected('tapparelle') ? 'opacity-100' : 'opacity-70'}`}>
          <rect x="145" y="75" width="510" height="260" 
                fill={isSelected('tapparelle') ? '#3b82f6' : '#e5e7eb'} 
                opacity="0.85" stroke="#374151" strokeWidth="3" rx="8" 
                filter={isSelected('tapparelle') ? "url(#lightGlow)" : ""} />
          
          {/* Blind slats */}
          <g stroke={isSelected('tapparelle') ? '#1e40af' : '#9ca3af'} strokeWidth="1.5">
            {Array.from({length: 25}, (_, i) => (
              <line key={i} x1="150" y1={85 + i * 10} x2="650" y2={85 + i * 10} />
            ))}
          </g>
          
          {/* Motor control */}
          {isSelected('tapparelle') && (
            <rect x="620" y="60" width="25" height="15" fill="#22c55e" rx="3" className="animate-pulse" />
          )}
        </g>

        {/* TENDE - Luxury curtains */}
        <g className={`transition-all duration-500 ${isSelected('tende') ? 'opacity-100' : 'opacity-60'}`}>
          {/* Left curtain */}
          <path d="M120 90 Q140 80 160 90 Q180 80 200 90 L200 320 Q180 330 160 320 Q140 330 120 320 Z" 
                fill={isSelected('tende') ? '#8b5cf6' : '#f3f4f6'} 
                stroke={isSelected('tende') ? '#7c3aed' : '#d1d5db'} 
                strokeWidth="3" opacity="0.9" />
          
          {/* Right curtain */}
          <path d="M600 90 Q620 80 640 90 Q660 80 680 90 L680 320 Q660 330 640 320 Q620 330 600 320 Z" 
                fill={isSelected('tende') ? '#8b5cf6' : '#f3f4f6'} 
                stroke={isSelected('tende') ? '#7c3aed' : '#d1d5db'} 
                strokeWidth="3" opacity="0.9" />
          
          {/* Curtain rails */}
          <line x1="115" y1="85" x2="205" y2="85" stroke="#6b7280" strokeWidth="4" />
          <line x1="595" y1="85" x2="685" y2="85" stroke="#6b7280" strokeWidth="4" />
        </g>

        {/* LUCI - Modern lighting system */}
        <g>
          {/* Main ceiling chandelier */}
          <g>
            <circle cx="400" cy="120" r="25" 
                    fill={isSelected('luci') ? '#fbbf24' : '#f3f4f6'} 
                    stroke="#374151" strokeWidth="3"
                    filter={isSelected('luci') ? "url(#warmGlow)" : ""} />
            <circle cx="400" cy="120" r="18" 
                    fill={isSelected('luci') ? '#ffffff' : '#e5e7eb'} opacity="0.9" />
            <circle cx="400" cy="120" r="12" 
                    fill={isSelected('luci') ? '#fef3c7' : '#f3f4f6'} opacity="0.8" />
            
            {/* Pendant details */}
            <line x1="400" y1="95" x2="400" y2="105" stroke="#374151" strokeWidth="2" />
            
            {isSelected('luci') && (
              <>
                <circle cx="400" cy="120" r="60" fill="#fbbf24" opacity="0.15" className="animate-pulse" />
                <circle cx="400" cy="120" r="40" fill="#fbbf24" opacity="0.25" className="animate-pulse" />
              </>
            )}
          </g>
          
          {/* Recessed lights */}
          <circle cx="200" cy="100" r="12" 
                  fill={isSelected('luci') ? '#fbbf24' : '#f3f4f6'} 
                  stroke="#374151" strokeWidth="2"
                  filter={isSelected('luci') ? "url(#lightGlow)" : ""} />
          <circle cx="600" cy="100" r="12" 
                  fill={isSelected('luci') ? '#fbbf24' : '#f3f4f6'} 
                  stroke="#374151" strokeWidth="2"
                  filter={isSelected('luci') ? "url(#lightGlow)" : ""} />
          
          {/* Table lamps */}
          <g>
            <ellipse cx="150" cy="400" rx="20" ry="8" fill="#374151" />
            <rect x="145" y="385" width="10" height="15" fill="#6b7280" />
            <ellipse cx="150" cy="375" rx="15" ry="10" 
                     fill={isSelected('luci') ? '#fef3c7' : '#f3f4f6'} 
                     stroke="#6b7280" strokeWidth="1"
                     filter={isSelected('luci') ? "url(#warmGlow)" : ""} />
          </g>
        </g>

        {/* VIDEOCITOFONO - Smart intercom near entrance */}
        <g transform="translate(700, 350)">
          <rect x="0" y="0" width="35" height="50" 
                fill={isSelected('videocitofono') ? '#ef4444' : '#6b7280'} 
                stroke="#374151" strokeWidth="3" rx="6"
                filter={isSelected('videocitofono') ? "url(#lightGlow)" : ""} />
          
          {/* Camera */}
          <circle cx="17" cy="15" r="6" 
                  fill={isSelected('videocitofono') ? '#ffffff' : '#d1d5db'} />
          <circle cx="17" cy="15" r="3" 
                  fill={isSelected('videocitofono') ? '#1f2937' : '#9ca3af'} />
          
          {/* Screen */}
          <rect x="5" y="25" width="25" height="15" 
                fill={isSelected('videocitofono') ? '#22c55e' : '#9ca3af'} rx="2" />
          
          {/* Buttons */}
          <circle cx="17" cy="45" r="3" 
                  fill={isSelected('videocitofono') ? '#22c55e' : '#d1d5db'} />
          
          {isSelected('videocitofono') && (
            <circle cx="17" cy="15" r="12" fill="#ef4444" opacity="0.3" className="animate-pulse" />
          )}
        </g>

        {/* AUDIO - Premium sound system */}
        <g>
          {/* Floor speakers */}
          <g transform="translate(100, 420)">
            <rect x="0" y="0" width="25" height="60" 
                  fill={isSelected('audio') ? '#10b981' : '#d1d5db'} 
                  stroke="#374151" strokeWidth="3" rx="8"
                  filter={isSelected('audio') ? "url(#lightGlow)" : ""} />
            
            {/* Speaker drivers */}
            <circle cx="12" cy="20" r="7" 
                    fill={isSelected('audio') ? '#ffffff' : '#9ca3af'} />
            <circle cx="12" cy="20" r="3" 
                    fill={isSelected('audio') ? '#10b981' : '#6b7280'} />
            <circle cx="12" cy="40" r="5" 
                    fill={isSelected('audio') ? '#ffffff' : '#9ca3af'} />
            <circle cx="12" cy="40" r="2" 
                    fill={isSelected('audio') ? '#10b981' : '#6b7280'} />
          </g>
          
          {/* Ceiling speakers */}
          <circle cx="300" cy="90" r="15" 
                  fill={isSelected('audio') ? '#10b981' : '#d1d5db'} 
                  stroke="#374151" strokeWidth="2"
                  filter={isSelected('audio') ? "url(#lightGlow)" : ""} />
          <circle cx="300" cy="90" r="8" 
                  fill={isSelected('audio') ? '#ffffff' : '#9ca3af'} />
          
          <circle cx="500" cy="90" r="15" 
                  fill={isSelected('audio') ? '#10b981' : '#d1d5db'} 
                  stroke="#374151" strokeWidth="2" />
          <circle cx="500" cy="90" r="8" 
                  fill={isSelected('audio') ? '#ffffff' : '#9ca3af'} />
          
          {/* Sound waves */}
          {isSelected('audio') && (
            <>
              <path d="M130 440 Q140 435 130 455" stroke="#10b981" strokeWidth="3" fill="none" opacity="0.7" className="animate-pulse" />
              <path d="M135 438 Q145 433 135 458" stroke="#10b981" strokeWidth="2" fill="none" opacity="0.5" className="animate-pulse" />
            </>
          )}
        </g>

        {/* CLIMA - HVAC system */}
        <g>
          {/* Wall-mounted AC unit */}
          <rect x="650" y="120" width="60" height="25" 
                fill={isSelected('clima') ? '#ffffff' : '#f3f4f6'} 
                stroke={isSelected('clima') ? '#22c55e' : '#9ca3af'} 
                strokeWidth="3" rx="6"
                filter={isSelected('clima') ? "url(#lightGlow)" : ""} />
          
          {/* AC vents */}
          <g stroke={isSelected('clima') ? '#22c55e' : '#9ca3af'} strokeWidth="1">
            {Array.from({length: 8}, (_, i) => (
              <line key={i} x1={655 + i * 6} y1="125" x2={655 + i * 6} y2="140" />
            ))}
          </g>
          
          {/* Floor heating radiator */}
          <rect x="80" y="480" width="120" height="20" 
                fill={isSelected('clima') ? '#f97316' : '#d1d5db'} 
                stroke="#374151" strokeWidth="2" rx="10" />
          
          {/* Radiator fins */}
          <g stroke={isSelected('clima') ? '#ea580c' : '#9ca3af'} strokeWidth="1.5">
            {Array.from({length: 15}, (_, i) => (
              <line key={i} x1={85 + i * 7} y1="480" x2={85 + i * 7} y2="500" />
            ))}
          </g>
          
          {/* Thermostat */}
          <circle cx="550" cy="250" r="15" 
                  fill={isSelected('clima') ? '#ffffff' : '#f3f4f6'} 
                  stroke={isSelected('clima') ? '#f97316' : '#9ca3af'} 
                  strokeWidth="3" />
          <circle cx="550" cy="250" r="8" 
                  fill={isSelected('clima') ? '#f97316' : '#d1d5db'} />
          
          {/* Heat visualization */}
          {isSelected('clima') && (
            <>
              <path d="M140 475 Q145 470 150 475 Q155 470 160 475" stroke="#f97316" strokeWidth="2" fill="none" opacity="0.8" className="animate-pulse" />
              <path d="M120 473 Q125 468 130 473 Q135 468 140 473" stroke="#f97316" strokeWidth="2" fill="none" opacity="0.6" className="animate-pulse" />
            </>
          )}
        </g>

        {/* PRESE SMART - Smart appliances */}
        <g>
          {/* Smart TV */}
          <rect x="250" y="350" width="300" height="180" 
                fill={isSelected('prese') ? '#1f2937' : '#9ca3af'} 
                stroke={isSelected('prese') ? '#22c55e' : '#6b7280'} 
                strokeWidth="4" rx="8" filter="url(#dropShadow)" />
          
          {/* TV screen */}
          <rect x="260" y="360" width="280" height="160" 
                fill={isSelected('prese') ? '#3b82f6' : '#f3f4f6'} 
                opacity={isSelected('prese') ? "0.8" : "0.3"} rx="4" />
          
          {/* TV stand */}
          <rect x="350" y="530" width="100" height="15" fill="#374151" rx="4" />
          <rect x="380" y="515" width="40" height="15" fill="#6b7280" />
          
          {/* Smart coffee machine */}
          <rect x="600" y="420" width="40" height="50" 
                fill={isSelected('prese') ? '#ffffff' : '#f3f4f6'} 
                stroke={isSelected('prese') ? '#22c55e' : '#9ca3af'} 
                strokeWidth="2" rx="6" />
          <circle cx="620" cy="440" r="8" 
                  fill={isSelected('prese') ? '#8b5cf6' : '#d1d5db'} />
          
          {/* WiFi indicators */}
          {isSelected('prese') && (
            <>
              <circle cx="540" cy="340" r="4" fill="#22c55e" opacity="0.8" className="animate-pulse" />
              <circle cx="630" cy="410" r="3" fill="#22c55e" opacity="0.6" className="animate-pulse" />
            </>
          )}
        </g>

        {/* SICUREZZA - Security system */}
        <g>
          {/* Main security camera */}
          <circle cx="720" cy="90" r="15" 
                  fill={isSelected('sicurezza') ? '#dc2626' : '#d1d5db'} 
                  stroke="#374151" strokeWidth="3"
                  filter={isSelected('sicurezza') ? "url(#lightGlow)" : ""} />
          <circle cx="720" cy="90" r="8" 
                  fill={isSelected('sicurezza') ? '#ffffff' : '#9ca3af'} />
          <circle cx="720" cy="90" r="4" 
                  fill={isSelected('sicurezza') ? '#1f2937' : '#6b7280'} />
          
          {/* Motion sensor */}
          <rect x="450" y="340" width="20" height="12" 
                fill={isSelected('sicurezza') ? '#fbbf24' : '#e5e7eb'} 
                rx="6" stroke="#374151" strokeWidth="2" />
          
          {/* Door sensor */}
          <rect x="750" y="300" width="8" height="20" 
                fill={isSelected('sicurezza') ? '#fbbf24' : '#e5e7eb'} 
                rx="4" stroke="#374151" strokeWidth="1" />
          
          {/* Security indicators */}
          {isSelected('sicurezza') && (
            <>
              <circle cx="720" cy="90" r="25" fill="#dc2626" opacity="0.2" className="animate-pulse" />
              <text x="680" y="75" fontSize="10" fill="#dc2626" fontWeight="700">REC</text>
              <circle cx="460" cy="346" r="8" fill="#fbbf24" opacity="0.4" className="animate-pulse" />
            </>
          )}
        </g>

        {/* Room furniture for context */}
        <g opacity="0.6">
          {/* Sofa */}
          <rect x="200" y="450" width="150" height="40" fill="#64748b" rx="8" />
          <rect x="190" y="440" width="20" height="30" fill="#64748b" rx="4" />
          <rect x="340" y="440" width="20" height="30" fill="#64748b" rx="4" />
          
          {/* Coffee table */}
          <rect x="220" y="500" width="110" height="25" fill="#92400e" rx="4" />
          <rect x="230" y="520" width="8" height="15" fill="#78716c" />
          <rect x="312" y="520" width="8" height="15" fill="#78716c" />
        </g>

        {/* Room label */}
        <text x="400" y="40" fontSize="24" fill="#374151" textAnchor="middle" fontWeight="700" fontFamily="system-ui">
          Soggiorno Smart
        </text>

        {/* Network visualization when multiple functions selected */}
        {selectedFunctions.length > 1 && (
          <g opacity="0.7">
            {/* Central hub */}
            <rect x="390" y="280" width="20" height="20" fill="#22c55e" rx="4" className="animate-pulse" />
            <text x="400" y="293" fontSize="8" fill="#ffffff" textAnchor="middle" fontWeight="700">HUB</text>
            
            {/* Network connections */}
            <g stroke="#22c55e" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse">
              <line x1="400" y1="290" x2="400" y2="120" />
              <line x1="400" y1="290" x2="720" y2="90" />
              <line x1="400" y1="290" x2="680" y2="135" />
              <line x1="400" y1="290" x2="550" y2="250" />
              <line x1="400" y1="290" x2="400" y2="360" />
            </g>
          </g>
        )}

        {/* Modern legend */}
        <g transform="translate(20, 480)">
          <rect x="0" y="0" width="200" height="100" fill="white" stroke="#e2e8f0" strokeWidth="2" rx="12" fillOpacity="0.95" filter="url(#dropShadow)" />
          
          <rect x="0" y="0" width="200" height="30" fill="#3b82f6" rx="12" />
          <rect x="0" y="20" width="200" height="10" fill="#3b82f6" />
          <text x="100" y="20" fontSize="14" fill="white" textAnchor="middle" fontWeight="700">Casa Intelligente</text>
          
          <circle cx="15" cy="45" r="4" fill="#22c55e" />
          <text x="25" y="50" fontSize="11" fill="#374151" fontWeight="600">Attivo</text>
          
          <circle cx="15" cy="60" r="4" fill="#d1d5db" />
          <text x="25" y="65" fontSize="11" fill="#374151" fontWeight="600">Inattivo</text>
          
          <line x1="15" y1="75" x2="30" y2="75" stroke="#22c55e" strokeWidth="2" strokeDasharray="3,3" />
          <text x="35" y="80" fontSize="10" fill="#6b7280" fontWeight="500">Rete KNX</text>
        </g>
      </svg>
    </div>
  );
};
