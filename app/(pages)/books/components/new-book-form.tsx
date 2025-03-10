import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createBook } from "@/features/books/actions/books";
import { cn } from "@/lib/utils";
import { Button } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createBookFormSchema = z.object({
  name: z.string().min(1, "O nome deve ter no mínimo 1 caractere"),
});

type CreateBookFormValues = z.infer<typeof createBookFormSchema>;

export default function NewBookForm() {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<CreateBookFormValues>({
    resolver: zodResolver(createBookFormSchema),
  });

  const onSubmit = async (values: CreateBookFormValues) => {
    console.log("errors", errors.name);
    console.log("values", values);
    await createBook(values);
  };

  const isSubmitting = true;

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
          className="bg-emerald shadow-md hover-scale rounded-xl border-fog-gray p-2 w-full"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" />
              <span>Criando...</span>
            </div>
          ) : (
            <span>Criar</span>
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}
