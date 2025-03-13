import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar";

export default function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent className="bg-black">
                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>
        </Sidebar>
    );
}
