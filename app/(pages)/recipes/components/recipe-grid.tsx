import { UiRecipe } from "@/features/recipes/types";
import RecipeCard from "./recipe-card";

interface RecipeGridProps {
  recipes: UiRecipe[];
}

export default function RecipeGrid({ recipes }: RecipeGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {recipes.map((recipe, index) => (
        <RecipeCard
          id={recipe.id}
          key={index}
          title={recipe.title}
          imageURL={recipe.imageUrl}
          timeToCookInMinutes={recipe.timeToCookInMinutes}
        />
      ))}
    </div>
  );
}
