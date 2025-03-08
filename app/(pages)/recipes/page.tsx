import { findRecipesByUserId } from "@/features/recipes/actions/recipes";
import { getCurrentUser } from "@/services/clerk";
import Header from "./components/header";
import RecipeGrid from "./components/recipe-grid";
import SearchBar from "./components/search-bar";

export const dynamic = "force-dynamic";

export default async function RecipeList() {
  const user = await getCurrentUser();

  if (!user.userId) {
    throw new Error("User not found");
  }

  const recipes = await findRecipesByUserId(user.userId);

  return (
    <div className="flex flex-col h-screen">
      <Header title="Receitas" href="/recipes/new" />
      <SearchBar placeholder="Pesquisar receitas" />

      <main className="flex-1 overflow-auto px-5 pb-20">
        <RecipeGrid recipes={recipes} />
      </main>
    </div>
  );
}
