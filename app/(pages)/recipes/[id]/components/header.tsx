import RoundButton from "@/components/rounded-link-button";
import Image from "next/image";

interface HeaderProps {
  imageUrl?: string | null;
  title?: string | null;
}

export default function RecipeHeader({ imageUrl, title }: HeaderProps) {
  return (
    <header className="relative h-[33svh] overflow-hidden">
      <RoundButton
        icon="back"
        className="absolute z-10 bg-white top-3 left-3"
        pathOrUrl="/recipes"
      />
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title || "Recipe Image"}
          fill
          objectFit="cover"
          priority
        />
      )}
    </header>
  );
}
