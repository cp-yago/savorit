"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export function NavigationButton({
  label,
  icon,
  path,
}: {
  label: string;
  icon: React.ReactNode;
  path: string;
}) {
  const pathname = usePathname();

  const isActive = (path: string): boolean => {
    return pathname === path ||
      pathname.startsWith(`${path}/`) ||
      (path === "/recipes" && pathname === "/");
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className={`absolute -top-1 border h-2 w-2/5 bg-black rounded-xl mb-2 ${isActive(path) ? 'visible' : 'invisible'}`}></div>
      <Link
        href={path}
        className="inline-flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
      >
        {icon}
        {label}
      </Link>
    </div>
  );
};

