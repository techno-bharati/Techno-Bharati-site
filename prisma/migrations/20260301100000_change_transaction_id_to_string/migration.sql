-- AlterTable
-- Change transactionId from INTEGER to TEXT to support 12-digit UPI transaction IDs
-- (12-digit numbers exceed 32-bit integer range)
ALTER TABLE "Registration" ALTER COLUMN "transactionId" TYPE TEXT USING "transactionId"::text;
