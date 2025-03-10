"use client";

import { Button } from "@/components/ui/button";
import { addRecipesToBook } from "@/features/books/actions/books";
import { UiRecipe } from "@/features/recipes/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddRecipeToBookForm({
  availableRecipes,
  bookId,
  onSuccess,
}: {
  availableRecipes: UiRecipe[];
  bookId: string;
  onSuccess: () => void;
}) {
  const [selectedRecipes, setSelectedRecipes] = useState<Set<string>>(
    new Set(),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const toggleRecipe = (recipeId: string) => {
    const newSelected = new Set(selectedRecipes);
    if (newSelected.has(recipeId)) {
      newSelected.delete(recipeId);
    } else {
      newSelected.add(recipeId);
    }
    setSelectedRecipes(newSelected);
  };

  const handleAddRecipes = async () => {
    if (selectedRecipes.size === 0) return;

    setIsSubmitting(true);
    try {
      await addRecipesToBook(bookId, Array.from(selectedRecipes));
      router.refresh();
      onSuccess();
    } catch (error) {
      console.error("Failed to add recipes:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (availableRecipes.length === 0) {
    return (
      <div className="py-4 text-center">
        Não há receitas disponíveis para adicionar a este livro.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {availableRecipes.map((recipe) => {
          const isSelected = selectedRecipes.has(recipe.id);
          return (
            <div
              key={recipe.id}
              onClick={() => toggleRecipe(recipe.id)}
              className={`p-3 bg-white rounded-md border flex items-center cursor-pointer transition-colors ${
                isSelected
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-fog-gray hover:bg-gray-50"
              }`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleRecipe(recipe.id)}
                className="mr-3 h-4 w-4 accent-emerald-500"
              />
              <span className="flex-1">{recipe.title}</span>
            </div>
          );
        })}
      </div>

      <Button
        onClick={handleAddRecipes}
        disabled={selectedRecipes.size === 0 || isSubmitting}
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
      >
        {isSubmitting
          ? "Adicionando..."
          : `Adicionar ${selectedRecipes.size} ${selectedRecipes.size === 1 ? "receita" : "receitas"}`}
      </Button>
    </div>
  );
}
