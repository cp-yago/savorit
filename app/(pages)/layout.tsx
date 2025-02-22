import BottomNavigation from "@/components/bottomNavigation";
import "@/styles/global.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton
} from '@clerk/nextjs';
import Head from "next/head";

export const metadata = {
  title: "Savorit - Salve suas receitas favoritas do Instagram.",
  description: "Salve suas receitas favoritas do Instagram.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <body className="bg-rose-50">
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          {children}
          <BottomNavigation />
        </body>
      </html>
    </ClerkProvider >
  );
}
