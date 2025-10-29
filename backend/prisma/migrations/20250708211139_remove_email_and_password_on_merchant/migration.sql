/*
  Warnings:

  - You are about to drop the column `email` on the `Merchant` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Merchant` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "pos_coffee_shop"."Merchant_email_key";

-- AlterTable
ALTER TABLE "pos_coffee_shop"."Merchant" DROP COLUMN "email",
DROP COLUMN "password";
