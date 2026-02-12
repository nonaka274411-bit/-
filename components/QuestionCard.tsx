import React from 'react';

interface QuestionCardProps {
  title: string;
  options: string[];
  onSelect: (option: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ title, options, onSelect }) => {
  return (
    <div className="flex-1 flex flex-col justify-center px-6 py-12 animate-fade-in min-h-[60vh]">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-2xl font-light text-slate-900 mb-4">{title}</h2>
        <div className="w-8 h-[1px] bg-slate-300 mx-auto md:mx-0"></div>
      </div>

      <div className="space-y-3 w-full">
        {options.map((option, idx) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className="w-full text-left py-5 px-6 bg-gray-50 border border-transparent hover:border-slate-200 hover:bg-white hover:shadow-sm transition-all duration-300 active:scale-[0.99]"
          >
            <span className="text-sm font-light text-slate-700 tracking-wide">
              {option}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;