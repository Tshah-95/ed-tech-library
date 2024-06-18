import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "custom-pattern": "url('/ed-tech-bg-2.png')",
      },
      colors: {
        "brand-tertiary": "#53c5e0",
        "brand-primary": "#3c948e",
        "brand-secondary": "#fbb549",
        "brand-black": "#3d6073",
        "brand-green": "#4dbe9c",
      },
    },
  },
  plugins: [],
};
export default config;
