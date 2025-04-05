"use server"

import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db/index"
import { expense, expenseCategories, income, incomeCategories, users } from "@/db/schema";
import { and, eq } from "drizzle-orm";

//Helper current User
const getCurrentUserId = async () => {
    const user = await currentUser();
    if (!user) throw new Error("Unauthorized");

    await db.insert(users).values({ id: user.id }).onConflictDoNothing();

    return user.id;
};

//add Income Category
export const addIncomeCategory = async (name: string) => {
    const userId = await getCurrentUserId();
    await db.insert(incomeCategories).values({name,userId});
};

//add Expenses Category
export const addExpenseCategory = async (name: string) => {
    const userId = await getCurrentUserId();
    await db.insert(expenseCategories).values({name,userId});
};

//add Income
// Modified addIncome
export const addIncome = async (
    amount: number,
    categoryId: number,
    description: string,
    tanggal: Date
  ) => {
    const userId = await getCurrentUserId();
    await db.insert(income).values({ amount, categoryId, userId, description, tanggal });
  };


// Modified addExpense
export const addExpense = async (
    amount: number,
    categoryId: number,
    description: string,
    tanggal: Date
  ) => {
    const userId = await getCurrentUserId();
    await db.insert(income).values({ amount, categoryId, userId, description, tanggal });
  };

//get All Expenses Categories
export const getExpenseCategories = async () => {
    const userId = await getCurrentUserId();
    return await db.select()
    .from (expenseCategories)
    .where(eq(expenseCategories.userId,userId));
}; 

//get All Income Categories
export const getIncomeCategories = async () => {
    const userId = await getCurrentUserId();
    return await db.select()
    .from (incomeCategories)
    .where(eq(incomeCategories.userId,userId));
}; 

//get all expenses records with the category names
export const getExpenses = async () => {
    const userId = await getCurrentUserId();
    return await db
    .select({
        id:expense.id,
        amount:expense.amount,
        categoryId: expense.categoryId,
        category:expenseCategories.name,
        description: income.description,
        tanggal: income.tanggal,
        createdAt:expense.createdAt,
    })
    .from(expense)
    .innerJoin(expenseCategories, eq (expense.categoryId, expenseCategories.id))
    .where(and(
        eq(expense.userId, userId),
        eq(expenseCategories.userId, userId)
    ));
}

//get all income records with the category names
export const getIncome = async () => {
  const userId = await getCurrentUserId();
  return await db
    .select({
      id: income.id,
      amount: income.amount,
      categoryId: income.categoryId,
      category: incomeCategories.name,
      description: income.description,
      tanggal: income.tanggal,
      createdAt: income.createdAt,
    })
    .from(income)
    .innerJoin(incomeCategories, eq(income.categoryId, incomeCategories.id))
    .where(
      and(eq(income.userId, userId), eq(incomeCategories.userId, userId))
    );
};