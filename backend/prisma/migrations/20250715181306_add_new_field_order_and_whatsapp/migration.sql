/*
  Warnings:

  - Added the required column `subtotal` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pos_coffee_shop"."Image" ADD COLUMN     "orderId" TEXT;

-- AlterTable
ALTER TABLE "pos_coffee_shop"."Order" ADD COLUMN     "discountAmount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "serviceCharge" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "subtotal" INTEGER NOT NULL,
ADD COLUMN     "taxAmount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "whatsappId" TEXT,
ADD COLUMN     "whatsappNumber" TEXT;

-- AlterTable
ALTER TABLE "pos_coffee_shop"."OrderItem" ADD COLUMN     "note" TEXT;

-- CreateTable
CREATE TABLE "pos_coffee_shop"."WhatsAppContact" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WhatsAppContact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WhatsAppContact_number_key" ON "pos_coffee_shop"."WhatsAppContact"("number");

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."Image" ADD CONSTRAINT "Image_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "pos_coffee_shop"."Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."Order" ADD CONSTRAINT "Order_whatsappId_fkey" FOREIGN KEY ("whatsappId") REFERENCES "pos_coffee_shop"."WhatsAppContact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
