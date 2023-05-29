import type { User, Expense, Vendor } from "@prisma/client";

import { prisma } from "~/services/db.server";

export type { Expense } from "@prisma/client";

export async function getExpense(expenseId: Expense["id"]) {
  return await prisma.expense.findUnique({
    where: {
      id: expenseId,
    },
    include: {
      user: true,
      vendor: true,
      payHistory: true,
      notes: true,
    },
  });
}

export function getExpenseListItems({ userId }: { userId: User["id"] }) {
  return prisma.expense.findMany({
    where: { userId },
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getAllExpenses() {
  const expenses = await prisma.expense.findMany({
    include: {
      user: true,
      vendor: true,
      payHistory: true,
      notes: true,
    },
  });

  return expenses;
}

export async function getUserExpenses(userId: User["id"]) {
  const expenses = await prisma.expense.findMany({
    where: {
      userId: userId,
    },
    include: {
      user: true,
      vendor: true,
      payHistory: true,
      notes: true,
    },
  });

  return expenses;
}

export function createExpense({
  title,
  products,
  vendorId,
  category,
  expenseAccount,
  type,
  txn_amount,
  balance,
  remarks,
  status,
  company,
  site,
  userId,
}: Pick<
  Expense,
  | "title"
  | "products"
  | "vendorId"
  | "category"
  | "expenseAccount"
  | "type"
  | "txn_amount"
  | "balance"
  | "remarks"
  | "status"
  | "company"
  | "site"
> & {
  userId: User["id"];
  vendorId?: Vendor["id"];
}) {
  return prisma.expense.create({
    data: {
      title,
      products,
      category,
      expenseAccount,
      type,
      txn_amount,
      balance,
      remarks,
      status,
      company,
      site,
      user: {
        connect: {
          id: userId,
        },
      },
      vendor: {
        connect: {
          id: vendorId,
        },
      },
    },
  });
}


export async function updateExpense(
  expenseId: Expense["id"],
  updatedExpenseData: Partial<Expense>
) {
  const existingExpense = await prisma.expense.findUnique({
    where: {
      id: expenseId,
    },
  });

  if (!existingExpense) {
    throw new Error(`No expense found for ID ${expenseId}`);
  }

  const updatedExpense = await prisma.expense.update({
    where: {
      id: expenseId,
    },
    data: updatedExpenseData,
  });

  return updatedExpense;
}

export function deleteExpense({
  id,
  userId,
}: Pick<Expense, "id"> & { userId: User["id"] }) {
  return prisma.expense.deleteMany({
    where: { id, userId },
  });
}
