-- AlterTable
ALTER TABLE "pos_coffee_shop"."AdminUser" ADD COLUMN     "lastLogin" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "pos_coffee_shop"."Image" ADD COLUMN     "stallId" TEXT;

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."Image" ADD CONSTRAINT "Image_stallId_fkey" FOREIGN KEY ("stallId") REFERENCES "pos_coffee_shop"."Stall"("id") ON DELETE SET NULL ON UPDATE CASCADE;
