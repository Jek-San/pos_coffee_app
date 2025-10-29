-- AlterEnum
ALTER TYPE "pos_coffee_shop"."PaymentMethod" ADD VALUE 'BANK';

-- AlterTable
ALTER TABLE "pos_coffee_shop"."Merchant" ADD COLUMN     "paymentMethods" "pos_coffee_shop"."PaymentMethod"[];
