import { Play, ThumbsUp } from 'lucide-react';
import { useYouTube } from '../../context/YouTubeContext';
import VideoCard from '../Feed/VideoCard';

export default function LikedVideosPage() {
  const { likedVideoIds, videos, playVideo } = useYouTube();

  const likedList = videos.filter((v) => likedVideoIds.has(v.id));

  return (
    <div className="flex-1 max-w-[1500px] mx-auto px-4 md:px-8 py-6 text-zinc-900 dark:text-zinc-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-blue-600 text-white">
            <ThumbsUp className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Liked Videos</h1>
            <p className="text-xs text-zinc-500 mt-0.5">
              {likedList.length} video{likedList.length === 1 ? '' : 's'} you have thumbed up
            </p>
          </div>
        </div>

        {likedList.length > 0 && (
          <button
            onClick={() => playVideo(likedList[0])}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold text-xs transition shadow-sm hover:opacity-90 self-start md:self-auto"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Play all</span>
          </button>
        )}
      </div>

      {likedList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 mt-6">
          {likedList.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-zinc-400">
          <ThumbsUp className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-base font-medium">No liked videos yet</p>
          <p className="text-xs mt-1">Click the thumbs up button on any video while watching to add it here.</p>
        </div>
      )}
    </div>
  );
}
