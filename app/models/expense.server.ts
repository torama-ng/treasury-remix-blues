import type { User, Expense } from "@prisma/client";

import { prisma } from "~/services/db.server";

export type { Expense } from "@prisma/client";

export function getExpense({
  id,
  userId,
}: Pick<Expense, "id"> & {
  userId: User["id"];
}) {
  return prisma.expense.findFirst({
    select: { id: true, body: true, title: true },
    where: { id, userId },
  });
}

export function getExpenseListItems({ userId }: { userId: User["id"] }) {
  return prisma.expense.findMany({
    where: { userId },
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createExpense({
  body,
  title,
  userId,
}: Pick<Expense, "body" | "title"> & {
  userId: User["id"];
}) {
  return prisma.expense.create({
    data: {
      title,
      body,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteExpense({
  id,
  userId,
}: Pick<Expense, "id"> & { userId: User["id"] }) {
  return prisma.expense.deleteMany({
    where: { id, userId },
  });
}
