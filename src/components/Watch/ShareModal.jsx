import { useState } from 'react';
import { X, Copy, Check, MessageSquare, Send, Globe, Mail } from 'lucide-react';

export default function ShareModal({ isOpen, onClose, video }) {
  const [copied, setCopied] = useState(false);
  if (!isOpen || !video) return null;

  const currentUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    { name: 'WhatsApp', icon: MessageSquare, color: 'bg-emerald-500' },
    { name: 'Telegram', icon: Send, color: 'bg-sky-500' },
    { name: 'Email', icon: Mail, color: 'bg-amber-600' },
    { name: 'Embed Web', icon: Globe, color: 'bg-indigo-600' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg mx-4 p-6 rounded-2xl bg-white dark:bg-[#212121] text-zinc-900 dark:text-zinc-100 shadow-2xl border border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <h3 className="text-base font-semibold">Share</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Share buttons */}
        <div className="flex items-center gap-6 py-6 overflow-x-auto no-scrollbar justify-center">
          {shareOptions.map((opt) => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.name}
                onClick={() => {
                  alert(`Shared "${video.title}" via ${opt.name}!`);
                  onClose();
                }}
                className="flex flex-col items-center gap-2 group shrink-0"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${opt.color} group-hover:scale-105 transition-transform shadow-sm`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                  {opt.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* URL copy box */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700">
          <input
            type="text"
            readOnly
            value={currentUrl}
            className="flex-1 bg-transparent text-xs text-zinc-700 dark:text-zinc-300 outline-none px-2 select-all"
          />
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
