import { pgTable, varchar, json, pgEnum, text } from "drizzle-orm/pg-core";
import { timestamps, id } from "../schemaHelpers";
import { z } from "zod";

export const statusEnum = pgEnum("status", ["error", "pending", "done"]);

export const ingredientsSchema = z.array(
  z.object({
    name: z.string(),
    quantity: z.string(),
    unit: z.string().optional(),
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
  title: varchar({ length: 255 }),
  description: varchar({ length: 255 }),
  imageUrl: text(),
  sourceUrl: varchar({ length: 255 }).notNull(),
  ingredients: json().$type<IngredientsType>(),
  instructions: json().$type<InstructionsType>(),
  status: statusEnum().default("pending"),
  ...timestamps,
});

export type InsertRecipe = typeof RecipesTable.$inferInsert;

export type SelectRecipe = typeof RecipesTable.$inferSelect;
