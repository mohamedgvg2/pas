
import React from 'react';

const LightIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const BackgroundIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);

const ExpressionIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 10h.01M15 10h.01M10 14h4" />
    </svg>
);

const AccessoriesIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 10.5h1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15" />
    </svg>
);

const recommendations = [
  { icon: <LightIcon />, text: 'استخدم إضاءة أمامية جيدة ومتساوية لتجنب الظلال على وجهك.' },
  { icon: <BackgroundIcon />, text: 'قف أمام خلفية بلون موحد وفاتح (مثل حائط أبيض).' },
  { icon: <ExpressionIcon />, text: 'حافظ على تعابير وجه محايدة، انظر مباشرة إلى الكاميرا، وأغلق فمك.' },
  { icon: <AccessoriesIcon />, text: 'تجنب ارتداء النظارات أو القبعات أو أي شيء يغطي ملامح وجهك.' },
];

const Recommendations: React.FC = () => {
  return (
    <div className="mt-8 w-full max-w-lg mx-auto animate-fade-in">
      <h3 className="text-center text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
        نصائح للحصول على أفضل النتائج
      </h3>
      <ul className="space-y-3">
        {recommendations.map((item, index) => (
          <li key={index} className="flex items-start p-3 bg-gray-50 dark:bg-gray-900/60 rounded-lg border border-gray-200/80 dark:border-gray-800">
            <div className="flex-shrink-0 w-6 h-6 text-amber-500 dark:text-amber-400 mr-4 rtl:ml-4 rtl:mr-0">
              {item.icon}
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {item.text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
