import { findRecipeById } from "@/features/recipes/actions/recipes";
import { unstable_cache } from "next/cache";
import RecipeContent from "./recipeContent";

type Params = { id: string };

const getRecipe = unstable_cache(
  async (id: string) => {
    return findRecipeById(id);
  },
  ["recipes"],
  { revalidate: 5, tags: ["recipes"] },
);

export default async function RecipePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id: recipeId } = await params;

  const data = await getRecipe(recipeId);

  if (!data) {
    return <div>Recipe not found</div>;
  }

  return (
    <div>
      <RecipeContent recipeId={recipeId} />
    </div>
  );
}
