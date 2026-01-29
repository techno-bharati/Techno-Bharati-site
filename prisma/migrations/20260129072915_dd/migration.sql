-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EventType" ADD VALUE 'GE_TECHNO_SCIENCE_QUIZ';
ALTER TYPE "EventType" ADD VALUE 'GE_POSTER_COMPETITION';
ALTER TYPE "EventType" ADD VALUE 'GE_SCITECH_MODEL_EXPO';
ALTER TYPE "EventType" ADD VALUE 'GE_GAMES_BUNDLE';
