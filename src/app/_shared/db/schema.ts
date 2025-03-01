import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const spaceTable = pgTable("space", {
  id: uuid().primaryKey().defaultRandom(),
  slug: text().notNull().unique(),
  title: text().notNull(),
});
