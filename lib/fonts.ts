import { Pixelify_Sans, Zen_Dots } from "next/font/google";

export const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify-sans",
  subsets: ["latin"],
  display: "swap",
});

export const zenDots = Zen_Dots({
  variable: "--font-zen-dot",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});
