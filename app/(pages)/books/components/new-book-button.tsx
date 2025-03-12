"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { FaPlus } from "react-icons/fa";
import RoundButtonWithIcon from "@/components/round-button-with-icon";
import NewBookForm from "./new-book-form";

export default function NewBookButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <RoundButtonWithIcon icon="plus" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white border-fog-gray">
        <DialogHeader>
          <DialogTitle className="font-bold">Criar livro</DialogTitle>
          <DialogDescription className="text-gray">
            Escolha um nome para o seu livro
          </DialogDescription>
        </DialogHeader>
        <NewBookForm />
      </DialogContent>
    </Dialog>
  );
}
