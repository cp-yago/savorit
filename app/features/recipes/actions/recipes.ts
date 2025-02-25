"use server";

import {
  findRecipeByIdDb,
  insertRecipeDb,
  updateRecipeDb,
} from "@/features/recipes/db/recipes";
import { InsertRecipe, SelectRecipe } from "@/infra/db/schema/recipes";
import { getInstagramPost } from "@/services/apify";
import { formatRecipeAI } from "@/services/openai";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function createRecipe(data: InsertRecipe) {
  console.log("Chamou createRecipe");
  // Create the recipe in the DB quickly with pending status
  const newRecipe = await insertRecipeDb(data);
  console.log("Inseriu recipe", newRecipe.id);

  const user = await currentUser();
  console.log("RODOU getCurrentUser user.userId", user);
  // console.log("user.userId", user.userId);
  if (!user?.publicMetadata.dbId) {
    throw new Error("User not found");
  }

  // Fire-and-forget the slow update operations
  fetch(`${process.env.HOST}/api/v1/recipes/` + newRecipe.id, {
    method: "POST",
    body: JSON.stringify({
      userId: user.publicMetadata.dbId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
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
