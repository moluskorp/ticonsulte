/*
  Warnings:

  - Added the required column `entranceId` to the `Visitor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Visitor" ADD COLUMN     "entranceId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_entranceId_fkey" FOREIGN KEY ("entranceId") REFERENCES "Entrance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
