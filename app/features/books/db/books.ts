import { db } from "@/infra/db";
import { BooksTable, InsertBook } from "@/infra/db/schema";
import { BooksToRecipes } from "@/infra/db/schema/books-to-recipes";
import { and, eq } from "drizzle-orm";
import { BookWithRecipes, UiBook } from "../types";

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

  // Transform books to include recipe images
  return books.map(bookToUiBook);
}

export function bookToUiBook(book: BookWithRecipes): UiBook {
  // Extract up to 3 recipe image URLs from the book's recipes
  const recipeImages =
    book.bookToRecipes
      ?.map((relation) => relation.recipe.imageUrl)
      .filter((url): url is string => url !== null && url !== undefined)
      .slice(0, 3) || [];

  return {
    id: book.id,
    name: book.name,
    userId: book.userId,
    createdAt: book.createdAt,
    updatedAt: book.updatedAt,
    deletedAt: book.deletedAt,
    bookToRecipes: book.bookToRecipes,
    images: recipeImages,
  };
}

export async function findBookByIdDb(id: string) {
  const book = await db.query.BooksTable.findFirst({
    where: eq(BooksTable.id, id),
    with: {
      bookToRecipes: {
        with: {
          recipe: true,
        },
      },
    },
  });

  return book ? bookToUiBook(book) : null;
}

export async function updateBookNameDb(bookId: string, newName: string) {
  try {
    const updatedBook = await db
      .update(BooksTable)
      .set({ name: newName })
      .where(eq(BooksTable.id, bookId))
      .returning();

    return updatedBook[0];
  } catch (error) {
    console.error("Error updating book name:", error);
    return null;
  }
}

export async function removeRecipeFromBookDb(bookId: string, recipeId: string) {
  try {
    const result = await db
      .delete(BooksToRecipes)
      .where(
        and(
          eq(BooksToRecipes.bookId, bookId),
          eq(BooksToRecipes.recipeId, recipeId),
        ),
      )
      .returning();

    return result.length > 0;
  } catch (error) {
    console.error("Error removing recipe from book:", error);
    throw error;
  }
}
