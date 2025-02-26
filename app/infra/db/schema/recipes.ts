import { relations } from "drizzle-orm";
import {
  json,
  pgEnum,
  pgTable,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { z } from "zod";
import { id, timestamps } from "../schemaHelpers";
import { UsersTable } from "./users";

export const statusEnum = pgEnum("status", ["error", "pending", "done"]);

export const ingredientsSchema = z.array(
  z.object({
    name: z.string(),
    quantity: z.string().nullable(),
    unit: z.string().nullable(),
  }),
);

export const instructionsSchema = z.array(
  z.object({
    step: z.number(),
    description: z.string(),
  }),
);

export type IngredientsType = z.infer<typeof ingredientsSchema>;

export type InstructionsType = z.infer<typeof instructionsSchema>;

export const RecipesTable = pgTable("recipes", {
  id,
  userId: uuid().notNull(),
  title: varchar({ length: 255 }),
  description: varchar({ length: 255 }),
  imageUrl: text(),
  sourceUrl: varchar({ length: 255 }).notNull(),
  ingredients: json().$type<IngredientsType>(),
  instructions: json().$type<InstructionsType>(),
  status: statusEnum().default("pending"),
  ...timestamps,
});

export const recipesRelations = relations(RecipesTable, ({ one }) => ({
  author: one(UsersTable, {
    fields: [RecipesTable.userId],
    references: [UsersTable.id],
  }),
}));

export type InsertRecipe = typeof RecipesTable.$inferInsert;

export type SelectRecipe = typeof RecipesTable.$inferSelect;
