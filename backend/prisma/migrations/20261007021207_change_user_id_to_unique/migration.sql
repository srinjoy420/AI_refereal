/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `GeneratedMessage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GeneratedMessage_userId_key" ON "GeneratedMessage"("userId");
