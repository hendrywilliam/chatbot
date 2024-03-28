import ExternalLink from "@/components/external-link";
import { buttonVariants } from "@/components/ui/button";
import { GithubIcon } from "@/components/ui/icons";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 bg-white w-full h-16 border-b">
      <div className="container flex w-full h-full items-center justify-between">
        <p className="text-sm font-semibold">AI</p>
        <ExternalLink
          className={buttonVariants({ size: "icon", variant: "outline" })}
          href="https://github.com/hendrywilliam/ai"
        >
          <GithubIcon />
        </ExternalLink>
      </div>
    </nav>
  );
}
