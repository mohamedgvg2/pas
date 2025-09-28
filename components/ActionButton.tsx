
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
      className="w-full bg-indigo-600 text-white font-bold py-4 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed shadow-lg shadow-indigo-300/80 dark:shadow-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-xl"
    >
      {children}
    </button>
  );
};

export default ActionButton;