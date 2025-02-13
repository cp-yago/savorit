import InstagramIcon from "@/components/icons/instagram";
import RoundButton from "@/components/roundButton";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

const RecipeCard: React.FC = () => {
  return (
    <div className="flex flex-col items-center rounded-2xl border-2 p-2 shadow-md transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-white/10 cursor-pointer">
      <Image
        src="https://i.imgur.com/VIPsEYg.png"
        alt="Pastinha de alho poró"
        className="w-[150px]"
        width={150}
        height={150}
      />
      <h2 className="text-sm my-1">
        Pastinha de Alho Poró com Tomates Assados
      </h2>
      <div className="flex justify-between w-full">
        <Badge className="rounded-full bg-soft-pink">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75-9.75-4.365-9.75-9.75S6.615 2.25 12 2.25zM12 7.5v4.5h3"
            />
          </svg>
          <span className="font-semibold">30 min</span>
        </Badge>
        <InstagramIcon />
      </div>
    </div>
  );
};

const RecipeList: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <header className="flex flex-col justify-between w-full py-4 px-5 sticky top-0 bg-peach-cream z-10">
        <div className="flex justify-between items-center py-2">
          <h1 className="text-2xl">Receitas</h1>
          <RoundButton icon="plus" />
        </div>
        <Input
          type="text"
          placeholder="Pesquisar receitas"
          className="w-80 sm:w-full"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          }
        />
      </header>

      <main className="flex-1 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 p-2 overflow-auto">
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
      </main>
    </div>
  );
};

export default RecipeList;
