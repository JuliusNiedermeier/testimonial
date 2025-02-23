import type { Config } from "tailwindcss";

// Figma line height calculation https://help.figma.com/hc/en-us/articles/360039956634-Explore-text-properties#line-height
// Figma tracking calculation https://help.figma.com/hc/en-us/articles/360039956634-Explore-text-properties#letter-spacing

const rfs = 16; // Root font size
const pxRem = (px: number) => px / rfs;

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "background-primary": "var(--color-background-primary)",
      "background-secondary": "var(--color-background-secondary)",
      "foreground-primary": "var(--color-foreground-primary)",
      "foreground-secondary": "var(--color-foreground-secondary)",
    },
    fontFamily: {
      sans: ["var(--font-switzer)"],
      serif: ["var(--font-tiempos-headline)"],
    },
    fontWeight: {
      regular: "400",
      semibold: "600",
      bold: "700",
    },
    fontSize: {
      heading: [
        `${pxRem(32)}rem`,
        {
          fontWeight: "700",
          lineHeight: `${pxRem(38)}rem`,
          letterSpacing: "-.002em",
        },
      ],
      label: [
        `${pxRem(20)}rem`,
        {
          fontWeight: "600",
          lineHeight: `${pxRem(20)}rem`,
          letterSpacing: "-.002em",
        },
      ],
      body: [
        `${pxRem(20)}rem`,
        {
          fontWeight: "400",
          lineHeight: `${pxRem(26)}rem`,
          letterSpacing: "0em",
        },
      ],
    },
  },
  plugins: [],
} satisfies Config;
