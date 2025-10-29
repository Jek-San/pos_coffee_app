-- CreateTable
CREATE TABLE "pos_coffee_shop"."StallSchedule" (
    "id" TEXT NOT NULL,
    "stallId" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "openHour" TEXT NOT NULL,
    "closeHour" TEXT NOT NULL,
    "closed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StallSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pos_coffee_shop"."StallOverride" (
    "id" TEXT NOT NULL,
    "stallId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "isOpen" BOOLEAN NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StallOverride_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."StallSchedule" ADD CONSTRAINT "StallSchedule_stallId_fkey" FOREIGN KEY ("stallId") REFERENCES "pos_coffee_shop"."Stall"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pos_coffee_shop"."StallOverride" ADD CONSTRAINT "StallOverride_stallId_fkey" FOREIGN KEY ("stallId") REFERENCES "pos_coffee_shop"."Stall"("id") ON DELETE CASCADE ON UPDATE CASCADE;
