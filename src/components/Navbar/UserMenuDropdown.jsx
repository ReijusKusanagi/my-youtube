import { Moon, Sun, User, Settings, LogOut, ShieldCheck, HelpCircle, Laptop } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function UserMenuDropdown({ isOpen, onClose, onOpenLabAssistant }) {
  const { isDark, toggleTheme } = useTheme();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 top-12 z-50 w-72 rounded-2xl bg-white dark:bg-[#282828] text-zinc-900 dark:text-zinc-100 shadow-2xl border border-zinc-200 dark:border-zinc-700 py-2 animate-in fade-in zoom-in-95 duration-150">
        {/* User profile header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-200 dark:border-zinc-700/60">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"
            alt="User avatar"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-red-500"
          />
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-sm truncate">CS Lab Student 2026</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">@student_cs_lab</p>
            <span className="inline-block mt-1 px-1.5 py-0.5 text-[10px] font-semibold bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300 rounded">
              University Lab User
            </span>
          </div>
        </div>

        <div className="py-2 text-sm border-b border-zinc-200 dark:border-zinc-700/60">
          <button
            onClick={() => {
              toggleTheme();
            }}
            className="w-full flex items-center justify-between px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition text-left"
          >
            <div className="flex items-center gap-3">
              {isDark ? <Moon className="w-4 h-4 text-zinc-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
              <span>Appearance: {isDark ? 'Dark mode' : 'Light mode'}</span>
            </div>
            <span className="text-xs font-semibold text-zinc-400">Toggle</span>
          </button>

          <button
            onClick={() => {
              onClose();
              if (onOpenLabAssistant) onOpenLabAssistant();
            }}
            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition text-left text-blue-600 dark:text-blue-400 font-medium"
          >
            <Laptop className="w-4 h-4" />
            <span>Lab Assistant Guide</span>
          </button>
        </div>

        <div className="py-2 text-sm border-b border-zinc-200 dark:border-zinc-700/60">
          <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition text-left">
            <User className="w-4 h-4 text-zinc-400" />
            <span>Your channel</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition text-left">
            <ShieldCheck className="w-4 h-4 text-zinc-400" />
            <span>Lab Academic Integrity</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition text-left">
            <Settings className="w-4 h-4 text-zinc-400" />
            <span>Settings</span>
          </button>
        </div>

        <div className="pt-2 text-sm">
          <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition text-left text-zinc-500 dark:text-zinc-400">
            <HelpCircle className="w-4 h-4" />
            <span>Help & Feedback</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition text-left text-red-600 dark:text-red-400">
            <LogOut className="w-4 h-4" />
            <span>Sign out (Simulated)</span>
          </button>
        </div>
      </div>
    </>
  );
}
