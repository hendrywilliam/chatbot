import ExternalLink from "@/components/external-link";
import { buttonVariants } from "@/components/ui/button";
import { GithubIcon } from "@/components/ui/icons";

export default function Navbar() {
  return (
    <nav className="z-50 h-14 w-full border-b bg-background">
      <div className="flex h-full w-full items-center justify-between px-6">
        <p className="text-sm font-semibold">AI</p>
        <ExternalLink
          className={buttonVariants({ variant: "outline", size: "xs" })}
          href="https://github.com/hendrywilliam/ai"
        >
          <GithubIcon />
        </ExternalLink>
      </div>
    </nav>
  );
}
