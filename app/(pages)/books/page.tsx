import { findBooksByUserId } from "@/features/books/db/books";
import { getCurrentUser } from "@/services/clerk";
import BookCard from "./components/book-card";
import NewBookButton from "./components/new-book-button";

export default async function BookList() {
  const { userId } = await getCurrentUser();
  const books = userId ? await findBooksByUserId(userId) : [];

  return (
    <div className="flex flex-col items-center gap-4">
      <header className="flex flex-col justify-between w-full py-4 px-5 sticky top-0 bg-peach-cream z-10">
        <div className="flex justify-between items-center py-2">
          <h1 className="text-2xl">Meus Livros</h1>
          <NewBookButton />
        </div>
      </header>

      <main className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2 overflow-auto mb-16">
        {books.length > 0 ? (
          books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.name}
              recipeCount={book.bookToRecipes?.length || 0}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">
              Você ainda não tem livros. Crie seu primeiro livro!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
