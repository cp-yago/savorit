"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import { croissant_one } from "@/styles/fonts";

const Logo: React.FC = () => {
  return (
    <TypeAnimation
      sequence={["Discover", 2000, "Save it", 2000, "Savor it!", 3000]}
      wrapper="span"
      cursor={true}
      repeat={Infinity}
      style={{ fontSize: "3em", display: "inline-block" }}
      className={`${croissant_one.className}`}
    />
  );
};

export default Logo;
