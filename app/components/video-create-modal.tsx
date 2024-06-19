import React, { ReactNode, useCallback, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { mutate } from "swr";

export const VideoCreateModal = ({ children }: { children?: ReactNode }) => {
  const [open, setOpen] = useState(false);

  // useCallback to memoize the function and prevent unnecessary recreations
  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);
      const title = formData.get("title") as string;
      const description = formData.get("description") as string;
      const url = formData.get("url") as string;

      fetch("/api/videos", {
        method: "POST",
        body: JSON.stringify({ title, description, video_url: url }),
      }).then(() => {
        mutate("/api/videos"); // Refresh the videos to include the new one
        setOpen(false); // Close the modal after successful submission
      });
    },
    [setOpen]
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-grey-700 bg-opacity-60 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] md:top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-sm translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-slate-800 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="m-0 text-lg md:text-2xl font-medium">
            Upload a Video
          </Dialog.Title>
          <form
            id="create-video"
            className="flex flex-col mt-12 gap-3"
            onSubmit={onSubmit}
          >
            <input
              type="text"
              name="title"
              id="title"
              className="h-10 block w-full max-w-sm rounded-md border border-gray-200 pl-3 focus:border-brand-secondary focus:ring-brand-secondary sm:text-sm text-brand-black"
              placeholder={"Enter a suitable title..."}
            />
            <input
              type="text"
              name="description"
              id="description"
              className="h-10 block w-full max-w-sm rounded-md border border-gray-200 pl-3 focus:border-brand-secondary focus:ring-brand-secondary sm:text-sm text-brand-black"
              placeholder={"Describe the contents of the video..."}
            />
            <input
              type="text"
              name="url"
              id="url"
              className="h-10 block w-full max-w-sm rounded-md border border-gray-200 pl-3 focus:border-brand-secondary focus:ring-brand-secondary sm:text-sm text-brand-black"
              placeholder={"Paste a video URL here..."}
            />
          </form>
          <button
            className="w-full hover:bg-slate-600 p-2 rounded-md mt-3"
            form="create-video"
            type="submit"
          >
            Create
          </button>
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
