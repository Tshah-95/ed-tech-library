"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

const descriptors = ["sume", "verse", "tribute"];

export default function Home() {
  const [currDescriptor, setCurrDescriptor] = useState(0);
  const progress = useMotionValue(0);

  useEffect(() => {
    // moves and fades the old text, then swaps the descriptors, and finishes the animation
    // to make text appear as if it's swiping along a carousel
    const animateText = async () => {
      progress.set(0);
      await animate(progress, 0.5, {
        duration: 0.5,
      });
      setCurrDescriptor((currDesc) => (currDesc + 1) % descriptors.length);
      await animate(progress, 1, {
        duration: 0.5,
      });
    };

    let interval: NodeJS.Timeout | null = null;

    // Wait 3000ms for the first call as 1s is lost to the initial animation
    const timeout = setTimeout(() => {
      animateText();

      // Then start an interval to call the function every 2000ms
      interval = setInterval(() => animateText(), 2000);
    }, 3000);

    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
      if (timeout !== null) {
        clearTimeout(timeout);
      }
    };
  }, []);

  const opacity = useTransform(progress, [0, 0.5, 0.5, 1], [1, 0, 0, 1]);
  const promptX = useTransform(progress, [0, 0.5, 0.5, 1], [0, -20, 20, 0]);

  return (
    <main className="flex min-h-screen flex-col items-center gap-12 md:gap-24 p-6 md:p-24">
      <Image
        src="/FULL_LOGO_WHITE.png"
        width={200}
        height={300}
        alt="Learnwell Logo"
        priority
      />
      <div className="flex flex-col items-center max-w-screen-md opacity-95 text-4xl md:text-6xl font-semibold text-center gap-3">
        <motion.h1
          className="text-brand-primary block"
          initial={initialState}
          custom={0}
          animate="slide"
          variants={variants}
        >
          Where Serious Students
        </motion.h1>{" "}
        <motion.h1
          className="text-brand-secondary block"
          initial={initialState}
          custom={1}
          animate="slide"
          variants={variants}
        >
          & World Class Teachers
        </motion.h1>{" "}
        <motion.h1
          className="text-brand-tertiary w-max justify-center flex flex-wrap"
          initial={initialState}
          custom={2}
          animate="slide"
          variants={variants}
        >
          Come to Con{" "}
          <motion.span
            style={{ translateX: promptX, opacity }}
            className="min-w-[3em] max-w-[3em] text-left text-outline"
          >
            {descriptors[currDescriptor]}
          </motion.span>
        </motion.h1>
      </div>
    </main>
  );
}

const initialState = { y: -50, opacity: 0 };

// This variant utility will allow us to animate the text in a staggered fashion
// without needing to write staggered animations for each element
const variants = {
  slide: (custom: number) => ({
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      type: "spring",
      duration: 10,
      mass: 0.95,
      delay: custom * 1,
    },
  }),
};
