"use client";

import { OptionItem, OptionsDropdown } from "@/components/options-dropdown";
import { Button } from "@/components/ui/button";
import { Edit3 } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
// import AddRecipeToBookDialog from "./add-recipe-to-book-dialog";
const RecipesList = dynamic(() => import("./recipe-list-for-book"), {
  ssr: false,
  loading: () => <div className="py-4 text-center">Carregando receitas...</div>,
});


interface BookDropdownMenuProps {
  bookId: string;
}

export default function BookDropdownMenu({ bookId }: BookDropdownMenuProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  // Função para fechar o dialog
  const handleSuccess = () => {
    setDialogOpen(false);
  };

  const options: OptionItem[] = [
    {
      icon: <FaPlus className="text-foreground text-emerald min-w-fit w-8 h-8" />,
      label: "Adicionar receita",
      action: {
        type: "dialog",
        title: "Adicionar receita",
        description: "Adicione uma receita ao livro",
        content: <RecipesList bookId={bookId} onSuccess={handleSuccess} />
      },
    },
    {
      icon: <Edit3 className="w-4 h-4 text-gray-500" />,
      label: "Renomear",
      action: { type: "action", onClick: () => { } },
    },
  ];

  return (
    <OptionsDropdown
      options={options}
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      triggerButton={
        <Button
          variant="ghost"
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-fog-gray hover-scale focus:outline-none focus:ring-0 focus:border-fog-gray"
        >
          <FaPlus className="text-foreground text-emerald min-w-fit w-8 h-8" />
        </Button>
      }
    />
  );
}
