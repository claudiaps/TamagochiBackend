/*
  Warnings:

  - You are about to drop the column `dead` on the `Pet` table. All the data in the column will be lost.
  - You are about to alter the column `restLevel` on the `Pet` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `foodLevel` on the `Pet` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `funLevel` on the `Pet` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Pet` DROP COLUMN `dead`,
    ADD COLUMN `life` DOUBLE NOT NULL DEFAULT 80,
    MODIFY `restLevel` DOUBLE NOT NULL DEFAULT 80,
    MODIFY `foodLevel` DOUBLE NOT NULL DEFAULT 80,
    MODIFY `funLevel` DOUBLE NOT NULL DEFAULT 80;
