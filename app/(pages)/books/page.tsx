import Header from "@/components/header";
import { findBooksByUserId } from "@/features/books/db/books";
import { getCurrentUser } from "@/services/clerk";
import BookGrid from "./components/book-grid";
import NewBookButton from "./components/new-book-button";

export default async function BooksPage() {
  const { userId } = await getCurrentUser();
  const books = userId ? await findBooksByUserId(userId) : [];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="w-full flex-1">
        <Header
          title="Livros"
          href="/books/new"
          searchPlaceholder="Pesquisar livros"
          rightButton={<NewBookButton />}
        />

        <main className="px-4 sm:px-6 pb-24">
          <BookGrid books={books} />
        </main>
      </div>
    </div>
  );
}
