
import React from 'react';
import { ProductType } from '../types';

interface ProductIconProps {
  type: ProductType;
  color: string;
  className?: string;
}

const ProductIcon: React.FC<ProductIconProps> = ({ type, color, className = "w-full h-full" }) => {
  // Use slightly lighter/darker shades for dimension
  const baseColor = color;
  const highlightColor = 'rgba(255,255,255,0.4)';
  const shadowColor = 'rgba(0,0,0,0.1)';

  switch (type) {
    case 'shampoo':
      return (
        <svg viewBox="0 0 100 160" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Cap */}
          <rect x="25" y="10" width="50" height="15" rx="2" fill="#d1d5db" />
          <rect x="28" y="5" width="44" height="5" rx="1" fill="#e5e7eb" />
          {/* Bottle Body - Tapered */}
          <path d="M25 25 L75 25 L85 140 Q85 150 75 150 L25 150 Q15 150 15 140 L25 25 Z" fill={baseColor} />
          {/* Highlight */}
          <path d="M25 25 L35 140" stroke={highlightColor} strokeWidth="10" strokeLinecap="round" opacity="0.3" />
          {/* Label Area */}
          <rect x="35" y="60" width="30" height="40" fill="rgba(255,255,255,0.8)" rx="2" />
          <rect x="40" y="70" width="20" height="2" fill="#333" />
          <rect x="40" y="75" width="15" height="1" fill="#333" />
        </svg>
      );
    
    case 'treatment-jar':
      return (
        <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Lid */}
          <path d="M20 30 L80 30 L85 45 L15 45 Z" fill="#d1d5db" />
          {/* Jar Body */}
          <path d="M20 45 L80 45 L75 80 Q75 90 60 90 L40 90 Q25 90 25 80 L20 45 Z" fill={baseColor} />
          {/* Highlight */}
          <path d="M25 45 L30 80" stroke={highlightColor} strokeWidth="8" strokeLinecap="round" opacity="0.3" />
          {/* Label */}
          <rect x="35" y="60" width="30" height="15" fill="rgba(255,255,255,0.8)" rx="1" />
        </svg>
      );

    case 'treatment-tube':
      return (
        <svg viewBox="0 0 100 160" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Tube Body - Inverted */}
          <path d="M20 10 L80 10 L70 120 L30 120 Z" fill={baseColor} />
          {/* Cap */}
          <rect x="28" y="120" width="44" height="25" rx="2" fill={baseColor} filter="brightness(0.8)" />
          {/* Highlight */}
          <path d="M30 10 L40 110" stroke={highlightColor} strokeWidth="15" strokeLinecap="round" opacity="0.2" />
          {/* Label */}
          <rect x="35" y="50" width="30" height="30" fill="rgba(255,255,255,0.8)" rx="1" />
        </svg>
      );

    case 'oil':
    case 'spray':
      return (
        <svg viewBox="0 0 100 160" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Pump Head */}
          <rect x="40" y="5" width="20" height="15" rx="2" fill="#d1d5db" />
          <rect x="45" y="0" width="10" height="5" fill="#d1d5db" />
          {/* Neck */}
          <rect x="42" y="20" width="16" height="10" fill="#e5e7eb" />
          {/* Bottle Body - Cylindrical */}
          <rect x="25" y="30" width="50" height="110" rx="5" fill={baseColor} opacity="0.9" />
          {/* Liquid content visual */}
          <rect x="28" y="40" width="44" height="95" rx="3" fill={baseColor} filter="brightness(1.1)" />
          {/* Highlight */}
          <rect x="32" y="40" width="5" height="90" rx="2" fill={highlightColor} opacity="0.5" />
          {/* Label */}
          <rect x="35" y="70" width="30" height="40" fill="rgba(255,255,255,0.8)" rx="1" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" fill={baseColor} />
        </svg>
      );
  }
};

export default ProductIcon;
