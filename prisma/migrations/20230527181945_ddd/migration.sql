/*
  Warnings:

  - You are about to drop the column `expenseId` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `authType` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `chatId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `displayName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `firebaseUID` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `mailId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `photoURL` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CartItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Country` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Discount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Expense` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Kanban` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MailFolder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PayHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vendor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_userId_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userId_fkey";

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_cartId_fkey";

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_userId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_userId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "MailFolder" DROP CONSTRAINT "MailFolder_userId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_chatId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_expenseId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_cartId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "PayHistory" DROP CONSTRAINT "PayHistory_expenseId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_projectId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_chatId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_mailId_fkey";

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "expenseId",
DROP COLUMN "image";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "authType",
DROP COLUMN "chatId",
DROP COLUMN "displayName",
DROP COLUMN "firebaseUID",
DROP COLUMN "mailId",
DROP COLUMN "photoURL";

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "Cart";

-- DropTable
DROP TABLE "CartItem";

-- DropTable
DROP TABLE "Chat";

-- DropTable
DROP TABLE "Country";

-- DropTable
DROP TABLE "Discount";

-- DropTable
DROP TABLE "Event";

-- DropTable
DROP TABLE "Expense";

-- DropTable
DROP TABLE "Kanban";

-- DropTable
DROP TABLE "Mail";

-- DropTable
DROP TABLE "MailFolder";

-- DropTable
DROP TABLE "Message";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "PayHistory";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "Task";

-- DropTable
DROP TABLE "Vendor";

-- DropEnum
DROP TYPE "CartStatus";

-- DropEnum
DROP TYPE "DeliveryOptions";

-- DropEnum
DROP TYPE "ExpenseStatus";

-- DropEnum
DROP TYPE "OrderStatus";

-- DropEnum
DROP TYPE "UserStatus";
