import Header from "@/components/header";
import RecipeCard from "@/components/recipe-card";
import { findBookByIdDb } from "@/features/books/db/books";
import { findRecipesByBookIdDb } from "@/features/recipes/db/recipes";
import { Trash2 } from "lucide-react";
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
            options={[
              {
                icon: <Trash2 className="w-4 h-4 text-red-500" />,
                label: "Remover do livro",
                action: {
                  type: "dialog",
                  title: "Remover receita",
                  description: "Tem certeza que deseja remover esta receita do livro?",
                  content: (
                    <div className="flex justify-end gap-2 mt-4">
                      <button className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                        Cancelar
                      </button>
                      <button className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600">
                        Remover
                      </button>
                    </div>
                  ),
                },
              },
            ]}
          />
        ))}
      </main>
    </div>
  );
}
