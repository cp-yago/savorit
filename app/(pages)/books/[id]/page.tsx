import Header from "@/components/header";
import RecipeCard from "@/components/recipe-card";
import { findBookByIdDb } from "@/features/books/db/books";
import { findRecipesByBookIdDb } from "@/features/recipes/db/recipes";
import BookDropdownMenu from "./components/dropdown-menu";

type Params = { id: string };

export default async function RecipeBook({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id: bookId } = await params;

  const book = await findBookByIdDb(bookId);
  const recipes = await findRecipesByBookIdDb(bookId);

  const breadcrumbItems = [
    {
      label: "Livros",
      href: "/books",
    },
    {
      label: book?.name || "",
      isCurrent: true,
    },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <Header
        title="Livros"
        href={`/books/${bookId}`}
        rightButton={
          <BookDropdownMenu bookId={bookId} bookName={book?.name || ""} />
        }
        showSearchBar={false}
        breadcrumbItems={breadcrumbItems}
      />

      <main className="flex-1 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 overflow-auto mb-16 w-full p-4 mt-24">
        {recipes.length === 0 && (
          <div className="col-span-full flex justify-center items-center h-full">
            <p className="text-gray-500 text-md text-center mb-4">
              Você ainda não adicionou receitas a este livro. Clique no botão
              acima para adicionar a sua primeira.
            </p>
          </div>
        )}
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
