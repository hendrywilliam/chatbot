import ExternalLink from "@/components/external-link";
import { buttonVariants } from "@/components/ui/button";
import { GithubIcon } from "@/components/ui/icons";
import { siteNavigation } from "@/config/site";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="h-14 w-full border-b bg-background">
      <div className="flex h-full w-full items-center justify-between px-6">
        <div className="flex items-center">
          <Link href="/" className="mr-5 text-sm font-semibold">
            AI
          </Link>
          <ul className="flex space-x-4">
            {siteNavigation.map((navigation) => (
              <li key={navigation.title}>
                <Link href={navigation.href}>{navigation.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ExternalLink
            className={buttonVariants({ variant: "outline", size: "xs" })}
            href="https://github.com/hendrywilliam/ai"
          >
            <GithubIcon />
          </ExternalLink>
        </div>
      </div>
    </nav>
  );
}
