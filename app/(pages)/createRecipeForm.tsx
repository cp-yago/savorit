"use client";
import { CustomButton } from "@/components/CustomButton";
import { Input } from "@/components/ui/input";
import { createRecipe } from "@/features/recipes/actions/recipes";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const createRecipeFormSchema = z.object({
  url: z
    .string()
    .regex(
      /^https:\/\/www\.instagram\.com\/p\/[a-zA-Z0-9_-]+\/$/,
      "A URL deve ser um link válido do Instagram",
    ),
});

type CreateRecipeFormValues = z.infer<typeof createRecipeFormSchema>;

export default function CreateRecipeForm() {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<CreateRecipeFormValues>({
    resolver: zodResolver(createRecipeFormSchema),
  });

  const onSubmit: SubmitHandler<CreateRecipeFormValues> = async (
    values: CreateRecipeFormValues,
  ) => {
    console.log("values", values);
    console.log("errors", errors);
    await createRecipe({
      sourceUrl: values.url,
    });
  };

  return (
    <form
      className="flex flex-col justify-between items-center my-5 w-80 h-30"
      onSubmit={handleSubmit(onSubmit)}
    >
      <motion.div
        className="w-full"
        animate={errors.url ? { x: [-5, 5, -5, 5, 0] } : { x: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Input
          {...register("url")}
          type="text"
          placeholder="Ex: https://www.instagram.com/p/..."
          className={cn(
            "h-12 w-full",
            errors.url
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500",
          )}
          onBlur={() => trigger("url")}
        />
      </motion.div>
      {errors.url && (
        <p className="text-xs text-red-600">{errors.url.message}</p>
      )}
      <CustomButton
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 mt-2 shadow-md transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer"
      >
        <Image
          src="icons/instagram.svg"
          alt="Instagram icon"
          width={24}
          height={24}
        />
        Salvar Receita
      </CustomButton>
    </form>
  );
}
