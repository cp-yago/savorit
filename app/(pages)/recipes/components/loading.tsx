import RoundButtonWithIcon from "@/components/round-button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
export function CardSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[150px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="flex flex-col items-center gap-4">
      <header className="flex flex-col justify-between w-full py-4 px-5 sticky top-0 bg-peach-cream z-10">
        <div className="flex justify-between items-center py-2">
          <h1 className="text-xl">Carregando Receitas</h1>
          <Link href="/recipes">
            <RoundButtonWithIcon icon="plus" />
          </Link>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 p-2 overflow-auto mb-16">
        {Array.from({ length: 3 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </main>
    </div>
  );
}
