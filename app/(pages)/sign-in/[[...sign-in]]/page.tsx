import Logo from "@/components/Logo";
import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback="Loading...">
      <div className="flex flex-col items-center justify-center h-svh">
        <Logo className="mb-4" />
        <SignIn
          forceRedirectUrl="/recipes"
          signUpFallbackRedirectUrl="/recipes"
        />
      </div>
    </Suspense>
  );
}
