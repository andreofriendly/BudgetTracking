import { integer, pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
   id: varchar("id").primaryKey(),  //clerk user ID
});

export const incomeCategories = pgTable("income_categories",{
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    userId: varchar("user_id").notNull().references(() => users.id)
});

export const expenseCategories = pgTable("expense_categories",{
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    userId: varchar("user_id").notNull().references(() => users.id)
});

export const income = pgTable("income",{
    id: serial("id").primaryKey(),
    amount: integer("amount").notNull(),
    categoryId: integer("category_id").notNull().references(() => incomeCategories.id),
    userId: varchar("user_id").notNull().references(() => users.id),
    createdAt: timestamp("created_at").defaultNow(),
});

export const expense = pgTable("expenses",{
    id: serial("id").primaryKey(),
    amount: integer("amount").notNull(),
    categoryId: integer("category_id").notNull().references(() => expenseCategories.id),
    userId: varchar("user_id").notNull().references(() => users.id),
    createdAt: timestamp("created_at").defaultNow(),
});