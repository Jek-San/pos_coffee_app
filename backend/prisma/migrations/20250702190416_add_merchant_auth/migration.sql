/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Merchant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "pos_coffee_shop"."Merchant" ADD COLUMN     "email" TEXT,
ADD COLUMN     "password" TEXT;

-- AlterTable
ALTER TABLE "pos_coffee_shop"."Order" ADD COLUMN     "tableId" TEXT;

-- CreateTable
CREATE TABLE "pos_coffee_shop"."Table" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,

    CONSTRAINT "Table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pos_coffee_shop"."FavoriteMenuItem" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "menuItemId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "FavoriteMenuItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_email_key" ON "pos_coffee_shop"."Merchant"("email");

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."Table" ADD CONSTRAINT "Table_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "pos_coffee_shop"."Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."FavoriteMenuItem" ADD CONSTRAINT "FavoriteMenuItem_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "pos_coffee_shop"."Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."FavoriteMenuItem" ADD CONSTRAINT "FavoriteMenuItem_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "pos_coffee_shop"."MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."Order" ADD CONSTRAINT "Order_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "pos_coffee_shop"."Table"("id") ON DELETE SET NULL ON UPDATE CASCADE;
