"use server";
import { redirect } from "next/navigation";
import {
  unstable_cacheTag as cacheTag,
  revalidateTag,
  revalidatePath,
} from "next/cache";
import {
  InsertRecipe,
  SelectRecipe,
  RecipesTable
} from "@/infra/db/schema/recipes";
import { db } from "@/infra/db";
import { eq } from "drizzle-orm";
import { insertRecipeDb } from "@/features/recipes/db/recipes";
import { getInstagramPost } from "@/services/apify";
import { formatRecipeAI } from "@/services/openai";


export async function createRecipe(data: InsertRecipe) {
  console.log("createRecipe", data);
  const newRecipe = await insertRecipeDb(data);
  console.log("newRecipe", newRecipe);
  const instagramPost = await getInstagramPost(data.sourceUrl);
  console.log("instagramPost", instagramPost);
  const recipeFormatted = await formatRecipeAI(instagramPost.caption);
  console.log("recipeFormatted", recipeFormatted);
  await updateRecipe(newRecipe.id, {
    ...recipeFormatted,
    status: "done",
    imageUrl: instagramPost.displayUrl,
  });
  revalidateTag("recipes");

  redirect(`/recipes/${newRecipe.id}`);
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
