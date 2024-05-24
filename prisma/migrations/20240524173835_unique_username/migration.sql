/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `api_token` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `legacy_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `branch_officeId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "api_token",
DROP COLUMN "legacy_id",
DROP COLUMN "name",
ADD COLUMN     "branch_officeId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_branch_officeId_fkey" FOREIGN KEY ("branch_officeId") REFERENCES "Branch_office"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
