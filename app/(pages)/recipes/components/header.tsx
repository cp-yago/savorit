import { Plus } from "lucide-react";
import Link from "next/link";
import SearchBar from "./search-bar";

interface HeaderProps {
  title: string;
  href: string;
}

export default function Header({ title, href = "#" }: HeaderProps) {
  return (
    <header className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Link
          href={href}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-fog-gray hover-scale"
        >
          <Plus className="text-green-500 w-6 h-6" />
        </Link>
      </div>
      <SearchBar placeholder="Pesquisar receitas" />
    </header>
  );
}
