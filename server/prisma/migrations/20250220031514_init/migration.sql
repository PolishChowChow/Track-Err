-- CreateEnum
CREATE TYPE "WorkStation" AS ENUM ('LP1', 'LP2');

-- CreateEnum
CREATE TYPE "Reference" AS ENUM ('MPDB', 'ICE', 'TRYOUT');

-- CreateEnum
CREATE TYPE "TableId" AS ENUM ('t101', 't102', 't301', 't302', 't303', 't304', 't50', 't60');

-- CreateEnum
CREATE TYPE "RobotId" AS ENUM ('r01', 'r02', 'r03', 'r04', 'r05', 'r06', 'r07', 'r08', 'r09', 'r10', 'r11');

-- CreateEnum
CREATE TYPE "MountingStation" AS ENUM ('m1', 'm2');

-- CreateTable
CREATE TABLE "ErrorRecords" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "workstation" "WorkStation" NOT NULL,
    "tableId" "TableId" NOT NULL,
    "robotId" "RobotId" NOT NULL,
    "mountingStation" "MountingStation",
    "content" TEXT NOT NULL,

    CONSTRAINT "ErrorRecords_pkey" PRIMARY KEY ("id")
);
