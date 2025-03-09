import { Plus } from "lucide-react";
import Link from "next/link";
import SearchBar from "./search-bar";

interface HeaderProps {
  title: string;
  href: string;
  searchPlaceholder?: string;
  rightButton?: React.ReactNode;
}

export default function Header({
  title,
  href = "#",
  searchPlaceholder,
  rightButton,
}: HeaderProps) {
  return (
    <header className="p-5 w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        {rightButton ? (
          rightButton
        ) : (
          <Link
            href={href}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-fog-gray hover-scale"
          >
            <Plus className="text-green-500 w-6 h-6" />
          </Link>
        )}
      </div>
      <SearchBar placeholder={searchPlaceholder || "Pesquisar"} />
    </header>
  );
}
