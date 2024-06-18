"use client";

import useSWR from "swr";
import { fetcher } from "../lib/request";
import { API_BASE_URL } from "../lib/constants";
import Search from "./search";
import { useState } from "react";
import { initialState, variants } from "../lib/animations";
import { motion } from "framer-motion";

export default function VideoDisplay() {
  const { data } = useSWR(`${API_BASE_URL}/videos?user_id=123`, fetcher);
  const [search, setSearch] = useState("");

  console.log(data);

  return (
    <motion.div
      initial={initialState}
      custom={3}
      animate="slide"
      variants={variants}
      className="w-full flex justify-center p-6 md:p-12 bg-slate-200 bg-opacity-40 h-[600px]"
    >
      <div className="w-full flex flex-col items-center max-w-screen-lg">
        <Search value={search} setValue={setSearch} />
      </div>
    </motion.div>
  );
}
