/*
  Warnings:

  - You are about to drop the column `userId` on the `Scheduling` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `Scheduling` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Scheduling" DROP CONSTRAINT "Scheduling_userId_fkey";

-- AlterTable
ALTER TABLE "Scheduling" DROP COLUMN "userId",
ADD COLUMN     "customerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Scheduling" ADD CONSTRAINT "Scheduling_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
