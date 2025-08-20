import { useEffect, useState } from "react";
import { getNowPlayingJSON, getRecentlyPlayedJSON } from "../lib/spotify_api";
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
    <div className="border border-green-950 w-full max-w-full overflow-hidden dark:bg-gray-800 p-3 sm:p-4 md:p-6 text-xs sm:text-sm rounded-xl cursor-auto">
      <h2 className="text-2xl mb-3 flex justify-between items-center">
        <span className="text-green-950">Music</span>
        <img
          src="/spotify.png"
          alt="Spotify"
          className="w-6 sm:w-8 md:w-10 lg:w-12 h-auto object-contain"
        />
      </h2>

      {/* Now Playing */}
      {isPlaying && nowPlaying?.item ? (
        <div className="mb-4 flex items-center gap-3 rounded-2xl transition-all duration-300 ">
          <img
            src={nowPlaying.item?.album?.images?.[0]?.url}
            alt="Album cover"
            className="w-[108px] h-[108px] object-cover rounded-lg"
          />
          <div className="rounded-2xl">
            <p className="text-sm text-green-500 font-medium mb-1 ">
              Now Playing:
            </p>
            <p className="font-semibold">{nowPlaying.item?.name}</p>
            <p className="text-sm">
              {nowPlaying.item?.artists?.map((a) => a.name).join(", ")}
            </p>
          </div>
        </div>
      ) : (
        <p className="mb-4">Not currently listening</p>
      )}

      {/* Recently Played Toggle */}
      {recentlyPlayed.length > 0 && (
        <div>
          <button
            onClick={() => setShowRecentlyPlayed(!showRecentlyPlayed)}
            className=" text-md  cursor-pointer font-semibold hover:text-green-500 transition-all duration-300 pb-2 rounded-3xl"
          >
            {showRecentlyPlayed ? "Hide Recently Played" : "Show Recently Played"}
          </button>

          <div
            className={`transition-all duration-500 overflow-hidden ${
              showRecentlyPlayed ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="space-y-2 mt-2">
              {recentlyPlayed.map((track, index) => (
                <li key={index} className="flex items-center gap-3">
                  <img
                    src={track.track?.album?.images?.[0]?.url}
                    alt="Album cover"
                    className="w-[72px] h-[72px] object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-semibold">{track.track?.name}</p>
                    <p className="text-sm">
                      {track.track?.artists?.map((a) => a.name).join(", ")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
