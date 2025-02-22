import { SignedIn, SignOutButton, UserButton } from "@clerk/nextjs";
import React from "react";

const Account: React.FC = () => {
  return (
    <div>
      <SignedIn>
        <UserButton />
        <SignOutButton />
      </SignedIn>
    </div>
  );
};

export default Account;
