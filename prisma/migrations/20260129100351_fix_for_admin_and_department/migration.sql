/*
  Warnings:

  - The `department` column on the `Admin` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `department` column on the `Registration` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Department" AS ENUM ('AIML', 'CSE', 'MECHANICAL', 'CIVIL', 'ENTC', 'GENERAL_ENGINEERING', 'OTHER');

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "department",
ADD COLUMN     "department" "Department";

-- AlterTable
ALTER TABLE "Registration" DROP COLUMN "department",
ADD COLUMN     "department" "Department" NOT NULL DEFAULT 'AIML';
