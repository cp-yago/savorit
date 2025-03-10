import Header from "@/components/header";
import { findBooksByUserId } from "@/features/books/db/books";
import { getCurrentUser } from "@/services/clerk";
import BookGrid from "./components/book-grid";
import NewBookButton from "./components/new-book-button";

export default async function BooksPage() {
  const { userId } = await getCurrentUser();
  const books = userId ? await findBooksByUserId(userId) : [];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full flex-1">
        <Header
          title="Livros"
          href="/books/new"
          searchPlaceholder="Pesquisar livros"
          rightButton={<NewBookButton />}
          showSearchBar={false}
        />

        <main className="px-4 sm:px-6 pb-24 mt-30">
          <BookGrid books={books} />
        </main>
      </div>
    </div>
  );
}
