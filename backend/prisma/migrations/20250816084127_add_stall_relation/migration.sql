/*
  Warnings:

  - A unique constraint covering the columns `[adminId,merchantId,stallId]` on the table `AdminMerchant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "pos_coffee_shop"."AdminRole" ADD VALUE 'STALL_OWNER';

-- DropIndex
DROP INDEX "pos_coffee_shop"."AdminMerchant_adminId_merchantId_key";

-- AlterTable
ALTER TABLE "pos_coffee_shop"."AdminMerchant" ADD COLUMN     "stallId" TEXT;

-- AlterTable
ALTER TABLE "pos_coffee_shop"."MenuItem" ADD COLUMN     "stallId" TEXT;

-- AlterTable
ALTER TABLE "pos_coffee_shop"."OrderItem" ADD COLUMN     "stallId" TEXT;

-- CreateTable
CREATE TABLE "pos_coffee_shop"."Stall" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "merchantId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stall_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminMerchant_adminId_merchantId_stallId_key" ON "pos_coffee_shop"."AdminMerchant"("adminId", "merchantId", "stallId");

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."AdminMerchant" ADD CONSTRAINT "AdminMerchant_stallId_fkey" FOREIGN KEY ("stallId") REFERENCES "pos_coffee_shop"."Stall"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."Stall" ADD CONSTRAINT "Stall_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "pos_coffee_shop"."Merchant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."MenuItem" ADD CONSTRAINT "MenuItem_stallId_fkey" FOREIGN KEY ("stallId") REFERENCES "pos_coffee_shop"."Stall"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."OrderItem" ADD CONSTRAINT "OrderItem_stallId_fkey" FOREIGN KEY ("stallId") REFERENCES "pos_coffee_shop"."Stall"("id") ON DELETE SET NULL ON UPDATE CASCADE;
