'use client'
import SignOutIcon from "@/components/icons/sign-out";
import { useClerk } from '@clerk/nextjs';
import { Loader2 } from "lucide-react";
import { useTransition } from "react";

export default function SignOutButton() {
  const { signOut } = useClerk();
  const [isPending, startTransition] = useTransition();

  function handleSignOut() {
    startTransition(() => {
      signOut();
    });
  }

  return (
    <button
      onClick={handleSignOut}
      className="flex flex-row justify-between px-3 py-1 transition-transform duration-200 ease-in-out hover:scale-101 cursor-pointer"
    >
      <h2>Log Out</h2>
      {isPending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <SignOutIcon />
      )}
    </button>
  )
}