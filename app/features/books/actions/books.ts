"use server";

import {
  findRecipesByBookIdDb,
  findRecipesByUserIdDb,
} from "@/features/recipes/db/recipes";
import { toUiRecipe } from "@/features/recipes/utils";
import { db } from "@/infra/db";
import { InsertBook } from "@/infra/db/schema";
import { BooksToRecipes } from "@/infra/db/schema/books-to-recipes";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createBookDb, updateBookNameDb } from "../db/books";

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

export async function addRecipesToBook(bookId: string, recipeIds: string[]) {
  if (!bookId) {
    throw new Error("Book ID is required");
  }

  if (!recipeIds || recipeIds.length === 0) {
    throw new Error("At least one recipe must be selected");
  }

  try {
    // Create entries in books_to_recipes table for each recipe
    const values = recipeIds.map((recipeId) => ({
      bookId,
      recipeId,
    }));

    await db.insert(BooksToRecipes).values(values);

    // Revalidate the book page to show the newly added recipes
    revalidatePath(`/books/${bookId}`);

    return { success: true };
  } catch (error) {
    console.error("Error adding recipes to book:", error);
    throw new Error("Failed to add recipes to book");
  }
}

export async function renameBook(bookId: string, newName: string) {
  if (!bookId) {
    throw new Error("Book ID is required");
  }

  if (!newName || newName.trim() === "") {
    throw new Error("Book name is required");
  }

  try {
    await updateBookNameDb(bookId, newName.trim());

    // Revalidate the book page to show the updated name
    revalidatePath(`/books/${bookId}`);
    // Also revalidate the books list page
    revalidatePath("/books");

    return { success: true };
  } catch (error) {
    console.error("Error renaming book:", error);
    throw new Error("Failed to rename book");
  }
}
