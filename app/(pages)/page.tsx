"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Logo from "@/components/ui/logo";
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { insertRecipe } from "@/features/recipes/actions/recipes";


const createRecipeFormSchema = z.object({
  url: z.string().regex(
    /^https:\/\/www\.instagram\.com\/p\/[a-zA-Z0-9_-]+\/$/,
    "A URL deve ser um link válido do Instagram"
  )
});

type CreateRecipeFormValues = z.infer<typeof createRecipeFormSchema>

const Home: React.FC = () => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<CreateRecipeFormValues>({
    resolver: zodResolver(createRecipeFormSchema)
  })

  const onSubmit: SubmitHandler<CreateRecipeFormValues> = async (values: CreateRecipeFormValues) => {
    console.log(values)
    console.log(errors)
    const data = await insertRecipe({
      sourceUrl: values.url
    });
    console.log(data)
  };

  return (
    <div className="flex flex-col items-center  bg-red-100 p-4 min-h-dvh">
      <Logo className="mb-6" />
      <h1 className="text-2xl text-center sm:w-80 mt-4">
        Salve receitas direto do Instagram!
      </h1>
      <div className="w-80 my-5">
        <p className="text-gray text-center font-semibold ">
          Copie o link de uma receita do Instagram e nós cuidamos do resto.
        </p>
        <p className="text-gray text-center font-semibold mt-2">
          (Funciona melhor quando a receita está na legenda!)
        </p>
      </div>
      <form
        className="flex flex-col justify-between items-center my-5 w-80 h-30"
        onSubmit={handleSubmit(onSubmit)}>
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
                : "border-gray-300 focus:ring-blue-500"
            )}
            onBlur={() => trigger("url")}
          />
        </motion.div>
        {errors.url && (
          <p className="text-xs text-red-600">{errors.url.message}</p>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 mt-2 shadow-md transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer">
          <Image
            src="icons/instagram.svg"
            alt="Instagram icon"
            width={24}
            height={24}
          />
          Salvar Receita
        </Button>
      </form>
    </div>
  );
};

export default Home;
