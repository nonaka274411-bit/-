
import React from 'react';

interface QuestionCardProps {
  title: string;
  options: string[];
  onSelect: (option: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ title, options, onSelect }) => {
  return (
    <div className="flex-1 flex flex-col justify-center px-8 animate-fade-in min-h-[80vh]">
      <div className="mb-10">
        <h2 className="text-2xl font-light text-slate-900 mb-2">{title}</h2>
        <div className="w-8 h-[1px] bg-slate-200 mt-4"></div>
      </div>

      <div className="space-y-3">
        {options.map((option, idx) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className="w-full text-left py-5 px-6 bg-gray-50 hover:bg-slate-100 transition-colors duration-300 group"
          >
            <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900 tracking-wide transition-colors">
              {option}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
