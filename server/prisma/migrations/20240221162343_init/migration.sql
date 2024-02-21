/*
  Warnings:

  - You are about to drop the column `idCategoria` on the `subcategoria` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `subcategoria` DROP FOREIGN KEY `SubCategoria_idCategoria_fkey`;

-- AlterTable
ALTER TABLE `subcategoria` DROP COLUMN `idCategoria`;

-- CreateTable
CREATE TABLE `_CategoriaToSubCategoria` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CategoriaToSubCategoria_AB_unique`(`A`, `B`),
    INDEX `_CategoriaToSubCategoria_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CategoriaToSubCategoria` ADD CONSTRAINT `_CategoriaToSubCategoria_A_fkey` FOREIGN KEY (`A`) REFERENCES `Categoria`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoriaToSubCategoria` ADD CONSTRAINT `_CategoriaToSubCategoria_B_fkey` FOREIGN KEY (`B`) REFERENCES `SubCategoria`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
