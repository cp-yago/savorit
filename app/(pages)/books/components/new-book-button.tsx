"use client";
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
import { createBook } from "@/features/books/actions/books";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import { z } from "zod";

const createBookFormSchema = z.object({
  name: z.string().min(1, "O nome deve ter no mínimo 1 caractere"),
});

type CreateBookFormValues = z.infer<typeof createBookFormSchema>;

function NewBookForm() {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<CreateBookFormValues>({
    resolver: zodResolver(createBookFormSchema),
  });

  const onSubmit = async (values: CreateBookFormValues) => {
    console.log("errors", errors.name);
    console.log("values", values);
    await createBook(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="gap-4 py-4">
        <motion.div
          className="w-full"
          animate={errors.name ? { x: [-5, 5, -5, 5, 0] } : { x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Input
            id="name"
            placeholder="Ex: Sobremesas, Café da manhã..."
            className={cn(
              "h-12 w-full",
              errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500",
            )}
            {...register("name")}
            onBlur={() => trigger("name")}
          />
        </motion.div>
        {errors.name && (
          <p className="text-sm text-red-600 mt-2">{errors.name.message}</p>
        )}
      </div>
      <DialogFooter>
        <Button
          type="submit"
          className="bg-emerald shadow-md transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              <span>Criando...</span>
            </>
          ) : (
            <span>Criar</span>
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default function NewBookButton() {
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
        <NewBookForm />
      </DialogContent>
    </Dialog>
  );
}
