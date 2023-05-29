-- CreateEnum
CREATE TYPE "ExpenseStatus" AS ENUM ('DRAFT', 'REVIEWED', 'APPROVED', 'REJECTED', 'PAID');

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "expenseId" TEXT,
ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "authType" TEXT,
ADD COLUMN     "displayName" TEXT,
ADD COLUMN     "firebaseUID" TEXT,
ADD COLUMN     "photoURL" TEXT;

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "expense_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "products" JSONB[],
    "category" TEXT,
    "expenseAccount" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "txn_amount" DOUBLE PRECISION NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "remarks" TEXT,
    "status" "ExpenseStatus" NOT NULL,
    "statusHistory" JSONB[],
    "company" TEXT NOT NULL,
    "site" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "vendorId" TEXT,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vendor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "remarks" TEXT,
    "account" TEXT,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayHistory" (
    "id" TEXT NOT NULL,
    "bankAcct" TEXT NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "memo" TEXT NOT NULL,
    "paidAmount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "payer" TEXT NOT NULL,
    "expenseId" TEXT,

    CONSTRAINT "PayHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayHistory" ADD CONSTRAINT "PayHistory_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE SET NULL ON UPDATE CASCADE;
