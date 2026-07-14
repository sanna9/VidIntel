// app/api/videos/route.ts

import connectDB from "@/lib/mongodb";
import Video from "@/models/Video";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await req.json();
    const { title, videoType, youtubeVideoId, cloudinaryUrl, thumbnail } = body;

    await connectDB();

    const newVideo = await Video.create({
      title,
      videoType,
      youtubeVideoId,
      cloudinaryUrl,
      thumbnail,
      uploadedBy: (session.user as any).id,
    });

    return NextResponse.json({ video: newVideo });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}