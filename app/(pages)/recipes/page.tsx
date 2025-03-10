import Header from "@/components/header";
import { findRecipesByUserId } from "@/features/recipes/actions/recipes";
import { getCurrentUser } from "@/services/clerk";
import RecipeGrid from "./components/recipe-grid";

export const dynamic = "force-dynamic";

export default async function RecipeList() {
  const user = await getCurrentUser();

  if (!user.userId) {
    throw new Error("User not found");
  }

  const recipes = await findRecipesByUserId(user.userId);

  return (
    <div className="flex flex-col h-screen">
      <Header title="Receitas" href="/recipes/new" showSearchBar={false} />

      <main className="flex-1 overflow-auto px-5 pb-20 relative mt-30">
        <RecipeGrid recipes={recipes} />
      </main>
    </div>
  );
}
