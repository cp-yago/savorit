"use server"
import { redirect } from 'next/navigation'
import { InsertRecipe, recipesTable } from "@/infra/db/schema/recipes"
import { db } from "@/infra/db"


export async function insertRecipe(data: InsertRecipe) {
    const [newRecipe] = await db.insert(recipesTable).values(data).returning()
    if (newRecipe == null) throw new Error("Failed to create recipe")
    redirect(`/recipes/${newRecipe.id}`)
    return newRecipe
}