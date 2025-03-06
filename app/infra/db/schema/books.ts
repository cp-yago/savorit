import { relations } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { id, timestamps } from "../schemaHelpers";
import { BooksToRecipes } from "./books-to-recipes";
import { UsersTable } from "./users";

export const BooksTable = pgTable("books", {
  id,
  name: varchar({ length: 255 }),
  userId: uuid().notNull(),
  ...timestamps,
});

export const BooksRelations = relations(BooksTable, ({ one, many }) => ({
  owner: one(UsersTable, {
    fields: [BooksTable.userId],
    references: [UsersTable.id],
  }),
  bookToRecipes: many(BooksToRecipes),
}));
