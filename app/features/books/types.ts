import { SelectBook } from "@/infra/db/schema";

export type UiBook = Omit<SelectBook, "title"> & {
  bookToRecipes?: { id: string }[];
  images: string[];
};
