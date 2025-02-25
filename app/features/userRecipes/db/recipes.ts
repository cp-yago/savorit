import { db } from "@/infra/db";
import { InsertUserRecipe, UserRecipeTable } from "@/infra/db/schema";

export async function insertUserRecipeDb(userRecipe: InsertUserRecipe) {
  const [newUserRecipe] = await db
    .insert(UserRecipeTable)
    .values(userRecipe)
    .returning();
  if (!newUserRecipe) {
    throw new Error("Failed to insert user recipe");
  }

  console.log("Inserted user recipe:", newUserRecipe);

  return newUserRecipe;
}
