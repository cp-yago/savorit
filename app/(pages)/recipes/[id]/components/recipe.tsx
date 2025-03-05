"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SelectRecipe } from "@/infra/db/schema";
import useSWR from "swr";
import SocialMediaBadge from "./badge";
import RecipeHeader from "./header";
import RecipeLoading from "./loading";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface RecipeContentProps {
  recipeId: string;
}

export default function RecipeContent({ recipeId }: RecipeContentProps) {
  const { data, isLoading } = useSWR<SelectRecipe>(
    `/api/v1/recipes/${recipeId}`,
    fetcher,
    {
      refreshInterval: 5000,
      suspense: true,
      fallbackData: { status: "pending" } as SelectRecipe,
    },
  );

  if (isLoading || !data || data.status === "pending") {
    return <RecipeLoading />;
  }

  return (
    <div>
      <RecipeHeader imageUrl={data?.imageUrl} title={data?.title} />
      <main className="h-min-[33vh] p-4">
        <SocialMediaBadge sourceUrl={data?.sourceUrl} />
        <div className="py-2">
          <h1>{data?.title}</h1>
          <p className="text-gray font-semibold mt-2">{data?.description}</p>
        </div>
        <div className="w-full mt-2">
          <Tabs defaultValue="ingredients" className="w-full">
            <TabsList className="w-full relative">
              <TabsTrigger
                value="ingredients"
                className="py-1 w-full border-1 rounded-full relative data-[state=active]:bg-light-blue data-[state=active]:z-10"
              >
                Ingredients
              </TabsTrigger>
              <TabsTrigger
                value="instructions"
                className="py-1 w-full border-1 rounded-full relative ml-[-30px] data-[state=active]:bg-light-blue data-[state=active]:z-10"
              >
                Instructions
              </TabsTrigger>
            </TabsList>
            <TabsContent value="ingredients">
              <ul className="list list-disc list-inside ml-4">
                {data?.ingredients &&
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
                {data?.instructions &&
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
