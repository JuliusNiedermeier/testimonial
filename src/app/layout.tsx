import type { Metadata, Viewport } from "next";
import { switzer, tiemposHeadline } from "@/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export const viewport: Viewport = {
  themeColor: "var(--color-background-primary)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${switzer.variable} ${tiemposHeadline.variable} font-sans text-body antialiased bg-background-primary text-foreground-primary`}
      >
        {children}
      </body>
    </html>
  );
}
