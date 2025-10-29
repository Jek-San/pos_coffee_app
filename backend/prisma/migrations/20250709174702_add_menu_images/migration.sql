/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `MenuItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pos_coffee_shop"."Image" ADD COLUMN     "menuItemId" TEXT;

-- AlterTable
ALTER TABLE "pos_coffee_shop"."MenuItem" DROP COLUMN "imageUrl";

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."Image" ADD CONSTRAINT "Image_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "pos_coffee_shop"."MenuItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
