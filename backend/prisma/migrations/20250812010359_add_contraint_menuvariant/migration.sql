/*
  Warnings:

  - A unique constraint covering the columns `[name,menuItemId,variantTypeId]` on the table `MenuVariant` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "pos_coffee_shop"."MenuVariant_name_menuItemId_key";

-- CreateIndex
CREATE UNIQUE INDEX "MenuVariant_name_menuItemId_variantTypeId_key" ON "pos_coffee_shop"."MenuVariant"("name", "menuItemId", "variantTypeId");
