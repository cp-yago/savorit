import Head from "next/head";
import "@/styles/global.css";
import BottomNavigation from "@/components/bottomNavigation";

export const metadata = {
  title: "Savorit - Salve suas receitas favoritas do Instagram.",
  description: "Salve suas receitas favoritas do Instagram.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className="bg-rose-50">
        {children}
        <BottomNavigation />
      </body>
    </html>
  );
}
