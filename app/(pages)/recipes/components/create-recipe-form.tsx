"use client";
import { CustomButton } from "@/components/CustomButton";
import InstagramIcon from "@/components/icons/instagram";
import { Input } from "@/components/ui/input";
import { createRecipe } from "@/features/recipes/actions/recipes";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const createRecipeFormSchema = z.object({
  url: z
    .string()
    .regex(
      /^https:\/\/www\.instagram\.com\/(p|reel)\/[a-zA-Z0-9_-]+\/?(\?.*)?$/,
      "A URL deve ser um link válido do Instagram (post ou reel)",
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
            "h-12 w-full py-3 pl-10 pr-4 bg-white border-2 border-fog-gray rounded-full focus:outline-none",
            errors.url
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300",
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
        className="w-full h-12 mt-2 shadow-md hover-scale border-fog-gray"
      >
        {isSubmitting ? (
          <Loader2 className="animate-spin" />
        ) : (
          <InstagramIcon />
        )}
        Salvar Receita
      </CustomButton>
    </form>
  );
}
