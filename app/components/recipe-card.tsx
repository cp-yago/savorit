"use client";
import InstagramIcon from "@/components/icons/instagram";
import { OptionItem, OptionsDropdown } from "@/components/options-dropdown";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import placeholderImage from "@/public/img/placeholder.png";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import RoundButtonWithIcon from "./round-button-with-icon";

interface RecipeCardProps {
  id: string;
  imageURL: string;
  title: string;
  timeToCookInMinutes: number;
  options?: OptionItem[];
}

export default function RecipeCard({
  id,
  imageURL,
  title,
  timeToCookInMinutes = 30,
  options,
}: RecipeCardProps) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border-2 border-fog-gray hover-scale relative h-[220px] flex flex-col">
      {options && (
        <div className="absolute top-2 right-2 z-10">
          <OptionsDropdown
            options={options}
            triggerButton={<RoundButtonWithIcon icon="three-dots-vertical" />}
          />
        </div>
      )}

      <Link href={`/recipes/${id}`} className="flex flex-col h-full">
        <div className="relative h-32 overflow-hidden rounded-2xl mx-1 my-1 flex-shrink-0">
          <Image
            src={imageURL || placeholderImage}
            alt={title || "Recipe Image"}
            fill
            className="object-cover rounded-2xl"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="p-2 flex flex-col flex-1 justify-between">
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <h3 className="text-xs font-bold leading-tight line-clamp-2 overflow-hidden">{title}</h3>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[200px]">
                <p className="text-xs">{title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex justify-between items-center mt-auto">
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
      </Link>
    </div>
  );
}
