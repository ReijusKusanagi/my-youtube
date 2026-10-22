import { useYouTube } from '../../context/YouTubeContext';
import CategoryBar from './CategoryBar';
import VideoCard from './VideoCard';
import { SearchX, Sparkles, BookOpen } from 'lucide-react';

export default function VideoGrid({ onOpenLabAssistant }) {
  const { filteredVideos, searchQuery, activeCategory, setActiveCategory, setSearchQuery } = useYouTube();

  const handleResetFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
  };

  return (
    <div className="flex-1 min-w-0">
      {/* Category Pills Bar */}
      <CategoryBar />

      <div className="px-4 md:px-6 py-4">
        {/* Lab Assistant Announcement Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-linear-to-r from-red-600/10 via-zinc-100 to-blue-600/10 dark:from-red-950/40 dark:via-zinc-900 dark:to-blue-950/40 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-600 text-white shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                University Computer Lab Assistant • YouTube Web Experience
              </h2>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Built with Vite + React + JavaScript & Tailwind CSS. Includes interactive player, dark/light themes, shorts, voice search & comments!
              </p>
            </div>
          </div>
          <button
            onClick={onOpenLabAssistant}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-semibold hover:opacity-90 transition"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Lab Guide & Shortcuts</span>
          </button>
        </div>

        {/* Video Cards Grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-8">
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 mb-4">
              <SearchX className="w-10 h-10" />
            </div>
            <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-200">
              No videos found matching &quot;{searchQuery || activeCategory}&quot;
            </h3>
            <p className="text-xs text-zinc-500 max-w-sm mt-1 mb-4">
              Try searching with different keywords, check for spelling errors, or reset your active filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-semibold hover:opacity-90 transition"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
