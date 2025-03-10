import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { id, timestamps } from "../schemaHelpers";
import { BooksTable } from "./books";
import { RecipesTable } from "./recipes";

export const UsersTable = pgTable("users", {
  id,
  clerkUserId: text().notNull().unique(),
  email: text().notNull(),
  name: text().notNull(),
  imageUrl: text(),
  ...timestamps,
});

export const usersRelations = relations(UsersTable, ({ many }) => ({
  recipes: many(RecipesTable),
  books: many(BooksTable),
}));

export type InsertUser = typeof UsersTable.$inferInsert;
