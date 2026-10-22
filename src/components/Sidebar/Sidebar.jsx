import {
  Home,
  Compass,
  Clock,
  ThumbsUp,
  History,
  Tv,
  Flame,
  Music2,
  Gamepad2,
  GraduationCap,
  Radio,
  BookOpen,
  ChevronRight,
  FolderGit2
} from 'lucide-react';
import { useYouTube } from '../../context/YouTubeContext';

export default function Sidebar({ onOpenLabAssistant }) {
  const {
    currentView,
    setCurrentView,
    subscriptionsList,
    subscribedChannelIds,
    watchLaterIds,
    likedVideoIds
  } = useYouTube();

  const navItemClass = (isActive) =>
    `flex items-center gap-6 px-3 py-2.5 rounded-xl font-medium text-sm transition-colors ${
      isActive
        ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold'
        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
    }`;

  return (
    <aside className="w-60 shrink-0 h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto px-3 py-2 border-r border-transparent dark:border-zinc-800/40 select-none custom-scrollbar">
      {/* Main navigation */}
      <div className="space-y-1 pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <button
          onClick={() => setCurrentView('home')}
          className={`w-full ${navItemClass(currentView === 'home')}`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setCurrentView('shorts')}
          className={`w-full ${navItemClass(currentView === 'shorts')}`}
        >
          <Compass className="w-5 h-5" />
          <span>Shorts</span>
        </button>

        <button
          onClick={() => setCurrentView('subscriptions')}
          className={`w-full ${navItemClass(currentView === 'subscriptions')}`}
        >
          <Tv className="w-5 h-5" />
          <span>Subscriptions</span>
        </button>
      </div>

      {/* You / Library section */}
      <div className="py-3 border-b border-zinc-200 dark:border-zinc-800">
        <div
          onClick={() => setCurrentView('history')}
          className="flex items-center justify-between px-3 py-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100 cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-300"
        >
          <span>You</span>
          <ChevronRight className="w-4 h-4" />
        </div>

        <div className="space-y-1 mt-1">
          <button
            onClick={() => setCurrentView('history')}
            className={`w-full ${navItemClass(currentView === 'history')}`}
          >
            <History className="w-5 h-5" />
            <span>History</span>
          </button>

          <button
            onClick={() => setCurrentView('watchLater')}
            className={`w-full ${navItemClass(currentView === 'watchLater')}`}
          >
            <Clock className="w-5 h-5" />
            <div className="flex items-center justify-between flex-1">
              <span>Watch Later</span>
              {watchLaterIds.size > 0 && (
                <span className="text-xs text-zinc-400 dark:text-zinc-500 font-normal">
                  {watchLaterIds.size}
                </span>
              )}
            </div>
          </button>

          <button
            onClick={() => setCurrentView('liked')}
            className={`w-full ${navItemClass(currentView === 'liked')}`}
          >
            <ThumbsUp className="w-5 h-5" />
            <div className="flex items-center justify-between flex-1">
              <span>Liked videos</span>
              {likedVideoIds.size > 0 && (
                <span className="text-xs text-zinc-400 dark:text-zinc-500 font-normal">
                  {likedVideoIds.size}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* University & Subscriptions */}
      <div className="py-3 border-b border-zinc-200 dark:border-zinc-800">
        <h4 className="px-3 pb-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          Subscriptions
        </h4>
        <div className="space-y-0.5">
          {subscriptionsList.map((channel) => {
            const isSubscribed = subscribedChannelIds.has(channel.id);
            if (!isSubscribed) return null;
            return (
              <div
                key={channel.id}
                onClick={() => setCurrentView('subscriptions')}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800/60 cursor-pointer transition text-zinc-700 dark:text-zinc-300"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={channel.avatar}
                    alt={channel.name}
                    className="w-6 h-6 rounded-full object-cover shrink-0"
                  />
                  <span className="truncate">{channel.name}</span>
                </div>
                {channel.hasNew && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Explore Section */}
      <div className="py-3 border-b border-zinc-200 dark:border-zinc-800">
        <h4 className="px-3 pb-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          Explore
        </h4>
        <div className="space-y-1">
          <button
            onClick={() => setCurrentView('home')}
            className={`w-full ${navItemClass(false)}`}
          >
            <Flame className="w-5 h-5" />
            <span>Trending</span>
          </button>

          <button
            onClick={() => setCurrentView('home')}
            className={`w-full ${navItemClass(false)}`}
          >
            <GraduationCap className="w-5 h-5" />
            <span>Courses & Lectures</span>
          </button>

          <button
            onClick={() => setCurrentView('home')}
            className={`w-full ${navItemClass(false)}`}
          >
            <Music2 className="w-5 h-5" />
            <span>Music & Lofi</span>
          </button>

          <button
            onClick={() => setCurrentView('home')}
            className={`w-full ${navItemClass(false)}`}
          >
            <Gamepad2 className="w-5 h-5" />
            <span>Gaming</span>
          </button>

          <button
            onClick={() => setCurrentView('home')}
            className={`w-full ${navItemClass(false)}`}
          >
            <Radio className="w-5 h-5" />
            <span>Live Streams</span>
          </button>
        </div>
      </div>

      {/* Lab Assistant University Feature */}
      <div className="py-3 border-b border-zinc-200 dark:border-zinc-800">
        <h4 className="px-3 pb-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          Lab Resources
        </h4>
        <div className="space-y-1">
          <button
            onClick={onOpenLabAssistant}
            className="w-full flex items-center gap-6 px-3 py-2.5 rounded-xl text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition"
          >
            <BookOpen className="w-5 h-5" />
            <span>Lab Assistant Guide</span>
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-6 px-3 py-2.5 rounded-xl text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition"
          >
            <FolderGit2 className="w-5 h-5" />
            <span>Lab Git Repo</span>
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 py-4 text-[11px] text-zinc-500 dark:text-zinc-400 space-y-3">
        <div className="flex flex-wrap gap-x-2 gap-y-1">
          <span>About</span>
          <span>Press</span>
          <span>Copyright</span>
          <span>Contact us</span>
          <span>Creators</span>
          <span>Advertise</span>
          <span>Developers</span>
        </div>
        <p className="text-[10px] text-zinc-400 dark:text-zinc-600">
          © 2026 YouTube Lab Edition<br />University Computer Lab Assistant
        </p>
      </div>
    </aside>
  );
}
