import InstagramIcon from "@/components/icons/instagram";
import RoundButton from "@/components/roundButton";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { notFound } from "next/navigation";
import RecipeStatusPage from "./recipeLoading";
import Link from "next/link";

const recipe_mock = {
  name: "Pastinha de Alho Poró com Tomates Assados",
  description:
    "Uma pastinha cremosa e saborosa, feita com alho-poró refogado e tomates assados, trazendo um equilíbrio perfeito entre doçura e leveza. Ideal para servir com pães, torradas ou como acompanhamento para pratos diversos.",
  image: "https://i.imgur.com/uddqA0V.png",
  source: "instagram.com",
  ingredients: [
    {
      name: "Alho-poró picado",
      quantity: "1",
      unit: "colher de sopa",
    },
    {
      name: "Tomates maduros",
      quantity: "4",
      unit: "unidades",
    },
    {
      name: "Azeite de oliva",
      quantity: "3",
      unit: "colheres de sopa",
    },
    {
      name: "Sal",
      quantity: "a gosto",
    },
    {
      name: "Pimenta-do-reino",
      quantity: "a gosto",
    },
  ],
  instructions: [
    {
      step: "1",
      description: "Pré-aqueça o forno a 180°C.",
    },
    {
      step: "2",
      description:
        "Em uma assadeira, coloque os tomates cortados ao meio, regue com 2 colheres de sopa de azeite e tempere com sal e pimenta-do-reino.",
    },
    {
      step: "3",
      description:
        "Leve ao forno por 30 minutos ou até que os tomates estejam macios e levemente dourados.",
    },
    {
      step: "4",
      description:
        "Em uma frigideira, aqueça o restante do azeite e refogue o alho-poró até que esteja macio e levemente dourado.",
    },
    {
      step: "5",
      description:
        "Em um processador, coloque os tomates assados, o alho-poró refogado e bata até obter uma pasta homogênea.",
    },
    {
      step: "6",
      description: "Sirva a pastinha com pães ou torradas.",
    },
  ],
};

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
              src="https://i.imgur.com/uddqA0V.png"
              alt="Pastinha de alho poró"
              fill
            />
          </header>
          <main className="h-min-[33vh] py-2 px-4">
            <Link href={recipe.sourceUrl}>
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
