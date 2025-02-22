import { db } from "@/infra/db";
import { eq } from "drizzle-orm";
import { InsertRecipe, RecipesTable, SelectRecipe } from "@/infra/db/schema";

export async function insertRecipeDb(data: InsertRecipe) {
  const [newRecipe] = await db.insert(RecipesTable).values(data).returning();
  if (newRecipe == null) throw new Error("Failed to create recipe");
  return newRecipe;
}

export async function updateRecipeDb(
  id: string,
  data: Partial<Omit<SelectRecipe, "id">>,
) {
  const [updatedRecipe] = await db
    .update(RecipesTable)
    .set(data)
    .where(eq(RecipesTable.id, id))
    .returning();
  if (updatedRecipe == null) throw new Error("Failed to update recipe");
  return updatedRecipe;
}

export async function findRecipeByIdDb(id: string) {
  const recipe = await db.query.RecipesTable.findFirst({
    where: eq(RecipesTable.id, id),
  });
  return recipe;
}
