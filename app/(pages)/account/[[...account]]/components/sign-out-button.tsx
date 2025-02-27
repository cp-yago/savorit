"use client";

import SignOutIcon from "@/components/icons/sign-out";
import { useClerk } from "@clerk/nextjs";

export default function SignOutButton() {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut({ redirectUrl: "/sign-in" });
  };

  return (
    <button
      onClick={handleSignOut}
      className="flex flex-row justify-between px-3 py-1 transition-transform duration-200 ease-in-out hover:scale-101 cursor-pointer"
    >
      <h2>Log Out</h2>
      <SignOutIcon />
    </button>
  );
}
