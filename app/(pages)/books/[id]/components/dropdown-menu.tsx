"use client"

import { OptionItem, OptionsDropdown } from "@/components/options-dropdown";
import { Button } from "@/components/ui/button";
import { Edit3 } from "lucide-react";
import { FaPlus } from "react-icons/fa";

const options: OptionItem[] = [
  {
    icon: <Edit3 className="w-4 h-4 text-gray-500" />,
    label: "Renomear",
    action: { type: "action", onClick: () => { } },
  },
  // {
  //   icon: <Trash className="w-4 h-4 text-gray-500" />,
  //   label: "Excluir",
  //   action: { type: "action", onClick: () => { } },
  // },
  // {
  //   icon: <FaPlus className="text-foreground text-emerald min-w-fit w-8 h-8" />,
  //   label: "Adicionar receita",
  //   action: { type: "action", onClick: () => { } },
  // },
];


export default function BookDropdownMenu() {
  return <OptionsDropdown options={options} triggerButton={
    <Button
      variant="ghost"
      className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-fog-gray hover-scale focus:outline-none focus:ring-0 focus:border-fog-gray"
    >
      <FaPlus className="text-foreground text-emerald min-w-fit w-8 h-8" />
    </Button>
  } />
}