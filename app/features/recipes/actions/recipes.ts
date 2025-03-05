"use server";

import {
  deleteRecipeByIdDb,
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

export async function createRecipe(data: Partial<InsertRecipe>) {
  // Create the recipe in the DB quickly with pending status
  const sourceUrl = data.sourceUrl;

  if (!sourceUrl) {
    throw new Error("Source URL is required");
  }

  const user = await currentUser();
  const userId = user?.publicMetadata.dbId;

  if (!userId) {
    throw new Error("User not found");
  }

  const newRecipe = await insertRecipeDb({
    ...data,
    sourceUrl,
    userId,
    status: "pending",
  });

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

export async function deleteRecipeById(id: string) {
  const deletedRecipe = await deleteRecipeByIdDb(id);

  if (!deletedRecipe) {
    throw new Error("Failed to delete the recipe.");
  }

  redirect(`/recipes`);
}
