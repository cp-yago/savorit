"use client";
import InstagramIcon from "@/components/icons/instagram";
import RoundButton from "@/components/rounded-link-button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SelectRecipe } from "@/infra/db/schema";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import RecipeLoading from "./loading";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function RecipeContent({ recipeId }: { recipeId: string }) {
  const { data, isLoading } = useSWR<SelectRecipe>(
    `/api/v1/recipes/${recipeId}`,
    fetcher,
    {
      refreshInterval: 5000,
    },
  );

  if (isLoading || !data || data.status === "pending") {
    return <RecipeLoading />;
  }

  return (
    <div>
      <header className="relative h-[33svh] overflow-hidden">
        <RoundButton
          icon="back"
          className="absolute z-10 bg-white top-3 left-3"
          pathOrUrl="/recipes"
        />
        {data.imageUrl && (
          <Image
            src={data.imageUrl}
            alt={data.title || "Recipe Image"}
            fill
            objectFit="cover"
          />
        )}
      </header>
      <main className="h-min-[33vh] py-2 px-4">
        <Link href={data.sourceUrl} target="_blank">
          <Badge className="bg-soft-pink rounded-full border-1 border-black py-2 transition-transform duration-100 ease-in-out hover:scale-102 hover:shadow-lg cursor-pointer">
            <InstagramIcon />
            <span>instagram.com</span>
          </Badge>
        </Link>
        <div className="py-2">
          <h1>{data.title}</h1>
          <p className="text-gray font-semibold mt-2">{data.description}</p>
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
                {data.ingredients &&
                  data.ingredients.map((ingredient, index) => (
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
                {data.instructions &&
                  data.instructions.map((instruction, index) => (
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
    </div>
  );
}
