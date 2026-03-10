import { getNowPlaying } from "@/lib/spotify";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type CacheState = {
  data: ReturnType<typeof NextResponse.json> | null;
  payload: Record<string, unknown> | null;
  status: number;
  cachedAt: number;
  errorUntil: number;
  lastError?: string;
};

const globalForSpotify = globalThis as unknown as {
  __spotifyCache?: CacheState;
};

const CACHE_TTL_MS = 30_000;
const ERROR_BACKOFF_MS = 10 * 60_000;

export async function GET() {
  const now = Date.now();
  const cache = globalForSpotify.__spotifyCache;

  if (cache?.payload && now - cache.cachedAt < CACHE_TTL_MS) {
    return NextResponse.json(cache.payload);
  }

  if (cache?.errorUntil && now < cache.errorUntil) {
    return NextResponse.json({ isPlaying: false });
  }

  try {
    const response: any = await getNowPlaying();

    if (response.status === 204 || response.status > 400) {
      const errorUntil = now + ERROR_BACKOFF_MS;
      const lastError = `status_${response.status}`;
      if (!cache?.lastError || cache.lastError !== lastError) {
        console.log("Spotify API returned non-200 status:", response.status);
      }
      globalForSpotify.__spotifyCache = {
        data: null,
        payload: { isPlaying: false },
        status: response.status,
        cachedAt: now,
        errorUntil,
        lastError,
      };
      return NextResponse.json({ isPlaying: false });
    }

    const song = await response.json();

    if (song.item === null) {
      globalForSpotify.__spotifyCache = {
        data: null,
        payload: { isPlaying: false },
        status: 204,
        cachedAt: now,
        errorUntil: 0,
      };
      return NextResponse.json({ isPlaying: false });
    }

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists
      .map((_artist: { name: string }) => _artist.name)
      .join(", ");
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images[0].url;
    const songUrl = song.item.external_urls.spotify;

    const payload = {
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
    };

    globalForSpotify.__spotifyCache = {
      data: null,
      payload,
      status: 200,
      cachedAt: now,
      errorUntil: 0,
    };

    return NextResponse.json(payload);
  } catch (error) {
    console.error("Spotify API Error:", error);
    globalForSpotify.__spotifyCache = {
      data: null,
      payload: { isPlaying: false },
      status: 500,
      cachedAt: now,
      errorUntil: now + ERROR_BACKOFF_MS,
      lastError: "exception",
    };
    return NextResponse.json({ isPlaying: false }, { status: 500 });
  }
}
