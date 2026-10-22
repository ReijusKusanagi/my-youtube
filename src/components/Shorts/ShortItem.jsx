import { useState, useRef } from 'react';
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Share2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Disc3
} from 'lucide-react';

export default function ShortItem({ item, isActive }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative flex items-end justify-center gap-4 w-full max-w-[420px] mx-auto py-2">
      {/* Vertical Video Card */}
      <div className="relative w-full aspect-9/16 max-h-[75vh] sm:max-h-[82vh] rounded-3xl overflow-hidden bg-black shadow-2xl">
        <video
          ref={videoRef}
          src={item.videoUrl}
          loop
          autoPlay={isActive}
          playsInline
          muted={isMuted}
          onClick={togglePlay}
          className="w-full h-full object-cover cursor-pointer"
        />

        {/* Audio / Pause Overlay Buttons */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
          <button
            onClick={togglePlay}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-xs transition"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
          </button>
          <button
            onClick={toggleMute}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-xs transition"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Bottom Info Gradient */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/90 via-black/40 to-transparent text-white z-20">
          {/* Channel info */}
          <div className="flex items-center gap-2 mb-2">
            <img
              src={item.channel.avatar}
              alt={item.channel.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-white/30"
            />
            <span className="font-semibold text-sm truncate">{item.channel.name}</span>
            <button
              onClick={() => setIsSubscribed(prev => !prev)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                isSubscribed
                  ? 'bg-white/20 text-white'
                  : 'bg-white text-black hover:bg-zinc-200'
              }`}
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>

          {/* Title */}
          <p className="text-sm font-medium line-clamp-2 leading-snug drop-shadow-xs mb-3">
            {item.title}
          </p>

          {/* Audio track info */}
          <div className="flex items-center gap-2 text-xs text-zinc-300">
            <Disc3 className="w-3.5 h-3.5 animate-spin" />
            <span className="truncate">{item.sound}</span>
          </div>
        </div>
      </div>

      {/* Floating Action Column (Right of Short) */}
      <div className="flex flex-col items-center gap-4 pb-4">
        {/* Like */}
        <button
          onClick={() => {
            setIsLiked(!isLiked);
            if (isDisliked) setIsDisliked(false);
          }}
          className="flex flex-col items-center gap-1 group"
        >
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center transition ${
              isLiked
                ? 'bg-red-600 text-white'
                : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700'
            }`}
          >
            <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-white' : ''}`} />
          </div>
          <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
            {isLiked ? 'Liked' : item.likes}
          </span>
        </button>

        {/* Dislike */}
        <button
          onClick={() => {
            setIsDisliked(!isDisliked);
            if (isLiked) setIsLiked(false);
          }}
          className="flex flex-col items-center gap-1 group"
        >
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center transition ${
              isDisliked
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700'
            }`}
          >
            <ThumbsDown className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
            Dislike
          </span>
        </button>

        {/* Comments */}
        <button
          onClick={() => alert('Short comments modal: 420 students commented!')}
          className="flex flex-col items-center gap-1 group"
        >
          <div className="w-11 h-11 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700 flex items-center justify-center transition">
            <MessageSquare className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
            {item.comments}
          </span>
        </button>

        {/* Share */}
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert('Shorts link copied to clipboard!');
          }}
          className="flex flex-col items-center gap-1 group"
        >
          <div className="w-11 h-11 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700 flex items-center justify-center transition">
            <Share2 className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
            Share
          </span>
        </button>
      </div>
    </div>
  );
}
