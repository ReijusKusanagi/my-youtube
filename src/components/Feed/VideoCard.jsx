import { useState } from 'react';
import { CheckCircle2, MoreVertical, Clock, Share2, ListPlus, Radio } from 'lucide-react';
import { useYouTube } from '../../context/YouTubeContext';

export default function VideoCard({ video }) {
  const { playVideo, watchLaterIds, toggleWatchLater } = useYouTube();
  const [showMenu, setShowMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isWatchLater = watchLaterIds.has(video.id);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowMenu(false);
  };

  return (
    <div
      className="flex flex-col gap-3 group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail Container */}
      <div
        onClick={() => playVideo(video)}
        className="relative aspect-video w-full rounded-2xl overflow-hidden bg-zinc-200 dark:bg-zinc-800"
      >
        <img
          src={video.thumbnail}
          alt={video.title}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
          loading="lazy"
        />

        {/* Video duration badge or LIVE indicator */}
        <div className="absolute bottom-2 right-2">
          {video.isLive ? (
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-bold bg-red-600 text-white tracking-wider uppercase">
              <Radio className="w-3 h-3 animate-pulse" />
              LIVE
            </span>
          ) : (
            <span className="px-1.5 py-0.5 rounded-md text-xs font-semibold bg-black/80 text-white backdrop-blur-xs">
              {video.duration}
            </span>
          )}
        </div>

        {/* Quick Watch Later button on hover */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWatchLater(video.id);
            }}
            title={isWatchLater ? 'Remove from Watch Later' : 'Watch Later'}
            className={`p-1.5 rounded-md backdrop-blur-xs shadow-md transition ${
              isWatchLater
                ? 'bg-red-600 text-white'
                : 'bg-black/70 hover:bg-black/90 text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Video Details row */}
      <div className="flex gap-3 px-1 items-start">
        {/* Channel Avatar */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            playVideo(video);
          }}
          className="shrink-0 mt-0.5"
        >
          <img
            src={video.channel.avatar}
            alt={video.channel.name}
            className="w-9 h-9 rounded-full object-cover ring-1 ring-zinc-200 dark:ring-zinc-700 hover:opacity-85 transition"
          />
        </div>

        {/* Content info */}
        <div className="flex-1 min-w-0" onClick={() => playVideo(video)}>
          <h3
            className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-snug group-hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            title={video.title}
          >
            {video.title}
          </h3>

          <div className="mt-1 flex items-center gap-1 text-xs text-zinc-600 dark:text-zinc-400">
            <span className="truncate hover:text-zinc-900 dark:hover:text-zinc-200 transition">
              {video.channel.name}
            </span>
            {video.channel.verified && (
              <CheckCircle2 className="w-3.5 h-3.5 text-zinc-500 fill-zinc-400/20 shrink-0" />
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
            <span>{video.views}</span>
            <span>•</span>
            <span>{video.timestamp}</span>
          </div>
        </div>

        {/* Three dots menu */}
        <div className="relative shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu((prev) => !prev);
            }}
            className="p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {showMenu && (
            <div
              className="absolute right-0 top-8 z-30 w-48 rounded-xl bg-white dark:bg-[#282828] text-zinc-900 dark:text-zinc-100 shadow-xl border border-zinc-200 dark:border-zinc-700 py-1 text-xs animate-in fade-in duration-100"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  toggleWatchLater(video.id);
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition text-left"
              >
                <Clock className="w-4 h-4 text-zinc-400" />
                <span>{isWatchLater ? 'Remove from Watch Later' : 'Save to Watch Later'}</span>
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Video link copied to clipboard!');
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition text-left"
              >
                <Share2 className="w-4 h-4 text-zinc-400" />
                <span>Share link</span>
              </button>
              <button
                onClick={() => {
                  alert('Added to lab student playlist!');
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition text-left"
              >
                <ListPlus className="w-4 h-4 text-zinc-400" />
                <span>Save to playlist</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
