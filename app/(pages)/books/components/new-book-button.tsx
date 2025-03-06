import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FaPlus } from "react-icons/fa6";

export default function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full border-2 py-2 w-10 h-10 shadow-md transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer"
        >
          <FaPlus className="text-foreground text-emerald min-w-fit w-8 h-8" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="font-bold">Criar livro</DialogTitle>
          <DialogDescription>
            Escolha um nome para o seu livro
          </DialogDescription>
        </DialogHeader>
        <div className="gap-4 py-4">
          <div className="">
            <Input
              id="name"
              placeholder="Ex: Sobremesas, Café da manhã..."
              className="col-span-3 w-full"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-emerald">
            Criar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
