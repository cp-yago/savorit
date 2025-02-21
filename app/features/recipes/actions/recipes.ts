"use server";

import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { InsertRecipe, SelectRecipe } from "@/infra/db/schema/recipes";
import {
  findRecipeByIdDb,
  insertRecipeDb,
  updateRecipeDb,
} from "@/features/recipes/db/recipes";
import { getInstagramPost } from "@/services/apify";
import { formatRecipeAI } from "@/services/openai";

export async function createRecipe(data: InsertRecipe) {
  // Create the recipe in the DB quickly with pending status
  const newRecipe = await insertRecipeDb(data);

  // Fire-and-forget the slow update operations
  (async () => {
    try {
      const instagramPost = await getInstagramPost(data.sourceUrl);
      const recipeFormatted = await formatRecipeAI(instagramPost.caption);
      await updateRecipe(newRecipe.id, {
        ...recipeFormatted,
        status: "done",
        imageUrl: instagramPost.displayUrl,
      });
    } catch (error) {
      console.error("Error processing recipe update:", error);
    }
  })();

  // Immediately redirect the user for a loading view
  redirect(`/recipes/${newRecipe.id}`);
}

export async function updateRecipe(
  id: string,
  data: Partial<Omit<SelectRecipe, "id">>,
) {
  const updatedRecipe = await updateRecipeDb(id, data);
  revalidateTag("recipe-data");
  return updatedRecipe;
}

export async function findRecipeById(id: string) {
  const recipe = await findRecipeByIdDb(id);
  return recipe;
}
