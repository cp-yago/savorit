import RoundButton from "@/components/rounded-link-button";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@radix-ui/react-progress";
import LoadingText from "./loading-text";

export default function RecipeStatusPage() {
  return (
    <div>
      <LoadingText className="text-center my-4 z-10" />
      <Progress value={33} />
      <header className="relative h-[33svh] overflow-hidden">
        <RoundButton
          icon="back"
          className="absolute z-10 bg-white top-3 left-3"
          pathOrUrl="/recipes"
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
}
