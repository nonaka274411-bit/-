import React from 'react';
import { ProductType } from '../types';

interface ProductIconProps {
  type: ProductType;
  color: string;
  className?: string;
}

const ProductIcon: React.FC<ProductIconProps> = ({ type, color, className = "w-full h-full" }) => {
  const safeColorId = color.replace('#', '');
  const gradId = `grad-${type}-${safeColorId}`;
  
  return (
    <div className={className}>
      <svg viewBox="0 0 100 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <stop offset="50%" stopColor={color} stopOpacity="0.6" />
            <stop offset="100%" stopColor={color} stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {type === 'shampoo' && (
          <g>
             {/* Cap */}
            <path d="M35 15 L65 15 L67 25 L33 25 Z" fill="#d4d4d8" />
            {/* Body */}
            <path d="M33 25 L67 25 L70 35 L70 145 Q70 155 60 155 L40 155 Q30 155 30 145 L30 35 L33 25 Z" fill={`url(#${gradId})`} />
            {/* Liquid Shine */}
            <path d="M35 35 L35 145" stroke="white" strokeWidth="2" strokeOpacity="0.3" strokeLinecap="round" />
            {/* Label */}
            <rect x="38" y="65" width="24" height="40" fill="white" fillOpacity="0.9" />
          </g>
        )}

        {type === 'treatment-jar' && (
           <g transform="translate(0, 30)">
            {/* Lid */}
            <ellipse cx="50" cy="20" rx="30" ry="6" fill="#e4e4e7" />
            <path d="M20 20 L80 20 L80 28 Q50 32 20 28 Z" fill="#d4d4d8" />
            {/* Body */}
            <path d="M22 28 L78 28 L76 70 Q76 80 50 80 Q24 80 24 70 L22 28 Z" fill={`url(#${gradId})`} />
             {/* Label */}
            <rect x="35" y="45" width="30" height="15" fill="white" fillOpacity="0.9" rx="1" />
           </g>
        )}

        {type === 'treatment-tube' && (
          <g>
             {/* Tube */}
            <path d="M25 10 L75 10 L70 120 L30 120 Z" fill={`url(#${gradId})`} />
            <path d="M25 10 L75 10 L75 5 L25 5 Z" fill={color} fillOpacity="0.5" />
            {/* Cap */}
            <path d="M30 120 L70 120 L70 140 Q50 145 30 140 Z" fill="#d4d4d8" />
             {/* Shine */}
            <path d="M35 15 L40 110" stroke="white" strokeWidth="6" strokeOpacity="0.2" strokeLinecap="round" />
             {/* Label */}
            <rect x="35" y="50" width="30" height="30" fill="white" fillOpacity="0.9" />
          </g>
        )}

        {type === 'oil' && (
          <g>
             {/* Pump */}
            <rect x="44" y="10" width="12" height="10" fill="#18181b" rx="1"/>
            <path d="M44 10 L35 15 L35 18 L44 14 Z" fill="#18181b" />
            <rect x="46" y="20" width="8" height="10" fill="#e4e4e7" />
             {/* Bottle */}
            <rect x="30" y="30" width="40" height="100" rx="4" fill={`url(#${gradId})`} stroke={color} strokeWidth="0.5" />
             {/* Inner Liquid */}
            <rect x="33" y="35" width="34" height="90" rx="2" fill={color} fillOpacity="0.7" />
             {/* Shine */}
            <path d="M35 40 L35 120" stroke="white" strokeWidth="4" strokeOpacity="0.3" strokeLinecap="round" />
             {/* Label */}
            <rect x="38" y="70" width="24" height="24" fill="white" fillOpacity="0.9" />
          </g>
        )}

        {type === 'spray' && (
          <g>
             {/* Cap */}
             <path d="M35 20 L65 20 L65 40 L35 40 Z" fill="#d4d4d8" />
             {/* Body */}
             <rect x="32" y="40" width="36" height="100" rx="2" fill={color} fillOpacity="0.9" />
             {/* Label */}
             <rect x="35" y="70" width="30" height="40" fill="white" fillOpacity="0.9" />
          </g>
        )}
      </svg>
    </div>
  );
};

export default ProductIcon;