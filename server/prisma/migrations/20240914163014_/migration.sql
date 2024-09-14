/*
  Warnings:

  - A unique constraint covering the columns `[password]` on the table `Room` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Room_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Room_password_key" ON "Room"("password");
