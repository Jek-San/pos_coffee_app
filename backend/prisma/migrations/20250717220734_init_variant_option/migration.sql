-- DropForeignKey
ALTER TABLE "pos_coffee_shop"."MenuItem" DROP CONSTRAINT "MenuItem_merchantId_fkey";

-- CreateTable
CREATE TABLE "pos_coffee_shop"."MenuVariantType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,

    CONSTRAINT "MenuVariantType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pos_coffee_shop"."MenuVariant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "extraPrice" INTEGER NOT NULL DEFAULT 0,
    "menuItemId" TEXT NOT NULL,
    "variantTypeId" TEXT,

    CONSTRAINT "MenuVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pos_coffee_shop"."OrderItemVariant" (
    "id" TEXT NOT NULL,
    "orderItemId" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,

    CONSTRAINT "OrderItemVariant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MenuVariantType_name_merchantId_key" ON "pos_coffee_shop"."MenuVariantType"("name", "merchantId");

-- CreateIndex
CREATE UNIQUE INDEX "MenuVariant_name_menuItemId_key" ON "pos_coffee_shop"."MenuVariant"("name", "menuItemId");

-- CreateIndex
CREATE UNIQUE INDEX "OrderItemVariant_orderItemId_variantId_key" ON "pos_coffee_shop"."OrderItemVariant"("orderItemId", "variantId");

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."MenuItem" ADD CONSTRAINT "MenuItem_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "pos_coffee_shop"."Merchant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."MenuVariantType" ADD CONSTRAINT "MenuVariantType_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "pos_coffee_shop"."Merchant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."MenuVariant" ADD CONSTRAINT "MenuVariant_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "pos_coffee_shop"."MenuItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."MenuVariant" ADD CONSTRAINT "MenuVariant_variantTypeId_fkey" FOREIGN KEY ("variantTypeId") REFERENCES "pos_coffee_shop"."MenuVariantType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."OrderItemVariant" ADD CONSTRAINT "OrderItemVariant_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "pos_coffee_shop"."OrderItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."OrderItemVariant" ADD CONSTRAINT "OrderItemVariant_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "pos_coffee_shop"."MenuVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
