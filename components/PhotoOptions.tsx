
import React from 'react';
import { ClothingOption, Country, BackgroundColor } from '../types';

interface PhotoOptionsProps {
  selectedClothing: ClothingOption;
  onSelectClothing: (option: ClothingOption) => void;
  selectedCountry: Country;
  onSelectCountry: (option: Country) => void;
  selectedBackgroundColor: BackgroundColor;
  onSelectBackgroundColor: (option: BackgroundColor) => void;
}

// Icons for clothing
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

const clothingOptions = [
  { id: ClothingOption.NONE, label: 'الأصلية', Icon: NoChangeIcon },
  { id: ClothingOption.SUIT, label: 'بدلة', Icon: SuitIcon },
  { id: ClothingOption.SHIRT, label: 'قميص', Icon: ShirtIcon },
];

const countryOptions = [
    { id: Country.USA, label: 'أمريكا (2x2")' },
    { id: Country.Schengen, label: 'شنغن (35x45مم)' },
    { id: Country.Canada, label: 'كندا (50x70مم)' },
    { id: Country.China, label: 'الصين (33x48مم)' },
    { id: Country.UK, label: 'بريطانيا (35x45مم)' },
    { id: Country.India, label: 'الهند (2x2")' },
    { id: Country.Japan, label: 'اليابان (35x45مم)' },
    { id: Country.Iraq, label: 'العراق (2x2")' },
];

const backgroundOptions = [
    { id: BackgroundColor.OffWhite, label: 'أبيض مطفي', color: '#f5f5f5' },
    { id: BackgroundColor.LightBlue, label: 'أزرق فاتح', color: '#e1f5fe' },
    { id: BackgroundColor.LightGray, label: 'رمادي فاتح', color: '#eeeeee' },
];

interface OptionButtonProps {
    onClick: () => void;
    isSelected: boolean;
    children: React.ReactNode;
}

const OptionButton: React.FC<OptionButtonProps> = ({ onClick, isSelected, children }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 text-center ${
            isSelected
                ? 'bg-amber-100 dark:bg-amber-900/50 border-amber-500 dark:border-amber-400 text-amber-700 dark:text-amber-300'
                : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
        }`}
    >
        {children}
    </button>
);

const PhotoOptions: React.FC<PhotoOptionsProps> = ({ 
    selectedClothing, onSelectClothing,
    selectedCountry, onSelectCountry,
    selectedBackgroundColor, onSelectBackgroundColor
}) => {
  return (
    <div className="my-6 w-full max-w-2xl mx-auto space-y-6">
      
      <div>
        <h3 className="text-center text-md font-semibold text-gray-700 dark:text-gray-300 mb-3">
          1. تغيير الملابس (اختياري)
        </h3>
        <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
          {clothingOptions.map(({ id, label, Icon }) => (
            <OptionButton
              key={id}
              onClick={() => onSelectClothing(id)}
              isSelected={selectedClothing === id}
            >
              <Icon className="h-7 w-7 mb-1" />
              <span className="text-xs font-semibold">{label}</span>
            </OptionButton>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-center text-md font-semibold text-gray-700 dark:text-gray-300 mb-3">
          2. مقاس الصورة حسب الدولة
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {countryOptions.map(({ id, label }) => (
            <OptionButton
              key={id}
              onClick={() => onSelectCountry(id)}
              isSelected={selectedCountry === id}
            >
              <span className="text-sm font-semibold p-1">{label}</span>
            </OptionButton>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-center text-md font-semibold text-gray-700 dark:text-gray-300 mb-3">
          3. اختر لون الخلفية
        </h3>
        <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
          {backgroundOptions.map(({ id, label, color }) => (
            <OptionButton
              key={id}
              onClick={() => onSelectBackgroundColor(id)}
              isSelected={selectedBackgroundColor === id}
            >
              <div className="flex items-center justify-center">
                <span style={{ backgroundColor: color }} className="w-5 h-5 rounded-full border border-slate-400/50 mr-2 rtl:ml-2 rtl:mr-0"></span>
                <span className="text-xs font-semibold">{label}</span>
              </div>
            </OptionButton>
          ))}
        </div>
      </div>

    </div>
  );
};

export default PhotoOptions;
