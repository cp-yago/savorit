"use client";
import React from "react";
import { useRouter } from "next/navigation";

const icons = {
  plus: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={3}
      stroke="green"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  ),
  x: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={3}
      stroke="green"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  ),
  back: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={3}
      stroke="green"
      className="size-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
    </svg>
  ),
};

type RoundButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  icon: "plus" | "x" | "back";
  redirectTo?: string;
};

const RoundButton: React.FC<RoundButtonProps> = ({
  label,
  icon,
  redirectTo,
  onClick,
  className,
  ...props
}) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (redirectTo) {
      router.push(`/${redirectTo}`);
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      className={`rounded-full bg-white border-2 text-green p-2 flex items-center shadow-md transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer ${className || ""}`}
    >
      {icons[icon]}
      {label && <span>{label}</span>}
    </button>
  );
};

export default RoundButton;
