import { useState } from 'react';
import { CheckCircle2, MoreVertical, Radio } from 'lucide-react';
import { useYouTube } from '../../context/YouTubeContext';

export default function RelatedVideos({ currentVideoId, onSelectVideo }) {
  const { videos } = useYouTube();
  const [activeFilter, setActiveFilter] = useState('All');

  // Filter out currently playing video
  const relatedList = videos.filter((v) => v.id !== currentVideoId);

  const filters = ['All', 'From this channel', 'Related', 'Recently uploaded'];

  return (
    <div className="space-y-3">
      {/* Quick filter pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {filters.map((f) => {
          const isActive = activeFilter === f;
          return (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold'
                  : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Videos List */}
      <div className="space-y-3">
        {relatedList.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectVideo(item)}
            className="flex gap-2.5 group cursor-pointer"
          >
            {/* Thumbnail */}
            <div className="relative w-40 aspect-video rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 shrink-0">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                loading="lazy"
              />
              <div className="absolute bottom-1 right-1">
                {item.isLive ? (
                  <span className="flex items-center gap-1 px-1 py-0.2 rounded text-[10px] font-bold bg-red-600 text-white">
                    <Radio className="w-2.5 h-2.5 animate-pulse" />
                    LIVE
                  </span>
                ) : (
                  <span className="px-1 py-0.2 rounded text-[10px] font-semibold bg-black/80 text-white">
                    {item.duration}
                  </span>
                )}
              </div>
            </div>

            {/* Metadata */}
            <div className="flex-1 min-w-0 pr-1">
              <h4
                className="text-xs md:text-sm font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                title={item.title}
              >
                {item.title}
              </h4>

              <div className="flex items-center gap-1 mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="truncate">{item.channel.name}</span>
                {item.channel.verified && (
                  <CheckCircle2 className="w-3 h-3 text-zinc-500 shrink-0" />
                )}
              </div>

              <div className="flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                <span>{item.views}</span>
                <span>•</span>
                <span>{item.timestamp}</span>
              </div>
            </div>

            {/* Menu icon */}
            <div className="opacity-0 group-hover:opacity-100 self-start p-1 text-zinc-500">
              <MoreVertical className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
