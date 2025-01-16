import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { inter } from "@/utils/fonts";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
    title: "Chatbot",
    description: "A chat bot, built on top of OpenAI model.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`${inter.className} flex h-screen w-full flex-col text-sm antialiased`}
            >
                {children}
                <Analytics />
                <Toaster />
            </body>
        </html>
    );
}
