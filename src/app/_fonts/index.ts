import localFont from "next/font/local";
import { Geist } from "next/font/google";

export const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const tiemposHeadline = localFont({
  src: [
    {
      path: "./tiempos-headline/tiempos-headline-regular.woff2",
      weight: "400", // Regular or Normal
    },
  ],
  display: "swap",
  variable: "--font-tiempos-headline",
});
