import BackSpaceIcon from "@/components/icons/back-space";
import EllipsisVertical from "@/components/icons/ellipsis-vertical";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteRecipeById } from "@/features/recipes/actions/recipes";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import { ReactNode, useTransition } from "react";

function LoadingTextSwap({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: ReactNode;
}) {
  return (
    <div className="grid items-center justify-items-center">
      <div
        className={cn(
          "col-start-1 col-end-2 row-start-1 row-end-2",
          isLoading ? "invisible" : "visible",
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "col-start-1 col-end-2 row-start-1 row-end-2 text-center",
          isLoading ? "visible" : "invisible",
        )}
      >
        <Loader2Icon className="animate-spin" />
      </div>
    </div>
  );
}

export default function DeleteRecipeDialog({
  className,
  recipeId,
}: {
  className?: string;
  recipeId: string;
}) {
  const [isLoading, startTransition] = useTransition();
  function performAction() {
    startTransition(async () => {
      await deleteRecipeById(recipeId);
    });
  }

  return (
    <AlertDialog open={isLoading ? true : undefined}>
      <div className={className}>
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full bg-white border-2 p-2 shadow-md transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer">
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border-2 rounded-lg shadow-md">
            <DropdownMenuLabel>Opções</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex justify-between">
              <AlertDialogTrigger asChild>
                <button className="flex w-full justify-between">
                  Deletar
                  <BackSpaceIcon />
                </button>
              </AlertDialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            onClick={performAction}
            className="bg-red-500 text-white"
          >
            <LoadingTextSwap isLoading={isLoading}>Sim</LoadingTextSwap>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
