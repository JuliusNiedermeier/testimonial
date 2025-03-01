import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const spaceTable = pgTable("space", {
  id: uuid().primaryKey(),
  title: text().notNull(),
});
