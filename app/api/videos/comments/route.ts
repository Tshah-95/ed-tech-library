import { API_BASE_URL } from "@/app/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const videoId = request.nextUrl.searchParams.get("video_id");

  // Throw a 400 if the video_id is missing
  if (!videoId) {
    return new Response(
      JSON.stringify({ message: "Missing or invalid required field" }),
      {
        status: 400,
      }
    );
  }
  const res = await fetch(
    `${API_BASE_URL}/videos/comments?video_id=${videoId}`
  );
  const data = await res.json();

  return Response.json(data?.comments);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const res = await fetch(`${API_BASE_URL}/videos/comments`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return Response.json(data);
}
