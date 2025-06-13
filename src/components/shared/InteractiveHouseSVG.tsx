
import { useMemo } from "react";

type Props = {
  selectedFunctions: string[];
};

export const InteractiveHouseSVG = ({ selectedFunctions }: Props) => {
  const isSelected = (functionKey: string) => selectedFunctions.includes(functionKey);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <svg
        viewBox="0 0 900 700"
        className="w-full h-auto drop-shadow-2xl"
      >
        <defs>
          {/* 3D Gradients for walls */}
          <linearGradient id="wallFront" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
          
          <linearGradient id="wallRight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          
          <linearGradient id="wallTop" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>
          
          {/* Floor with 3D effect */}
          <linearGradient id="floor3D" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a16207" />
            <stop offset="50%" stopColor="#92400e" />
            <stop offset="100%" stopColor="#78716c" />
          </linearGradient>
          
          {/* Ceiling 3D */}
          <linearGradient id="ceiling3D" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>
          
          {/* Window glass with 3D reflection */}
          <linearGradient id="glass3D" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dbeafe" opacity="0.8" />
            <stop offset="30%" stopColor="#bfdbfe" opacity="0.6" />
            <stop offset="70%" stopColor="#93c5fd" opacity="0.4" />
            <stop offset="100%" stopColor="#3b82f6" opacity="0.2" />
          </linearGradient>
          
          {/* 3D shadows */}
          <filter id="shadow3D" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="4" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.3"/>
          </filter>
          
          {/* Light glow effects */}
          <filter id="lightGlow3D" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="12" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Wood texture for floor */}
          <pattern id="woodFloor" patternUnits="userSpaceOnUse" width="40" height="8">
            <rect width="40" height="8" fill="#92400e"/>
            <rect x="0" y="0" width="40" height="1" fill="#a16207"/>
            <rect x="0" y="7" width="40" height="1" fill="#78716c"/>
            <rect x="20" y="0" width="1" height="8" fill="#78716c" opacity="0.3"/>
          </pattern>
          
          {/* Metal texture */}
          <linearGradient id="metal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e5e7eb" />
            <stop offset="50%" stopColor="#9ca3af" />
            <stop offset="100%" stopColor="#6b7280" />
          </linearGradient>
        </defs>

        {/* 3D Room Structure - Isometric View */}
        
        {/* Floor (isometric) */}
        <polygon 
          points="100,500 650,500 800,400 250,400" 
          fill="url(#woodFloor)" 
          stroke="#78716c" 
          strokeWidth="2"
          filter="url(#shadow3D)"
        />
        
        {/* Ceiling (isometric) */}
        <polygon 
          points="100,150 650,150 800,50 250,50" 
          fill="url(#ceiling3D)" 
          stroke="#d1d5db" 
          strokeWidth="2"
        />
        
        {/* Back wall */}
        <polygon 
          points="250,50 800,50 800,400 250,400" 
          fill="url(#wallFront)" 
          stroke="#cbd5e1" 
          strokeWidth="2"
        />
        
        {/* Right wall */}
        <polygon 
          points="650,150 800,50 800,400 650,500" 
          fill="url(#wallRight)" 
          stroke="#cbd5e1" 
          strokeWidth="2"
        />
        
        {/* Left wall */}
        <polygon 
          points="100,150 250,50 250,400 100,500" 
          fill="url(#wallTop)" 
          stroke="#cbd5e1" 
          strokeWidth="2"
        />

        {/* Large panoramic window - 3D */}
        <polygon 
          points="350,80 750,80 750,350 350,350" 
          fill="url(#glass3D)" 
          stroke="#374151" 
          strokeWidth="4"
          filter="url(#shadow3D)"
        />
        
        {/* Window frame - 3D effect */}
        <polygon points="340,70 760,70 760,85 340,85" fill="url(#metal)" />
        <polygon points="340,345 760,345 760,360 340,360" fill="url(#metal)" />
        <polygon points="340,70 355,70 355,360 340,360" fill="url(#metal)" />
        <polygon points="745,70 760,70 760,360 745,360" fill="url(#metal)" />
        
        {/* Window view with depth */}
        <polygon points="355,85 745,85 745,345 355,345" fill="#87ceeb" opacity="0.4" />
        <circle cx="650" cy="140" r="30" fill="#fbbf24" opacity="0.7" />
        <polygon points="355,300 500,220 650,260 745,200 745,345 355,345" fill="#22c55e" opacity="0.5" />

        {/* TAPPARELLE - 3D Motorized blinds */}
        <g className={`transition-all duration-700 ${isSelected('tapparelle') ? 'opacity-100' : 'opacity-70'}`}>
          {/* Blind box - 3D */}
          <polygon 
            points="340,60 760,60 780,40 360,40" 
            fill={isSelected('tapparelle') ? '#3b82f6' : '#e5e7eb'} 
            stroke="#374151" strokeWidth="2"
          />
          
          {/* Blind slats with 3D perspective */}
          <g stroke={isSelected('tapparelle') ? '#1e40af' : '#9ca3af'} strokeWidth="2" fill={isSelected('tapparelle') ? '#60a5fa' : '#f3f4f6'} opacity="0.9">
            {Array.from({length: 20}, (_, i) => (
              <g key={i}>
                <polygon points={`350,${90 + i * 12} 750,${90 + i * 12} 750,${98 + i * 12} 350,${98 + i * 12}`} />
                <polygon points={`750,${90 + i * 12} 770,${80 + i * 12} 770,${88 + i * 12} 750,${98 + i * 12}`} />
              </g>
            ))}
          </g>
          
          {/* Motor control - 3D */}
          {isSelected('tapparelle') && (
            <g className="animate-pulse">
              <polygon points="720,45 750,45 760,35 730,35" fill="#22c55e" />
              <circle cx="740" cy="40" r="3" fill="#ffffff" />
            </g>
          )}
        </g>

        {/* TENDE - 3D Luxury curtains */}
        <g className={`transition-all duration-500 ${isSelected('tende') ? 'opacity-100' : 'opacity-60'}`}>
          {/* Curtain rail - 3D */}
          <polygon points="300,75 380,75 390,65 310,65" fill="url(#metal)" stroke="#6b7280" strokeWidth="1" />
          <polygon points="720,75 800,75 810,65 730,65" fill="url(#metal)" stroke="#6b7280" strokeWidth="1" />
          
          {/* Left curtain - 3D folds */}
          <g fill={isSelected('tende') ? '#8b5cf6' : '#f3f4f6'} stroke={isSelected('tende') ? '#7c3aed' : '#d1d5db'} strokeWidth="2">
            <polygon points="300,80 320,85 330,80 350,85 360,80 380,85 380,350 360,355 350,350 330,355 320,350 300,355" />
            <polygon points="380,85 390,75 390,345 380,350" opacity="0.7" />
          </g>
          
          {/* Right curtain - 3D folds */}
          <g fill={isSelected('tende') ? '#8b5cf6' : '#f3f4f6'} stroke={isSelected('tende') ? '#7c3aed' : '#d1d5db'} strokeWidth="2">
            <polygon points="720,80 740,85 750,80 770,85 780,80 800,85 800,350 780,355 770,350 750,355 740,350 720,355" />
            <polygon points="720,85 710,75 710,345 720,350" opacity="0.7" />
          </g>
        </g>

        {/* LUCI - 3D Modern lighting */}
        <g>
          {/* Main pendant light - 3D */}
          <g transform="translate(450, 120)">
            {/* Suspension cord */}
            <line x1="0" y1="-70" x2="0" y2="-20" stroke="#374151" strokeWidth="3" />
            
            {/* Light fixture - 3D */}
            <ellipse cx="0" cy="0" rx="35" ry="25" 
                     fill={isSelected('luci') ? '#ffffff' : '#f3f4f6'} 
                     stroke="#374151" strokeWidth="3"
                     filter={isSelected('luci') ? "url(#lightGlow3D)" : "url(#shadow3D)"} />
            <ellipse cx="5" cy="-5" rx="30" ry="20" 
                     fill={isSelected('luci') ? '#fef3c7' : '#e5e7eb'} opacity="0.8" />
            
            {/* Light emission */}
            {isSelected('luci') && (
              <>
                <ellipse cx="0" cy="0" rx="80" ry="60" fill="#fbbf24" opacity="0.1" className="animate-pulse" />
                <ellipse cx="0" cy="0" rx="120" ry="90" fill="#fbbf24" opacity="0.05" className="animate-pulse" />
              </>
            )}
          </g>
          
          {/* Recessed ceiling lights - 3D */}
          <g transform="translate(300, 100)">
            <ellipse cx="0" cy="0" rx="15" ry="10" 
                     fill={isSelected('luci') ? '#fbbf24' : '#f3f4f6'} 
                     stroke="#374151" strokeWidth="2"
                     filter={isSelected('luci') ? "url(#lightGlow3D)" : ""} />
            <ellipse cx="2" cy="-2" rx="12" ry="8" fill="#ffffff" opacity="0.8" />
          </g>
          
          <g transform="translate(600, 100)">
            <ellipse cx="0" cy="0" rx="15" ry="10" 
                     fill={isSelected('luci') ? '#fbbf24' : '#f3f4f6'} 
                     stroke="#374151" strokeWidth="2"
                     filter={isSelected('luci') ? "url(#lightGlow3D)" : ""} />
            <ellipse cx="2" cy="-2" rx="12" ry="8" fill="#ffffff" opacity="0.8" />
          </g>
          
          {/* Floor lamp - 3D */}
          <g transform="translate(200, 420)">
            {/* Base - 3D */}
            <ellipse cx="0" cy="0" rx="25" ry="15" fill="#374151" />
            <ellipse cx="2" cy="-3" rx="22" ry="12" fill="#4b5563" />
            
            {/* Pole */}
            <polygon points="-3,0 3,0 5,-80 -5,-80" fill="#6b7280" />
            <polygon points="3,0 5,-80 7,-82 5,-2" fill="#4b5563" />
            
            {/* Lampshade - 3D */}
            <ellipse cx="0" cy="-80" rx="30" ry="20" 
                     fill={isSelected('luci') ? '#fef3c7' : '#f3f4f6'} 
                     stroke="#6b7280" strokeWidth="2"
                     filter={isSelected('luci') ? "url(#lightGlow3D)" : ""} />
            <ellipse cx="3" cy="-83" rx="25" ry="15" fill="#ffffff" opacity="0.6" />
          </g>
        </g>

        {/* VIDEOCITOFONO - 3D Smart intercom */}
        <g transform="translate(750, 300)">
          {/* Main unit - 3D */}
          <polygon points="0,0 30,0 35,-5 5,-5" fill={isSelected('videocitofono') ? '#1f2937' : '#6b7280'} />
          <polygon points="0,0 0,60 30,60 30,0" 
                   fill={isSelected('videocitofono') ? '#374151' : '#9ca3af'} 
                   stroke="#1f2937" strokeWidth="2"
                   filter={isSelected('videocitofono') ? "url(#lightGlow3D)" : "url(#shadow3D)"} />
          <polygon points="30,0 35,-5 35,55 30,60" fill={isSelected('videocitofono') ? '#1f2937' : '#6b7280'} />
          
          {/* Camera - 3D */}
          <circle cx="15" cy="15" r="8" fill={isSelected('videocitofono') ? '#000000' : '#4b5563'} />
          <circle cx="15" cy="15" r="6" fill={isSelected('videocitofono') ? '#ef4444' : '#6b7280'} />
          <circle cx="17" cy="13" r="2" fill="#ffffff" opacity="0.8" />
          
          {/* Screen - 3D */}
          <polygon points="5,25 25,25 25,45 5,45" 
                   fill={isSelected('videocitofono') ? '#22c55e' : '#9ca3af'} />
          <polygon points="25,25 28,22 28,42 25,45" fill={isSelected('videocitofono') ? '#16a34a' : '#6b7280'} />
          
          {/* Button - 3D */}
          <circle cx="15" cy="52" r="4" fill={isSelected('videocitofono') ? '#22c55e' : '#d1d5db'} />
          <circle cx="16" cy="51" r="3" fill={isSelected('videocitofono') ? '#16a34a' : '#9ca3af'} />
          
          {/* Activity indicator */}
          {isSelected('videocitofono') && (
            <circle cx="15" cy="15" r="15" fill="#ef4444" opacity="0.3" className="animate-pulse" />
          )}
        </g>

        {/* AUDIO - 3D Premium sound system */}
        <g>
          {/* Floor speakers - 3D */}
          <g transform="translate(130, 380)">
            {/* Speaker body - 3D */}
            <polygon points="0,0 25,0 30,-5 5,-5" fill="#1f2937" />
            <polygon points="0,0 0,80 25,80 25,0" fill="#374151" stroke="#1f2937" strokeWidth="2" />
            <polygon points="25,0 30,-5 30,75 25,80" fill="#111827" />
            
            {/* Drivers - 3D */}
            <circle cx="12" cy="25" r="8" fill={isSelected('audio') ? '#10b981' : '#6b7280'} />
            <circle cx="13" cy="24" r="6" fill="#ffffff" />
            <circle cx="13" cy="24" r="4" fill={isSelected('audio') ? '#059669' : '#4b5563'} />
            
            <circle cx="12" cy="50" r="6" fill={isSelected('audio') ? '#10b981' : '#6b7280'} />
            <circle cx="13" cy="49" r="4" fill="#ffffff" />
            <circle cx="13" cy="49" r="2" fill={isSelected('audio') ? '#059669' : '#4b5563'} />
            
            {/* Bass port */}
            <polygon points="8,65 17,65 17,72 8,72" fill="#000000" />
          </g>
          
          {/* Ceiling speakers - 3D */}
          <g transform="translate(350, 80)">
            <ellipse cx="0" cy="0" rx="18" ry="12" 
                     fill={isSelected('audio') ? '#10b981' : '#d1d5db'} 
                     stroke="#374151" strokeWidth="2" />
            <ellipse cx="2" cy="-2" rx="15" ry="10" fill="#ffffff" />
            <ellipse cx="2" cy="-2" rx="10" ry="7" fill={isSelected('audio') ? '#059669' : '#9ca3af'} />
          </g>
          
          <g transform="translate(550, 80)">
            <ellipse cx="0" cy="0" rx="18" ry="12" 
                     fill={isSelected('audio') ? '#10b981' : '#d1d5db'} 
                     stroke="#374151" strokeWidth="2" />
            <ellipse cx="2" cy="-2" rx="15" ry="10" fill="#ffffff" />
            <ellipse cx="2" cy="-2" rx="10" ry="7" fill={isSelected('audio') ? '#059669' : '#9ca3af'} />
          </g>
          
          {/* Sound waves - 3D */}
          {isSelected('audio') && (
            <g opacity="0.7" className="animate-pulse">
              <path d="M160 420 Q170 415 160 425 Q170 430 160 435" stroke="#10b981" strokeWidth="3" fill="none" />
              <path d="M165 418 Q175 413 165 428 Q175 433 165 438" stroke="#10b981" strokeWidth="2" fill="none" />
            </g>
          )}
        </g>

        {/* CLIMA - 3D HVAC system */}
        <g>
          {/* Wall AC unit - 3D */}
          <g transform="translate(680, 180)">
            {/* Main unit - 3D */}
            <polygon points="0,0 70,0 75,-5 5,-5" fill="#ffffff" />
            <polygon points="0,0 0,30 70,30 70,0" 
                     fill={isSelected('clima') ? '#ffffff' : '#f3f4f6'} 
                     stroke={isSelected('clima') ? '#22c55e' : '#9ca3af'} 
                     strokeWidth="3" filter="url(#shadow3D)" />
            <polygon points="70,0 75,-5 75,25 70,30" fill={isSelected('clima') ? '#f0f9ff' : '#e5e7eb'} />
            
            {/* Vents - 3D */}
            <g stroke={isSelected('clima') ? '#22c55e' : '#9ca3af'} strokeWidth="1.5">
              {Array.from({length: 12}, (_, i) => (
                <g key={i}>
                  <line x1={8 + i * 5} y1="8" x2={8 + i * 5} y2="22" />
                  <line x1={8 + i * 5} y1="8" x2={10 + i * 5} y2="6" />
                </g>
              ))}
            </g>
            
            {/* Control panel */}
            <polygon points="60,5 68,5 68,12 60,12" fill={isSelected('clima') ? '#22c55e' : '#d1d5db'} />
          </g>
          
          {/* Floor radiator - 3D */}
          <g transform="translate(120, 480)">
            <polygon points="0,0 120,0 125,-5 5,-5" fill={isSelected('clima') ? '#f97316' : '#d1d5db'} />
            <polygon points="0,0 0,25 120,25 120,0" 
                     fill={isSelected('clima') ? '#fb923c' : '#e5e7eb'} 
                     stroke="#374151" strokeWidth="2" />
            <polygon points="120,0 125,-5 125,20 120,25" fill={isSelected('clima') ? '#ea580c' : '#9ca3af'} />
            
            {/* Radiator fins - 3D */}
            <g stroke={isSelected('clima') ? '#ea580c' : '#9ca3af'} strokeWidth="1.5">
              {Array.from({length: 16}, (_, i) => (
                <g key={i}>
                  <line x1={8 + i * 7} y1="0" x2={8 + i * 7} y2="25" />
                  <line x1={8 + i * 7} y1="0" x2={9 + i * 7} y2="-2" />
                </g>
              ))}
            </g>
          </g>
          
          {/* Thermostat - 3D */}
          <g transform="translate(500, 220)">
            <circle cx="0" cy="0" r="18" 
                    fill={isSelected('clima') ? '#ffffff' : '#f3f4f6'} 
                    stroke={isSelected('clima') ? '#f97316' : '#9ca3af'} 
                    strokeWidth="3" filter="url(#shadow3D)" />
            <circle cx="2" cy="-2" r="15" fill="#f8fafc" />
            <circle cx="2" cy="-2" r="10" fill={isSelected('clima') ? '#f97316' : '#d1d5db'} />
            <text x="2" y="0" fontSize="8" fill="#ffffff" textAnchor="middle" fontWeight="700">
              {isSelected('clima') ? '22°' : '--'}
            </text>
          </g>
          
          {/* Heat waves - 3D */}
          {isSelected('clima') && (
            <g opacity="0.8" className="animate-pulse">
              <path d="M180 475 Q185 470 190 475 Q195 470 200 475" stroke="#f97316" strokeWidth="3" fill="none" />
              <path d="M160 473 Q165 468 170 473 Q175 468 180 473" stroke="#f97316" strokeWidth="2" fill="none" />
            </g>
          )}
        </g>

        {/* PRESE SMART - 3D Smart appliances */}
        <g>
          {/* Smart TV - 3D */}
          <g transform="translate(300, 320)">
            {/* TV stand - 3D */}
            <polygon points="40,130 140,130 145,125 45,125" fill="#374151" />
            <polygon points="40,130 40,140 140,140 140,130" fill="#4b5563" />
            <polygon points="140,130 145,125 145,135 140,140" fill="#1f2937" />
            
            {/* TV back - 3D */}
            <polygon points="0,0 180,0 185,-5 5,-5" fill="#1f2937" />
            <polygon points="0,0 0,120 180,120 180,0" 
                     fill={isSelected('prese') ? '#000000' : '#4b5563'} 
                     stroke="#1f2937" strokeWidth="3" filter="url(#shadow3D)" />
            <polygon points="180,0 185,-5 185,115 180,120" fill="#111827" />
            
            {/* Screen - 3D */}
            <polygon points="10,10 170,10 170,110 10,110" 
                     fill={isSelected('prese') ? '#3b82f6' : '#6b7280'} />
            <polygon points="10,10 170,10 175,5 15,5" fill={isSelected('prese') ? '#60a5fa' : '#9ca3af'} />
            <polygon points="170,10 175,5 175,105 170,110" fill={isSelected('prese') ? '#1e40af' : '#4b5563'} />
            
            {/* Smart indicator */}
            {isSelected('prese') && (
              <circle cx="160" cy="20" r="4" fill="#22c55e" className="animate-pulse" />
            )}
          </g>
          
          {/* Smart coffee machine - 3D */}
          <g transform="translate(650, 420)">
            <polygon points="0,0 40,0 45,-5 5,-5" fill="#ffffff" />
            <polygon points="0,0 0,60 40,60 40,0" 
                     fill={isSelected('prese') ? '#ffffff' : '#f3f4f6'} 
                     stroke={isSelected('prese') ? '#22c55e' : '#9ca3af'} 
                     strokeWidth="2" filter="url(#shadow3D)" />
            <polygon points="40,0 45,-5 45,55 40,60" fill="#e5e7eb" />
            
            {/* Control panel - 3D */}
            <circle cx="20" cy="20" r="8" fill={isSelected('prese') ? '#8b5cf6' : '#d1d5db'} />
            <circle cx="22" cy="18" r="6" fill="#ffffff" />
            
            {/* Steam */}
            {isSelected('prese') && (
              <g opacity="0.6" className="animate-pulse">
                <path d="M15 5 Q20 0 25 5" stroke="#e5e7eb" strokeWidth="2" fill="none" />
                <path d="M18 3 Q23 -2 28 3" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />
              </g>
            )}
          </g>
        </g>

        {/* SICUREZZA - 3D Security system */}
        <g>
          {/* Security camera - 3D */}
          <g transform="translate(720, 100)">
            {/* Camera mount */}
            <polygon points="-5,10 5,10 7,8 -3,8" fill="#6b7280" />
            <polygon points="-5,10 -5,15 5,15 5,10" fill="#4b5563" />
            
            {/* Camera body - 3D */}
            <ellipse cx="0" cy="0" rx="18" ry="12" 
                     fill={isSelected('sicurezza') ? '#1f2937' : '#9ca3af'} 
                     stroke="#000000" strokeWidth="2" filter="url(#shadow3D)" />
            <ellipse cx="2" cy="-2" rx="15" ry="10" fill={isSelected('sicurezza') ? '#374151' : '#d1d5db'} />
            
            {/* Lens - 3D */}
            <circle cx="0" cy="0" r="8" fill={isSelected('sicurezza') ? '#000000' : '#6b7280'} />
            <circle cx="0" cy="0" r="6" fill={isSelected('sicurezza') ? '#1f2937' : '#9ca3af'} />
            <circle cx="2" cy="-2" r="3" fill="#ffffff" opacity="0.8" />
            
            {/* LED indicator */}
            {isSelected('sicurezza') && (
              <>
                <circle cx="10" cy="-5" r="2" fill="#dc2626" className="animate-pulse" />
                <circle cx="0" cy="0" r="25" fill="#dc2626" opacity="0.2" className="animate-pulse" />
              </>
            )}
          </g>
          
          {/* Motion sensor - 3D */}
          <g transform="translate(450, 280)">
            <polygon points="0,0 25,0 27,-2 2,-2" fill={isSelected('sicurezza') ? '#fbbf24' : '#e5e7eb'} />
            <polygon points="0,0 0,15 25,15 25,0" 
                     fill={isSelected('sicurezza') ? '#f59e0b' : '#f3f4f6'} 
                     stroke="#374151" strokeWidth="2" />
            <polygon points="25,0 27,-2 27,13 25,15" fill={isSelected('sicurezza') ? '#d97706' : '#d1d5db'} />
            
            {/* Sensor eye */}
            <circle cx="12" cy="7" r="4" fill={isSelected('sicurezza') ? '#1f2937' : '#9ca3af'} />
            
            {/* Detection wave */}
            {isSelected('sicurezza') && (
              <circle cx="12" cy="7" r="12" fill="#fbbf24" opacity="0.3" className="animate-pulse" />
            )}
          </g>
          
          {/* Door sensor - 3D */}
          <g transform="translate(780, 250)">
            <polygon points="0,0 8,0 10,-2 2,-2" fill={isSelected('sicurezza') ? '#fbbf24' : '#e5e7eb'} />
            <polygon points="0,0 0,25 8,25 8,0" 
                     fill={isSelected('sicurezza') ? '#f59e0b' : '#f3f4f6'} 
                     stroke="#374151" strokeWidth="1" />
            <polygon points="8,0 10,-2 10,23 8,25" fill={isSelected('sicurezza') ? '#d97706' : '#d1d5db'} />
            
            {/* Contact point */}
            <circle cx="4" cy="12" r="2" fill={isSelected('sicurezza') ? '#dc2626' : '#9ca3af'} />
          </g>
        </g>

        {/* Modern furniture for context - 3D */}
        <g opacity="0.7">
          {/* Sectional sofa - 3D */}
          <g transform="translate(200, 400)">
            {/* Sofa base - 3D */}
            <polygon points="0,40 180,40 185,35 5,35" fill="#64748b" />
            <polygon points="0,0 0,40 180,40 180,0" fill="#6b7280" />
            <polygon points="180,0 185,35 185,-5 180,-40" fill="#475569" />
            
            {/* Cushions - 3D */}
            <polygon points="10,0 80,0 82,-2 12,-2" fill="#8b5cf6" />
            <polygon points="10,0 10,35 80,35 80,0" fill="#a855f7" />
            
            <polygon points="100,0 170,0 172,-2 102,-2" fill="#8b5cf6" />
            <polygon points="100,0 100,35 170,35 170,0" fill="#a855f7" />
            
            {/* Backrest - 3D */}
            <polygon points="0,-40 180,-40 185,-45 5,-45" fill="#6b7280" />
            <polygon points="0,-40 0,0 180,0 180,-40" fill="#64748b" />
            <polygon points="180,-40 185,-45 185,-5 180,0" fill="#475569" />
          </g>
          
          {/* Coffee table - 3D */}
          <g transform="translate(250, 450)">
            <polygon points="0,0 120,0 125,-5 5,-5" fill="#92400e" />
            <polygon points="0,0 0,30 120,30 120,0" fill="#a16207" />
            <polygon points="120,0 125,-5 125,25 120,30" fill="#78716c" />
            
            {/* Table legs - 3D */}
            <polygon points="10,30 15,30 17,25 12,25" fill="#78716c" />
            <polygon points="105,30 110,30 112,25 107,25" fill="#78716c" />
          </g>
        </g>

        {/* Smart home network visualization */}
        {selectedFunctions.length > 1 && (
          <g opacity="0.6">
            {/* Central hub - 3D */}
            <g transform="translate(420, 300)">
              <polygon points="0,0 25,0 27,-2 2,-2" fill="#22c55e" />
              <polygon points="0,0 0,25 25,25 25,0" fill="#16a34a" className="animate-pulse" />
              <polygon points="25,0 27,-2 27,23 25,25" fill="#15803d" />
              <text x="12" y="15" fontSize="9" fill="#ffffff" textAnchor="middle" fontWeight="700">HUB</text>
            </g>
            
            {/* Network connections - 3D */}
            <g stroke="#22c55e" strokeWidth="2" strokeDasharray="6,4" opacity="0.8" className="animate-pulse">
              <line x1="432" y1="300" x2="450" y2="120" />
              <line x1="432" y1="300" x2="720" y2="110" />
              <line x1="432" y1="300" x2="695" y2="195" />
              <line x1="432" y1="300" x2="513" y2="232" />
              <line x1="432" y1="300" x2="390" y2="360" />
              <line x1="432" y1="300" x2="670" y2="450" />
            </g>
          </g>
        )}

        {/* Modern legend - 3D */}
        <g transform="translate(30, 550)">
          <polygon points="0,10 220,10 225,5 5,5" fill="white" />
          <polygon points="0,10 0,130 220,130 220,10" fill="white" stroke="#e2e8f0" strokeWidth="2" fillOpacity="0.98" filter="url(#shadow3D)" />
          <polygon points="220,10 225,5 225,125 220,130" fill="#f8fafc" />
          
          {/* Header - 3D */}
          <polygon points="5,5 215,5 220,0 10,0" fill="#3b82f6" />
          <polygon points="5,5 5,35 215,35 215,5" fill="#2563eb" />
          <polygon points="215,5 220,0 220,30 215,35" fill="#1d4ed8" />
          <text x="110" y="25" fontSize="14" fill="white" textAnchor="middle" fontWeight="700">Casa Smart 3D</text>
          
          {/* Legend items */}
          <circle cx="20" cy="55" r="5" fill="#22c55e" />
          <text x="35" y="60" fontSize="12" fill="#374151" fontWeight="600">Funzione Attiva</text>
          
          <circle cx="20" cy="75" r="5" fill="#d1d5db" />
          <text x="35" y="80" fontSize="12" fill="#374151" fontWeight="600">Funzione Inattiva</text>
          
          <line x1="20" y1="95" x2="40" y2="95" stroke="#22c55e" strokeWidth="3" strokeDasharray="4,2" />
          <text x="45" y="100" fontSize="11" fill="#6b7280" fontWeight="500">Rete Domotica</text>
          
          <text x="20" y="120" fontSize="10" fill="#9ca3af" fontWeight="500">Vista isometrica 3D</text>
        </g>

        {/* Room title - 3D effect */}
        <g transform="translate(450, 30)">
          <text x="2" y="2" fontSize="28" fill="#cbd5e1" textAnchor="middle" fontWeight="700" fontFamily="system-ui">
            Soggiorno Smart
          </text>
          <text x="0" y="0" fontSize="28" fill="#1f2937" textAnchor="middle" fontWeight="700" fontFamily="system-ui">
            Soggiorno Smart
          </text>
        </g>
      </svg>
    </div>
  );
};
