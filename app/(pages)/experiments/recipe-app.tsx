"use client";

import { useState } from "react";
import Header from "../recipes/components/header";
import RecipeGrid from "../recipes/components/recipe-grid";
import SearchBar from "../recipes/components/search-bar";
import BottomNavigation from "./bottom-navigation";

export default function RecipeApp() {
  const [activeTab, setActiveTab] = useState("receitas");

  const recipes = Array(4).fill({
    title: "Pastinha de Alho Poró com Tomates Assados",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Home%20%28Receitas%29-rGPCFvIlEsdbZINKwDWmzPefCgVs6E.png",
    time: "30 min",
  });

  return (
    <div className="flex flex-col h-screen bg-[#f9f5f0]">
      <Header title="Receitas" href="yago" />
      <SearchBar placeholder="Pesquisar receitas" />

      <div className="flex-1 overflow-auto px-5 pb-20">
        <RecipeGrid recipes={recipes} />
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
