import { Upload, Radio, Edit3 } from 'lucide-react';

export default function CreateModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-12 top-12 z-50 w-56 rounded-xl bg-white dark:bg-[#282828] text-zinc-900 dark:text-zinc-100 shadow-2xl border border-zinc-200 dark:border-zinc-700 py-2 animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={() => {
            alert('Lab Demo: Video Upload modal would open here to submit university project presentations!');
            onClose();
          }}
          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition text-sm text-left font-medium"
        >
          <Upload className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
          <span>Upload video</span>
        </button>
        <button
          onClick={() => {
            alert('Lab Demo: Go live would start a university lab presentation broadcast!');
            onClose();
          }}
          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition text-sm text-left font-medium"
        >
          <Radio className="w-4 h-4 text-red-500" />
          <span>Go live</span>
        </button>
        <button
          onClick={() => {
            alert('Lab Demo: Create post for lab bulletin!');
            onClose();
          }}
          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition text-sm text-left font-medium"
        >
          <Edit3 className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
          <span>Create post</span>
        </button>
      </div>
    </>
  );
}
