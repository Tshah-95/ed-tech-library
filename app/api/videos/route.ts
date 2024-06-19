import { API_BASE_URL, USER_ID } from "@/app/lib/constants";
import validUrl from "valid-url";

export async function GET() {
  const res = await fetch(`${API_BASE_URL}/videos?user_id=${USER_ID}`);
  const data = await res.json();

  return Response.json(data?.videos);
}

export async function POST(request: Request) {
  const videoBase = await request.json();

  if (!videoBase.title || !videoBase.description || !videoBase.video_url) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!validUrl.isWebUri(videoBase.video_url))
    return Response.json({ error: "Invalid URL" }, { status: 400 });

  const video = {
    ...videoBase,
    user_id: USER_ID,
  };

  const res = await fetch(`${API_BASE_URL}/videos`, {
    method: "POST",
    body: JSON.stringify(video),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return Response.json(res);
}
