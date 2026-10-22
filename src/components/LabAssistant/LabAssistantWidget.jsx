import { useState } from 'react';
import {
  GraduationCap,
  X,
  CheckCircle
} from 'lucide-react';

export default function LabAssistantWidget({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen) return null;

  const features = [
    { title: 'Vite + React (JavaScript)', desc: 'Engineered entirely in Vite React 19 using clean JSX & JavaScript.' },
    { title: 'YouTube Navigation & Navbar', desc: 'Hamburger menu, red YouTube Lab logo, search bar with suggestions, voice search modal, create popup, notification drawer, and user profile.' },
    { title: 'Dynamic Sidebar System', desc: 'Three responsive modes: full expanded sidebar, mini icon sidebar, and slide-in mobile drawer.' },
    { title: 'Category Pill Filter Carousel', desc: 'Horizontally scrollable chips with smooth left/right arrow buttons for instant topic filtering.' },
    { title: 'Immersive Video Player', desc: 'Custom controls overlay with play/pause, seek scrubber, volume slider, playback speeds (0.5x-2x), captions CC toggle, theater mode, and fullscreen.' },
    { title: 'Theater Mode & Layout Switching', desc: 'Expands the player across the full top width, mirroring YouTube desktop behavior.' },
    { title: 'Interactive Comments System', desc: 'Add new comments, sort by top/newest, like comments, and write nested student replies.' },
    { title: 'Shorts Vertical Experience', desc: 'Full 9:16 vertical video player with next/prev navigation, sound badges, like counters, and share.' },
    { title: 'Library & Engagement State', desc: 'Tracks History, Watch Later, Liked Videos, and Subscribed Channels dynamically.' },
    { title: 'Dark & Light Theme Support', desc: 'YouTube signature dark theme (#0f0f0f) and clean light theme with instant toggling.' }
  ];

  const shortcuts = [
    { key: 'K or Space', desc: 'Play / Pause video' },
    { key: 'F', desc: 'Toggle Fullscreen' },
    { key: 'T', desc: 'Toggle Theater Mode' },
    { key: 'M', desc: 'Mute / Unmute audio' },
    { key: 'J / L', desc: 'Seek backward / forward 10 seconds' },
    { key: 'Arrow Right / Left', desc: 'Seek forward / backward 10 seconds' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl max-h-[88vh] rounded-3xl bg-white dark:bg-[#1f1f1f] text-zinc-900 dark:text-zinc-100 shadow-2xl border border-zinc-200 dark:border-zinc-700 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-red-600 text-white">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">University Computer Lab Assistant</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Project Demonstration & Architecture Guide
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center px-6 border-b border-zinc-200 dark:border-zinc-800 text-xs font-semibold gap-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 border-b-2 transition ${
              activeTab === 'overview'
                ? 'border-red-600 text-red-600 dark:text-red-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            Overview & Checklist
          </button>
          <button
            onClick={() => setActiveTab('shortcuts')}
            className={`py-3 border-b-2 transition ${
              activeTab === 'shortcuts'
                ? 'border-red-600 text-red-600 dark:text-red-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            Player Shortcuts
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`py-3 border-b-2 transition ${
              activeTab === 'architecture'
                ? 'border-red-600 text-red-600 dark:text-red-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            Tech Stack & Code
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-3">
                <CheckCircle className="w-5 h-5 shrink-0 text-emerald-500" />
                <span>
                  Lab Requirement Complete: Built with <strong>Vite + React (JavaScript)</strong> implementing the signature YouTube user experience.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        {feat.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'shortcuts' && (
            <div className="space-y-4">
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Enjoy authentic YouTube player keyboard controls while watching any video:
              </p>
              <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {shortcuts.map((sc, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3">
                    <span className="text-xs text-zinc-700 dark:text-zinc-300">{sc.desc}</span>
                    <kbd className="px-2.5 py-1 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-mono text-xs font-semibold shadow-xs border border-zinc-300 dark:border-zinc-700">
                      {sc.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 font-mono text-[11px] space-y-1">
                <p className="text-zinc-500">// Project File Tree</p>
                <p>src/</p>
                <p>&nbsp;&nbsp;├── context/</p>
                <p>&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── ThemeContext.jsx (Light/Dark state)</p>
                <p>&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;└── YouTubeContext.jsx (Global feed, player, library)</p>
                <p>&nbsp;&nbsp;├── components/</p>
                <p>&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── Navbar/ (Search, Voice, Notifications, Menu)</p>
                <p>&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── Sidebar/ (Expanded, Mini, Mobile Drawer)</p>
                <p>&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── Feed/ (CategoryBar, VideoGrid, VideoCard)</p>
                <p>&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── Watch/ (Player, Details, Comments, UpNext, Share)</p>
                <p>&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── Shorts/ (Vertical reel player)</p>
                <p>&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;└── Library/ (History, Watch Later, Liked, Subs)</p>
                <p>&nbsp;&nbsp;└── data/mockData.js (Rich university lectures & tech media)</p>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400">
                Created with zero TypeScript dependencies as requested (Pure JavaScript React). All styles utilize Tailwind CSS v4 utility classes.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 flex justify-between items-center text-xs">
          <span className="text-zinc-500">University Computer Lab Edition • 2026</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold hover:opacity-90 transition"
          >
            Got it, continue testing
          </button>
        </div>
      </div>
    </div>
  );
}
