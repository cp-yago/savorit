"use client";

import Link from "next/link";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNavigation({
  activeTab,
  onTabChange,
}: BottomNavigationProps) {
  const tabs = [
    {
      id: "receitas",
      label: "Receitas",
      icon: "M8,2H2V8H8V2M16,2H10V8H16V2M8,10H2V16H8V10M16,10H10V16H16V10M22,10H18V16H22V10M6,4H4V6H6V4M14,4H12V6H14V4M6,12H4V14H6V12M14,12H12V14H14V12M20,12H18V14H20V12Z",
    },
    {
      id: "colecoes",
      label: "Coleções",
      icon: "M4,6H2V20A2,2 0 0,0 4,22H18V20H4V6M20,2H8A2,2 0 0,0 6,4V16A2,2 0 0,0 8,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M20,16H8V4H20V16M13,15H15V11H19V9H15V5H13V9H9V11H13V15Z",
    },
    {
      id: "listas",
      label: "Listas",
      icon: "M3,5H9V11H3V5M5,7V9H7V7H5M11,7H21V9H11V7M11,15H21V17H11V15M5,20L1.5,16.5L2.91,15.09L5,17.17L9.59,12.59L11,14L5,20Z",
    },
    {
      id: "conta",
      label: "Conta",
      icon: "M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M12,13C14.67,13 20,14.33 20,17V20H4V17C4,14.33 9.33,13 12,13M12,14.9C9.03,14.9 5.9,16.36 5.9,17V18.1H18.1V17C18.1,16.36 14.97,14.9 12,14.9Z",
    },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => (
          <NavItem
            key={tab.id}
            id={tab.id}
            label={tab.label}
            icon={tab.icon}
            isActive={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
          />
        ))}
      </div>
    </nav>
  );
}

interface NavItemProps {
  id: string;
  label: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}

function NavItem({ id, label, icon, isActive, onClick }: NavItemProps) {
  return (
    <Link
      id={id}
      href="#"
      className="flex flex-col items-center"
      onClick={onClick}
    >
      <svg
        viewBox="0 0 24 24"
        className={`w-6 h-6 ${isActive ? "text-black" : "text-gray-400"}`}
      >
        <path fill="currentColor" d={icon} />
      </svg>
      <span
        className={`text-xs mt-1 ${isActive ? "font-medium" : "text-gray-500"}`}
      >
        {label}
      </span>
    </Link>
  );
}
