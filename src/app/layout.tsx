import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { inter } from "@/lib/fonts";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className} flex h-screen w-full flex-col text-sm antialiased`}
        >
          {children}
          <Analytics />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
