"use client";
import { cn } from "@/lib/utils";
import { croissant_one } from "@/styles/fonts";
import React from "react";
import { TypeAnimation } from "react-type-animation";

// Define the props interface with an optional className prop
interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <TypeAnimation
      sequence={[
        "Discover",
        1000,
        "Save it",
        1000,
        "Savor it",
        50,
        "Savorit",
        3000,
      ]}
      wrapper="span"
      cursor={true}
      repeat={Infinity}
      style={{ fontSize: "3em", display: "inline-block" }}
      className={cn(
        `${croissant_one.className}${className ? " " + className : ""}`,
      )}
    />
  );
};

export default Logo;
