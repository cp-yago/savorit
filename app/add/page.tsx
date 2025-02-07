import React from "react";
import { albert_sans, geist_mono } from "../styles/fonts";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-2">
      <h1 className={`${geist_mono.className} text-3xl font-bold text-center max-w-2xs mb-2`}>Salve receitas direto das redes sociais!</h1>
      <p className={`${albert_sans.className} text-gray-400 text-xl font-semibold text-center`}>
        Copie o link de uma receita do Instagram, Facebook, TikTok ou YouTube, e nós cuidamos do resto.</p>
      <p className="text-gray-400 text-lg font-semibold text-center mb-4">(Funciona melhor quando a receita está na legenda!)</p>
      <input type="text" placeholder="Ex: https://www.instagram.com/p/DFYf6I3vPQ7/" className="bg-white w-xs p-2 rounded-3xl border-2 border-solid border-black mb-2" />
      <button className="w-xs p-2 bg-mint-500 border-2 border-solid border-black rounded-3xl">Salvar Receita</button>
    </div>
  );
};

export default Home;
