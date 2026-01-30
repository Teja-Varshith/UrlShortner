import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable('users', {
    id: uuid().primaryKey().defaultRandom(),
    firstName: varchar('first_name', {length: 30}).notNull(),
    lastName: varchar('last_name', {length: 30}).notNull(),
    email: varchar({length: 255}).notNull().unique(),
    password: text().notNull(),
    salt: text().notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
});