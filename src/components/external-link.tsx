import Link, { type LinkProps } from "next/link";
import { IconLink } from "@/components/icons/icon-link";

type ExternalLink = LinkProps & {
  children?: React.ReactNode;
};

export default function ExternalLink({
  href,
  children,
  ...props
}: ExternalLink) {
  return (
    <Link className="flex" href={href}>
      {children}
      <IconLink className="flex self-center" />
    </Link>
  );
}
