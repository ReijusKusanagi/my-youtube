import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '../../data/mockData';
import { useYouTube } from '../../context/YouTubeContext';

export default function CategoryBar() {
  const { activeCategory, setActiveCategory } = useYouTube();
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkArrows = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkArrows();
    window.addEventListener('resize', checkArrows);
    return () => window.removeEventListener('resize', checkArrows);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -250 : 250;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
      setTimeout(checkArrows, 300);
    }
  };

  return (
    <div className="sticky top-14 z-20 bg-white/95 dark:bg-[#0f0f0f]/95 backdrop-blur-sm py-2 px-4 transition-colors">
      <div className="relative flex items-center">
        {/* Left Arrow */}
        {showLeftArrow && (
          <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center bg-linear-to-r from-white via-white/90 to-transparent dark:from-[#0f0f0f] dark:via-[#0f0f0f]/90 dark:to-transparent pr-6">
            <button
              onClick={() => scroll('left')}
              className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 shadow-sm"
              aria-label="Scroll categories left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Categories container */}
        <div
          ref={scrollRef}
          onScroll={checkArrows}
          className="flex items-center gap-2.5 overflow-x-auto no-scrollbar scroll-smooth py-1"
        >
          {CATEGORIES.map((category) => {
            const isActive = activeCategory.toLowerCase() === category.toLowerCase();
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold'
                    : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <div className="absolute right-0 top-0 bottom-0 z-10 flex items-center bg-linear-to-l from-white via-white/90 to-transparent dark:from-[#0f0f0f] dark:via-[#0f0f0f]/90 dark:to-transparent pl-6">
            <button
              onClick={() => scroll('right')}
              className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 shadow-sm"
              aria-label="Scroll categories right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
