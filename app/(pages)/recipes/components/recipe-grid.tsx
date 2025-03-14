import AddFirstCard from "@/components/add-first-card";
import RecipeCard from "@/components/recipe-card";
import { UiRecipe } from "@/features/recipes/types";

interface RecipeGridProps {
  recipes: UiRecipe[];
}

export default function RecipeGrid({ recipes }: RecipeGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {recipes.length === 0 && (
        <div className="col-span-full flex flex-col justify-center items-center h-full">
          <p className="text-gray-500 text-lg text-center mb-6">
            Você ainda não possui receitas. Clique no botão ou card para criar
            a sua primeira.
          </p>
          <AddFirstCard href="/recipes/new" title="Adicionar Receita" />
        </div>
      )}
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
