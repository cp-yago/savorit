import { pgTable, varchar, json, pgEnum } from "drizzle-orm/pg-core";
import { timestamps, id } from "../schemaHelpers";

export const statusEnum = pgEnum("status", ["error", "pending", "done"]);

export const recipesTable = pgTable("recipes", {
  id,
  title: varchar({ length: 255 }),
  description: varchar({ length: 255 }),
  imageUrl: varchar({ length: 255 }),
  sourceUrl: varchar({ length: 255 }).notNull(),
  ingredients: json(),
  instructions: json(),
  status: statusEnum().default("pending"),
  ...timestamps,
});

export type InsertRecipe = typeof recipesTable.$inferInsert;
export type SelectRecipe = typeof recipesTable.$inferSelect;
