-- CreateTable
CREATE TABLE `Logbook` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` INTEGER NOT NULL,
    `establishment` VARCHAR(191) NOT NULL,
    `institution` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `SCORE` INTEGER NULL,
    `day` INTEGER NULL,

    UNIQUE INDEX `Logbook_student_id_establishment_key`(`student_id`, `establishment`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Students` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `matric_number` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NULL,
    `fullname` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `course` VARCHAR(191) NULL,
    `department` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Students_matric_number_key`(`matric_number`),
    UNIQUE INDEX `Students_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentSupervisor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `std_id` INTEGER NOT NULL,
    `supervisor_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Supervisors` (
    `PK` INTEGER NOT NULL AUTO_INCREMENT,
    `id` INTEGER NOT NULL,
    `UQ` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NULL,
    `fullname` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `supervisor_id` INTEGER NULL,

    UNIQUE INDEX `Supervisors_UQ_key`(`UQ`),
    UNIQUE INDEX `Supervisors_email_key`(`email`),
    PRIMARY KEY (`PK`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Weekly` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `progress` VARCHAR(191) NOT NULL,
    `logbook_id` INTEGER NULL,
    `scores` INTEGER NULL,
    `weekly_tract` INTEGER NULL,
    `progress_file` VARCHAR(191) NULL,

    INDEX `Weekly_logbook_id_idx`(`logbook_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Logbook` ADD CONSTRAINT `Logbook_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentSupervisor` ADD CONSTRAINT `StudentSupervisor_std_id_fkey` FOREIGN KEY (`std_id`) REFERENCES `Students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentSupervisor` ADD CONSTRAINT `StudentSupervisor_supervisor_id_fkey` FOREIGN KEY (`supervisor_id`) REFERENCES `Supervisors`(`PK`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Weekly` ADD CONSTRAINT `Weekly_logbook_id_fkey` FOREIGN KEY (`logbook_id`) REFERENCES `Logbook`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
