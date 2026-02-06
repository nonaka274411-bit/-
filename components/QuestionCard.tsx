
import React from 'react';

interface QuestionCardProps {
  title: string;
  options: string[];
  onSelect: (option: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ title, options, onSelect }) => {
  return (
    <div className="flex-1 flex flex-col justify-center py-12">
      <div className="mb-14 space-y-4 animate-in fade-in slide-in-from-left-6 duration-700">
        <div className="flex items-center space-x-2">
          <div className="h-[1px] w-8 bg-[#c5a059] opacity-40" />
          <span className="text-[9px] tracking-[0.4em] text-[#c5a059] font-bold uppercase">Personal Analysis</span>
        </div>
        <h2 className="text-3xl font-serif text-gray-900 tracking-tight leading-tight">{title}</h2>
      </div>

      <div className="grid gap-5">
        {options.map((option, idx) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className="group relative w-full p-6 text-left glass-white hover:border-[#c5a059] transition-all duration-500 overflow-hidden animate-float"
            style={{ 
              animationDelay: `${idx * 0.15}s`,
              animationDuration: `${5 + idx}s`
            }}
          >
            <div className="flex items-center justify-between relative z-10">
              <span className="text-base font-light tracking-wide text-gray-700 group-hover:text-gray-900 group-hover:translate-x-2 transition-all duration-500">
                {option}
              </span>
              <div className="w-8 h-[1px] bg-[#c5a059] scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-500" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#fdfaf3] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
