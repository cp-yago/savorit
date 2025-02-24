import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "../schemaHelpers";
import { RecipesTable } from "./recipes";
import { UserTable } from "./users";

export const UserRecipeTable = pgTable(
  "user_recipe",
  {
    userId: uuid()
      .notNull()
      .references(() => UserTable.id, { onDelete: "cascade" }),
    recipeId: uuid()
      .notNull()
      .references(() => RecipesTable.id, { onDelete: "cascade" }),
    ...timestamps,
  },
  (t) => [primaryKey({ columns: [t.userId, t.recipeId] })],
);
