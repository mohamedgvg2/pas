
import React, { useState, useCallback, useEffect } from 'react';
import { AppState, ClothingOption, Country, BackgroundColor, AnalysisIssue } from './types';
import { generatePassportPhoto, analyzePhoto } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import Header from './components/Header';
import ImageUpload from './components/ImageUpload';
import ResultDisplay from './components/ResultDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ActionButton from './components/ActionButton';
import ErrorDisplay from './components/ErrorDisplay';
import PhotoOptions from './components/PhotoOptions';
import Recommendations from './components/Recommendations';
import AnalysisResult from './components/AnalysisResult';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [originalImage, setOriginalImage] = useState<{ file: File; url: string } | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [analysisFeedback, setAnalysisFeedback] = useState<AnalysisIssue[]>([]);
  
  const [clothing, setClothing] = useState<ClothingOption>(ClothingOption.NONE);
  const [country, setCountry] = useState<Country>(Country.USA);
  const [backgroundColor, setBackgroundColor] = useState<BackgroundColor>(BackgroundColor.OffWhite);

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme) return storedTheme;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleImageSelect = (file: File) => {
    if (originalImage?.url) {
      URL.revokeObjectURL(originalImage.url);
    }
    setOriginalImage({ file, url: URL.createObjectURL(file) });
    setGeneratedImage(null);
    setError(null);
    setAnalysisFeedback([]);
    setAppState(AppState.ANALYZING);
    handleResetOptions();
  };

  useEffect(() => {
    if (appState === AppState.ANALYZING && originalImage) {
      const performAnalysis = async () => {
        try {
          const base64Image = await fileToBase64(originalImage.file);
          const feedback = await analyzePhoto(base64Image, originalImage.file.type);
          if (feedback && feedback.issues && feedback.issues.length > 0) {
            setAnalysisFeedback(feedback.issues);
            setAppState(AppState.ANALYSIS_FAILED);
          } else {
            setAppState(AppState.IDLE); // No issues, proceed to options
          }
        } catch (err) {
          console.error("Analysis failed:", err);
          // Optional: handle analysis error differently, but for now we can let them proceed
          setAppState(AppState.IDLE); 
        }
      };
      performAnalysis();
    }
  }, [appState, originalImage]);


  const handleGenerateClick = useCallback(async () => {
    if (!originalImage) return;

    setAppState(AppState.PROCESSING);
    setError(null);
    setGeneratedImage(null);

    try {
      const { file } = originalImage;
      const base64Image = await fileToBase64(file);
      const generatedImageData = await generatePassportPhoto(base64Image, file.type, clothing, country, backgroundColor);
      
      if (!generatedImageData) {
        throw new Error("فشل في إنشاء الصورة. لم يتم إرجاع أي بيانات من الواجهة البرمجية.");
      }
      
      setGeneratedImage(`data:image/png;base64,${generatedImageData}`);
      setAppState(AppState.SUCCESS);
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'حدث خطأ غير متوقع.';
      setError(`فشل إنشاء صورة جواز السفر: ${errorMessage}`);
      setAppState(AppState.ERROR);
    }
  }, [originalImage, clothing, country, backgroundColor]);

  const handleResetOptions = () => {
    setClothing(ClothingOption.NONE);
    setCountry(Country.USA);
    setBackgroundColor(BackgroundColor.OffWhite);
  }

  const handleReset = () => {
    if (originalImage?.url) {
      URL.revokeObjectURL(originalImage.url);
    }
    setOriginalImage(null);
    setGeneratedImage(null);
    setError(null);
    setAnalysisFeedback([]);
    setAppState(AppState.IDLE);
    handleResetOptions();
  };
  
  const proceedFromAnalysis = () => {
    setAppState(AppState.IDLE);
  }

  const renderContent = () => {
    switch (appState) {
      case AppState.ANALYZING:
        return (
            <div className="flex flex-col items-center justify-center text-center p-8 min-h-[400px]">
                <LoadingSpinner text="جاري فحص الصورة..."/>
            </div>
        );
      case AppState.ANALYSIS_FAILED:
        return (
            originalImage &&
            <AnalysisResult
                imageUrl={originalImage.url}
                feedback={analysisFeedback}
                onProceed={proceedFromAnalysis}
                onUploadNew={handleReset}
            />
        );
      case AppState.PROCESSING:
        return (
            <div className="flex flex-col items-center justify-center text-center p-8 min-h-[400px]">
                <LoadingSpinner text="جاري إنشاء صورة جواز السفر... قد يستغرق هذا بعض الوقت." />
            </div>
        );
      case AppState.SUCCESS:
        return (
          originalImage && generatedImage && (
            <ResultDisplay
              originalImageUrl={originalImage.url}
              generatedImageUrl={generatedImage}
              onReset={handleReset}
            />
          )
        );
      case AppState.ERROR:
        return <ErrorDisplay message={error} onRetry={handleGenerateClick} />;
      case AppState.IDLE:
      default:
        return (
          <div className="w-full flex flex-col items-center">
            <ImageUpload onImageSelect={handleImageSelect} currentImageUrl={originalImage?.url} />
            {originalImage ? (
              <>
                <PhotoOptions
                    selectedClothing={clothing}
                    onSelectClothing={setClothing}
                    selectedCountry={country}
                    onSelectCountry={setCountry}
                    selectedBackgroundColor={backgroundColor}
                    onSelectBackgroundColor={setBackgroundColor}
                />
                <div className="mt-8 w-full max-w-sm">
                  <ActionButton
                    onClick={handleGenerateClick}
                  >
                    إنشاء صورة جواز السفر
                  </ActionButton>
                </div>
              </>
            ) : (
                <Recommendations />
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-900 text-slate-800 dark:text-slate-200 flex flex-col items-center font-sans transition-colors duration-300">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main className="w-full max-w-5xl mx-auto flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-slate-900/50 p-6 sm:p-8 md:p-10 border border-slate-200/80 dark:border-slate-700">
          {renderContent()}
        </div>
      </main>
      <footer className="w-full text-center p-4 text-slate-500 dark:text-slate-400 text-sm">
        <p>مدعوم بواسطة Gemini API</p>
      </footer>
    </div>
  );
};

export default App;