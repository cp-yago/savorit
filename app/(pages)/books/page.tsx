import Header from "@/components/header";
import { findBooksByUserId } from "@/features/books/db/books";
import { getCurrentUser } from "@/services/clerk";
import BookGrid from "./components/book-grid";
import NewBookButton from "./components/new-book-button";

export default async function BooksPage() {
  const { userId } = await getCurrentUser();
  const books = userId ? await findBooksByUserId(userId) : [];

  return (
    <div className="min-h-screen bg-soft-peach p-4">
      <div className="mx-auto w-full">
        <Header
          title="Livros"
          href="/books/new"
          searchPlaceholder="Pesquisar livros"
          rightButton={<NewBookButton />}
        />

        <main className="flex-1 overflow-auto px-5 pb-20">
          <BookGrid books={books} />
        </main>
      </div>
    </div>
  );
}
