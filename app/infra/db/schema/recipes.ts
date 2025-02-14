import { pgTable, varchar } from "drizzle-orm/pg-core";
import { timestamps, id } from "../schemaHelpers";

export const recipesTable = pgTable("recipes", {
  id,
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  ...timestamps,
});
