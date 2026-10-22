import { useState, useRef, useEffect } from 'react';
import { Menu, Search, Mic, Video, Bell, X, ArrowLeft } from 'lucide-react';
import { useYouTube } from '../../context/YouTubeContext';
import { SEARCH_SUGGESTIONS } from '../../data/mockData';
import VoiceSearchModal from './VoiceSearchModal';
import NotificationsDropdown from './NotificationsDropdown';
import UserMenuDropdown from './UserMenuDropdown';
import CreateModal from './CreateModal';

export default function Navbar({ onOpenLabAssistant }) {
  const {
    searchQuery,
    setSearchQuery,
    setSidebarExpanded,
    setMobileDrawerOpen,
    goHome,
    notifications
  } = useYouTube();

  const [inputVal, setInputVal] = useState(searchQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [mobileSearchActive, setMobileSearchActive] = useState(false);

  const searchBoxRef = useRef(null);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setSearchQuery(inputVal);
    setShowSuggestions(false);
    setMobileSearchActive(false);
  };

  const handleSelectSuggestion = (suggestion) => {
    setInputVal(suggestion);
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    setMobileSearchActive(false);
  };

  const clearSearch = () => {
    setInputVal('');
    setSearchQuery('');
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSuggestions = SEARCH_SUGGESTIONS.filter((s) =>
    s.toLowerCase().includes(inputVal.toLowerCase())
  );

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-3 md:px-5 h-14 bg-white dark:bg-[#0f0f0f] border-b border-zinc-200/80 dark:border-zinc-800 transition-colors">
      {/* Mobile Search Overlay */}
      {mobileSearchActive ? (
        <div className="flex items-center w-full gap-2 py-1">
          <button
            onClick={() => setMobileSearchActive(false)}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <ArrowLeft className="w-5 h-5 text-zinc-700 dark:text-zinc-200" />
          </button>
          <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center">
            <div className="flex items-center w-full bg-zinc-100 dark:bg-zinc-800 rounded-full px-3 py-1.5 border border-zinc-300 dark:border-zinc-700 focus-within:border-blue-500">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Search LabTube"
                autoFocus
                className="w-full bg-transparent text-sm text-zinc-900 dark:text-zinc-100 outline-none"
              />
              {inputVal && (
                <button type="button" onClick={clearSearch} className="p-1">
                  <X className="w-4 h-4 text-zinc-500" />
                </button>
              )}
            </div>
          </form>
          <button
            onClick={() => setShowVoiceModal(true)}
            className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200"
          >
            <Mic className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <>
          {/* Left section: Hamburger & YouTube Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                // On mobile toggle drawer, on desktop toggle expanded mode
                if (window.innerWidth < 1024) {
                  setMobileDrawerOpen(prev => !prev);
                } else {
                  setSidebarExpanded(prev => !prev);
                }
              }}
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 transition"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* YouTube Logo */}
            <div
              onClick={goHome}
              className="flex items-center gap-1 cursor-pointer select-none group"
              title="YouTube Lab Edition"
            >
              <div className="relative flex items-center justify-center w-8 h-6 bg-red-600 rounded-[7px] text-white shadow-xs group-hover:scale-105 transition-transform">
                <div className="w-0 h-0 border-y-[4px] border-y-transparent border-l-[8px] border-l-white ml-0.5" />
              </div>
              <div className="flex items-baseline">
                <span className="font-bold text-lg tracking-tighter text-zinc-900 dark:text-white font-sans">
                  YouTube
                </span>
                <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 ml-1 uppercase tracking-tight">
                  LAB
                </span>
              </div>
            </div>
          </div>

          {/* Middle section: Search Box & Voice Search */}
          <div ref={searchBoxRef} className="hidden sm:flex items-center flex-1 max-w-xl mx-4 relative">
            <form onSubmit={handleSearchSubmit} className="flex items-center w-full">
              <div className="flex items-center flex-1 h-10 px-4 bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-l-full focus-within:border-blue-500 focus-within:shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] transition-colors">
                <Search className="w-4 h-4 text-zinc-400 mr-2 shrink-0 hidden md:block" />
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => {
                    setInputVal(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Search"
                  className="w-full bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 outline-none"
                />
                {inputVal && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="p-1 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                title="Search"
                className="flex items-center justify-center w-16 h-10 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-l-0 border-zinc-300 dark:border-zinc-700 rounded-r-full transition"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Voice Search Button */}
            <button
              onClick={() => setShowVoiceModal(true)}
              title="Search with your voice"
              className="ml-3 p-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition shrink-0"
            >
              <Mic className="w-4 h-4" />
            </button>

            {/* Suggestions Dropdown */}
            {showSuggestions && (
              <div className="absolute top-11 left-0 right-14 z-50 bg-white dark:bg-[#212121] text-zinc-900 dark:text-zinc-100 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-700 py-2 overflow-hidden">
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectSuggestion(item)}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700/60 text-left text-sm font-medium"
                    >
                      <Search className="w-4 h-4 text-zinc-400 shrink-0" />
                      <span className="truncate">{item}</span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-2 text-xs text-zinc-400">
                    Press Enter to search &quot;{inputVal}&quot;
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right section: Create, Notifications, Profile */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Mobile search trigger */}
            <button
              onClick={() => setMobileSearchActive(true)}
              className="sm:hidden p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Create Button with modal */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowCreateMenu(prev => !prev);
                  setShowNotifications(false);
                  setShowUserMenu(false);
                }}
                title="Create"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition font-medium text-xs sm:text-sm"
              >
                <Video className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                <span className="hidden sm:inline">Create</span>
              </button>
              <CreateModal isOpen={showCreateMenu} onClose={() => setShowCreateMenu(false)} />
            </div>

            {/* Notifications Button */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(prev => !prev);
                  setShowCreateMenu(false);
                  setShowUserMenu(false);
                }}
                title="Notifications"
                className="relative p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 transition"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-red-600 text-white text-[10px] font-bold ring-2 ring-white dark:ring-[#0f0f0f]">
                    {unreadCount}
                  </span>
                )}
              </button>
              <NotificationsDropdown
                isOpen={showNotifications}
                onClose={() => setShowNotifications(false)}
              />
            </div>

            {/* User Profile Avatar with dropdown */}
            <div className="relative ml-1">
              <button
                onClick={() => {
                  setShowUserMenu(prev => !prev);
                  setShowNotifications(false);
                  setShowCreateMenu(false);
                }}
                className="rounded-full overflow-hidden focus:outline-none ring-2 ring-transparent focus:ring-blue-500 transition"
              >
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80"
                  alt="Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </button>
              <UserMenuDropdown
                isOpen={showUserMenu}
                onClose={() => setShowUserMenu(false)}
                onOpenLabAssistant={onOpenLabAssistant}
              />
            </div>
          </div>
        </>
      )}

      {/* Voice Search Modal */}
      <VoiceSearchModal isOpen={showVoiceModal} onClose={() => setShowVoiceModal(false)} />
    </header>
  );
}
