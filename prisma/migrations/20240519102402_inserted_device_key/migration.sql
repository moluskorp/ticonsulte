/*
  Warnings:

  - The required column `device_key` was added to the `Device` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "device_key" TEXT NOT NULL;
