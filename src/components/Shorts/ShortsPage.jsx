import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { MOCK_SHORTS } from '../../data/mockData';
import ShortItem from './ShortItem';

export default function ShortsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % MOCK_SHORTS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + MOCK_SHORTS.length) % MOCK_SHORTS.length);
  };

  return (
    <div className="flex-1 min-h-[calc(100vh-3.5rem)] flex items-center justify-center p-4 relative bg-white dark:bg-[#0f0f0f] transition-colors">
      {/* Current Short */}
      <ShortItem item={MOCK_SHORTS[currentIndex]} isActive={true} />

      {/* Up & Down navigation buttons on right */}
      <div className="fixed right-6 sm:right-12 bottom-1/2 translate-y-1/2 flex flex-col gap-3 z-30">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="p-3 rounded-full bg-zinc-200/80 hover:bg-zinc-300 dark:bg-zinc-800/80 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 backdrop-blur-xs transition shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
          title="Previous Short"
        >
          <ChevronUp className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === MOCK_SHORTS.length - 1}
          className="p-3 rounded-full bg-zinc-200/80 hover:bg-zinc-300 dark:bg-zinc-800/80 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 backdrop-blur-xs transition shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
          title="Next Short"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
