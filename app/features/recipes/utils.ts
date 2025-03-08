import { SelectRecipe } from "@/infra/db/schema";
import { UiRecipe } from "./types";

export function toUiRecipe(recipe: SelectRecipe): UiRecipe {
  return {
    ...recipe,
    title: recipe.title || "Receita sem título",
    timeToCookInMinutes: 30,
  };
}
