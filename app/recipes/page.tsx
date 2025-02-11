import RoundButton from "@/components/roundButton";
import { Input } from "@/components/ui/input";
import React from "react";

const RecipeList: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <header className="flex flex-row justify-between w-full py-4 px-5">
        <h1 className="text-2xl">Receitas</h1>
        <RoundButton icon="plus" />
      </header>
      <div>
        <Input
          type="text"
          placeholder="Pesquisar receitas"
          className="w-80"
          icon={(
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          )}
        />
      </div>
      <main>
        <div>Receitas</div>
      </main>
    </div>
  );
};

export default RecipeList;


