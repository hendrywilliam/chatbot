"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";

export default function Navbar() {
    const { toggleSidebar } = useSidebar();

    return (
        <nav className="flex p-base border-b justify-between">
            <Button onClick={toggleSidebar} size="sm" variant="outline">
                <Icons.sidebar />
            </Button>
            <Button
                onClick={() =>
                    window.location.replace(
                        `${process.env
                            .NEXT_PUBLIC_BACKEND_BASE_URL!}/oauth-login`
                    )
                }
            >
                Login with Google
            </Button>
        </nav>
    );
}
