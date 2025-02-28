import type { Metadata } from "next";
import { switzer, tiemposHeadline } from "@/app/_shared/fonts";
import "@/app/globals.css";

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
        className={`${switzer.variable} ${tiemposHeadline.variable} overflow-x-hidden font-sans text-body antialiased bg-background-primary text-foreground-primary`}
      >
        {children}
      </body>
    </html>
  );
}
