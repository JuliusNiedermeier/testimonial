import type { Metadata } from "next";
import { switzer, tiemposHeadline } from "@/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Testimonial",
  description: "The smoothest way to gather testimonials.",
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
