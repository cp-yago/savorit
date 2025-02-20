"use server";
import { redirect } from "next/navigation";
import {
  // unstable_cacheTag as cacheTag,
  revalidateTag,
  revalidatePath,
} from "next/cache";
import {
  InsertRecipe,
  SelectRecipe,
  RecipesTable,
} from "@/infra/db/schema/recipes";
import { db } from "@/infra/db";
import { eq } from "drizzle-orm";
import { insertRecipeDb } from "@/features/recipes/db/recipes";
import { getInstagramPost } from "@/services/apify";
import { formatRecipeAI } from "@/services/openai";

export async function createRecipe(data: InsertRecipe) {
  const newRecipe = await insertRecipeDb(data);

  const instagramPost = await getInstagramPost(data.sourceUrl);
  const recipeFormatted = await formatRecipeAI(instagramPost.caption);
  await updateRecipe(newRecipe.id, {
    ...recipeFormatted,
    status: "done",
    imageUrl: instagramPost.displayUrl,
  });

  revalidateTag("recipes");
}

export async function updateRecipe(
  id: string,
  data: Partial<Omit<SelectRecipe, "id">>,
) {
  console.log("updateRecipe", id, data);
  const [updatedRecipe] = await db
    .update(RecipesTable)
    .set(data)
    .where(eq(RecipesTable.id, id))
    .returning();
  if (updatedRecipe == null) throw new Error("Failed to update recipe");
  revalidateTag("recipes");
  revalidatePath(`/recipes/${id}`);
  return updatedRecipe;
}

export async function findRecipeById(id: string) {
  // "use cache";
  const recipe = await db.query.RecipesTable.findFirst({
    where: eq(RecipesTable.id, id),
  });
  // console.log("recipe findRecipeById", recipe);
  // cacheTag("recipes", recipe.id);
  return recipe;
}
