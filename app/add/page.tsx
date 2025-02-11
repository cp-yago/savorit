import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Logo from "@/components/ui/logo";
import BottomNavigation from "@/components/bottomNavigation";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-red-100 p-4 min-h-dvh">
      <Logo />
      <h1 className="text-3xl text-center sm:w-80">
        Salve receitas direto das redes sociais!
      </h1>
      <div className="w-80 my-5">
        <p className="text-gray text-center font-semibold ">
          Copie o link de uma receita do Instagram e nós cuidamos do resto.
        </p>
        <p className="text-gray text-center font-semibold mt-2">
          (Funciona melhor quando a receita está na legenda!)
        </p>
      </div>
      <div>
        <Image
          src="icons/instagram.svg"
          alt="Instagram icon"
          width={24}
          height={24}
        />
      </div>
      <div className="flex flex-col justify-between my-5 w-80 h-30">
        <Input
          type="text"
          placeholder="Cole o link da receita aqui"
          className="h-12"
        />
        <Button className="w-full h-12">Salvar Receita</Button>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Home;
