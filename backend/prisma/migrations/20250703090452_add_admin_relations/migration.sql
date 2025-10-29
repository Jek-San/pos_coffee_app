-- CreateTable
CREATE TABLE "pos_coffee_shop"."AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pos_coffee_shop"."AdminMerchant" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminMerchant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "pos_coffee_shop"."AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AdminMerchant_adminId_merchantId_key" ON "pos_coffee_shop"."AdminMerchant"("adminId", "merchantId");

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."AdminMerchant" ADD CONSTRAINT "AdminMerchant_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "pos_coffee_shop"."AdminUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."AdminMerchant" ADD CONSTRAINT "AdminMerchant_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "pos_coffee_shop"."Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
