
import React from 'react';

interface ActionButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, disabled, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-amber-600 text-white font-bold py-4 px-4 rounded-lg hover:bg-amber-700 transition-colors duration-300 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed shadow-lg shadow-amber-400/50 dark:shadow-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 text-xl"
    >
      {children}
    </button>
  );
};

export default ActionButton;
