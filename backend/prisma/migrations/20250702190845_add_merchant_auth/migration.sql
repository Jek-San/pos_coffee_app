/*
  Warnings:

  - Made the column `email` on table `Merchant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `Merchant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "pos_coffee_shop"."Merchant" ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL;
