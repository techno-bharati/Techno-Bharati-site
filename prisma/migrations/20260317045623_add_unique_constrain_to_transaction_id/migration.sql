/*
  Warnings:

  - A unique constraint covering the columns `[transactionId]` on the table `Registration` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "registration_transaction_unique" ON "Registration"("transactionId");
