"use client";

import { removeRecipeFromBook } from "@/features/books/actions/books";
import { useState } from "react";

interface RemoveRecipeDialogProps {
  bookId: string;
  recipeId: string;
  onSuccess?: () => void;
}

export default function RemoveRecipeDialog({
  bookId,
  recipeId,
  onSuccess,
}: RemoveRecipeDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRemove = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await removeRecipeFromBook(bookId, recipeId);
      // A página será revalidada automaticamente pela action
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError("Erro ao remover receita do livro. Tente novamente.");
      console.error("Error removing recipe from book:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="mt-4">
      {error && (
        <div className="mb-4 p-2 bg-red-50 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-end gap-2 mt-4">
        <button
          className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          onClick={handleCancel}
          disabled={isLoading}
        >
          Cancelar
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
          onClick={handleRemove}
          disabled={isLoading}
        >
          {isLoading ? "Removendo..." : "Remover"}
        </button>
      </div>
    </div>
  );
}
