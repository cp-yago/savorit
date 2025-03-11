import { UiBook } from "@/features/books/types";
import BookCard from "./book-card";

interface BookGridProps {
  books: UiBook[];
}

export default function BookGrid({ books }: BookGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.length === 0 && (
        <div className="col-span-full flex justify-center items-center h-full">
          <p className="text-gray-500 text-md text-center mb-4">
            Você ainda não possui livros. Clique no botão acima para criar o seu
            primeiro.
          </p>
        </div>
      )}
      {books.map((book) => (
        <BookCard
          key={book.id}
          id={book.id.toString()}
          name={book.name}
          recipeCount={book.bookToRecipes?.length || 0}
          images={book.images}
        />
      ))}
    </div>
  );
}
