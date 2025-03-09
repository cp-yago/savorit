"use server";

import {
  findRecipesByBookIdDb,
  findRecipesByUserIdDb,
} from "@/features/recipes/db/recipes";
import { toUiRecipe } from "@/features/recipes/utils";
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

export async function getAvailableRecipesForBook(bookId: string) {
  const user = await currentUser();
  const userId = user?.publicMetadata.dbId;

  if (!userId) {
    throw new Error("User not found");
  }

  // Get all user recipes
  const allUserRecipes = await findRecipesByUserIdDb(userId.toString());

  // Get recipes that are already in the book
  const bookRecipes = await findRecipesByBookIdDb(bookId);

  // Get the IDs of recipes already in the book
  const bookRecipeIds = new Set(bookRecipes.map((recipe) => recipe.id));

  // Filter out recipes that are already in the book
  const availableRecipes = allUserRecipes.filter(
    (recipe) => !bookRecipeIds.has(recipe.id),
  );

  // Convert to UI format
  return availableRecipes.map(toUiRecipe);
}
