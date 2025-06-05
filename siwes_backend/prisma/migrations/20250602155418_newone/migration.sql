/*
  Warnings:

  - You are about to drop the column `SCORE` on the `Logbook` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Logbook" DROP COLUMN "SCORE";

-- CreateTable
CREATE TABLE "Score" (
    "id" SERIAL NOT NULL,
    "scrore" INTEGER NOT NULL,
    "logbook_id" INTEGER NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_logbook_id_fkey" FOREIGN KEY ("logbook_id") REFERENCES "Logbook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
