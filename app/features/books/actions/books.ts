"use server";

import { InsertBook } from "@/infra/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createBookDb } from "../db/books";

export async function createBook(data: Partial<InsertBook>) {
  const bookName = data.name;

  const user = await currentUser();
  const userId = user?.publicMetadata.dbId;

  if (!bookName) {
    throw new Error("Book name is required");
  }

  if (!userId) {
    throw new Error("User not found");
  }

  const newBook = await createBookDb({
    userId,
    name: bookName,
  });

  if (!newBook) throw new Error("Failed to create book in action");

  console.log("New book created in action:", newBook);

  redirect(`/books/${newBook.id}`);
}
