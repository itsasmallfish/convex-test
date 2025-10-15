"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "./ui/button";
import { Github } from "lucide-react";

export default function AuthButton() {
  const { signIn } = useAuthActions();

  return (
    <Button
      onClick={() => signIn("github")}
      variant="outline"
      className="flex items-center gap-2"
    >
      <Github className="h-4 w-4" />
      Sign in with GitHub
    </Button>
  );
}
