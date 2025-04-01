import type { Metadata } from "next";
import { geist, tiemposHeadline } from "@app/_fonts";
import "@app/globals.css";

export const experimental_ppr = true;

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
        className={`${geist.variable} ${tiemposHeadline.variable} overflow-x-hidden font-sans text-body antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
