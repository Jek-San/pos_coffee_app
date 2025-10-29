/*
  Warnings:

  - You are about to drop the column `paymentMethods` on the `Merchant` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `Order` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "pos_coffee_shop"."PaymentCategory" AS ENUM ('CASH', 'QRIS', 'BANK', 'EDC', 'FREE');

-- AlterTable
ALTER TABLE "pos_coffee_shop"."Image" ADD COLUMN     "paymentMethodOptionId" TEXT;

-- AlterTable
ALTER TABLE "pos_coffee_shop"."Merchant" DROP COLUMN "paymentMethods";

-- AlterTable
ALTER TABLE "pos_coffee_shop"."Order" DROP COLUMN "paymentMethod",
ADD COLUMN     "paymentMethodId" TEXT;

-- DropEnum
DROP TYPE "pos_coffee_shop"."PaymentMethod";

-- CreateTable
CREATE TABLE "pos_coffee_shop"."PaymentMethodOption" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "pos_coffee_shop"."PaymentCategory" NOT NULL,
    "merchantId" TEXT NOT NULL,
    "accountName" TEXT,
    "accountNumber" TEXT,

    CONSTRAINT "PaymentMethodOption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."PaymentMethodOption" ADD CONSTRAINT "PaymentMethodOption_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "pos_coffee_shop"."Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."Image" ADD CONSTRAINT "Image_paymentMethodOptionId_fkey" FOREIGN KEY ("paymentMethodOptionId") REFERENCES "pos_coffee_shop"."PaymentMethodOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."Order" ADD CONSTRAINT "Order_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "pos_coffee_shop"."PaymentMethodOption"("id") ON DELETE SET NULL ON UPDATE CASCADE;
