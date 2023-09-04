import ExternalLink from "@/components/external-link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 bg-background w-full h-16 border-b">
      <div className="container flex w-full h-full items-center justify-between">
        <p className="text-sm font-semibold">;)</p>
        <ExternalLink
          className={cn(
            "inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3",
            "hover:no-underline"
          )}
          href="https://github.com/hendrywilliam/dctnz"
        >
          Github
        </ExternalLink>
      </div>
    </nav>
  );
}
