import { db } from "@/infra/db";
import { InsertRecipe, RecipesTable } from "@/infra/db/schema";

export async function insertRecipeDb(data: InsertRecipe) {
  const [newRecipe] = await db.insert(RecipesTable).values(data).returning();
  if (newRecipe == null) throw new Error("Failed to create recipe");
  return newRecipe;
}
