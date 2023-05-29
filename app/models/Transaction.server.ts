import { prisma } from "~/services/db.server";

import type {
  TransactionType,
  Transaction,
  Account,
  Bank,
  User,
} from "@prisma/client";
import { Direction, TransactionStatus } from "@prisma/client";

export async function createTransaction({
  amount,
  direction,
  transType,
  accountId,
  charges,
  bankId,
  destinationAccount,
}: Omit<Transaction, "id"> & {
  accountId: Account["id"];
  bankId?: Bank["id"];
  charges?: number;
  destinationAccount?: string;
}) {
  const CHARGES_ACCOUNT_NAME = "Charges Business Account";
  const businessAccount = await prisma.account.findFirst({
    where: { name: CHARGES_ACCOUNT_NAME },
  });

  if (!businessAccount) {
    throw new Error("Charges business account not found.");
  }

  const transaction = await prisma.transaction.create({
    data: {
      amount,
      direction,
      transType,
      status: TransactionStatus.PENDING,
      charges: charges ?? 0,
      destinationAccount,
      Account: {
        connect: {
          id: accountId,
        },
      },
      Bank: bankId
        ? {
            connect: {
              id: bankId,
            },
          }
        : undefined,
    },
  });

  // Update the balance of the account involved in the transaction.
  const account = await prisma.account.update({
    where: { id: accountId },
    data: {
      balance: { increment: direction === Direction.IN ? amount : -amount },
    },
  });

  // Update the balance of the charges business account.
  await prisma.account.update({
    where: { id: businessAccount.id },
    data: { balance: { increment: charges ?? 0 } },
  });

  return transaction;
}

export async function updateTransaction({
  transactionId,
  newStatus,
  newAmount,
}: {
  transactionId: number;
  newStatus: TransactionStatus;
  newAmount?: number;
}) {
  // Fetch the existing transaction
  const transaction = await prisma.transaction.findUnique({
    where: { id: transactionId },
  });

  if (!transaction) {
    throw new Error(`Transaction with ID ${transactionId} does not exist.`);
  }

  // Calculate the balance adjustment based on the new status
  let balanceAdjustment: number;
  switch (newStatus) {
    case TransactionStatus.SUCCESS:
      balanceAdjustment =
        transaction.direction === "OUT"
          ? -transaction.amount
          : transaction.amount;
      break;
    case TransactionStatus.REVERSED:
    case TransactionStatus.DECLINED:
      balanceAdjustment =
        transaction.direction === "OUT"
          ? transaction.amount
          : -transaction.amount;
      break;
    default:
      throw new Error(`Unsupported transaction status: ${newStatus}`);
  }

  // Update the transaction and the account balance in a transaction to ensure atomicity
  await prisma.$transaction([
    prisma.transaction.update({
      where: { id: transactionId },
      data: { status: newStatus, amount: newAmount ?? transaction.amount },
    }),
    prisma.account.update({
      where: { id: transaction.accountId },
      data: { balance: { increment: balanceAdjustment } },
    }),
  ]);

  // Return the updated transaction
  return prisma.transaction.findUnique({
    where: { id: transactionId },
  });
}

// This function uses a Prisma transaction (prisma.$transaction())
// to ensure that the transaction update and account balance update
// are atomic, i.e., either both succeed or both fail.This helps prevent
// data inconsistencies.

// listAllAccounts function:
export async function listAllTransactions(accountId: Account["id"]) {
  return prisma.transaction.findMany({
    where: { accountId: accountId },
  });
}

export async function getTransactionsByAccountAndUser({
  accountId,
  userId,
}: {
  accountId: number;
  userId: string;
}): Promise<Transaction[]> {
  return prisma.transaction.findMany({
    where: {
      accountId: accountId,
      Account: {
        userId: userId,
      },
    },
    include: {
      Account: true,
    },
  });
}
