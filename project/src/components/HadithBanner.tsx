import React from 'react';
import { BookOpen } from 'lucide-react';
import { getRandomHadith } from '../data/hadiths';

const HadithBanner: React.FC = () => {
  // Get a random hadith when the component is rendered
  const hadith = getRandomHadith();

  return (
    <div className="bg-gradient-to-r from-indigo-700 to-purple-700 border-b border-indigo-600 py-3 px-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center">
        <div className="bg-yellow-400 p-1.5 rounded-full mr-3 flex-shrink-0">
          <BookOpen className="h-5 w-5 text-indigo-900" />
        </div>
        <div className="flex-1">
          <p className="text-white text-sm md:text-base italic">
            "{hadith.text}"
          </p>
          <p className="text-indigo-200 text-xs mt-1">
            {hadith.source}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HadithBanner;