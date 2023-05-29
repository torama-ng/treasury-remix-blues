import { prisma } from "~/services/db.server";
import { AccountStatus, AccountType } from "@prisma/client";
import type { Account, User } from "@prisma/client";



export async function createAccount({
  name,
  accountType,
  userId,
}: Pick<Account, "name" | "accountType"> & {
  userId: User["id"];
}) {
  const userAccounts = await prisma.account.findMany({
    where: { userId: userId },
  });

  if (userAccounts.length >= 10) {
    throw new Response(
      "User cannot have more than 10 accounts.",
      {
        status: 400,
        statusText: "User cannot have more than 10 accounts.",
      }
    )
  }

  // Then, check if an account with the same name and type already exists
  const doesAccountExist = userAccounts.some(
    (account) => account.name === name && account.accountType === accountType
  );

  // If the account exists, throw an error
  if (doesAccountExist) {
    // throw new Error("An account with the same name and type already exists");

    throw new Response(
      "An account with the same name and type already exists.",
      {
        status: 400,
        statusText: "An account with the same name and type already exists.",
      }
    );
  }

  // if (
  //   userAccounts.some((account) => account.status === AccountStatus.PENDING)
  // ) {
  //   throw new Error(
  //     "User cannot create a new account while there is a pending account."
  //   );
  // }

  const accountNumber = Math.floor(
    1000000000 + Math.random() * 9000000000
  ).toString();

  return prisma.account.create({
    data: {
      name,
      accountNumber,
      accountType,
      User: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function getAccount({
  id,
  userId,
}: Pick<Account, "id"> & {
  userId: User["id"];
}) {
  return prisma.account.findFirst({
    select: {
      id: true,
      name: true,
      accountNumber: true,
      accountType: true,
      balance: true,
      createdAt: true,
      status: true,
      userId: true,
      
    },
    where: { id, userId },
  });
}


export async function updateAccount(
  id: number,
  {
    name,
    accountType,
    status,
  }: Partial<Pick<Account, "name" | "accountType" | "status">>
) {
  return prisma.account.update({
    where: { id },
    data: {
      name: name,
      accountType: accountType,
      status: status,
    },
  });
}


// deleteAccount function: by an admin
export async function deleteAccount(accountId: Account["id"]) {
  return prisma.account.delete({
    where: { id: accountId },
  });
}



// modifyAccount function: by an admin
export async function modifyAccount(accountId: Account["id"], updates: Partial<Omit<Account, "id" | "createdAt" | "updatedAt">>) {
  return prisma.account.update({
    where: { id: accountId },
    data: updates,
  });
}

export async function deleteUserAccount(
  accountId: Account["id"],
  userId: User["id"]
) {
  const account = await prisma.account.findUnique({ where: { id: accountId } });

  if (!account) {
    throw new Error("No such account found");
  }

  if (account.userId !== userId) {
    throw new Error("Not authorized");
  }

  return prisma.account.delete({
    where: { id: accountId },
  });
}


// listAllAccounts function:
export async function listAllAccounts(userId: User["id"]) {
  return prisma.account.findMany({
    where: { userId: userId },
  });
}

