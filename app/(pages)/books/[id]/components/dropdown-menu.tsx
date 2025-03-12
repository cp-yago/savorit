"use client";

import { OptionItem, OptionsDropdown } from "@/components/options-dropdown";
import RoundButtonWithIcon from "@/components/round-button-with-icon";
import { Edit3, Trash2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import DeleteBookDialog from "./delete-book-dialog";
import RenameBookForm from "./rename-book-form";

const RecipesList = dynamic(() => import("./recipe-list-for-book"), {
  ssr: false,
  loading: () => <div className="py-4 text-center">Carregando receitas...</div>,
});

interface BookDropdownMenuProps {
  bookId: string;
  bookName: string;
}

export default function BookDropdownMenu({
  bookId,
  bookName,
}: BookDropdownMenuProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedOption(null);
  };

  const options: OptionItem[] = [
    {
      icon: <FaPlus className="w-4 h-4 text-green-500" />,
      label: "Adicionar receita",
      action: {
        type: "dialog",
        title: "Adicionar receita",
        description: "Selecione as receitas que deseja adicionar ao livro",
        content: <RecipesList bookId={bookId} onSuccess={handleCloseDialog} />,
      },
    },
    {
      icon: <Edit3 className="w-4 h-4 text-gray-500" />,
      label: "Renomear",
      action: {
        type: "dialog",
        title: "Renomear livro",
        description: "Altere o nome do seu livro",
        content: (
          <RenameBookForm
            bookId={bookId}
            currentName={bookName}
            onSuccess={handleCloseDialog}
          />
        ),
      },
    },
    {
      icon: <Trash2 className="w-4 h-4 text-red-500" />,
      label: "Deletar livro",
      action: {
        type: "dialog",
        title: "Deletar livro",
        description: "Tem certeza que deseja deletar este livro? Esta ação não pode ser desfeita.",
        content: <DeleteBookDialog bookId={bookId} onSuccess={handleCloseDialog} />,
      },
    },
  ];

  return (
    <OptionsDropdown
      options={options}
      isDialogOpen={isDialogOpen}
      setIsDialogOpen={setIsDialogOpen}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
      triggerButton={<RoundButtonWithIcon icon="three-dots-vertical" />}
    />
  );
}
