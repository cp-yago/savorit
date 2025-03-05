import ClockIcon from "@/components/icons/clock";
import InstagramIcon from "@/components/icons/instagram";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

interface RecipeCardProps {
  id: string;
  imageURL?: string;
  title: string;
  timeToCookInMinutes?: number;
}

export default function RecipeCard({
  id,
  imageURL,
  title,
  timeToCookInMinutes,
}: RecipeCardProps) {
  return (
    <Link href={`/recipes/${id}`} className="block">
      <div className="h-65 flex flex-col items-center rounded-2xl border-2 p-1 shadow-md transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-white/10 cursor-pointer">
        {imageURL && (
          <Image
            src={imageURL}
            alt={title || "Recipe image"}
            className="w-150 h-40 rounded-2xl"
            width={150}
            height={40}
          />
        )}
        <h2 className="text-sm my-auto">{title}</h2>
        <div className="flex justify-between w-full py-1 mt-auto">
          <Badge className="rounded-full bg-soft-pink">
            <ClockIcon />
            <span className="font-semibold">{timeToCookInMinutes} min</span>
          </Badge>
          <InstagramIcon />
        </div>
      </div>
    </Link>
  );
}
