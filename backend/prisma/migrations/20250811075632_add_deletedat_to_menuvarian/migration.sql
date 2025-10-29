-- AlterTable
ALTER TABLE "pos_coffee_shop"."MenuVariant" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "pos_coffee_shop"."Order" ADD COLUMN     "confirmedAt" TIMESTAMP(3),
ADD COLUMN     "preparingAt" TIMESTAMP(3),
ADD COLUMN     "readyAt" TIMESTAMP(3);
