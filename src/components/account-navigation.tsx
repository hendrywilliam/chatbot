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

export function AccountNavigation() {
  const { user, isSignedIn } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-8 w-8">
          {isSignedIn ? (
            <AvatarImage src={user.imageUrl} />
          ) : (
            <AvatarImage src="https://upload.wikimedia.org/wikipedia/en/2/23/Lofi_girl_logo.jpg" />
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userMenuNavigation.map((menuNavigation, index) => (
          <DropdownMenuItem key={index}>
            {menuNavigation.title}
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
