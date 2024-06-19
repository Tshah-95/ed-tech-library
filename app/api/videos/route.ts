import { API_BASE_URL, USER_ID } from "@/app/lib/constants";

export async function GET() {
  const res = await fetch(`${API_BASE_URL}/videos?user_id=${USER_ID}`);
  const data = await res.json();

  return Response.json(data?.videos);
}
