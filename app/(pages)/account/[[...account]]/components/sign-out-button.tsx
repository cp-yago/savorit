import SignOutIcon from "@/components/icons/sign-out";
import { SignOutButton as ClerkSignOutButton } from "@clerk/nextjs";

export default function SignOutButton() {
  return (
    <ClerkSignOutButton redirectUrl="/sign-in">
      <button className="flex flex-row justify-between px-3 py-1 transition-transform duration-200 ease-in-out hover:scale-101 cursor-pointer">
        <h2>Log Out</h2>
        <SignOutIcon />
      </button>
    </ClerkSignOutButton>
  );
}
