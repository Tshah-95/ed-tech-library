import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learnwell - Knowledge is Power",
  description:
    "The only open-source education platform built by educators for the global learning community. Free. Forever. Always.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <body className={inter.className.concat("bg-repeat bg-move-left")}>
        {children}
      </body>
    </html>
  );
}
