import { getNowPlaying } from "@/lib/spotify";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response: any = await getNowPlaying();

    if (response.status === 204 || response.status > 400) {
      console.log("Spotify API returned non-200 status:", response.status);
      return NextResponse.json({ isPlaying: false });
    }

    const song = await response.json();
    console.log("Spotify Song Data:", song.item ? song.item.name : "No song");

    if (song.item === null) {
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

    return NextResponse.json({
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
    });
  } catch (error) {
    console.error("Spotify API Error:", error);
    return NextResponse.json({ isPlaying: false }, { status: 500 });
  }
}
