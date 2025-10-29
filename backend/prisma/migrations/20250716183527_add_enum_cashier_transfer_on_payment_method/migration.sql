/*
  Warnings:

  - The values [CASH] on the enum `PaymentMethod` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "pos_coffee_shop"."PaymentMethod_new" AS ENUM ('CASHIER', 'TRANSFER', 'QRIS', 'BANK', 'EDC', 'FREE');
ALTER TABLE "pos_coffee_shop"."Merchant" ALTER COLUMN "paymentMethods" TYPE "pos_coffee_shop"."PaymentMethod_new"[] USING ("paymentMethods"::text::"pos_coffee_shop"."PaymentMethod_new"[]);
ALTER TABLE "pos_coffee_shop"."Order" ALTER COLUMN "paymentMethod" TYPE "pos_coffee_shop"."PaymentMethod_new" USING ("paymentMethod"::text::"pos_coffee_shop"."PaymentMethod_new");
ALTER TYPE "pos_coffee_shop"."PaymentMethod" RENAME TO "PaymentMethod_old";
ALTER TYPE "pos_coffee_shop"."PaymentMethod_new" RENAME TO "PaymentMethod";
DROP TYPE "pos_coffee_shop"."PaymentMethod_old";
COMMIT;
