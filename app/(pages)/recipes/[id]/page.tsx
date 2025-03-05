import { Suspense } from "react";
import RecipeLoading from "./components/loading";
import RecipeContent from "./components/recipe";

type Params = { id: string };

export default async function RecipePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id: recipeId } = await params;

  return (
    <Suspense fallback={<RecipeLoading />}>
      <RecipeContent recipeId={recipeId} />
    </Suspense>
  );
}
