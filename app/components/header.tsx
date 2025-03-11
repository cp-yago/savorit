import { Plus } from "lucide-react";
import Link from "next/link";
import BreadcrumbNavigation from "./breadcrumb-navigation";
import SearchBar from "./search-bar";

interface HeaderProps {
  title: string;
  href: string;
  searchPlaceholder?: string;
  rightButton?: React.ReactNode;
  showSearchBar?: boolean;
  showTitleSection?: boolean;
  breadcrumbItems?: {
    label: string;
    href?: string;
    isCurrent?: boolean;
  }[];
}

export default function Header({
  title,
  href = "#",
  searchPlaceholder,
  rightButton,
  showSearchBar = true,
  showTitleSection = true,
  breadcrumbItems,
}: HeaderProps) {
  return (
    <header className="p-5 w-full fixed top-0 left-0 z-50 bg-peach-cream shadow-sm">
      {breadcrumbItems && breadcrumbItems.length > 0 && (
        <div
          className={`${!showTitleSection ? "flex justify-between items-center" : "mb-4"}`}
        >
          <BreadcrumbNavigation items={breadcrumbItems} />
          {!showTitleSection && rightButton && <div>{rightButton}</div>}
        </div>
      )}
      {showTitleSection && (
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
      )}
      {showSearchBar && (
        <SearchBar placeholder={searchPlaceholder || "Pesquisar"} />
      )}
    </header>
  );
}
