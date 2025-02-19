import RoundButton from "@/components/roundButton";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const RecipeStatusPage = () => {
  return (
    <div>
      <header className="relative h-[33svh] overflow-hidden">
        <RoundButton
          icon="back"
          className="absolute z-10 bg-white top-3 left-3"
          redirectTo="recipes"
        />
        <Skeleton className="h-[33svh] w-full bg-gray-300" />
      </header>
      <main className="h-min-[33vh] py-2 px-4">
        <Skeleton className="h-[30px] w-1/2 rounded-xl bg-gray-300" />
        <div className="py-2">
          <Skeleton className="h-[30px] w-1/2 rounded-xl bg-gray-300" />
          <Skeleton className="mt-2 h-[100px] w-full rounded-xl bg-gray-300" />
        </div>
        <div className="w-full mb-4">
          <Skeleton className="mt-2 h-[40px] w-full rounded-xl bg-gray-300" />
          <Skeleton className="mt-2 h-[150px] w-full rounded-xl bg-gray-300" />
        </div>
      </main>
    </div>
  );
};

export default RecipeStatusPage;
