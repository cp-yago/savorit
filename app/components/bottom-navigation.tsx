import Link from "next/link";
import React from "react";

type NavigationItem = {
  id: number;
  label: string;
  path: string;
  icon: React.ReactNode;
};

const items: NavigationItem[] = [
  {
    id: 1,
    label: "Receitas",
    path: "/recipes",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9"
        />
      </svg>
    ),
  },
  // {
  //   id: 2,
  //   label: "Livros",
  //   path: "/collections",
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       fill="none"
  //       viewBox="0 0 24 24"
  //       strokeWidth="1.5"
  //       stroke="currentColor"
  //       className="size-6"
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9"
  //       />
  //     </svg>
  //   ),
  // },
  {
    id: 3,
    label: "Conta",
    path: "/account",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
    ),
  },
];

const NavigationButton = ({
  label,
  icon,
  path,
}: {
  label: string;
  icon: React.ReactNode;
  path: string;
}) => {
  return (
    <Link
      href={path}
      className="inline-flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
    >
      {icon}
      {label}
    </Link>
  );
};

export default function BottomNavigation() {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 mt-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <div className={`grid h-full max-w-lg grid-cols-2 mx-auto font-medium`}>
        {items.map((item) => (
          <NavigationButton
            key={item.id}
            label={item.label}
            icon={item.icon}
            path={item.path}
          />
        ))}
      </div>
    </div>
  );
}
