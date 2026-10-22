import { useEffect } from 'react';
import { useYouTube } from '../../context/YouTubeContext';
import VideoPlayer from './VideoPlayer';
import VideoDetails from './VideoDetails';
import CommentsSection from './CommentsSection';
import RelatedVideos from './RelatedVideos';

export default function WatchPage() {
  const { activeVideo, playVideo, theaterMode, videos } = useYouTube();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeVideo?.id]);

  if (!activeVideo) return null;

  const handleNextVideo = () => {
    const currentIndex = videos.findIndex((v) => v.id === activeVideo.id);
    const nextIndex = (currentIndex + 1) % videos.length;
    playVideo(videos[nextIndex]);
  };

  return (
    <div className="flex-1 w-full bg-white dark:bg-[#0f0f0f] min-h-[calc(100vh-3.5rem)] text-zinc-900 dark:text-zinc-100 transition-colors">
      {/* If Theater Mode is active, player occupies full width at the top */}
      {theaterMode && (
        <div className="w-full bg-black flex justify-center">
          <div className="w-full max-w-[1920px]">
            <VideoPlayer video={activeVideo} onNextVideo={handleNextVideo} />
          </div>
        </div>
      )}

      {/* Main Watch Page layout */}
      <div className="max-w-[1720px] mx-auto px-4 md:px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main content: Player (if not theater), Details, Comments */}
          <div className="lg:col-span-8">
            {!theaterMode && (
              <VideoPlayer video={activeVideo} onNextVideo={handleNextVideo} />
            )}
            <VideoDetails video={activeVideo} />
            <CommentsSection video={activeVideo} />
          </div>

          {/* Related Videos sidebar */}
          <div className="lg:col-span-4">
            <RelatedVideos
              currentVideoId={activeVideo.id}
              onSelectVideo={(video) => playVideo(video)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
