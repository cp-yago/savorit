import { UiRecipe } from "@/features/recipes/types";

export default function AddRecipeToBookForm({
  availableRecipes,
}: {
  availableRecipes: UiRecipe[];
}) {
  if (availableRecipes.length === 0) {
    return (
      <div className="py-4 text-center">
        Não há receitas disponíveis para adicionar a este livro.
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-60 overflow-y-auto">
      {availableRecipes.map((recipe) => (
        <div
          key={recipe.id}
          className="p-3 bg-white rounded-md border border-fog-gray flex items-center"
        >
          {recipe.title}
        </div>
      ))}
    </div>
  );
}
