import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  RectangleHorizontal,
  SkipForward,
  Subtitles
} from 'lucide-react';
import { useYouTube } from '../../context/YouTubeContext';

export default function VideoPlayer({ video, onNextVideo }) {
  const { theaterMode, setTheaterMode } = useYouTube();
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [captionsEnabled, setCaptionsEnabled] = useState(false);
  const [autoplay, setAutoplay] = useState(true);

  const hideControlsTimeout = useRef(null);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
      setIsFullscreen(false);
    }
  }, []);

  const seekRelative = useCallback((seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(
        0,
        Math.min(videoRef.current.duration || 1000, videoRef.current.currentTime + seconds)
      );
    }
  }, []);

  // Auto-play when video changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [video]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts when user is typing in comments or search
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === ' ' || e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 't' || e.key === 'T') {
        setTheaterMode((prev) => !prev);
      } else if (e.key === 'ArrowRight' || e.key === 'l' || e.key === 'L') {
        seekRelative(10);
      } else if (e.key === 'ArrowLeft' || e.key === 'j' || e.key === 'J') {
        seekRelative(-10);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, toggleMute, toggleFullscreen, seekRelative, setTheaterMode]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    if (autoplay && onNextVideo) {
      onNextVideo();
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      videoRef.current.muted = newVol === 0;
      setIsMuted(newVol === 0);
    }
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSettings(false);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(hideControlsTimeout.current);
    hideControlsTimeout.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
        setShowSettings(false);
      }
    }, 2500);
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds) || timeInSeconds < 0) return '0:00';
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className={`relative group bg-black overflow-hidden select-none transition-all duration-300 ${
        theaterMode ? 'w-full aspect-21/9 max-h-[78vh]' : 'w-full aspect-video rounded-2xl'
      }`}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={video.videoUrl}
        poster={video.thumbnail}
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleVideoEnded}
        className="w-full h-full object-contain cursor-pointer"
        playsInline
      />

      {/* Simulated Captions overlay */}
      {captionsEnabled && isPlaying && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-4 py-1.5 rounded-lg bg-black/80 text-white text-sm md:text-base font-semibold text-center tracking-wide backdrop-blur-xs max-w-[80%]">
          [Instructor]: In this university computer science lecture, we review the fundamental concepts.
        </div>
      )}

      {/* Click to play overlay button if paused */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer"
          aria-label="Play video"
        >
          <Play className="w-8 h-8 fill-white ml-1" />
        </button>
      )}

      {/* Bottom Controls Bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-30 bg-linear-to-t from-black/90 via-black/50 to-transparent px-4 pb-3 pt-8 transition-opacity duration-200 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Progress Bar (Scrubber) */}
        <div
          onClick={handleSeek}
          className="relative w-full h-1.5 hover:h-2.5 bg-white/20 hover:bg-white/30 rounded-full cursor-pointer mb-3 transition-all group/scrub flex items-center"
        >
          {/* Progress fill */}
          <div
            className="h-full bg-red-600 rounded-full relative"
            style={{ width: `${progressPercent}%` }}
          >
            {/* Scrubber thumb handle */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-red-600 shadow-sm opacity-0 group-hover/scrub:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Action Controls row */}
        <div className="flex items-center justify-between text-white text-sm">
          {/* Left Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="p-1 rounded-full hover:bg-white/20 transition"
              title={isPlaying ? 'Pause (k)' : 'Play (k)'}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
            </button>

            {onNextVideo && (
              <button
                onClick={onNextVideo}
                className="p-1 rounded-full hover:bg-white/20 transition"
                title="Next video (Shift+N)"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            )}

            {/* Volume control with hover slider */}
            <div className="flex items-center gap-2 group/vol">
              <button
                onClick={toggleMute}
                className="p-1 rounded-full hover:bg-white/20 transition"
                title={isMuted ? 'Unmute (m)' : 'Mute (m)'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-14 sm:w-20 h-1 bg-white/40 accent-red-600 rounded-lg cursor-pointer transition-all"
              />
            </div>

            {/* Time display */}
            <div className="text-xs text-zinc-300 font-mono ml-1">
              <span>{formatTime(currentTime)}</span>
              <span className="mx-1">/</span>
              <span>{formatTime(duration || video.durationSec)}</span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3 relative">
            {/* Autoplay switch */}
            <button
              onClick={() => setAutoplay(prev => !prev)}
              title={`Autoplay is ${autoplay ? 'on' : 'off'}`}
              className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white"
            >
              <div
                className={`w-8 h-4 rounded-full p-0.5 transition-colors ${
                  autoplay ? 'bg-blue-600' : 'bg-zinc-600'
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full bg-white transition-transform ${
                    autoplay ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </div>
            </button>

            {/* Subtitles CC */}
            <button
              onClick={() => setCaptionsEnabled(prev => !prev)}
              title="Subtitles / closed captions (c)"
              className={`p-1 rounded-full transition ${
                captionsEnabled ? 'text-red-500' : 'text-zinc-300 hover:text-white'
              }`}
            >
              <Subtitles className="w-5 h-5" />
            </button>

            {/* Settings button & menu */}
            <div className="relative">
              <button
                onClick={() => setShowSettings(prev => !prev)}
                title="Settings"
                className="p-1 rounded-full hover:bg-white/20 transition text-zinc-300 hover:text-white"
              >
                <Settings className="w-5 h-5" />
              </button>

              {showSettings && (
                <div className="absolute right-0 bottom-10 z-50 w-44 rounded-xl bg-zinc-900/95 text-white shadow-2xl border border-zinc-700 p-2 text-xs backdrop-blur-md">
                  <p className="font-semibold px-2 py-1 text-zinc-400 uppercase tracking-wider text-[10px]">
                    Playback Speed
                  </p>
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => handleSpeedChange(spd)}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-left hover:bg-zinc-800 transition ${
                        playbackSpeed === spd ? 'text-red-400 font-bold' : 'text-zinc-200'
                      }`}
                    >
                      <span>{spd === 1 ? 'Normal (1x)' : `${spd}x`}</span>
                      {playbackSpeed === spd && <span>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theater Mode button */}
            <button
              onClick={() => setTheaterMode((prev) => !prev)}
              title="Theater mode (t)"
              className="p-1 rounded-full hover:bg-white/20 transition text-zinc-300 hover:text-white hidden sm:block"
            >
              <RectangleHorizontal className="w-5 h-5" />
            </button>

            {/* Fullscreen button */}
            <button
              onClick={toggleFullscreen}
              title="Fullscreen (f)"
              className="p-1 rounded-full hover:bg-white/20 transition text-zinc-300 hover:text-white"
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
