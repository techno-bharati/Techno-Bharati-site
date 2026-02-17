/*
  Warnings:

  - The values [FREEFIRE_BATTLESHIP] on the enum `EventType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EventType_new" AS ENUM ('STARTUP_SPHERE', 'FACE_TO_FACE', 'PYTHON_WARRIORS', 'BGMI', 'AI_TALES', 'GE_TECHNO_SCIENCE_QUIZ', 'GE_POSTER_COMPETITION', 'GE_SCITECH_MODEL_EXPO', 'GE_GAMES_BUNDLE', 'CE_MODEL_MAKING', 'CE_CAD_MASTER', 'CE_VIDEOGRAPHY', 'CSE_CODEFUSION', 'CSE_PROJECT_EXPO', 'CSE_COUNTER_STRIKE');
ALTER TABLE "Registration" ALTER COLUMN "eventType" TYPE "EventType_new" USING ("eventType"::text::"EventType_new");
ALTER TABLE "Admin" ALTER COLUMN "eventType" TYPE "EventType_new" USING ("eventType"::text::"EventType_new");
ALTER TYPE "EventType" RENAME TO "EventType_old";
ALTER TYPE "EventType_new" RENAME TO "EventType";
DROP TYPE "public"."EventType_old";
COMMIT;
