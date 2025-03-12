import RoundButtonWithIcon from "@/components/round-button-with-icon";
import Image from "next/image";
import Link from "next/link";
import MenuButton from "./menu-button";

interface HeaderProps {
  imageUrl?: string | null;
  title?: string | null;
  recipeId: string;
}

export default function RecipeHeader({
  imageUrl,
  title,
  recipeId,
}: HeaderProps) {
  return (
    <header className="relative h-[33svh] overflow-hidden">
      <Link href="/recipes" className="absolute z-10 top-3 left-3">
        <RoundButtonWithIcon icon="back" />
      </Link>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title || "Recipe Image"}
          fill
          objectFit="cover"
          priority
        />
      )}
      <MenuButton recipeId={recipeId} className="absolute z-10 top-3 right-3" />
    </header>
  );
}
