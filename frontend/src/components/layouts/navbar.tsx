"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Navbar() {
    const { toggleSidebar } = useSidebar();
    const { signIn, isLoggedIn, user } = useAuth();

    return (
        <nav className="flex p-base border-b justify-between items-center h-[80px]">
            <Button onClick={toggleSidebar} size="xs">
                <Icons.sidebar />
            </Button>
            {isLoggedIn && user ? (
                <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <img
                        src={user.image_url}
                        alt="User Image"
                        className="aspect-square h-full w-full"
                    />
                </div>
            ) : (
                <Button size="xs" className="border" onClick={signIn}>
                    Sign In
                </Button>
            )}
        </nav>
    );
}
