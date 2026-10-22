import { Tv } from 'lucide-react';
import { useYouTube } from '../../context/YouTubeContext';
import VideoCard from '../Feed/VideoCard';

export default function SubscriptionsPage() {
  const { subscribedChannelIds, subscriptionsList, toggleSubscribe, videos } = useYouTube();

  const subscribedVideos = videos.filter((v) =>
    subscribedChannelIds.has(v.channel.id)
  );

  return (
    <div className="flex-1 max-w-[1600px] mx-auto px-4 md:px-8 py-6 text-zinc-900 dark:text-zinc-100">
      <div className="pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-2xl font-bold mb-4">Subscriptions</h1>

        {/* Channel Avatars Carousel */}
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-2">
          {subscriptionsList.map((channel) => {
            const isSubscribed = subscribedChannelIds.has(channel.id);
            return (
              <div
                key={channel.id}
                onClick={() => toggleSubscribe(channel.id)}
                className="flex flex-col items-center gap-2 group cursor-pointer shrink-0"
              >
                <div className="relative">
                  <img
                    src={channel.avatar}
                    alt={channel.name}
                    className={`w-16 h-16 rounded-full object-cover transition-transform group-hover:scale-105 ${
                      isSubscribed ? 'ring-2 ring-red-600' : 'opacity-40 grayscale'
                    }`}
                  />
                  {channel.hasNew && isSubscribed && (
                    <span className="absolute bottom-0 right-1 w-3.5 h-3.5 rounded-full bg-blue-600 ring-2 ring-white dark:ring-[#0f0f0f]" />
                  )}
                </div>
                <span className="text-xs font-semibold text-center max-w-[80px] truncate">
                  {channel.name}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    isSubscribed
                      ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                      : 'bg-red-600 text-white'
                  }`}
                >
                  {isSubscribed ? 'Subscribed' : 'Subscribe'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Latest from Subscriptions */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">Latest Videos</h2>
        {subscribedVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
            {subscribedVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-zinc-400">
            <Tv className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-base font-medium">No channels currently subscribed</p>
            <p className="text-xs mt-1">Tap subscribe on any channel above to get their latest uploads here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
