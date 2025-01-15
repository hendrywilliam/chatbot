import Link, { type LinkProps } from "next/link";
import { cn } from "@/utils/cn";

type ExternalLink = LinkProps & {
    children?: React.ReactNode;
    target?: "_blank" | "_self" | "_parent" | "_top" | "framename";
    className?: string;
};

export default function ExternalLink({
    href,
    children,
    target = "_blank",
    className,
    ...props
}: ExternalLink) {
    return (
        <Link className={cn("flex", className)} href={href} target={target}>
            {children}
        </Link>
    );
}
