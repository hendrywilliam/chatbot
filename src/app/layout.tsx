import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import { Analytics } from "@vercel/analytics/react";
import { inter } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "AI by hendryw",
  description: "A simple application powered by OpenAI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} font-base flex h-screen w-full flex-col font-inter text-sm antialiased`}
      >
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
