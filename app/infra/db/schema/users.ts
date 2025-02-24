import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { id, timestamps } from "../schemaHelpers";
import { UserRecipeTable } from "./userRecipe";

export const UserTable = pgTable("users", {
  id,
  clerkUserId: text().notNull().unique(),
  email: text().notNull(),
  name: text().notNull(),
  imageUrl: text(),
  ...timestamps,
});

export const UserRelations = relations(UserTable, ({ many }) => ({
  userRecipes: many(UserRecipeTable),
}));

export type InsertUser = typeof UserTable.$inferInsert;
