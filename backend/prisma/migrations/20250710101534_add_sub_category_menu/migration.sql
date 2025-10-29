/*
  Warnings:

  - Added the required column `category` to the `MenuItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "pos_coffee_shop"."MenuCategory" AS ENUM ('FOOD', 'DRINK', 'SNACK');

-- AlterTable
ALTER TABLE "pos_coffee_shop"."MenuItem" ADD COLUMN     "subCategoryId" TEXT,
DROP COLUMN "category",
ADD COLUMN     "category" "pos_coffee_shop"."MenuCategory" NOT NULL;

-- CreateTable
CREATE TABLE "pos_coffee_shop"."SubCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "pos_coffee_shop"."MenuCategory" NOT NULL,
    "merchantId" TEXT NOT NULL,

    CONSTRAINT "SubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory_name_merchantId_category_key" ON "pos_coffee_shop"."SubCategory"("name", "merchantId", "category");

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."MenuItem" ADD CONSTRAINT "MenuItem_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "pos_coffee_shop"."SubCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."SubCategory" ADD CONSTRAINT "SubCategory_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "pos_coffee_shop"."Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
