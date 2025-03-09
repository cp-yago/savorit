import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPlus } from "react-icons/fa6";
import AddRecipeToBookForm from './add-recipe-to-book-form';

export default function AddRecipeToBookButton({ bookId }: { bookId: string }) {
  return (
    <Dialog>
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
        <AddRecipeToBookForm />
      </DialogContent>
    </Dialog>
  )
}