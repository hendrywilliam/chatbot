import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function IndexPage() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="text-9xl">ai</h1>
      <p>
        A collection of AI-powered-utilities application, build with Next.js &
        Typescript.
      </p>
      <div className="mt-4 flex space-x-2">
        <Link className={buttonVariants()} href="/chat">
          Get Started
        </Link>
        <a
          className={buttonVariants({ variant: "outline" })}
          href="https://github.com/hendrywilliam/ai"
          target="_blank"
        >
          Stars on Github
        </a>
      </div>
    </main>
  );
}
