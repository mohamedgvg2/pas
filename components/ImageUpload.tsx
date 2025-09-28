
import React, { useRef } from 'react';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  currentImageUrl?: string;
}

const UploadIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, currentImageUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-lg mx-auto text-center">
      <label
        htmlFor="image-upload"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="cursor-pointer"
      >
        <div 
            onClick={handleClick}
            className="group relative w-full h-80 bg-slate-50 dark:bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 flex flex-col items-center justify-center hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-700/50 transition-colors duration-300"
        >
          {currentImageUrl ? (
            <img
              src={currentImageUrl}
              alt="معاينة"
              className="w-full h-full object-contain rounded-lg p-2"
            />
          ) : (
            <div className="space-y-2">
              <UploadIcon />
              <p className="text-slate-700 dark:text-slate-300 font-semibold">اسحب وأفلت صورة هنا، أو انقر للاختيار</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">PNG, JPG, WEBP (بحد أقصى 5 ميجابايت)</p>
            </div>
          )}
        </div>
      </label>
      <input
        id="image-upload"
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUpload;