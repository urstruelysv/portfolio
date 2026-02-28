const getAccessToken = async () => {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!client_id || !client_secret || !refresh_token) {
    console.error("Missing Spotify Environment Variables:", {
      client_id: !!client_id,
      client_secret: !!client_secret,
      refresh_token: !!refresh_token,
    });
    return { error: "missing_env_vars" };
  }

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
  const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    }),
    next: {
      revalidate: 0,
    },
  });

  const data = await response.json();
  if (data.error) {
    console.error("Spotify Token Error:", data.error, data.error_description);
  }
  return data;
};

export const getNowPlaying = async () => {
  const tokenData = await getAccessToken();
  const { access_token } = tokenData;

  if (!access_token) {
    return { status: 500 };
  }

  const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";

  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    next: {
      revalidate: 0,
    },
  });

  return response;
};
