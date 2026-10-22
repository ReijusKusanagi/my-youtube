import { useState } from 'react';
import { ThumbsUp, ThumbsDown, ArrowUpDown } from 'lucide-react';
import { useYouTube } from '../../context/YouTubeContext';

export default function CommentsSection({ video }) {
  const { addComment } = useYouTube();
  const [commentText, setCommentText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [sortBy, setSortBy] = useState('top'); // 'top' or 'newest'
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [likedCommentIds, setLikedCommentIds] = useState(new Set());

  const comments = video.comments || [];

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(video.id, commentText);
    setCommentText('');
    setIsFocused(false);
  };

  const toggleCommentLike = (commentId) => {
    setLikedCommentIds((prev) => {
      const next = new Set(prev);
      if (next.has(commentId)) {
        next.delete(commentId);
      } else {
        next.add(commentId);
      }
      return next;
    });
  };

  const handleReplySubmit = (_commentId) => {
    if (!replyText.trim()) return;
    alert(`Replied: "${replyText}" to student discussion!`);
    setReplyingTo(null);
    setReplyText('');
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === 'newest') return -1;
    return (b.likes || 0) - (a.likes || 0);
  });

  return (
    <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
      {/* Header: Count & Sort */}
      <div className="flex items-center gap-6 mb-6">
        <h3 className="text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {(video.commentsCount || comments.length).toLocaleString()} Comments
        </h3>

        {/* Sort dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowSortMenu(prev => !prev)}
            className="flex items-center gap-2 text-xs md:text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white"
          >
            <ArrowUpDown className="w-4 h-4" />
            <span>Sort by</span>
          </button>

          {showSortMenu && (
            <div className="absolute left-0 top-8 z-30 w-40 rounded-xl bg-white dark:bg-[#282828] text-zinc-900 dark:text-zinc-100 shadow-xl border border-zinc-200 dark:border-zinc-700 py-1 text-xs">
              <button
                onClick={() => {
                  setSortBy('top');
                  setShowSortMenu(false);
                }}
                className={`w-full text-left px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 ${
                  sortBy === 'top' ? 'font-bold text-blue-600 dark:text-blue-400' : ''
                }`}
              >
                Top comments
              </button>
              <button
                onClick={() => {
                  setSortBy('newest');
                  setShowSortMenu(false);
                }}
                className={`w-full text-left px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 ${
                  sortBy === 'newest' ? 'font-bold text-blue-600 dark:text-blue-400' : ''
                }`}
              >
                Newest first
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add a Comment Input Box */}
      <form onSubmit={handleCommentSubmit} className="flex gap-4 mb-8">
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80"
          alt="User avatar"
          className="w-10 h-10 rounded-full object-cover shrink-0 mt-0.5 ring-1 ring-zinc-300 dark:ring-zinc-700"
        />
        <div className="flex-1">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Add a comment..."
            className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 pb-1.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-colors"
          />

          {isFocused && (
            <div className="flex items-center justify-end gap-2 mt-3 animate-in fade-in duration-100">
              <button
                type="button"
                onClick={() => {
                  setIsFocused(false);
                  setCommentText('');
                }}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!commentText.trim()}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                  commentText.trim()
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                    : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed'
                }`}
              >
                Comment
              </button>
            </div>
          )}
        </div>
      </form>

      {/* Comment List */}
      <div className="space-y-6">
        {sortedComments.map((comment) => {
          const isLiked = likedCommentIds.has(comment.id);
          const likeCount = (comment.likes || 0) + (isLiked ? 1 : 0);

          return (
            <div key={comment.id} className="flex gap-3 text-xs md:text-sm">
              <img
                src={comment.avatar}
                alt={comment.author}
                className="w-9 h-9 rounded-full object-cover shrink-0 mt-0.5 ring-1 ring-zinc-300 dark:ring-zinc-700"
              />
              <div className="flex-1 min-w-0">
                {/* Author & Timestamp */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {comment.author}
                  </span>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    {comment.timestamp}
                  </span>
                </div>

                {/* Comment Text */}
                <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed break-words whitespace-pre-wrap">
                  {comment.text}
                </p>

                {/* Like / Dislike / Reply Row */}
                <div className="flex items-center gap-3 mt-2 text-zinc-600 dark:text-zinc-400">
                  <button
                    onClick={() => toggleCommentLike(comment.id)}
                    className={`flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition ${
                      isLiked ? 'text-blue-600 dark:text-blue-400 font-bold' : ''
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-blue-600 dark:fill-blue-400' : ''}`} />
                    {likeCount > 0 && <span className="text-xs">{likeCount}</span>}
                  </button>

                  <button className="hover:text-red-500 transition">
                    <ThumbsDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() =>
                      setReplyingTo(replyingTo === comment.id ? null : comment.id)
                    }
                    className="font-semibold text-xs hover:text-zinc-900 dark:hover:text-white transition px-2 py-0.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    Reply
                  </button>
                </div>

                {/* Inline Reply Input */}
                {replyingTo === comment.id && (
                  <div className="mt-3 pl-2 border-l-2 border-blue-500 flex gap-2">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={`Reply to ${comment.author}...`}
                      autoFocus
                      className="flex-1 bg-zinc-100 dark:bg-zinc-800 text-xs px-3 py-1.5 rounded-lg text-zinc-900 dark:text-zinc-100 outline-none"
                    />
                    <button
                      onClick={() => handleReplySubmit(comment.id)}
                      disabled={!replyText.trim()}
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                    >
                      Reply
                    </button>
                  </div>
                )}

                {/* Nested Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-3 pl-4 border-l-2 border-zinc-200 dark:border-zinc-800 space-y-3">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-2.5">
                        <img
                          src={reply.avatar}
                          alt={reply.author}
                          className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-semibold text-xs text-zinc-900 dark:text-zinc-100">
                              {reply.author}
                            </span>
                            <span className="text-[10px] text-zinc-500">
                              {reply.timestamp}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-800 dark:text-zinc-200">
                            {reply.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
