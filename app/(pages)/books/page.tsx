import BookCard from "./components/book-card";
import NewBookButton from "./components/new-book-button";

export default async function BookList() {
  return (
    <div className="flex flex-col items-center gap-4">
      <header className="flex flex-col justify-between w-full py-4 px-5 sticky top-0 bg-peach-cream z-10">
        <div className="flex justify-between items-center py-2">
          <h1 className="text-2xl">Meus Livros</h1>
          <NewBookButton />
        </div>
      </header>

      <main className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2 overflow-auto mb-16">
        {Array.from({ length: 5 }).map((_, index) => (
          <BookCard
            key={index}
            id={index.toString()}
            title={`Book title ${index + 1}`}
            timeToCookInMinutes={30}
          />
        ))}
      </main>
    </div>
  );
}
