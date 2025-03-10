import InstagramIcon from "@/components/icons/instagram";
import placeholderImage from "@/public/img/placeholder.png";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface RecipeCardProps {
  id: string;
  imageURL: string;
  title: string;
  timeToCookInMinutes: number;
}

export default function RecipeCard({
  id,
  imageURL,
  title,
  timeToCookInMinutes = 30,
}: RecipeCardProps) {
  console.log("RecipeCardProps", {
    id,
    imageURL,
    title,
    timeToCookInMinutes,
  });
  return (
    <Link href={`/recipes/${id}`} className="block">
      <div className="bg-white rounded-3xl overflow-hidden border-2 border-fog-gray hover-scale">
        <div className="relative h-32 overflow-hidden rounded-2xl mx-1 my-1">
          <Image
            src={imageURL || placeholderImage}
            alt={title || "Recipe Image"}
            fill
            className="object-cover rounded-2xl"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="p-2">
          <h3 className="text-xs font-bold leading-tight">{title}</h3>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center bg-pink-200 rounded-full px-2 py-0.5">
              <Clock className="w-3 h-3 mr-1 text-pink-700" />
              <span className="text-xs text-pink-700">
                {timeToCookInMinutes} min
              </span>
            </div>
            <button className="w-6 h-6 flex items-center justify-center">
              <InstagramIcon className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
