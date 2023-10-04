-- AlterTable
ALTER TABLE `User` ADD COLUMN `balance` INTEGER NOT NULL DEFAULT 2000,
    ADD COLUMN `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active';
