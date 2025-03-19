/*
  Warnings:

  - You are about to alter the column `content` on the `ErrorRecords` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- CreateEnum
CREATE TYPE "StructureType" AS ENUM ('robot', 'table', 'mountingStation', 'workstation', 'reference');

-- AlterTable
ALTER TABLE "ErrorRecords" ADD COLUMN     "reference" "Reference" NOT NULL DEFAULT 'MPDB',
ALTER COLUMN "workstation" SET DEFAULT 'LP1',
ALTER COLUMN "tableId" SET DEFAULT 't303',
ALTER COLUMN "robotId" SET DEFAULT 'r05',
ALTER COLUMN "content" SET DATA TYPE VARCHAR(100);

-- CreateTable
CREATE TABLE "Structures" (
    "id" TEXT NOT NULL,
    "type" "StructureType" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Structures_pkey" PRIMARY KEY ("id")
);
