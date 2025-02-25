import {
  findRecipeById,
  updateRecipe,
} from "@/features/recipes/actions/recipes";
import { insertUserRecipeDb } from "@/features/userRecipes/db/recipes";
import { getInstagramPost } from "@/services/apify";
import { formatRecipeAI } from "@/services/openai";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const recipe = await findRecipeById(id);
  if (!recipe)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(recipe);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const payload = await request.json();

    const { userId } = payload;
    if (!userId) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    const recipe = await findRecipeById(id);
    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }
    const sourceUrl = recipe.sourceUrl;
    const instagramPost = await getInstagramPost(sourceUrl);
    const recipeFormatted = await formatRecipeAI(instagramPost.caption);
    await updateRecipe(recipe.id, {
      ...recipeFormatted,
      status: "done",
      imageUrl: instagramPost.displayUrl,
    });
    await insertUserRecipeDb({
      recipeId: recipe.id,
      userId,
    });
    revalidateTag("recipes");
    console.log("RODOU revalidatePath");
    return NextResponse.json(recipe);
  } catch (error) {
    console.error("Error processing recipe update:", error);
    return NextResponse.json(
      { error: "Unable to update recipe" },
      { status: 500 },
    );
  }
}
