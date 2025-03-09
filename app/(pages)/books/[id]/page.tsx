import Header from "@/components/header";
import RecipeCard from "@/components/recipe-card";
import { findBookByIdDb } from "@/features/books/db/books";
import { findRecipesByBookIdDb } from "@/features/recipes/db/recipes";
import AddRecipeToBookButton from "./components/add-recipe-to-book-button";

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
      <Header
        title={book?.name || ""}
        href={`/books/${bookId}`}
        rightButton={<AddRecipeToBookButton bookId={bookId} />}
      />

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
