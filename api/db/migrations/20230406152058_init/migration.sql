-- CreateEnum
CREATE TYPE "Sport" AS ENUM ('BASEBALL', 'BASKETBALL', 'DODGEBALL', 'FOOTBALL', 'LACROSSE', 'SOFTBALL');

-- CreateTable
CREATE TABLE "League" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sport" TEXT NOT NULL,

    CONSTRAINT "League_pkey" PRIMARY KEY ("id")
);
