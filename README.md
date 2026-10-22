# YouTube UI Web Application (University Computer Lab Edition)

> Built with **Vite**, **React 19**, and **JavaScript** (Tailwind CSS v4 & Lucide Icons).  
> Designed as an authentic, high-fidelity reproduction of the modern YouTube web user experience.

---

## 🎓 University Lab Assistant Overview

This project was built for university computer lab evaluation and demonstration. It fulfills all requirements for a modern **Vite + React (JavaScript)** implementation reproducing the genuine feel, layout, and interactive features of YouTube.

### ✨ Key Features Implemented

1. **Header & Navigation (YouTube Navbar)**:
   - Hamburger menu button (toggles full expanded sidebar, mini sidebar, and mobile drawer).
   - Brand YouTube red play badge with `YouTube LAB` typography.
   - Omnipresent Search bar with real-time suggestion dropdown and clear (`X`) button.
   - Interactive **Voice Search Modal** with Web Speech API integration and simulated lab recognition fallback.
   - `+ Create` dropdown menu (Upload video, Go live, Create post).
   - Interactive **Notifications Drawer** with unread count badge and "Mark all as read".
   - **User Profile Menu** with student credentials, appearance toggle, and Lab Guide shortcut.

2. **Responsive Sidebar System**:
   - **Desktop Expanded**: Home, Shorts, Subscriptions, You (History, Watch Later, Liked), Subscriptions channel list with live indicators, Explore channels, and Lab resources.
   - **Desktop Mini Sidebar**: Compact icon layout (Home, Shorts, Subscriptions, You) when collapsed or on medium screens.
   - **Mobile Drawer**: Slide-out drawer with backdrop blur on smaller viewport sizes.

3. **Feed & Exploration**:
   - **Horizontally Scrollable Category Pills**: Smooth left and right arrow buttons ("All", "Computer Science", "JavaScript", "React", "Algorithms", "AI", "Podcasts", "Music", etc.) with active pill states.
   - **Responsive Video Grid**: 1 column on mobile, 2 on tablet, 3-4 on desktop.
   - **Video Cards**: High quality thumbnails, duration badge (`2:41:18` or animated `LIVE`), hover zoom preview, channel avatars, verified badges, views & upload times, and quick context menu (Save to Watch Later, Share, Playlist).

4. **Watch Page & Immersive Video Player**:
   - Fully functioning HTML5 video player with actual streaming educational media.
   - **Custom Controls Overlay**:
     - Play / Pause (click anywhere on video or bottom control button)
     - Progress scrubber bar with red progress track and hover thumb
     - Volume slider & instant mute toggle
     - Time elapsed / total duration display
     - Autoplay toggle switch
     - Subtitles / Closed Captions (`[CC]`) simulation
     - Playback speed adjustment selector (`0.5x`, `0.75x`, `1x`, `1.25x`, `1.5x`, `2x`)
     - **Theater Mode toggle**: Expands player across top screen width like real YouTube desktop.
     - Fullscreen toggle.
   - **Engagement & Metadata**:
     - Title and verified channel banner with live Subscriber toggle.
     - Like / Dislike counter pill with dynamic interactive count.
     - Share modal with link copy and social buttons.
     - Offline download simulation.
     - Expandable description box with hashtag links and Show More/Less toggle.
   - **Interactive Comments Section**:
     - Live comment count.
     - Sort by "Top comments" or "Newest first".
     - Real-time comment submission form with current user avatar.
     - Comment like button counters and nested reply form.
   - **Up Next / Related Videos**:
     - Right sidebar with topic chips and compact video cards. Clicking any related video seamlessly plays that video.

5. **Shorts View**:
   - Vertical 9:16 mobile-first short video reel.
   - Up and Down navigation controls to cycle through shorts.
   - Right action column: Like count, Dislike, Comments count, Share, and spinning audio disc badge.

