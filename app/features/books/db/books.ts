import { db } from "@/infra/db";
import { BooksTable, InsertBook } from "@/infra/db/schema";

export async function createBookDb(data: InsertBook) {
  const [newBook] = await db.insert(BooksTable).values(data).returning();
  if (newBook == null) throw new Error("Failed to create book");
  console.log("New book created:", newBook);
  return newBook;
}
