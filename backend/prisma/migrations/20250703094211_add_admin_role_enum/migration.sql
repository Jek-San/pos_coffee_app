/*
  Warnings:

  - The `role` column on the `AdminMerchant` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "pos_coffee_shop"."AdminRole" AS ENUM ('OWNER', 'MANAGER', 'CASHIER');

-- AlterTable
ALTER TABLE "pos_coffee_shop"."AdminMerchant" DROP COLUMN "role",
ADD COLUMN     "role" "pos_coffee_shop"."AdminRole" NOT NULL DEFAULT 'OWNER';
