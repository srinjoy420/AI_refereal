/*
  Warnings:

  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "GeneratedMessage_userId_key";

-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "content" TEXT;

-- DropTable
DROP TABLE "Test";

-- CreateIndex
CREATE INDEX "GeneratedMessage_userId_createdAt_idx" ON "GeneratedMessage"("userId", "createdAt");
