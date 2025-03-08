import { SelectRecipe } from "@/infra/db/schema";

export type UiRecipe = Omit<SelectRecipe, "title"> & {
  title: string;
  timeToCookInMinutes: number;
};
