import InstagramIcon from "@/components/icons/instagram";
import RoundButton from "@/components/roundButton";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { notFound } from "next/navigation";
import RecipeStatusPage from "./recipeLoading";
import Link from "next/link";

type Params = { id: string };

async function getRecipe(id: string) {
  const res = await fetch(`${process.env.HOST}/api/v1/recipes/${id}`, {
    next: {
      revalidate: 5,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch recipe");
  const { data } = await res.json();
  return data;
}

export default async function RecipePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id: recipeId } = await params;

  const recipe = await getRecipe(recipeId);

  console.log("recipe", recipe);

  if (!recipe) {
    return notFound();
  }

  return (
    <div>
      {recipe.status === "pending" ? (
        <RecipeStatusPage />
      ) : (
        <>
          <header className="relative h-[33svh] overflow-hidden">
            <RoundButton
              icon="back"
              className="absolute z-10 bg-white top-3 left-3"
              redirectTo="recipes"
            />
            <Image
              src={recipe.imageUrl}
              alt={recipe.title}
              fill
              objectFit="cover"
            />
          </header>
          <main className="h-min-[33vh] py-2 px-4">
            <Link href={recipe.sourceUrl} target="_blank">
              <Badge className="bg-soft-pink rounded-full border-1 border-black py-2 transition-transform duration-100 ease-in-out hover:scale-102 hover:shadow-lg cursor-pointer">
                <InstagramIcon />
                <span>instagram.com</span>
              </Badge>
            </Link>
            <div className="py-2">
              <h1>{recipe.title}</h1>
              <p className="text-gray font-semibold mt-2">
                {recipe.description}
              </p>
            </div>
            <div className="w-full">
              <Tabs defaultValue="ingredients" className="w-full">
                <TabsList className="w-full relative">
                  <TabsTrigger
                    value="ingredients"
                    className="py-2 w-full border-1 rounded-full relative data-[state=active]:bg-light-blue data-[state=active]:z-10"
                  >
                    Ingredients
                  </TabsTrigger>
                  <TabsTrigger
                    value="instructions"
                    className="py-2 w-full border-1 rounded-full relative ml-[-30px] data-[state=active]:bg-light-blue data-[state=active]:z-10"
                  >
                    Instructions
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="ingredients">
                  <ul className="list list-disc list-inside ml-4">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex">
                        <span className="font-bold mr-2">●</span>
                        <span className="font-bold mr-2">
                          {ingredient.quantity}
                        </span>
                        {ingredient.unit && (
                          <span className="font-bold mr-2">
                            {ingredient.unit}
                          </span>
                        )}
                        <span>{ingredient.name}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="instructions">
                  <ul>
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index} className="flex mb-4">
                        <span className="font-bold mr-4">
                          {instruction.step}.
                        </span>
                        <span>{instruction.description}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </>
      )}
    </div>
  );
}
