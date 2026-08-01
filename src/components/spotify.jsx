import { useEffect, useState } from "react";
import { getNowPlayingJSON, getRecentlyPlayedJSON } from "../lib/spotify-api";
import './spotify.css';

export default function Spotify() {
  const [nowPlaying, setNowPlaying] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [showRecentlyPlayed, setShowRecentlyPlayed] = useState(false);

  useEffect(() => {
    let intervalId;

    async function fetchData() {
      try {
        const nowPlayingData = await getNowPlayingJSON();
        setNowPlaying(nowPlayingData);

        const recentlyPlayedData = await getRecentlyPlayedJSON();
        setRecentlyPlayed(recentlyPlayedData.items || []);
      } catch (error) {
        console.error("Error fetching Spotify data:", error);
      }
    }

    fetchData();
    intervalId = setInterval(fetchData, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const isPlaying = nowPlaying && nowPlaying.is_playing;

  return (
    <div 
      className={`border border-green-950 w-full flex flex-col justify-between overflow-hidden py-3.5 px-4 sm:px-5 text-xs sm:text-sm rounded-2xl cursor-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        showRecentlyPlayed ? "md:h-full" : "h-auto"
      }`}
    >
      <div>
        {/* Header - Aligned cleanly with Skills Title */}
        <div className="relative mb-5 flex items-center justify-center">
          <h2 className="text-2xl text-center text-green-950 font-normal">Music</h2>
          <img
            src="/spotify.png"
            alt="Spotify"
            className="w-8 sm:w-10 md:w-7 h-auto object-contain absolute right-0 top-0"
          />
        </div>

        {/* Now Playing or Idle State */}
        {isPlaying && nowPlaying?.item ? (
          <div className="mb-3 flex items-center gap-3">
            <img
              src={nowPlaying.item?.album?.images?.[0]?.url}
              alt="Album cover"
              className="w-[80px] h-[80px] object-cover rounded-xl flex-shrink-0 shadow-sm"
            />
            <div className="min-w-0">
              <p className="text-xs text-green-800 dark:text-green-400 font-normal mb-2">
                Now Playing:
              </p>
              <p className="font-semibold text-sm truncate">{nowPlaying.item?.name}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                {nowPlaying.item?.artists?.map((a) => a.name).join(", ")}
              </p>
            </div>
          </div>
        ) : (
          <div className="mb-3 mt-3 py-3 flex flex-col items-center justify-center border border-dashed border-green-950/20 rounded-xl bg-green-950/5">
            <p className="text-xs font-medium text-green-950/70 tracking-wide uppercase">
              Offline • Not Playing
            </p>
          </div>
        )}

        {/* Toggle Button */}
        {recentlyPlayed.length > 0 && (
          <button
            onClick={() => setShowRecentlyPlayed(!showRecentlyPlayed)}
            className="text-xs cursor-pointer font-semibold text-left text-green-950 hover:text-green-600 transition-colors py-1 flex items-center gap-1"
          >
            <span>{showRecentlyPlayed ? "Hide Recently Played" : "Show Recently Played"}</span>
          </button>
        )}

        {/* CSS Grid Hardware-Accelerated Accordion */}
        <div 
          className={`grid transition-[grid-template-rows,opacity] duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            showRecentlyPlayed ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <ul className="space-y-2.5 pt-2 pb-0">
              {recentlyPlayed.slice(0, 4).map((track, index) => (
                <li 
                  key={index} 
                  className="flex items-center gap-4 p-1 rounded-lg transition-colors"
                >
                  <img
                    src={track.track?.album?.images?.[0]?.url}
                    alt="Album cover"
                    className="w-[55px] h-[55px] object-cover rounded-lg flex-shrink-0 "
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-xs truncate">{track.track?.name}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {track.track?.artists?.map((a) => a.name).join(", ")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}