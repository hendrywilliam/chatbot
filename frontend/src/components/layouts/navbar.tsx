"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";

export default function Navbar() {
    const { toggleSidebar } = useSidebar();

    return (
        <nav className="flex p-base border-b justify-between items-center">
            <Button onClick={toggleSidebar} size="xs">
                <Icons.sidebar />
            </Button>
            <Button
                size="xs"
                className="border"
                onClick={() =>
                    window.location.replace(
                        `${process.env
                            .NEXT_PUBLIC_BACKEND_BASE_URL!}/oauth-login`
                    )
                }
            >
                Sign In
            </Button>
        </nav>
    );
}
