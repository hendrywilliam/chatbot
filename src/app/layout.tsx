import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import { Analytics } from "@vercel/analytics/react";
import { inter } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "DictationAI by yrdneh",
  description: "Minimal way on how to communicate with OpenAI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
