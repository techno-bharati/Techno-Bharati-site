/*
  Warnings:

  - The values [FIREFIRE_BATTLESHIP] on the enum `EventType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EventType_new" AS ENUM ('STARTUP_SPHERE', 'FACE_TO_FACE', 'PYTHON_WARRIORS', 'FREEFIRE_BATTLESHIP', 'AI_TALES');
ALTER TABLE "Registration" ALTER COLUMN "eventType" TYPE "EventType_new" USING ("eventType"::text::"EventType_new");
ALTER TABLE "Admin" ALTER COLUMN "eventType" TYPE "EventType_new" USING ("eventType"::text::"EventType_new");
ALTER TYPE "EventType" RENAME TO "EventType_old";
ALTER TYPE "EventType_new" RENAME TO "EventType";
DROP TYPE "EventType_old";
COMMIT;
