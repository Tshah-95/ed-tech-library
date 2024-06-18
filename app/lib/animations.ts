export const initialState = { y: -50, opacity: 0 };

// This variant utility will allow us to animate the text in a staggered fashion
// without needing to write staggered animations for each element
export const variants = {
  slide: (custom: number) => ({
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      type: "spring",
      duration: 10,
      mass: 0.95,
      delay: custom * 0.9 + 0.5,
    },
  }),
};
