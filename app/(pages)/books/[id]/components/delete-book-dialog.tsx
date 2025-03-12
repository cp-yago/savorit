"use client";

import { deleteBook } from "@/features/books/actions/books";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteBookDialogProps {
  bookId: string;
  onSuccess?: () => void;
}

export default function DeleteBookDialog({
  bookId,
  onSuccess,
}: DeleteBookDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // The deleteBook action will automatically redirect to the books page
      await deleteBook(bookId);

      // If for some reason the redirect doesn't happen, we manually redirect
      router.push("/books");
    } catch (err) {
      setError("Erro ao deletar o livro. Tente novamente.");
      console.error("Error deleting book:", err);
      setIsLoading(false);

      // Close the dialog if there's an error
      if (onSuccess) {
        onSuccess();
      }
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
          onClick={handleDelete}
          disabled={isLoading}
        >
          {isLoading ? "Deletando..." : "Deletar"}
        </button>
      </div>
    </div>
  );
}
