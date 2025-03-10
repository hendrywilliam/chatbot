"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";

export default function Navbar() {
    const { toggleSidebar } = useSidebar();

    return (
        <nav className="p-base border-b">
            <Button onClick={toggleSidebar} size="sm" variant="outline">
                <Icons.sidebar />
            </Button>
        </nav>
    );
}
