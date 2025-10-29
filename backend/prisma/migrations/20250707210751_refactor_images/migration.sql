/*
  Warnings:

  - You are about to drop the column `logoUrl` on the `Merchant` table. All the data in the column will be lost.
  - You are about to drop the column `qrUrl` on the `Merchant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pos_coffee_shop"."Merchant" DROP COLUMN "logoUrl",
DROP COLUMN "qrUrl";

-- CreateTable
CREATE TABLE "pos_coffee_shop"."Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "storage" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "merchantId" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."Image" ADD CONSTRAINT "Image_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "pos_coffee_shop"."Merchant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
