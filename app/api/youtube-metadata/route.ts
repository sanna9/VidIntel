import { fetchYoutubeMetadata } from "@/lib/youtube";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const metadata = await fetchYoutubeMetadata(url);
    return NextResponse.json(metadata);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}