-- CreateTable
CREATE TABLE `Conversations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `askWord` VARCHAR(191) NOT NULL,
    `respondWord` VARCHAR(191) NOT NULL,

    INDEX `Conversations_askWord_idx`(`askWord`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
