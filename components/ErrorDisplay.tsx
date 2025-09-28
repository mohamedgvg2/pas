
import React from 'react';

interface ErrorDisplayProps {
  message: string | null;
  onRetry: () => void;
}

const ErrorIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-lg">
      <ErrorIcon />
      <h3 className="mt-4 text-xl font-semibold text-red-800 dark:text-red-300">حدث خطأ</h3>
      <p className="mt-2 text-red-700 dark:text-red-400">
        {message || 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.'}
      </p>
      <button
        onClick={onRetry}
        className="mt-6 bg-red-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        حاول مرة أخرى
      </button>
    </div>
  );
};

export default ErrorDisplay;