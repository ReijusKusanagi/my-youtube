import { useState } from 'react';
import { YouTubeProvider, useYouTube } from './context/YouTubeContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import MiniSidebar from './components/Sidebar/MiniSidebar';
import MobileDrawer from './components/Sidebar/MobileDrawer';
import VideoGrid from './components/Feed/VideoGrid';
import WatchPage from './components/Watch/WatchPage';
import ShortsPage from './components/Shorts/ShortsPage';
import HistoryPage from './components/Library/HistoryPage';
import WatchLaterPage from './components/Library/WatchLaterPage';
import LikedVideosPage from './components/Library/LikedVideosPage';
import SubscriptionsPage from './components/Library/SubscriptionsPage';
import LabAssistantWidget from './components/LabAssistant/LabAssistantWidget';
import { GraduationCap } from 'lucide-react';

function YouTubeApp() {
  const { currentView, sidebarExpanded } = useYouTube();
  const [labAssistantOpen, setLabAssistantOpen] = useState(false);

  const openLabAssistant = () => setLabAssistantOpen(true);
  const closeLabAssistant = () => setLabAssistantOpen(false);

  // Render view based on active route state
  const renderCurrentView = () => {
    switch (currentView) {
      case 'watch':
        return <WatchPage />;
      case 'shorts':
        return <ShortsPage />;
      case 'history':
        return <HistoryPage />;
      case 'watchLater':
        return <WatchLaterPage />;
      case 'liked':
        return <LikedVideosPage />;
      case 'subscriptions':
        return <SubscriptionsPage />;
      case 'home':
      default:
        return <VideoGrid onOpenLabAssistant={openLabAssistant} />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] text-zinc-900 dark:text-zinc-100 flex flex-col font-sans transition-colors">
      {/* Top Header */}
      <Navbar onOpenLabAssistant={openLabAssistant} />

      {/* Main Content Layout */}
      <div className="flex flex-1 relative">
        {/* Responsive Desktop Sidebar: only shown on non-watch pages, or mini sidebar */}
        {currentView !== 'watch' && (
          <div className="hidden md:block shrink-0">
            {sidebarExpanded ? (
              <Sidebar onOpenLabAssistant={openLabAssistant} />
            ) : (
              <MiniSidebar />
            )}
          </div>
        )}

        {/* Mobile slide-in drawer */}
        <MobileDrawer onOpenLabAssistant={openLabAssistant} />

        {/* Dynamic View Display */}
        <main className="flex-1 min-w-0 flex flex-col">{renderCurrentView()}</main>
      </div>

      {/* Floating Lab Assistant Help Badge */}
      <button
        onClick={openLabAssistant}
        title="Open Computer Lab Assistant Guide"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        <GraduationCap className="w-4 h-4" />
        <span className="hidden sm:inline">Lab Assistant</span>
      </button>

      {/* Lab Assistant Information Modal */}
      <LabAssistantWidget isOpen={labAssistantOpen} onClose={closeLabAssistant} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <YouTubeProvider>
        <YouTubeApp />
      </YouTubeProvider>
    </ThemeProvider>
  );
}
