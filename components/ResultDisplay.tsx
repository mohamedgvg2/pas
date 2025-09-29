
import React, { useState } from 'react';
import { createPrintableSheet, createCompressedImage } from '../utils/imageUtils';

interface ResultDisplayProps {
  originalImageUrl: string;
  generatedImageUrl: string;
  onReset: () => void;
}

type PaperSize = '4x6' | 'A4';
type PrintFormat = 'jpeg' | 'pdf';

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  originalImageUrl,
  generatedImageUrl,
  onReset,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paperSize, setPaperSize] = useState<PaperSize>('4x6');
  const [printFormat, setPrintFormat] = useState<PrintFormat>('jpeg');

  const handleDownload = async (action: 'sheet' | 'compressed' | 'single') => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const link = document.createElement('a');
      
      if (action === 'sheet') {
        const dataUrl = await createPrintableSheet({
            imageUrl: generatedImageUrl,
            paperSize,
            format: printFormat,
        });
        link.href = dataUrl;
        link.download = `passport-photos-sheet.${printFormat}`;
      } else if (action === 'compressed') {
        const dataUrl = await createCompressedImage(generatedImageUrl);
        link.href = dataUrl;
        link.download = 'passport-photo-web.jpg';
      } else { // single
        link.href = generatedImageUrl;
        link.download = 'passport-photo.png';
      }

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error("Failed to process download:", error);
      alert('فشل في معالجة التنزيل. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-3 text-gray-600 dark:text-gray-400">الصورة الأصلية</h3>
          <div className="w-full aspect-square bg-gray-100 dark:bg-gray-800/50 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
            <img src={originalImageUrl} alt="Original" className="w-full h-full object-contain" />
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-3 text-amber-600 dark:text-amber-400">صورة جواز السفر</h3>
           <div className="w-full aspect-square bg-gray-100 dark:bg-gray-800/50 rounded-xl overflow-hidden shadow-lg border-2 border-amber-400 dark:border-amber-500/50">
            <img src={generatedImageUrl} alt="Passport Photo" className="w-full h-full object-contain border-4 border-white dark:border-gray-900" />
          </div>
        </div>
      </div>

      <div className="mt-10 w-full max-w-lg space-y-6">
        {/* Print Sheet Section */}
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50">
          <h4 className="font-bold text-lg text-center mb-4 text-gray-800 dark:text-gray-200">تحميل ورقة للطباعة</h4>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">حجم الورق</label>
                <select value={paperSize} onChange={(e) => setPaperSize(e.target.value as PaperSize)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md">
                    <option value="4x6">4x6 بوصة (6 صور)</option>
                    <option value="A4">A4 (8 صور)</option>
                </select>
            </div>
            <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">الصيغة</label>
                <select value={printFormat} onChange={(e) => setPrintFormat(e.target.value as PrintFormat)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md">
                    <option value="jpeg">JPG</option>
                    <option value="pdf">PDF</option>
                </select>
            </div>
          </div>
          <button onClick={() => handleDownload('sheet')} disabled={isProcessing} className="w-full text-center bg-amber-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-amber-700 transition-colors duration-300 shadow-md shadow-amber-200/80 dark:shadow-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 text-lg disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-wait">
            {isProcessing ? 'جاري التحضير...' : 'تحميل ورقة الطباعة'}
          </button>
        </div>
        
        {/* Other Downloads Section */}
        <div className="flex justify-around items-center gap-4">
            <button onClick={() => handleDownload('single')} disabled={isProcessing} className="text-center text-sm text-gray-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-300 underline transition-colors disabled:text-gray-400 disabled:cursor-wait">
              تحميل صورة واحدة (PNG)
            </button>
            <button onClick={() => handleDownload('compressed')} disabled={isProcessing} className="text-center text-sm text-gray-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-300 underline transition-colors disabled:text-gray-400 disabled:cursor-wait">
              تحميل للويب (مضغوط)
            </button>
            <button onClick={onReset} className="text-center text-sm text-gray-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-300 underline transition-colors">
              البدء من جديد
            </button>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
