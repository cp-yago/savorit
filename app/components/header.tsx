import RoundButtonWithIcon from "@/components/round-button-with-icon";
import Link from "next/link";
import BreadcrumbNavigation from "./breadcrumb-navigation";
import SearchBar from "./search-bar";

interface HeaderProps {
  title: string;
  href: string;
  searchPlaceholder?: string;
  rightButton?: React.ReactNode;
  showSearchBar?: boolean;
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
  breadcrumbItems,
}: HeaderProps) {
  const hasBreadcrumb = breadcrumbItems && breadcrumbItems.length > 0;
  return (
    <header className="p-5 w-full fixed top-0 left-0 z-50 bg-peach-cream shadow-sm">
      <div className="flex justify-between items-center">
        {hasBreadcrumb ? (
          <BreadcrumbNavigation items={breadcrumbItems} />
        ) : (
          <h1 className="text-2xl font-bold">{title}</h1>
        )}
        {rightButton ? (
          rightButton
        ) : (
          <Link
            href={href}
            // className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-fog-gray hover-scale"
          >
            <RoundButtonWithIcon icon="plus" />
          </Link>
        )}
      </div>
      {showSearchBar && (
        <SearchBar placeholder={searchPlaceholder || "Pesquisar"} />
      )}
    </header>
  );
}
