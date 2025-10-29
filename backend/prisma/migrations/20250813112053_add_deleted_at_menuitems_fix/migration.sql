/*
  Warnings:

  - You are about to drop the column `deleteAt` on the `MenuItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pos_coffee_shop"."MenuItem" DROP COLUMN "deleteAt",
ADD COLUMN     "deletedAt" TIMESTAMP(3);
