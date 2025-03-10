import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { GeistMono } from "geist/font/mono";
import AppSidebar from "@/components/layouts/sidebar";

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
            <body className={`${GeistMono.className} flex antialiased`}>
                <SidebarProvider defaultOpen={false}>
                    <AppSidebar />
                    {children}
                </SidebarProvider>
                <Analytics />
                <Toaster />
            </body>
        </html>
    );
}
