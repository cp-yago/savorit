"use server";
import { redirect } from "next/navigation";
import { unstable_cacheTag as cacheTag } from "next/cache";
import { InsertRecipe, recipesTable } from "@/infra/db/schema/recipes";
import { db } from "@/infra/db";
import { eq } from "drizzle-orm";

export async function generateRecipe({ url, id }: { url: string; id: string }) {
    return fetch(
        `https://smuk7f1osf.execute-api.us-east-1.amazonaws.com/generate-recipe?url=${url}&id=${id}`,
    ).then((response) => {
        // if (!response.ok) {
        //   throw new Error("Network response was not ok");
        // }
        console.log("response", response);
        return response.json();
    });
}

export async function insertRecipe(data: InsertRecipe) {
    const [newRecipe] = await db.insert(recipesTable).values(data).returning();
    if (newRecipe == null) throw new Error("Failed to create recipe");
    generateRecipe({ url: newRecipe.sourceUrl, id: newRecipe.id });
    redirect(`/recipes/${newRecipe.id}`);
    return newRecipe;
}

export async function updateRecipe(id: string, data: Partial<InsertRecipe>) {
    const [updatedRecipe] = await db
        .update(recipesTable)
        .set(data)
        .where(eq(recipesTable.id, id))
        .returning();
    if (updatedRecipe == null) throw new Error("Failed to update recipe");
    return updatedRecipe;
}

export async function findRecipeById(id: string) {
    "use cache";
    const recipe = await db.query.recipesTable.findFirst({
        where: eq(recipesTable.id, id),
    });
    console.log("recipe findRecipeById", recipe);
    cacheTag("recipes", recipe.id);
    return recipe;
}
