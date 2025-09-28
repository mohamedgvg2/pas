
import React from 'react';
import { ClothingOption } from '../types';

interface ClothingSelectorProps {
  selectedOption: ClothingOption;
  onSelectOption: (option: ClothingOption) => void;
}

const NoChangeIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
  </svg>
);
const SuitIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.75L18.25 9 12 20.25 5.75 9 12 4.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 9.5l2.5 4 2.5-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 9h12v10H6z" />
    </svg>
);
const ShirtIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 4h14l-2 5H7L5 4z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 9v11h10V9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v11" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 12h4" />
    </svg>
);


const options = [
  { id: ClothingOption.NONE, label: 'الملابس الأصلية', Icon: NoChangeIcon },
  { id: ClothingOption.SUIT, label: 'بدلة رسمية', Icon: SuitIcon },
  { id: ClothingOption.SHIRT, label: 'قميص رسمي', Icon: ShirtIcon },
];

const ClothingSelector: React.FC<ClothingSelectorProps> = ({ selectedOption, onSelectOption }) => {
  return (
    <div className="my-6 w-full max-w-md mx-auto">
      <h3 className="text-center text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4">
        تغيير الملابس (اختياري)
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {options.map(({ id, label, Icon }) => {
          const isSelected = selectedOption === id;
          return (
            <button
              key={id}
              onClick={() => onSelectOption(id)}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isSelected
                  ? 'bg-indigo-100 dark:bg-indigo-900/50 border-indigo-500 dark:border-indigo-400 text-indigo-700 dark:text-indigo-300'
                  : 'bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
              }`}
            >
              <Icon className="h-8 w-8 mb-1" />
              <span className="text-sm font-semibold text-center">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ClothingSelector;