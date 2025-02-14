"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import { croissant_one } from "@/styles/fonts";

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
      className={`${croissant_one.className}${className ? " " + className : ""}`}
    />
  );
};

export default Logo;
