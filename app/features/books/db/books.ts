import { db } from "@/infra/db";
import { BooksTable, InsertBook } from "@/infra/db/schema";
import { eq } from "drizzle-orm";

export async function createBookDb(data: InsertBook) {
  const [newBook] = await db.insert(BooksTable).values(data).returning();
  if (newBook == null) throw new Error("Failed to create book");
  console.log("New book created:", newBook);
  return newBook;
}

export async function findBooksByUserId(userId: string) {
  const books = await db.query.BooksTable.findMany({
    where: eq(BooksTable.userId, userId),
    orderBy: (books, { desc }) => [desc(books.createdAt)],
    with: {
      bookToRecipes: {
        with: {
          recipe: true,
        },
      },
    },
  });
  return books;
}

export async function findBookByIdDb(id: string) {
  const book = await db.query.BooksTable.findFirst({
    where: eq(BooksTable.id, id),
  });
  return book;
}
