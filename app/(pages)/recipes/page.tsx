import RoundButton from "@/components/roundButton";
import { findRecipesByUserId } from "@/features/recipes/db/recipes";
import { getCurrentUser } from "@/services/clerk";
import AddRecipeCard from "./components/add-recipe-card";
import RecipeCard from "./components/recipe-card";

export const dynamic = "force-dynamic";

export default async function RecipeList() {
  const user = await getCurrentUser();

  if (!user.userId) {
    throw new Error("User not found");
  }

  const recipes = await findRecipesByUserId(user.userId);

  return (
    <div className="flex flex-col items-center gap-4">
      <header className="flex flex-col justify-between w-full py-4 px-5 sticky top-0 bg-peach-cream z-10">
        <div className="flex justify-between items-center py-2">
          <h1 className="text-2xl">Receitas</h1>
          <RoundButton icon="plus" redirectTo="/" />
        </div>
      </header>

      <main className="flex-1 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 p-2 overflow-auto mb-16">
        {recipes.length === 0 && <AddRecipeCard />}

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
}
