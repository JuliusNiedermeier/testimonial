import localFont from "next/font/local";

export const switzer = localFont({
  src: [
    {
      path: "./switzer/switzer-regular.woff2",
      weight: "400", // Regular or Normal
    },
    {
      path: "./switzer/switzer-semibold.woff2",
      weight: "600", // Semibold
    },
    {
      path: "./switzer/switzer-bold.woff2",
      weight: "bold", // Bold
    },
  ],
  display: "swap",
  variable: "--font-switzer",
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
