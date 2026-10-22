import { useState } from 'react';
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  Download,
  Bookmark,
  MoreHorizontal,
  Bell,
  CheckCircle2
} from 'lucide-react';
import { useYouTube } from '../../context/YouTubeContext';
import ShareModal from './ShareModal';

export default function VideoDetails({ video }) {
  const {
    likedVideoIds,
    toggleLike,
    dislikedVideoIds,
    toggleDislike,
    subscribedChannelIds,
    toggleSubscribe,
    watchLaterIds,
    toggleWatchLater
  } = useYouTube();

  const [descExpanded, setDescExpanded] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const isLiked = likedVideoIds.has(video.id);
  const isDisliked = dislikedVideoIds.has(video.id);
  const isSubscribed = subscribedChannelIds.has(video.channel.id);
  const isSaved = watchLaterIds.has(video.id);

  // Compute display like count
  const baseLikes = video.likesCount || 10000;
  const currentLikes = isLiked ? baseLikes + 1 : baseLikes;
  const formatLikes = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const handleDownload = () => {
    alert(`Downloading "${video.title}" for offline lab study!`);
  };

  return (
    <div className="mt-4 space-y-4">
      {/* Video Title */}
      <h1 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
        {video.title}
      </h1>

      {/* Channel info & Action buttons container */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800/80">
        {/* Left: Channel profile */}
        <div className="flex items-center gap-3">
          <img
            src={video.channel.avatar}
            alt={video.channel.name}
            className="w-10 h-10 rounded-full object-cover ring-1 ring-zinc-300 dark:ring-zinc-700"
          />
          <div>
            <div className="flex items-center gap-1 font-semibold text-sm text-zinc-900 dark:text-zinc-100">
              <span>{video.channel.name}</span>
              {video.channel.verified && (
                <CheckCircle2 className="w-4 h-4 text-zinc-500 fill-zinc-400/20" />
              )}
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {video.channel.subscribers} subscribers
            </span>
          </div>

          {/* Subscribe Button */}
          <button
            onClick={() => toggleSubscribe(video.channel.id)}
            className={`ml-3 px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition flex items-center gap-1.5 ${
              isSubscribed
                ? 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200'
                : 'bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900'
            }`}
          >
            {isSubscribed ? (
              <>
                <Bell className="w-3.5 h-3.5" />
                <span>Subscribed</span>
              </>
            ) : (
              <span>Subscribe</span>
            )}
          </button>
        </div>

        {/* Right: Actions row */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {/* Like / Dislike pill */}
          <div className="flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs md:text-sm font-medium">
            <button
              onClick={() => toggleLike(video.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-l-full transition ${
                isLiked ? 'text-blue-600 dark:text-blue-400 font-bold' : ''
              }`}
            >
              <ThumbsUp
                className={`w-4 h-4 ${isLiked ? 'fill-blue-600 dark:fill-blue-400' : ''}`}
              />
              <span>{formatLikes(currentLikes)}</span>
            </button>
            <div className="w-px h-5 bg-zinc-300 dark:bg-zinc-700" />
            <button
              onClick={() => toggleDislike(video.id)}
              className={`px-3 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-r-full transition ${
                isDisliked ? 'text-red-500 font-bold' : ''
              }`}
            >
              <ThumbsDown
                className={`w-4 h-4 ${isDisliked ? 'fill-red-500' : ''}`}
              />
            </button>
          </div>

          {/* Share button */}
          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs md:text-sm font-medium transition"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>

          {/* Download button */}
          <button
            onClick={handleDownload}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs md:text-sm font-medium transition"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>

          {/* Save / Watch Later button */}
          <button
            onClick={() => toggleWatchLater(video.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs md:text-sm font-medium transition ${
              isSaved ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-zinc-800 dark:text-zinc-200'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-blue-600 dark:fill-blue-400' : ''}`} />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>

          {/* More options button */}
          <button
            onClick={() => alert('Additional options: Report, Open transcript, Lab bookmark')}
            className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Expandable Description Box */}
      <div
        onClick={() => setDescExpanded(prev => !prev)}
        className="p-3.5 rounded-2xl bg-zinc-100 dark:bg-[#272727] text-zinc-900 dark:text-zinc-100 text-xs md:text-sm cursor-pointer hover:bg-zinc-200/80 dark:hover:bg-[#323232] transition"
      >
        <div className="flex flex-wrap items-center gap-2 font-semibold mb-2">
          <span>{video.views}</span>
          <span>•</span>
          <span>{video.timestamp}</span>
          {video.tags && (
            <div className="flex gap-1.5 text-blue-600 dark:text-blue-400 font-medium">
              {video.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>

        <p
          className={`whitespace-pre-line text-zinc-700 dark:text-zinc-300 leading-relaxed ${
            descExpanded ? '' : 'line-clamp-3'
          }`}
        >
          {video.description}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setDescExpanded(prev => !prev);
          }}
          className="mt-2 text-xs font-semibold text-zinc-900 dark:text-white"
        >
          {descExpanded ? 'Show less' : '...more'}
        </button>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        video={video}
      />
    </div>
  );
}
