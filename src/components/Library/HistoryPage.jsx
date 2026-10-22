import { Trash2 } from 'lucide-react';
import { useYouTube } from '../../context/YouTubeContext';

export default function HistoryPage() {
  const { historyIds, setHistoryIds, videos, playVideo } = useYouTube();

  const historyVideos = historyIds
    .map((id) => videos.find((v) => v.id === id))
    .filter(Boolean);

  const clearHistory = () => {
    if (confirm('Clear all watch history for this lab session?')) {
      setHistoryIds([]);
    }
  };

  return (
    <div className="flex-1 max-w-[1400px] mx-auto px-4 md:px-8 py-6 text-zinc-900 dark:text-zinc-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold">Watch History</h1>
          <p className="text-xs text-zinc-500 mt-1">
            {historyVideos.length} videos watched in this computer lab session
          </p>
        </div>

        {historyVideos.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold text-red-600 dark:text-red-400 transition self-start md:self-auto"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear all watch history</span>
          </button>
        )}
      </div>

      {historyVideos.length > 0 ? (
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800 mt-4">
          {historyVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => playVideo(video)}
              className="flex flex-col sm:flex-row gap-4 py-4 group cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900/50 rounded-xl px-2 transition"
            >
              <div className="relative w-full sm:w-64 aspect-video rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 shrink-0">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded text-xs font-semibold bg-black/80 text-white">
                  {video.duration}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {video.title}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-zinc-500">
                  <span>{video.channel.name}</span>
                  <span>•</span>
                  <span>{video.views}</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 line-clamp-2">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-zinc-400">
          <p className="text-base font-medium">No watch history yet</p>
          <p className="text-xs mt-1">Videos you click will be logged here for quick reference.</p>
        </div>
      )}
    </div>
  );
}
