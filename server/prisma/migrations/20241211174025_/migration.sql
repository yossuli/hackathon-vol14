/*
  Warnings:

  - Made the column `updatedAt` on table `fireFlower` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "fireFlower" ALTER COLUMN "updatedAt" SET NOT NULL;
