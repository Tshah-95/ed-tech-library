import React, { ReactNode, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import useSWR, { mutate } from "swr";
import { fetcher } from "../lib/request";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";
import { USER_ID } from "../lib/constants";

export const CommentModal = ({
  children,
  video,
}: {
  children?: ReactNode;
  video: video;
}) => {
  const { data } = useSWR<comment[] | null>(
    "/api/videos/comments?video_id=" + video.id,
    fetcher
  );
  const [searchValue, setSearchValue] = useState("");

  // Submit the new comment and refresh the comments to include it
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("/api/videos/comments", {
      method: "POST",
      body: JSON.stringify({
        video_id: video.id,
        content: searchValue,
        user_id: USER_ID,
      }),
    }).then(() => {
      mutate("/api/videos/comments?video_id=" + video.id);
    });
    setSearchValue("");
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-grey-700 bg-opacity-60 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] md:top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-screen-md translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-slate-800 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="m-0 text-lg md:text-2xl font-medium">
            {video.title}
            <span className="text-brand-primary"> - Comment Section</span>
          </Dialog.Title>
          <div className="mt-[25px] flex flex-col gap-3">
            {data && data.length > 0 ? (
              data?.map((comment) => (
                <div
                  key={comment.id}
                  className="flex flex-col gap-1 border-2 border-brand-tertiary p-3 rounded-md bg-slate-900"
                >
                  <p className="text-slate-200 text-sm">{comment.content}</p>
                  <p className="text-slate-400 text-xs">
                    {comment.user_id} -{" "}
                    {new Date(comment.created_at).toDateString()}
                  </p>
                </div>
              ))
            ) : (
              <div className="w-full h-72 gap-6 flex flex-col items-center justify-center">
                <ChatBubbleBottomCenterTextIcon className="h-16 w-16 md:h-24 md:w-24 text-slate-200" />
                No comments yet. Get the conversation started!
              </div>
            )}
          </div>
          <form className="relative" onSubmit={onSubmit}>
            <div
              className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
              aria-hidden="true"
            >
              <ChatBubbleLeftRightIcon
                className="mr-3 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="h-10 mt-[25px] block w-full rounded-md border border-gray-200 pl-9 focus:border-brand-secondary focus:ring-brand-secondary sm:text-sm text-brand-black"
              placeholder={"Join the discussion with a comment..."}
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
            />
          </form>
          <Dialog.Close asChild>
            <button
              className="hover:bg-grey-100 focus:shadow-grey-400 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
