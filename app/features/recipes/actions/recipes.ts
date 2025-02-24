"use server";

import {
  findRecipeByIdDb,
  insertRecipeDb,
  updateRecipeDb,
} from "@/features/recipes/db/recipes";
import { InsertRecipe, SelectRecipe } from "@/infra/db/schema/recipes";
import { getInstagramPost } from "@/services/apify";
import { formatRecipeAI } from "@/services/openai";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function createRecipe(data: InsertRecipe) {
  // Create the recipe in the DB quickly with pending status
  const newRecipe = await insertRecipeDb(data);

  // Fire-and-forget the slow update operations
  // generateRecipe(data.sourceUrl, newRecipe);
  fetch(`${process.env.HOST}/api/v1/recipes/` + newRecipe.id, {
    method: "POST",
  });

  // Immediately redirect the user for a loading view
  redirect(`/recipes/${newRecipe.id}`);
}

export async function generateRecipe(
  sourceUrl: string,
  newRecipe: SelectRecipe,
) {
  try {
    const instagramPost = await getInstagramPost(sourceUrl);
    const recipeFormatted = await formatRecipeAI(instagramPost.caption);
    await updateRecipe(newRecipe.id, {
      ...recipeFormatted,
      status: "done",
      imageUrl: instagramPost.displayUrl,
    });
    revalidatePath(`/recipes/${newRecipe.id}`);
    console.log("RODOU revalidatePath");
    // redirect(`/recipes/${newRecipe.id}`);
  } catch (error) {
    console.error("Error processing recipe update:", error);
  }
}

export async function updateRecipe(
  id: string,
  data: Partial<Omit<InsertRecipe, "id">>,
) {
  const updatedRecipe = await updateRecipeDb(id, data);
  console.log("RODOU updateRecipe");
  revalidateTag("recipes");
  return updatedRecipe;
}

export async function findRecipeById(id: string) {
  const recipe = await findRecipeByIdDb(id);
  console.log("RODOU findRecipeById");
  return recipe;
}
