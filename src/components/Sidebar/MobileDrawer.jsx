import { X } from 'lucide-react';
import { useYouTube } from '../../context/YouTubeContext';
import Sidebar from './Sidebar';

export default function MobileDrawer({ onOpenLabAssistant }) {
  const { mobileDrawerOpen, setMobileDrawerOpen, goHome } = useYouTube();

  if (!mobileDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setMobileDrawerOpen(false)}
      />

      {/* Drawer content */}
      <div className="relative w-64 max-w-[80vw] h-full bg-white dark:bg-[#0f0f0f] shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
        <div className="flex items-center gap-4 px-4 h-14 border-b border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => setMobileDrawerOpen(false)}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            onClick={() => {
              goHome();
              setMobileDrawerOpen(false);
            }}
            className="flex items-center gap-1 cursor-pointer select-none"
          >
            <div className="flex items-center justify-center w-7 h-5 bg-red-600 rounded-[5px] text-white">
              <div className="w-0 h-0 border-y-[3.5px] border-y-transparent border-l-[7px] border-l-white ml-0.5" />
            </div>
            <span className="font-bold text-base tracking-tighter text-zinc-900 dark:text-white">
              YouTube
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto" onClick={() => setMobileDrawerOpen(false)}>
          <Sidebar onOpenLabAssistant={onOpenLabAssistant} />
        </div>
      </div>
    </div>
  );
}
