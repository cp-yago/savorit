import { Suspense } from "react";
import RecipeStatusPage from "./recipeLoading";
import { unstable_cacheTag as cacheTag } from 'next/cache'
import RecipeContent from "./recipeContent";

type Params = { id: string };


export default async function RecipePage({
  params,
}: {
  params: Promise<Params>;
}) {
  "use cache";
  cacheTag("recipe-data");

  const { id: recipeId } = await params;

  return (
    <Suspense fallback={<RecipeStatusPage />}>
      <RecipeContent recipeId={recipeId} />
    </Suspense>

  );
}
