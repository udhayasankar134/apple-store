import React from 'react';
import { ColorOption } from '../types/store';

interface ProductArtworkProps {
  productId: string;
  category: string;
  selectedColor?: ColorOption;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export const ProductArtwork: React.FC<ProductArtworkProps> = ({
  productId,
  category,
  selectedColor,
  className = '',
  size = 'md',
}) => {
  const currentColorHex = selectedColor?.hex || '#202022';
  const colorName = selectedColor?.name?.toLowerCase() || '';

  // Calculate container aspect ratio and scale
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-48 h-48 md:w-56 md:h-56',
    lg: 'w-64 h-64 md:w-80 md:h-80',
    hero: 'w-72 h-72 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px]',
  }[size];

  // Render product based on ID or Category
  if (productId.includes('iphone') || category === 'iphone') {
    const isPro = productId.includes('pro');
    return (
      <div className={`relative flex items-center justify-center p-4 ${sizeClasses} ${className}`}>
        {/* Soft realistic cast shadow */}
        <div 
          className="absolute -bottom-2 w-3/4 h-6 bg-black/15 blur-xl rounded-full transition-all duration-300"
          style={{ opacity: 0.8 }}
        />

        <svg viewBox="0 0 240 460" className="w-full h-full drop-shadow-md select-none">
          <defs>
            <linearGradient id={`phone-rim-${productId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
              <stop offset="50%" stopColor={currentColorHex} />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id={`screen-grad-${productId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isPro ? '#1F1B24' : '#141E30'} />
              <stop offset="40%" stopColor={isPro ? '#2A1B18' : '#243B55'} />
              <stop offset="100%" stopColor={isPro ? '#120F16' : '#141E30'} />
            </linearGradient>
            <linearGradient id={`camera-lens-${productId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B132B" />
              <stop offset="100%" stopColor="#1C2541" />
            </linearGradient>
            <radialGradient id={`camera-reflection-${productId}`} cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#6FFFE9" stopOpacity="0.35" />
              <stop offset="60%" stopColor="#5BC0BE" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.9" />
            </radialGradient>
          </defs>

          {/* Outer titanium edge */}
          <rect
            x="10"
            y="10"
            width="220"
            height="440"
            rx="48"
            fill={`url(#phone-rim-${productId})`}
            stroke={currentColorHex}
            strokeWidth="2"
          />

          {/* Precision Matte Back Body / Display */}
          <rect
            x="14"
            y="14"
            width="212"
            height="432"
            rx="45"
            fill={currentColorHex}
            className="transition-colors duration-500"
          />

          {/* Inner Display Screen with subtle bezel */}
          <rect
            x="20"
            y="20"
            width="200"
            height="420"
            rx="40"
            fill={`url(#screen-grad-${productId})`}
            stroke="#111"
            strokeWidth="2.5"
          />

          {/* OLED Wallpaper Ambient Glow (Apple style fluid abstract) */}
          <ellipse
            cx="120"
            cy="160"
            rx="75"
            ry="90"
            fill={isPro ? '#BFA287' : '#57B5E8'}
            opacity="0.25"
            filter="blur(25px)"
          />
          <ellipse
            cx="135"
            cy="320"
            rx="65"
            ry="85"
            fill={isPro ? '#8D6E63' : '#6A82FB'}
            opacity="0.3"
            filter="blur(30px)"
          />

          {/* Dynamic Island */}
          <rect x="85" y="32" width="70" height="20" rx="10" fill="#000000" />
          <circle cx="100" cy="42" r="4.5" fill="#0D1117" />
          <circle cx="100" cy="42" r="2" fill="#2E3440" />
          <circle cx="140" cy="42" r="3.5" fill="#07090E" />

          {/* Status Bar / UI Hints */}
          <text x="44" y="46" fill="#FFFFFF" fontSize="10" fontWeight="600" opacity="0.85" fontFamily="sans-serif">9:41</text>
          <path d="M 188 39 L 196 39 A 2 2 0 0 1 198 41 L 198 46 A 2 2 0 0 1 196 48 L 188 48 A 2 2 0 0 1 186 46 L 186 41 A 2 2 0 0 1 188 39 Z" fill="#FFF" opacity="0.85" />
          <rect x="188" y="41" width="7" height="5" rx="1" fill="#FFF" opacity="0.85" />

          {/* Camera plateau hint (back preview overlay indicator) */}
          <g opacity="0.12">
            <rect x="28" y="30" width="84" height="84" rx="24" fill="#FFFFFF" />
            <circle cx="50" cy="52" r="14" fill="#FFFFFF" />
            <circle cx="90" cy="52" r="14" fill="#FFFFFF" />
            {isPro && <circle cx="70" cy="88" r="14" fill="#FFFFFF" />}
          </g>

          {/* Home indicator bar */}
          <rect x="85" y="426" width="70" height="4" rx="2" fill="#FFFFFF" opacity="0.65" />
        </svg>
      </div>
    );
  }

  if (productId.includes('mac') || category === 'mac') {
    return (
      <div className={`relative flex items-center justify-center p-3 ${sizeClasses} ${className}`}>
        {/* Soft realistic cast shadow */}
        <div 
          className="absolute -bottom-1 w-5/6 h-5 bg-black/20 blur-xl rounded-full"
          style={{ opacity: 0.8 }}
        />

        <svg viewBox="0 0 460 300" className="w-full h-full drop-shadow-md select-none">
          <defs>
            <linearGradient id={`mac-display-border-${productId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A4A4F" />
              <stop offset="100%" stopColor="#1E1E20" />
            </linearGradient>
            <linearGradient id={`mac-wallpaper-${productId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B132B" />
              <stop offset="35%" stopColor="#1C2541" />
              <stop offset="70%" stopColor="#3A506B" />
              <stop offset="100%" stopColor="#0B132B" />
            </linearGradient>
            <linearGradient id={`mac-metal-${productId}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={currentColorHex} />
              <stop offset="100%" stopColor="#151516" />
            </linearGradient>
          </defs>

          {/* Laptop Lid / Display Assembly */}
          <rect x="55" y="25" width="350" height="215" rx="14" fill={`url(#mac-display-border-${productId})`} stroke="#111" strokeWidth="2" />
          
          {/* Liquid Retina XDR screen */}
          <rect x="62" y="32" width="336" height="201" rx="8" fill={`url(#mac-wallpaper-${productId})`} />

          {/* macOS abstract radiant glow */}
          <circle cx="230" cy="125" r="70" fill="#E65C00" opacity="0.3" filter="blur(28px)" />
          <circle cx="280" cy="150" r="60" fill="#F9D423" opacity="0.25" filter="blur(26px)" />
          <circle cx="170" cy="140" r="55" fill="#7F00FF" opacity="0.3" filter="blur(25px)" />

          {/* Camera notch */}
          <rect x="216" y="32" width="28" height="9" rx="3" fill="#111" />
          <circle cx="230" cy="36.5" r="2" fill="#243048" />

          {/* macOS Dock hint */}
          <rect x="150" y="222" width="160" height="7" rx="3.5" fill="rgba(255,255,255,0.25)" />
          <circle cx="165" cy="225.5" r="2" fill="#FFF" opacity="0.8" />
          <circle cx="175" cy="225.5" r="2" fill="#3B82F6" opacity="0.9" />
          <circle cx="185" cy="225.5" r="2" fill="#10B981" opacity="0.9" />
          <circle cx="195" cy="225.5" r="2" fill="#F59E0B" opacity="0.9" />
          <circle cx="205" cy="225.5" r="2" fill="#EC4899" opacity="0.9" />

          {/* Lower Base / Hinge Chassis */}
          <path d="M 20 250 L 440 250 L 430 262 L 30 262 Z" fill={`url(#mac-metal-${productId})`} stroke="#222" strokeWidth="1" />
          
          {/* Base bottom lip and trackpad thumb cutout */}
          <rect x="18" y="258" width="424" height="8" rx="4" fill="#0E0E10" />
          <rect x="200" y="258" width="60" height="3" rx="1.5" fill="#4B5563" />
        </svg>
      </div>
    );
  }

  if (productId.includes('ipad') || category === 'ipad') {
    return (
      <div className={`relative flex items-center justify-center p-3 ${sizeClasses} ${className}`}>
        {/* Soft realistic cast shadow */}
        <div 
          className="absolute -bottom-1 w-4/5 h-6 bg-black/15 blur-xl rounded-full"
          style={{ opacity: 0.8 }}
        />

        <svg viewBox="0 0 340 440" className="w-full h-full drop-shadow-md select-none">
          <defs>
            <linearGradient id={`ipad-rim-${productId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A8A8B0" />
              <stop offset="50%" stopColor={currentColorHex} />
              <stop offset="100%" stopColor="#252528" />
            </linearGradient>
            <linearGradient id={`ipad-screen-${productId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0D1B2A" />
              <stop offset="50%" stopColor="#1B263B" />
              <stop offset="100%" stopColor="#0B132B" />
            </linearGradient>
          </defs>

          {/* iPad aluminum bezel edge */}
          <rect x="25" y="20" width="290" height="400" rx="32" fill={`url(#ipad-rim-${productId})`} stroke="#333" strokeWidth="2" />
          
          {/* Ultra Retina XDR Screen */}
          <rect x="33" y="28" width="274" height="384" rx="24" fill={`url(#ipad-screen-${productId})`} />

          {/* iPad artistic fluid colorful wallpaper */}
          <path d="M 60 140 Q 170 80 260 200 T 140 360 Z" fill="#8B5CF6" opacity="0.3" filter="blur(30px)" />
          <path d="M 120 220 Q 220 180 270 300 T 90 280 Z" fill="#06B6D4" opacity="0.35" filter="blur(26px)" />
          <path d="M 150 100 Q 260 160 230 280 T 110 160 Z" fill="#F43F5E" opacity="0.25" filter="blur(28px)" />

          {/* Center Stage Camera */}
          <circle cx="170" cy="35" r="2.5" fill="#374151" />

          {/* Apple Pencil Pro (magnetized to the top edge) */}
          <g transform="translate(110, 8)">
            <rect x="0" y="0" width="120" height="7" rx="3.5" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="0.8" />
            <polygon points="120,0 128,3.5 120,7" fill="#E2E8F0" />
            <rect x="4" y="2" width="10" height="3" rx="1.5" fill="#94A3B8" opacity="0.6" />
          </g>

          {/* iPad Home dock indicator */}
          <rect x="135" y="404" width="70" height="3" rx="1.5" fill="#FFFFFF" opacity="0.7" />
        </svg>
      </div>
    );
  }

  if (productId.includes('watch') || category === 'watch') {
    const isUltra = productId.includes('ultra');
    return (
      <div className={`relative flex items-center justify-center p-3 ${sizeClasses} ${className}`}>
        {/* Soft shadow */}
        <div 
          className="absolute -bottom-1 w-3/4 h-5 bg-black/15 blur-xl rounded-full"
          style={{ opacity: 0.8 }}
        />

        <svg viewBox="0 0 280 380" className="w-full h-full drop-shadow-md select-none">
          <defs>
            <linearGradient id={`watch-strap-${productId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isUltra ? '#E65100' : '#1E293B'} />
              <stop offset="50%" stopColor={isUltra ? '#FF6D00' : '#334155'} />
              <stop offset="100%" stopColor={isUltra ? '#BF360C' : '#0F172A'} />
            </linearGradient>
            <linearGradient id={`watch-case-${productId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4D4D8" />
              <stop offset="40%" stopColor={currentColorHex} />
              <stop offset="100%" stopColor="#18181B" />
            </linearGradient>
          </defs>

          {/* Upper Strap with weave texture */}
          <path d="M 90 20 L 190 20 L 180 100 L 100 100 Z" fill={`url(#watch-strap-${productId})`} />
          <line x1="90" y1="40" x2="190" y2="40" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
          <line x1="93" y1="65" x2="187" y2="65" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />

          {/* Lower Strap */}
          <path d="M 100 280 L 180 280 L 190 360 L 90 360 Z" fill={`url(#watch-strap-${productId})`} />
          <line x1="97" y1="310" x2="183" y2="310" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
          <line x1="93" y1="335" x2="187" y2="335" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />

          {/* Digital Crown */}
          <rect x="206" y="145" width="14" height="34" rx="4" fill="#52525B" stroke="#27272A" strokeWidth="1" />
          {isUltra && <rect x="210" y="152" width="6" height="20" rx="2" fill="#FF5722" />}
          
          {/* Side Button */}
          <rect x="206" y="195" width="8" height="42" rx="3" fill="#3F3F46" />

          {/* Action Button (Orange for Ultra) */}
          {isUltra && (
            <rect x="64" y="160" width="8" height="50" rx="3" fill="#FF5722" stroke="#D84315" strokeWidth="1" />
          )}

          {/* Watch Case Chassis */}
          <rect x="70" y="95" width="140" height="190" rx="42" fill={`url(#watch-case-${productId})`} stroke="#111" strokeWidth="2" />

          {/* Sapphire Crystal Screen Edge */}
          <rect x="78" y="103" width="124" height="174" rx="36" fill="#000000" stroke="#27272A" strokeWidth="2" />

          {/* Wayfinder / Modular Watch Face UI */}
          <circle cx="140" cy="190" r="54" fill="none" stroke="#22C55E" strokeWidth="3" strokeDasharray="339" strokeDashoffset="80" />
          <circle cx="140" cy="190" r="46" fill="none" stroke="#EF4444" strokeWidth="3" strokeDasharray="289" strokeDashoffset="120" />
          <circle cx="140" cy="190" r="38" fill="none" stroke="#3B82F6" strokeWidth="3" strokeDasharray="238" strokeDashoffset="50" />

          {/* Time digits */}
          <text x="140" y="178" fill="#FFFFFF" fontSize="24" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">09:41</text>
          <text x="140" y="198" fill="#EF4444" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">72 BPM</text>
          <text x="140" y="214" fill="#38BDF8" fontSize="9" fontWeight="500" textAnchor="middle" fontFamily="sans-serif">78° SUNNY</text>
        </svg>
      </div>
    );
  }

  // AirPods & Audio
  return (
    <div className={`relative flex items-center justify-center p-3 ${sizeClasses} ${className}`}>
      {/* Soft shadow */}
      <div 
        className="absolute -bottom-1 w-3/4 h-5 bg-black/15 blur-xl rounded-full"
        style={{ opacity: 0.8 }}
      />

      <svg viewBox="0 0 320 300" className="w-full h-full drop-shadow-md select-none">
        <defs>
          <linearGradient id={`airpods-case-${productId}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="85%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
          <linearGradient id={`airpods-stem-${productId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
        </defs>

        {/* Wireless Charging Case */}
        <g transform="translate(60, 80)">
          <rect x="0" y="0" width="200" height="145" rx="55" fill={`url(#airpods-case-${productId})`} stroke="#CBD5E1" strokeWidth="1" />
          {/* Lid seam line */}
          <line x1="2" y1="44" x2="198" y2="44" stroke="#CBD5E1" strokeWidth="1.5" />
          {/* LED indicator */}
          <circle cx="100" cy="74" r="2.5" fill="#22C55E" />
          {/* USB-C speaker grille dots */}
          <circle cx="75" cy="138" r="1.5" fill="#94A3B8" />
          <circle cx="85" cy="138" r="1.5" fill="#94A3B8" />
          <circle cx="115" cy="138" r="1.5" fill="#94A3B8" />
          <circle cx="125" cy="138" r="1.5" fill="#94A3B8" />
          <rect x="94" y="136" width="12" height="4" rx="2" fill="#64748B" />
        </g>

        {/* Left Earbud angled */}
        <g transform="translate(30, 40) rotate(-15)">
          <ellipse cx="40" cy="40" rx="16" ry="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          {/* Silicone tip */}
          <ellipse cx="28" cy="42" rx="9" ry="11" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="0.8" />
          {/* Black acoustic mesh */}
          <path d="M 40 32 A 6 6 0 0 1 48 44 Z" fill="#334155" />
          {/* Stem */}
          <rect x="42" y="44" width="8" height="34" rx="4" fill={`url(#airpods-stem-${productId})`} />
          <line x1="42" y1="58" x2="50" y2="58" stroke="#CBD5E1" strokeWidth="0.8" />
        </g>

        {/* Right Earbud angled */}
        <g transform="translate(230, 30) rotate(18)">
          <ellipse cx="40" cy="40" rx="16" ry="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          {/* Silicone tip */}
          <ellipse cx="52" cy="42" rx="9" ry="11" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="0.8" />
          {/* Black acoustic mesh */}
          <path d="M 38 32 A 6 6 0 0 0 32 44 Z" fill="#334155" />
          {/* Stem */}
          <rect x="32" y="44" width="8" height="34" rx="4" fill={`url(#airpods-stem-${productId})`} />
          <line x1="32" y1="58" x2="40" y2="58" stroke="#CBD5E1" strokeWidth="0.8" />
        </g>
      </svg>
    </div>
  );
};
