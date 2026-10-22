import { Play, Trash2, Clock } from 'lucide-react';
import { useYouTube } from '../../context/YouTubeContext';

export default function WatchLaterPage() {
  const { watchLaterIds, toggleWatchLater, videos, playVideo } = useYouTube();

  const savedVideos = videos.filter((v) => watchLaterIds.has(v.id));

  return (
    <div className="flex-1 max-w-[1400px] mx-auto px-4 md:px-8 py-6 text-zinc-900 dark:text-zinc-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-red-600 text-white">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Watch Later</h1>
            <p className="text-xs text-zinc-500 mt-0.5">
              {savedVideos.length} saved video{savedVideos.length === 1 ? '' : 's'}
            </p>
          </div>
        </div>

        {savedVideos.length > 0 && (
          <button
            onClick={() => playVideo(savedVideos[0])}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold text-xs transition shadow-sm hover:opacity-90 self-start md:self-auto"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Play all</span>
          </button>
        )}
      </div>

      {savedVideos.length > 0 ? (
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800 mt-4">
          {savedVideos.map((video, idx) => (
            <div
              key={video.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 group hover:bg-zinc-50 dark:hover:bg-zinc-900/50 rounded-xl px-2 transition"
            >
              <div
                onClick={() => playVideo(video)}
                className="flex items-center gap-4 flex-1 cursor-pointer min-w-0"
              >
                <span className="text-sm font-mono text-zinc-400 w-4 text-center hidden sm:block">
                  {idx + 1}
                </span>

                <div className="relative w-full sm:w-56 aspect-video rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 shrink-0">
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
                  <h3 className="text-sm font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">{video.channel.name}</p>
                </div>
              </div>

              <button
                onClick={() => toggleWatchLater(video.id)}
                className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 hover:text-red-500 transition self-end sm:self-center"
                title="Remove from Watch Later"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-zinc-400">
          <Clock className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-base font-medium">No videos saved for later</p>
          <p className="text-xs mt-1">Hover over any video card and tap the clock icon to save it here.</p>
        </div>
      )}
    </div>
  );
}
