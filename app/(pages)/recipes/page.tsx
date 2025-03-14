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
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-background">
        <Header title="Receitas" href="/recipes/new" showSearchBar={false} />
      </div>

      <div className="flex-1 pb-[80px]">
        <div className="px-5 h-[calc(100vh-152px)]">
          <div className={recipes.length === 0 ? 'h-full flex items-center justify-center' : ''}>
            <RecipeGrid recipes={recipes} />
          </div>
        </div>
      </div>
    </>
  );
}
