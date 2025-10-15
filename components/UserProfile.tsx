"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut, User } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function UserProfile() {
  const { signOut } = useAuthActions();
  const user = useQuery(api.auth.currentUser);

  if (!user) return null;

  // Get initials for fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage 
          src={user.image} 
          alt={user.name || "User"} 
        />
        <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
          {user.name ? getInitials(user.name) : <User className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-medium">
          {user.name || "User"}
        </span>
        <span className="text-xs text-muted-foreground">
          {user.email}
        </span>
      </div>
      <Button
        onClick={() => signOut()}
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-foreground"
        title="Sign out"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}
