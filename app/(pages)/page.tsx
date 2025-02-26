import Logo from "@/components/Logo";
import React from "react";
import CreateRecipeForm from "./createRecipeForm";

const Home: React.FC = () => {
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
      <CreateRecipeForm />
    </div>
  );
};

export default Home;
