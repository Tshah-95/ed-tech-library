import { API_BASE_URL } from "@/app/lib/constants";

export async function GET() {
  const res = await fetch(`${API_BASE_URL}/videos?user_id=123`);
  const data = await res.json();

  return Response.json(data?.videos);
}
