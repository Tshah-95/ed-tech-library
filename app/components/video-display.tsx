"use client";

import useSWR from "swr";
import { fetcher } from "../lib/request";
import Search from "./search";
import { memo, useMemo, useState } from "react";
import { initialState, variants } from "../lib/animations";
import { motion } from "framer-motion";
import { areSimilar } from "../lib/strings";
import ReactPlayer from "react-player";
import validUrl from "valid-url";
import {
  ChatBubbleLeftRightIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { CommentModal } from "./comment-modal";

const MenuItem = ({
  icon,
  label,
  subtext,
}: {
  icon: React.ReactNode;
  label: string;
  subtext?: string;
}) => (
  <>
    <div className="rounded-full text-slate-200 hover:text-brand-black hover:bg-slate-200 p-1">
      {icon}
    </div>
    <p className="text-xs text-slate-200 font-bold">
      {label}
      {subtext && ` (${subtext})`}
    </p>
  </>
);

// Memoize the VideoDisplay component to prevent unnecessary re-renders
// when the branding assets animate on an interval
const VideoDisplay = memo(function VidDisplay() {
  const { data } = useSWR<video[] | null>(`/api/videos`, fetcher);
  const [search, setSearch] = useState("");

  // Filter the data based on if the title or description is similar to the search query
  const filteredData = data?.filter(
    (video) =>
      validUrl.isWebUri(video.video_url) &&
      (areSimilar(video.title, search) || areSimilar(video.description, search))
  );

  return (
    <motion.div
      initial={initialState}
      custom={3}
      animate="slide"
      variants={variants}
      className="w-full flex justify-center p-6 md:p-12 bg-slate-200 bg-opacity-40 min-h-[400px]"
    >
      <div className="w-full flex flex-col items-center max-w-screen-2xl">
        <div className="w-full flex flex-col md:flex-row items-center">
          <div className="flex flex-col md:flex-1 w-full p-6">
            <h1 className="text-3xl md:text-6xl text-center font-semibold text-slate-200">
              Find a Video
            </h1>
            <Search value={search} setValue={setSearch} />
          </div>
          <div className="flex flex-col justify-center border-t-2 border-l-0 border-brand-tertiary md:flex-1 md:border-l-2 md:border-t-0 w-full p-6">
            <h1 className="text-3xl md:text-6xl text-center font-semibold text-brand-tertiary border-brand-tertiary border-2 px-3 py-5 md:px-6 md:py-10 border-dashed hover:bg-slate-800 hover:bg-opacity-40 rounded-md cursor-pointer">
              Or Upload
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6 md:mt-12">
          {filteredData &&
            filteredData.map((video) => (
              <div
                key={video.id}
                className="flex flex-col bg-slate-800 rounded-md p-4"
              >
                <div className="w-full flex items-center gap-1 md:gap-3">
                  <div className="flex-1 flex-col gap-1 items-center">
                    <h2 className="text-xl font-semibold text-slate-200">
                      {video.title}
                    </h2>
                    <p className="text-sm text-slate-400">
                      <span className="text-brand-secondary">
                        Uploaded By:{" "}
                      </span>
                      {video.user_id}
                    </p>
                  </div>
                  <div className="flex items-center justify-end gap-3">
                    <CommentModal video={video}>
                      <div className="flex flex-col items-center gap-1 cursor-pointer">
                        <MenuItem
                          icon={<ChatBubbleLeftRightIcon className="h-6 w-6" />}
                          label="Comments"
                          subtext={video.num_comments.toString()}
                        />
                      </div>
                    </CommentModal>
                    <Link
                      href={video.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-1"
                    >
                      <MenuItem
                        icon={<VideoCameraIcon className="h-6 w-6" />}
                        label="Link"
                      />
                    </Link>
                  </div>
                </div>
                <ReactPlayer
                  className="max-w-full py-6"
                  url={video.video_url}
                  controls
                />
                <p className="text-sm text-slate-400 max-w-[40em]">
                  {video.description}
                </p>
              </div>
            ))}
        </div>
      </div>
    </motion.div>
  );
});

export default VideoDisplay;
