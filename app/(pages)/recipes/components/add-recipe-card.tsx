import PlusIcon from "@/components/icons/plus";
import Link from "next/link";

export default function AddRecipeCard() {
  return (
    <Link href={`recipes/new`} className="block">
      <div className="h-65 flex flex-col items-center justify-center rounded-2xl border-2 p-1 shadow-md transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-white/10 cursor-pointer">
        <div className="border-2 rounded-full p-1 mb-2">
          <PlusIcon />
        </div>
        <h2 className="text-sm text-center">Adicionar Receita</h2>
      </div>
    </Link>
  );
}
