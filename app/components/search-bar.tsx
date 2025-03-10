import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder: string;
}

export default function SearchBar({ placeholder }: SearchBarProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full py-3 pl-10 pr-4 bg-white border-2 border-fog-gray rounded-full focus:outline-none"
      />
    </div>
  );
}
