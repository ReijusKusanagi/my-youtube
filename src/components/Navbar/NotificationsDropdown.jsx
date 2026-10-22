import { CheckCheck, Settings, Bell } from 'lucide-react';
import { useYouTube } from '../../context/YouTubeContext';

export default function NotificationsDropdown({ isOpen, onClose }) {
  const { notifications, setNotifications } = useYouTube();

  if (!isOpen) return null;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 top-12 z-50 w-80 sm:w-96 rounded-2xl bg-white dark:bg-[#282828] text-zinc-900 dark:text-zinc-100 shadow-2xl border border-zinc-200 dark:border-zinc-700 py-3 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-4 pb-2 border-b border-zinc-200 dark:border-zinc-700/60">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-base">Notifications</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={markAllAsRead}
              title="Mark all as read"
              className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 transition"
            >
              <CheckCheck className="w-4 h-4" />
            </button>
            <button
              title="Notification settings"
              className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 transition"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-zinc-400">
              <Bell className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No new notifications</p>
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                className={`flex gap-3 px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition cursor-pointer ${
                  item.unread ? 'bg-zinc-50 dark:bg-zinc-800/40' : ''
                }`}
              >
                {item.unread && (
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 self-center shrink-0" />
                )}
                <img
                  src={item.thumbnail}
                  alt=""
                  className="w-16 h-10 object-cover rounded-md shrink-0 border border-zinc-200 dark:border-zinc-700"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs line-clamp-2 leading-tight font-medium text-zinc-800 dark:text-zinc-200">
                    {item.title}
                  </p>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 block">
                    {item.time}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
