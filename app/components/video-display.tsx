import useSWR from "swr";
import { fetcher } from "../lib/request";
import { API_BASE_URL } from "../lib/constants";

export default function VideoDisplay() {
  const { data } = useSWR(`${API_BASE_URL}/videos?user_id=123`, fetcher);

  console.log(data);

  return (
    <div className="w-full p-6 md:p-12 bg-slate-200 bg-opacity-40 h-[600px]" />
  );
}
