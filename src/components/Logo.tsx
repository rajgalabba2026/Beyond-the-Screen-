import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  iconOnly = false,
  size = 'md' 
}) => {
  // Dimension presets
  const sizeMap = {
    sm: { icon: 'w-8 h-8', textTitle: 'text-base', textSub: 'text-[10px]' },
    md: { icon: 'w-10 h-10', textTitle: 'text-xl', textSub: 'text-xs' },
    lg: { icon: 'w-14 h-14', textTitle: 'text-2xl', textSub: 'text-sm' },
    xl: { icon: 'w-24 h-24', textTitle: 'text-4xl', textSub: 'text-base' }
  };

  const currentSize = sizeMap[size];

  // Standalone Vector Icon of the Phone sprouting green leaves
  const IconSVG = (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-2xs"
    >
      {/* Phone Outline (Deep Teal #084442) with top-right opening where leaves sprout */}
      <path
        d="M 112 48 
           L 72 48 
           A 28 28 0 0 0 44 76 
           L 44 180 
           A 28 28 0 0 0 72 208 
           L 128 208 
           A 28 28 0 0 0 156 180 
           L 156 94"
        stroke="#084442"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Pill home indicator / speaker bar */}
      <rect
        x="84"
        y="182"
        width="32"
        height="8"
        rx="4"
        fill="#084442"
      />

      {/* Main Upper Leaf (Fresh Natural Green #4CA436) */}
      <path
        d="M 148 84 
           C 142 56 160 28 190 18 
           C 188 48 172 76 148 84 Z"
        fill="#4CA436"
      />
      {/* Subtle vein line on upper leaf */}
      <path
        d="M 152 80 C 160 62 172 44 186 24"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeOpacity="0.45"
      />

      {/* Secondary Lower Leaf (Fresh Natural Green #4CA436) */}
      <path
        d="M 152 86 
           C 164 78 184 76 194 92 
           C 182 102 164 102 152 86 Z"
        fill="#53AE3B"
      />
      {/* Subtle vein on lower leaf */}
      <path
        d="M 156 86 C 168 86 180 88 190 92"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeOpacity="0.35"
      />
    </svg>
  );

  if (iconOnly) {
    return (
      <div className={`relative flex items-center justify-center shrink-0 ${currentSize.icon} ${className}`}>
        {IconSVG}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Phone with leaves icon */}
      <div className={`relative flex items-center justify-center shrink-0 ${currentSize.icon}`}>
        {IconSVG}
      </div>

      {/* Brand title & tagline matching the logo typography */}
      <div className="flex flex-col leading-none">
        <div className={`font-display font-extrabold tracking-tight text-[#084442] ${currentSize.textTitle}`}>
          Beyond the Screen
        </div>
        <div className={`text-[#084442]/80 font-medium tracking-wide mt-0.5 ${currentSize.textSub}`}>
          Less scrolling. More living.
        </div>
      </div>
    </div>
  );
};
