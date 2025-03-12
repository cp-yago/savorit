"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { renameBook } from "@/features/books/actions/books";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface RenameBookFormProps {
  bookId: string;
  currentName: string;
  onSuccess: () => void;
}

export default function RenameBookForm({
  bookId,
  currentName,
  onSuccess,
}: RenameBookFormProps) {
  const [bookName, setBookName] = useState(currentName);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bookName.trim()) {
      setError("O nome do livro é obrigatório");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await renameBook(bookId, bookName);
      router.refresh();
      onSuccess();
    } catch (error) {
      console.error("Failed to rename book:", error);
      setError("Falha ao renomear o livro");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input
          id="bookName"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          placeholder="Nome do livro"
          className="w-full"
          autoFocus
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || !bookName.trim()}
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
      >
        {isSubmitting ? "Salvando..." : "Salvar"}
      </Button>
    </form>
  );
}
