"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@clerk/nextjs";
import { userMenuNavigation } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export function AccountNavigation() {
  const { user, isSignedIn } = useUser();

  return (
    <>
      {isSignedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.imageUrl} />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {userMenuNavigation.map((menuNavigation, index) => (
              <DropdownMenuItem key={index}>
                <Link href={menuNavigation.href}>{menuNavigation.title}</Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/sign-in" className={buttonVariants({ className: "h-8" })}>
          Sign In
        </Link>
      )}
    </>
  );
}
