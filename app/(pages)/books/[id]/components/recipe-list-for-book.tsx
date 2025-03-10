"use client";

import { getAvailableRecipesForBook } from "@/features/books/actions/books";
import { UiRecipe } from "@/features/recipes/types";
import { useEffect, useState } from "react";
import AddRecipeToBookForm from "./add-recipe-to-book-form";

interface RecipesListForBookProps {
  bookId: string;
  onSuccess: () => void;
}

export default function RecipesListForBook({
  bookId,
  onSuccess,
}: RecipesListForBookProps) {
  const [availableRecipes, setAvailableRecipes] = useState<UiRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const recipes = await getAvailableRecipesForBook(bookId);
        setAvailableRecipes(recipes);
        setError(null);
      } catch (err) {
        console.error("Error fetching available recipes:", err);
        setError("Falha ao carregar receitas");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [bookId]);

  if (loading) {
    return (
      <div className="py-4 text-center">Carregando receitas disponíveis...</div>
    );
  }

  if (error) {
    return <div className="py-4 text-center text-red-500">{error}</div>;
  }

  return (
    <AddRecipeToBookForm
      availableRecipes={availableRecipes}
      bookId={bookId}
      onSuccess={onSuccess}
    />
  );
}
