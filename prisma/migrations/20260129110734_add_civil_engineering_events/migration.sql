-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EventType" ADD VALUE 'CE_MODEL_MAKING';
ALTER TYPE "EventType" ADD VALUE 'CE_CAD_MASTER';
ALTER TYPE "EventType" ADD VALUE 'CE_VIDEOGRAPHY';
