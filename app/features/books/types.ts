import { SelectBook } from "@/infra/db/schema";

export type BookToRecipeRelation = {
  bookId: string;
  recipeId: string;
  recipe: {
    id: string;
    imageUrl: string | null;
    title?: string | null;
    // Outros campos da receita podem ser adicionados conforme necessário
  };
};

export type UiBook = Omit<SelectBook, "title"> & {
  bookToRecipes?: BookToRecipeRelation[];
  images: string[];
};

export type BookWithRecipes = SelectBook & {
  bookToRecipes?: BookToRecipeRelation[];
};
