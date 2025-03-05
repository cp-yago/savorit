"use client";
import { cn } from "@/lib/utils";
import { geist_mono } from "@/styles/fonts";
import { Loader2 } from "lucide-react";
import { TypeAnimation } from "react-type-animation";

export default function LoadingText({ className }: { className?: string }) {
  return (
    <div className="border absolute flex flex-col justify-center items-center w-45 h-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-white rounded-lg shadow-lg z-10">
      <div className="h-[15dvh]">
        <TypeAnimation
          sequence={[
            "Hmmm...",
            1000,
            "Preparando receita...",
            1000,
            "Isso pode levar alguns segundos...",
            1000,
            "Estamos quase lá...",
            1000,
          ]}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
          style={{ fontSize: "1em", display: "inline-block" }}
          className={cn(`${geist_mono.className} ${className || ""}`)}
        />
      </div>
      <Loader2 className="animate-spin text-emerald" />
    </div>
  );
}
