
import React from 'react';
import { AnalysisIssue } from '../types';
import ActionButton from './ActionButton';

interface AnalysisResultProps {
  imageUrl: string;
  feedback: AnalysisIssue[];
  onProceed: () => void;
  onUploadNew: () => void;
}

const WarningIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);

const AnalysisResult: React.FC<AnalysisResultProps> = ({ imageUrl, feedback, onProceed, onUploadNew }) => {
  return (
    <div className="w-full flex flex-col items-center animate-fade-in">
        <h2 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-4">تم العثور على ملاحظات</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6 max-w-2xl">
            قام الذكاء الاصطناعي بفحص صورتك واكتشف بعض المشاكل المحتملة. للحصول على أفضل النتائج، نوصي بتحميل صورة جديدة تتبع الإرشادات أدناه.
        </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-3 text-gray-600 dark:text-gray-400">صورتك الحالية</h3>
          <div className="w-full aspect-square bg-gray-100 dark:bg-gray-800/50 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
            <img src={imageUrl} alt="Uploaded for analysis" className="w-full h-full object-contain" />
          </div>
        </div>
        <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-600 dark:text-gray-400">الملاحظات</h3>
            <ul className="space-y-3">
                {feedback.map((item, index) => (
                <li key={index} className="flex items-start p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200/80 dark:border-amber-500/30">
                    <div className="flex-shrink-0 w-6 h-6 text-amber-500 dark:text-amber-400 mr-4 rtl:ml-4 rtl:mr-0">
                        <WarningIcon />
                    </div>
                    <div className="text-sm">
                        <p className="font-semibold text-amber-800 dark:text-amber-300">{item.issueType}</p>
                        <p className="text-amber-700 dark:text-amber-400 leading-relaxed">
                        {item.recommendation}
                        </p>
                    </div>
                </li>
                ))}
            </ul>
        </div>
      </div>
      <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <button
          onClick={onUploadNew}
          className="w-full text-center bg-gray-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-300 shadow-md shadow-gray-200/80 dark:shadow-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 text-lg"
        >
          تحميل صورة جديدة
        </button>
        <button
          onClick={onProceed}
          className="w-full text-center bg-amber-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-amber-700 transition-colors duration-300 shadow-md shadow-amber-200/80 dark:shadow-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 text-lg"
        >
          المتابعة على أي حال
        </button>
      </div>
    </div>
  );
};

export default AnalysisResult;
