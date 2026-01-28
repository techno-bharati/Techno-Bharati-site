-- AlterEnum
ALTER TYPE "AdminRole" ADD VALUE 'DEPARTMENT_ADMIN';

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "department" TEXT;
