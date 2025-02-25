import InstagramIcon from "@/components/icons/instagram";
import RoundButton from "@/components/roundButton";
import { Badge } from "@/components/ui/badge";
import { findRecipesByUserId } from "@/features/recipes/db/recipes";
import { currentUser } from '@clerk/nextjs/server';
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface RecipeCardProps {
  id: string;
  imageURL?: string;
  title: string;
  timeToCookInMinutes?: number;
}

function RecipeCard({
  id,
  imageURL,
  timeToCookInMinutes = 30,
  title
}: RecipeCardProps): React.ReactElement {
  return (
    <Link href={`/recipes/${id}`} className="block">
      <div className="flex flex-col items-center rounded-2xl border-2 p-2 shadow-md transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-white/10 cursor-pointer">
        <Image
          src={imageURL || "/images/recipe-placeholder.png"}
          alt={title || "Recipe image"}
          className="w-[150px]"
          width={150}
          height={150}
        />
        <h2 className="text-sm my-1">
          {title}
        </h2>
        <div className="flex justify-between w-full">
          <Badge className="rounded-full bg-soft-pink">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75-9.75-4.365-9.75-9.75S6.615 2.25 12 2.25zM12 7.5v4.5h3"
              />
            </svg>
            <span className="font-semibold">{timeToCookInMinutes} min</span>
          </Badge>
          <InstagramIcon />
        </div>
      </div>
    </Link>
  );
};

export default async function RecipeList() {
  const user = await currentUser();
  const userId = user?.publicMetadata.dbId;

  if (!userId) {
    return <div>Usuário não encontrado</div>;
  }

  const recipes = await findRecipesByUserId(userId);


  return (
    <div className="flex flex-col items-center gap-4">
      <header className="flex flex-col justify-between w-full py-4 px-5 sticky top-0 bg-peach-cream z-10">
        <div className="flex justify-between items-center py-2">
          <h1 className="text-2xl">Receitas</h1>
          <RoundButton icon="plus" redirectTo="/" />
        </div>
      </header>

      <main className="flex-1 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 p-2 overflow-auto mb-16">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            imageURL={recipe.imageUrl!} // refactor
            title={recipe.title || "Untitled"}
            timeToCookInMinutes={30}
          />
        ))}
      </main>
    </div>
  );
};