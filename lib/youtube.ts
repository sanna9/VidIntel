// to extracts the video ID from any Youtube url format
export function getYoutubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&]+)/,   // youtube.com/watch?v=XXXX
    /(?:youtu\.be\/)([^?]+)/,                 // youtu.be/XXXX
    /(?:youtube\.com\/shorts\/)([^?]+)/,      // youtube.com/shorts/XXXX
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Fetches title n thumbnail using Youtube free oEmbed endpoint (no API key required)
export async function fetchYoutubeMetadata(url: string) {
  const videoId = getYoutubeVideoId(url);

  if (!videoId) {
    throw new Error("Invalid YouTube URL");
  }

  const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;

  const res = await fetch(oembedUrl);

  if (!res.ok) {
    throw new Error("Failed to fetch Youtube metadata");
  }

  const data = await res.json();

  return {
    videoId,
    title: data.title,
    thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    author: data.author_name,
  };
}