6. **Library Views**:
   - **Watch History**: Chronological log of watched videos with one-click "Clear History".
   - **Watch Later**: Saved videos queue with "Play all" and remove options.
   - **Liked Videos**: Curated playlist of thumbed-up videos.
   - **Subscriptions**: Channel avatar carousel with latest upload feeds.

7. **Themes**:
   - Default YouTube **Dark Theme** (`#0f0f0f` background with `#272727` cards).
   - Clean YouTube **Light Theme** (`#ffffff` background).
   - Theme preference persists in `localStorage`.

8. **Keyboard Shortcuts**:
   - `K` or `Space`: Play / Pause
   - `F`: Fullscreen toggle
   - `T`: Theater Mode toggle
   - `M`: Mute / Unmute
   - `J` / `L` or `Left / Right Arrow`: Seek 10s backward / forward

---

## 🚀 How to Run the Application

In this directory (`CRUZJ-API`), execute:

```powershell
# Start Vite development server
npm.cmd run dev
```

Open the displayed localhost URL (typically `http://localhost:5173`) in any modern browser.

To produce a production build:
```powershell
npm.cmd run build
```

---

## 📂 Project Architecture

```
CRUZJ-API/
├── index.html                           # App shell with YouTube Lab favicon & fonts
├── package.json                         # Dependencies (React 19, Vite, Lucide, Tailwind v4)
├── vite.config.js                       # Vite configuration with React & Tailwind plugins
├── src/
│   ├── main.jsx                         # React root entry point
│   ├── App.jsx                          # Root layout, dynamic route switching & Lab Assistant
│   ├── index.css                        # Tailwind CSS v4 & YouTube custom scrollbars
│   ├── context/
│   │   ├── ThemeContext.jsx             # Dark / Light mode provider & hook
│   │   └── YouTubeContext.jsx           # Global state (Player, Feed, Filter, Library)
│   ├── data/
│   │   └── mockData.js                  # Realistic CS lectures, tech tutorials & shorts
│   └── components/
│       ├── Navbar/
│       │   ├── Navbar.jsx               # Header with search, voice, actions
│       │   ├── VoiceSearchModal.jsx     # Speech recognition & mic modal
│       │   ├── NotificationsDropdown.jsx# Notification drawer
│       │   ├── UserMenuDropdown.jsx     # Profile & settings menu
│       │   └── CreateModal.jsx          # Upload / Live creation popup
│       ├── Sidebar/
│       │   ├── Sidebar.jsx              # Full expanded desktop sidebar
│       │   ├── MiniSidebar.jsx          # Collapsed desktop sidebar
│       │   └── MobileDrawer.jsx         # Mobile slide-out drawer
│       ├── Feed/
│       │   ├── CategoryBar.jsx          # Horizontally scrollable chips
│       │   ├── VideoCard.jsx            # YouTube video card with preview & menu
│       │   └── VideoGrid.jsx            # Main feed & Lab announcement banner
│       ├── Watch/
│       │   ├── WatchPage.jsx            # Two-column & Theater mode watch view
│       │   ├── VideoPlayer.jsx          # Custom video player with YouTube controls
│       │   ├── VideoDetails.jsx         # Channel subscribe, likes, description
│       │   ├── CommentsSection.jsx      # Interactive comments & replies
│       │   ├── RelatedVideos.jsx        # Up next compact cards
│       │   └── ShareModal.jsx           # Share modal with clipboard copy
│       ├── Shorts/
│       │   ├── ShortsPage.jsx           # Vertical Shorts feed with navigation
│       │   └── ShortItem.jsx            # Vertical 9:16 card with engagement actions
│       ├── Library/
│       │   ├── HistoryPage.jsx          # Watch history view
│       │   ├── WatchLaterPage.jsx       # Saved videos view
│       │   ├── LikedVideosPage.jsx      # Liked videos playlist
│       │   └── SubscriptionsPage.jsx    # Subscriptions feed
│       └── LabAssistant/
│           └── LabAssistantWidget.jsx   # Interactive University Lab Assistant Guide & Rubric
```
