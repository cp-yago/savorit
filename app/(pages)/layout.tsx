import BottomNavigation from "@/components/bottom-navigation";
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
        <body className="bg-soft-peach">
          <div className="min-h-screen flex flex-col relative">
            {children}
            <Suspense>
              <SignedIn>
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-background">
                  <BottomNavigation />
                </div>
              </SignedIn>
            </Suspense>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
