-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "pos_coffee_shop";

-- CreateEnum
CREATE TYPE "pos_coffee_shop"."OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'CANCELLED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "pos_coffee_shop"."PaymentMethod" AS ENUM ('CASH', 'QRIS', 'EDC', 'FREE');

-- CreateEnum
CREATE TYPE "pos_coffee_shop"."ChatSender" AS ENUM ('CUSTOMER', 'CASHIER', 'SYSTEM');

-- CreateEnum
CREATE TYPE "pos_coffee_shop"."ChatType" AS ENUM ('TEXT', 'IMAGE', 'SYSTEM');

-- CreateTable
CREATE TABLE "pos_coffee_shop"."Merchant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "qrUrl" TEXT NOT NULL,
    "logoUrl" TEXT,
    "themeColor" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Merchant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pos_coffee_shop"."MenuItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "description" TEXT,
    "category" TEXT,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "merchantId" TEXT NOT NULL,

    CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pos_coffee_shop"."Customer" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT,
    "points" INTEGER NOT NULL DEFAULT 0,
    "lastLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pos_coffee_shop"."Order" (
    "id" TEXT NOT NULL,
    "customerId" TEXT,
    "customerName" TEXT,
    "status" "pos_coffee_shop"."OrderStatus" NOT NULL DEFAULT 'PENDING',
    "paymentMethod" "pos_coffee_shop"."PaymentMethod",
    "totalAmount" INTEGER NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "merchantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pos_coffee_shop"."OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "menuItemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pos_coffee_shop"."ChatMessage" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "sender" "pos_coffee_shop"."ChatSender" NOT NULL,
    "content" TEXT NOT NULL,
    "type" "pos_coffee_shop"."ChatType" NOT NULL DEFAULT 'TEXT',
    "seen" BOOLEAN NOT NULL DEFAULT false,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_slug_key" ON "pos_coffee_shop"."Merchant"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_phone_key" ON "pos_coffee_shop"."Customer"("phone");

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."MenuItem" ADD CONSTRAINT "MenuItem_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "pos_coffee_shop"."Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "pos_coffee_shop"."Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."Order" ADD CONSTRAINT "Order_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "pos_coffee_shop"."Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "pos_coffee_shop"."Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."OrderItem" ADD CONSTRAINT "OrderItem_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "pos_coffee_shop"."MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."ChatMessage" ADD CONSTRAINT "ChatMessage_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "pos_coffee_shop"."Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
