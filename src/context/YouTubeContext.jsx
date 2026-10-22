import { createContext, useContext, useState } from 'react';
import { MOCK_VIDEOS, NOTIFICATIONS, SUBSCRIPTIONS } from '../data/mockData';

const YouTubeContext = createContext();

export const YouTubeProvider = ({ children }) => {
  const [videos, setVideos] = useState(MOCK_VIDEOS);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState("home"); // home, watch, shorts, subscriptions, history, watchLater, liked
  const [activeVideo, setActiveVideo] = useState(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [theaterMode, setTheaterMode] = useState(false);

  // User engagement collections
  const [likedVideoIds, setLikedVideoIds] = useState(new Set());
  const [dislikedVideoIds, setDislikedVideoIds] = useState(new Set());
  const [watchLaterIds, setWatchLaterIds] = useState(new Set(["v2"]));
  const [historyIds, setHistoryIds] = useState(["v1", "v3"]);
  const [subscribedChannelIds, setSubscribedChannelIds] = useState(
    new Set(["ch-cs50", "ch-fireship", "ch-mit"])
  );
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  // Play video action
  const playVideo = (video) => {
    setActiveVideo(video);
    setCurrentView("watch");
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Add to history
    setHistoryIds((prev) => {
      const filtered = prev.filter(id => id !== video.id);
      return [video.id, ...filtered];
    });
  };

  // Back to home
  const goHome = () => {
    setCurrentView("home");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle Like
  const toggleLike = (videoId) => {
    setLikedVideoIds((prev) => {
      const next = new Set(prev);
      if (next.has(videoId)) {
        next.delete(videoId);
      } else {
        next.add(videoId);
        // Remove from dislikes if present
        setDislikedVideoIds((dislikes) => {
          const nextDislikes = new Set(dislikes);
          nextDislikes.delete(videoId);
          return nextDislikes;
        });
      }
      return next;
    });
  };

  // Toggle Dislike
  const toggleDislike = (videoId) => {
    setDislikedVideoIds((prev) => {
      const next = new Set(prev);
      if (next.has(videoId)) {
        next.delete(videoId);
      } else {
        next.add(videoId);
        // Remove from likes
        setLikedVideoIds((likes) => {
          const nextLikes = new Set(likes);
          nextLikes.delete(videoId);
          return nextLikes;
        });
      }
      return next;
    });
  };

  // Toggle Watch Later
  const toggleWatchLater = (videoId) => {
    setWatchLaterIds((prev) => {
      const next = new Set(prev);
      if (next.has(videoId)) {
        next.delete(videoId);
      } else {
        next.add(videoId);
      }
      return next;
    });
  };

  // Toggle Subscribe
  const toggleSubscribe = (channelId) => {
    setSubscribedChannelIds((prev) => {
      const next = new Set(prev);
      if (next.has(channelId)) {
        next.delete(channelId);
      } else {
        next.add(channelId);
      }
      return next;
    });
  };

  // Add Comment to active video
  const addComment = (videoId, text) => {
    if (!text.trim()) return;
    const newComment = {
      id: `c_${Date.now()}`,
      author: "University Student (You)",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
      timestamp: "Just now",
      text: text.trim(),
      likes: 0,
      replies: []
    };

    setVideos((prevVideos) =>
      prevVideos.map((vid) => {
        if (vid.id === videoId) {
          return {
            ...vid,
            commentsCount: (vid.commentsCount || 0) + 1,
            comments: [newComment, ...(vid.comments || [])]
          };
        }
        return vid;
      })
    );

    // Also update activeVideo if viewing it
    if (activeVideo && activeVideo.id === videoId) {
      setActiveVideo((prev) => ({
        ...prev,
        commentsCount: (prev.commentsCount || 0) + 1,
        comments: [newComment, ...(prev.comments || [])]
      }));
    }
  };

  // Filter videos by category and search
  const filteredVideos = videos.filter((video) => {
    const matchesCategory =
      activeCategory === "All" ||
      video.category.toLowerCase() === activeCategory.toLowerCase();

    const matchesSearch =
      !searchQuery.trim() ||
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (video.tags && video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesSearch;
  });

  return (
    <YouTubeContext.Provider
      value={{
        videos,
        filteredVideos,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        currentView,
        setCurrentView,
        activeVideo,
        setActiveVideo,
        playVideo,
        goHome,
        sidebarExpanded,
        setSidebarExpanded,
        mobileDrawerOpen,
        setMobileDrawerOpen,
        theaterMode,
        setTheaterMode,
        likedVideoIds,
        toggleLike,
        dislikedVideoIds,
        toggleDislike,
        watchLaterIds,
        toggleWatchLater,
        historyIds,
        setHistoryIds,
        subscribedChannelIds,
        toggleSubscribe,
        notifications,
        setNotifications,
        addComment,
        subscriptionsList: SUBSCRIPTIONS
      }}
    >
      {children}
    </YouTubeContext.Provider>
  );
};

export const useYouTube = () => useContext(YouTubeContext);
