import RecipeCard from "@/components/recipe-card";
import RoundButton from "@/components/rounded-link-button";
import { findBookByIdDb } from "@/features/books/db/books";
import { findRecipesByBookIdDb } from "@/features/recipes/db/recipes";

type Params = { id: string };

export default async function RecipeBook({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id: bookId } = await params;

  const book = await findBookByIdDb(bookId);

  const recipes = await findRecipesByBookIdDb(bookId);

  return (
    <div className="flex flex-col items-center gap-4">
      <header className="flex flex-col justify-between w-full py-4 px-5 sticky top-0 bg-peach-cream z-10">
        <div className="flex justify-between items-center py-2">
          <h1 className="text-2xl">{book?.name}</h1>
          <RoundButton icon="plus" pathOrUrl="/recipes/new" />
        </div>
      </header>

      <main className="flex-1 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 p-2 overflow-auto mb-16">
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
