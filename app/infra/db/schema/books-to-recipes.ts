import { relations } from "drizzle-orm";
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { BooksTable } from "./books";
import { RecipesTable } from "./recipes";

export const BooksToRecipes = pgTable(
  "books_to_recipes",
  {
    bookId: uuid()
      .notNull()
      .references(() => BooksTable.id),
    recipeId: uuid()
      .notNull()
      .references(() => RecipesTable.id),
  },
  (t) => [primaryKey({ columns: [t.bookId, t.recipeId] })],
);

export const BookToRecipesRelations = relations(BooksToRecipes, ({ one }) => ({
  book: one(BooksTable, {
    fields: [BooksToRecipes.bookId],
    references: [BooksTable.id],
  }),
  recipe: one(RecipesTable, {
    fields: [BooksToRecipes.recipeId],
    references: [RecipesTable.id],
  }),
}));
