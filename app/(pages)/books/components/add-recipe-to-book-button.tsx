'use client';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

const RecipesList = dynamic(() => import('./recipe-list-for-book'), {
  ssr: false,
  loading: () => <div className="py-4 text-center">Carregando receitas...</div>
});

interface AddRecipeToBookButtonProps {
  bookId: string;
}

export default function AddRecipeToBookButton({ bookId }: AddRecipeToBookButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-fog-gray hover-scale"
        >
          <FaPlus className="text-foreground text-emerald min-w-fit w-8 h-8" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-soft-peach border-fog-gray">
        <DialogHeader>
          <DialogTitle className="font-bold">Adicionar receitas</DialogTitle>
          <DialogDescription className="text-gray">
            Selecione as receitas que deseja adicionar ao livro
          </DialogDescription>
        </DialogHeader>

        {isOpen && (
          <RecipesList bookId={bookId} />
        )}
      </DialogContent>
    </Dialog>
  )
}