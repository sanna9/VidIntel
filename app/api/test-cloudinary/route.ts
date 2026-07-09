import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const result = await cloudinary.api.ping();
        return NextResponse.json({ message: "Cloudinary connected!", result });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}