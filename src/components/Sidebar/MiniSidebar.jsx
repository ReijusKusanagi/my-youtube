import { Home, Compass, Tv, History } from 'lucide-react';
import { useYouTube } from '../../context/YouTubeContext';

export default function MiniSidebar() {
  const { currentView, setCurrentView } = useYouTube();

  const items = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'shorts', label: 'Shorts', icon: Compass },
    { id: 'subscriptions', label: 'Subscriptions', icon: Tv },
    { id: 'history', label: 'You', icon: History }
  ];

  return (
    <aside className="w-18 shrink-0 h-[calc(100vh-3.5rem)] sticky top-14 py-2 flex flex-col items-center gap-1 select-none border-r border-transparent dark:border-zinc-800/40">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`w-16 py-3.5 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-colors ${
              isActive
                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium'
                : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </aside>
  );
}
