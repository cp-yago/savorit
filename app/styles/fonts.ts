import { Geist_Mono, Albert_Sans, Croissant_One } from "next/font/google";

export const geist_mono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

export const albert_sans = Albert_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-albert-sans",
});

export const croissant_one = Croissant_One({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-croissant-one",
  weight: "400",
});
