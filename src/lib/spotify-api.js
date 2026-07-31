// Endpoints
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=4';

// Spotify API credentials
const client_id = import.meta.env.VITE_CLIENT_ID; 
const client_secret = import.meta.env.VITE_CLIENT_SECRET; 
const refresh_token = import.meta.env.VITE_REFRESH_TOKEN; 

// Get Access Token
export const getAccessToken = async () => {
  const basic = btoa(`${client_id}:${client_secret}`);

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token || '',
    }),
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    console.error("Spotify Token Request Failed Details:", errorDetails);
    throw new Error(`Failed to get access token: ${response.statusText}`);
  }

  return response.json();
};


export async function getNowPlayingJSON() {
  const { access_token } = await getAccessToken();

  const res = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  if (res.status === 204 || res.status > 400) {
    return null; //Not playing
  }

  return res.json();
}

//(raw JSON)
export async function getRecentlyPlayedJSON() {
  const { access_token } = await getAccessToken();

  const res = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch recently played: ${res.statusText}`);
  }

  return res.json();
}