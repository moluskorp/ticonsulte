/*
  Warnings:

  - You are about to drop the column `people_ind` on the `Visitor` table. All the data in the column will be lost.
  - Added the required column `people_in` to the `Visitor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Visitor" DROP COLUMN "people_ind",
ADD COLUMN     "people_in" INTEGER NOT NULL;
