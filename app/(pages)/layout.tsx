import BottomNavigation from "@/components/bottomNavigation";
import "@/styles/global.css";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import Head from "next/head";
import React, { Suspense } from "react";

export const metadata = {
  title: "Savorit - Salve suas receitas favoritas do Instagram.",
  description: "Salve suas receitas favoritas do Instagram.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider afterSignOutUrl="/sign-in">
      <html lang="en">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <body className="bg-rose-50">
          {children}
          <Suspense>
            <SignedIn>
              <BottomNavigation />
            </SignedIn>
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}
