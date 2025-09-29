
import React from 'react';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  theme: string;
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
  return (
    <header className="w-full max-w-5xl mx-auto text-center py-6 sm:py-8 px-4 relative">
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-amber-400">
        صانع صور جواز السفر بالذكاء الاصطناعي
      </h1>
      <p className="mt-2 text-md sm:text-lg text-gray-500 dark:text-gray-400">
        أنشئ صورة جواز سفر رسمية ومثالية في ثوانٍ
      </p>
    </header>
  );
};

export default Header;
